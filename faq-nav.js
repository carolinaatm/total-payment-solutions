(function(){
  // Nav dropdown toggle
  var dds = document.querySelectorAll('.nav-dropdown');
  dds.forEach(function(dd){
    dd.querySelector('.nav-drop-btn').addEventListener('click', function(e){
      e.stopPropagation();
      var wasOpen = dd.classList.contains('open');
      dds.forEach(function(o){ o.classList.remove('open'); });
      if(!wasOpen) dd.classList.add('open');
    });
  });
  document.addEventListener('click', function(){
    dds.forEach(function(dd){ dd.classList.remove('open'); });
  });

  // Hamburger toggle
  var hbtn = document.getElementById('hamburger-btn');
  var nav = document.querySelector('header nav');
  if (hbtn && nav) {
    hbtn.addEventListener('click', function(e){
      e.stopPropagation();
      nav.classList.toggle('mobile-open');
    });
    document.addEventListener('click', function(){
      nav.classList.remove('mobile-open');
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click', function(){
      var isOpen = this.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-q').forEach(function(b){
        b.classList.remove('open');
        var a = b.nextElementSibling;
        if(a) a.style.display = 'none';
      });
      // Open clicked if it was closed
      if(!isOpen){
        this.classList.add('open');
        var ans = this.nextElementSibling;
        if(ans) ans.style.display = 'block';
      }
    });
  });
})();
