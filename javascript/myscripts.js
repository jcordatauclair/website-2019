// FADING IN
$(window).on('load', function() {
  $("body").animate({
    opacity: 1
  }, 400);
});

$(document).ready(function() {
  // FADING OUT
  $('a').click(function(e) {
    var $anchor = $(this);
    // NO FADE FOR A NEW TAB LINK
    if ($anchor.attr('target') && $anchor.attr('target').indexOf('_blank') >= 0)
      return;
    // NO FADE FOR AN ANCHOR TAG
    if ($anchor.attr('href').indexOf('#') >= 0)
      return;
    // OTHERWISE: FADE OUT!
    e.preventDefault();
    newLocation = this.href;
    $('body').fadeOut(200, newpage);
  });
  function newpage() {
    window.location = newLocation;
  }

  // TEXT FADING ANIMATION
  $(".hi").delay(1500).animate({
    opacity: 1
  }, 700);
  $(".i-am-julien").delay(2300).animate({
    opacity: 1
  }, 700);
  $(".presentation").delay(3300).animate({
    opacity: 1
  }, 700);
  $(".my-resume").delay(4300).animate({
    opacity: 1
  }, 1500);
  $(".prev-img").delay(1200).animate({
    'margin': '0 50px',
    opacity: 1
  }, 300);
  $(".next-img").delay(1200).animate({
    'margin': '0 50px',
    opacity: 1
  }, 300);

  // BACKGROUND SELECTION
  i = 0; // indice de l'image courante
  n = 7; // nombre d'images dans la galerie
  $(".next-img").click(function(e) {
    i = (i + 1) % n;
    $('.background-img').css('background-image', 'url("images/bg-' + i + '.jpg")');
  });
  $(".prev-img").click(function(e) {
    i--;
    if (i < 0) {
      j = i % n;
      i = n + j;
    }
    $('.background-img').css('background-image', 'url("images/bg-' + i + '.jpg")');
  });

  // BURGER MENU
  $(".open-menu-icon").click(function(e) {
    $(".mobile-menu").delay(50).animate({
      'top': '0px'
    }, 260);
    $(".cross-menu-icon").css("display", "block");
    $(".cross-menu-icon").delay(300).animate({
      opacity: 1
    }, 100);
    $(".lighten").delay(50).animate({
      opacity: 0.2
    }, 260);
  });
  $(".close-menu-icon").click(function(e) {
    $(".mobile-menu").delay(50).animate({
      'top': '-280px'
    }, 260);
    $(".cross-menu-icon").delay(300).animate({
      opacity: 0
    }, 100);
    $(".cross-menu-icon").css("display", "none");
    $(".lighten").delay(50).animate({
      opacity: 0
    }, 260);
  });

  let c = document.querySelector('canvas');
  let ctx = c.getContext('2d');
  let w = 50;
  let h = 50;
  let cols = 50;
  let rows = 50;
  let scale = 0.03;
  let size = 1;
  let TWO_PI = Math.PI * 2;
  let simplex = new SimplexNoise();
  let t = 0;
  let frameCount = 0;
  let frameTotal = 256;

  c.width = w;
  c.height = h;

  function loop() {
    t = frameCount / frameTotal;

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        let x2 = x * size;
        let y2 = y * size;
        let lightness = (simplex.noise4D(
          x * scale,
          y * scale,
          0.2 * Math.cos(TWO_PI * t),
          0.2 * Math.sin(TWO_PI * t)
        ) + 1) / 2;
        let hue = (simplex.noise4D(
          x * scale + 1000,
          y * scale + 1000,
          0.2 * Math.cos(TWO_PI * t),
          0.2 * Math.sin(TWO_PI * t)
        ) + 1) / 2;
        ctx.fillStyle = `hsla(${50 - hue * 250}, 30%, ${100 - lightness * 70}%, 1)`;
        ctx.fillRect(x2, y2, size, size);
      }
    }

    if (frameCount < frameTotal) {
      frameCount++;
    } else {
      frameCount = 0;
    }

    requestAnimationFrame(loop);
  }

  loop();
});
