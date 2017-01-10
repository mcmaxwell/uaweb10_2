
const date = new Date(),
      menu = document.querySelector('.main-menu');

//add year in footer
document.querySelector('#year').innerHTML = date.getFullYear();

//toogleMenu
const toogleMenu = (e) => {
  document.querySelector('.main-menu-list').classList.toggle('active');
  document.querySelector('.toggle-main-menu').classList.toggle('active');
  document.querySelector('body').classList.toggle('fixed');
  e.preventDefault();
};

document.querySelector('.main-menu').addEventListener('click', (e) => {
  if (hasClass(e.target, 'toggle-main-menu')){
    toogleMenu(e);
  } else if (e.target.className === 'main-menu-link') {
    scrollToY(document.querySelector('.' + e.target.getAttribute('href')).offsetTop, 1500, 'easeInOutQuint');
    toogleMenu(e);
    e.preventDefault();
  } else  return false
});

//requestAnimFrame function
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

//has ClassName
function hasClass( elem, className ) {
     return (" " + elem.className + " " ).indexOf( " "+className+" " ) > -1;
}

// scroll to el function
function scrollToY(scrollTargetY, speed, easing) {

    var scrollY = window.scrollY,
        scrollTargetY = scrollTargetY || 0,
        speed = speed || 2000,
        easing = easing || 'easeOutSine',
        currentTime = 0;

    let time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

    let PI_D2 = Math.PI / 2,
        easingEquations = {
            easeOutSine: function (pos) {
                return Math.sin(pos * (Math.PI / 2));
            },
            easeInOutSine: function (pos) {
                return (-0.5 * (Math.cos(Math.PI * pos) - 1));
            },
            easeInOutQuint: function (pos) {
                if ((pos /= 0.5) < 1) {
                    return 0.5 * Math.pow(pos, 5);
                }
                return 0.5 * (Math.pow((pos - 2), 5) + 2);
            }
        };

    function tick() {
        currentTime += 1 / 60;

        let p = currentTime / time;
        let t = easingEquations[easing](p);

        if (p < 1) {
            requestAnimFrame(tick);

            window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
        } else {
            window.scrollTo(0, scrollTargetY);
        }
    }

    tick();
}

// throttle function
  function throttle(func, ms) {

    let isThrottled = false,
      savedArgs,
      savedThis;

    function wrapper() {

      if (isThrottled) {
        savedArgs = arguments;
        savedThis = this;
        return;
      }

      func.apply(this, arguments);

      isThrottled = true;

      setTimeout(function() {
        isThrottled = false;
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }

    return wrapper;
  }

// parallax el
const parallaxEl = document.querySelectorAll('.parallax');
const parallax = () => {
  const scrolltop = window.pageYOffset;
  for (let i = 0; i < parallaxEl.length; i++) {
    let data = parallaxEl[i].dataset;

    data.direction? data.direction: data.direction = 0
    data.position? data.position: data.position = 0
    data.speed? data.speed: data.speed = 0.2

    let topPosition = (Number(data.direction + scrolltop) + Number(data.position * 2))* data.speed;
    let direction = data.direction === '-'? topPosition < data.stop: topPosition > data.stop;

    if (data.stop !== '' && direction) {
      topPosition = data.stop;
    } else {
      topPosition
    }

    parallaxEl[i].style.transform = 'translateY(' + topPosition + 'px)';
  }
}
  window.addEventListener('scroll', () => {
    if (window.innerWidth > 1024) {
      throttle( requestAnimationFrame(parallax), 50);
    }
  }, false)
