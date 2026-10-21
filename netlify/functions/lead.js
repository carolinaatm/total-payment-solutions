/*
 * Lead gateway: website forms -> spam checks -> Zoho CRM webform (server to server).
 * Hosted on totalpaysolutions.com, shared by all brands. Endpoint: /.netlify/functions/lead
 * Secrets live in Netlify env vars (never in page code):
 *   ZOHO_<BRAND>_XNQ, ZOHO_<BRAND>_XMI   (Zoho webform tokens)
 *   RECAPTCHA_<BRAND>_SECRET              (Google reCAPTCHA v2 secret)
 * Spam is silently dropped (visitor still sees the thank-you page) and logged.
 */
const BRANDS = {
  gorilla: { env: 'GORILLA', host: 'gorillaatmsecurity.com', thanks: 'https://gorillaatmsecurity.com/thank-you/' },
  tps:     { env: 'TPS',     host: 'totalpaysolutions.com',  thanks: 'https://totalpaysolutions.com/thank-you.html' },
  catm:    { env: 'CATM',    host: 'carolinaatm.com',        thanks: 'https://carolinaatm.com/thank-you/' },
  ebtm:    { env: 'EBTM',    host: 'expressbtm.com',         thanks: 'https://www.expressbtm.com/' }
};
const PASS = ['First Name', 'Last Name', 'Company', 'Email', 'Phone', 'Lead Source', 'LEADCF1', 'LEADCF2', 'LEADCF3', 'Description'];
const LINK_RE = /(https?:\/\/|www\.|<\s*a[\s>]|href\s*=|\[url|<\s*script)/i;
const FOREIGN_RE = /[Ѐ-ӿ֐-׿؀-ۿ฀-๿぀-ヿ一-鿿가-힯]/;
const BAD_COMPANY_RE = /^(google|facebook|microsoft|apple|amazon|yandex|youtube|instagram)$/i;
const BAD_EMAIL_RE = /@([a-z0-9-]+\.)*(mail\.ru|yandex\.(ru|com)|bk\.ru|list\.ru|inbox\.ru|rambler\.ru|glorzomail\.com|mailinator\.com|guerrillamail\.com|10minutemail\.com|tempmail\.[a-z]+|sharklasers\.com)$/i;
const MIN_FILL_MS = 3000;

const done = (url) => ({ statusCode: 303, headers: { Location: url, 'Cache-Control': 'no-store' }, body: '' });

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  const raw = event.isBase64Encoded ? Buffer.from(event.body || '', 'base64').toString('utf8') : (event.body || '');
  const p = new URLSearchParams(raw);
  const key = (p.get('zbrand') || '').toLowerCase().trim();
  const b = BRANDS[key];
  if (!b) return { statusCode: 400, body: 'Bad request' };
  const env = process.env;
  const ip = (event.headers['x-nf-client-connection-ip'] || event.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const reasons = [];

  // 1. cheap checks
  if ((p.get('aG9uZXlwb3Q') || '').trim()) reasons.push('honeypot');
  const ts = parseInt(p.get('zts') || '0', 10);
  if (!ts) reasons.push('no-timestamp');
  else if (Date.now() - ts < MIN_FILL_MS) reasons.push('too-fast');
  const fn = (p.get('First Name') || '').trim(), ln = (p.get('Last Name') || '').trim();
  if (!ln) reasons.push('no-last-name');
  if (fn && ln && fn.length > 2 && fn.toLowerCase() === ln.toLowerCase()) reasons.push('first-equals-last');
  for (const k of PASS) {
    for (const v of p.getAll(k)) {
      if (LINK_RE.test(v)) { reasons.push('link:' + k); break; }
      if (FOREIGN_RE.test(v)) { reasons.push('foreign-text:' + k); break; }
    }
  }
  if (BAD_COMPANY_RE.test((p.get('Company') || '').trim())) reasons.push('fake-company');
  const email = (p.get('Email') || '').trim();
  if (email && BAD_EMAIL_RE.test(email)) reasons.push('bad-email-domain');
  if ((p.get('Description') || '').length > 3000) reasons.push('too-long');

  // 2. reCAPTCHA (only if everything else passed)
  if (!reasons.length) {
    const secret = env['RECAPTCHA_' + b.env + '_SECRET'];
    const token = p.get('g-recaptcha-response') || '';
    if (!secret) reasons.push('config:no-recaptcha-secret');
    else if (!token) reasons.push('no-captcha');
    else {
      try {
        const r = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ secret, response: token, remoteip: ip }).toString()
        });
        const j = await r.json();
        if (!j.success) reasons.push('captcha-failed:' + (j['error-codes'] || []).join('|'));
        else if (j.hostname && !String(j.hostname).toLowerCase().endsWith(b.host)) reasons.push('captcha-host:' + j.hostname);
      } catch (e) { reasons.push('captcha-error'); }
    }
  }

  const emailDomain = email.split('@')[1] || '';
  if (reasons.length) {
    console.log(JSON.stringify({ brand: key, verdict: 'BLOCKED', reasons, ip, emailDomain, name: (fn + ' ' + ln).slice(0, 60), company: (p.get('Company') || '').slice(0, 60) }));
    return done(b.thanks);
  }

  // 3. forward to Zoho
  const xnq = env['ZOHO_' + b.env + '_XNQ'], xmi = env['ZOHO_' + b.env + '_XMI'];
  if (!xnq || !xmi) {
    console.log(JSON.stringify({ brand: key, verdict: 'ERROR', reasons: ['config:no-zoho-tokens'], emailDomain }));
    return done(b.thanks);
  }
  const z = new URLSearchParams();
  z.set('xnQsjsdp', xnq); z.set('zc_gad', ''); z.set('xmIwtLD', xmi);
  z.set('actionType', 'TGVhZHM='); z.set('returnURL', b.thanks); z.set('aG9uZXlwb3Q', '');
  for (const k of PASS) for (const v of p.getAll(k)) z.append(k, v.slice(0, 3000));
  try {
    const r = await fetch('https://crm.zoho.com/crm/WebToLeadForm', {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: z.toString(), redirect: 'manual'
    });
    console.log(JSON.stringify({ brand: key, verdict: 'SENT', zohoStatus: r.status, emailDomain }));
  } catch (e) {
    console.log(JSON.stringify({ brand: key, verdict: 'ERROR', reasons: ['zoho-unreachable'], emailDomain }));
  }
  return done(b.thanks);
};
