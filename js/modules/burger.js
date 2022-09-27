const headerMenuButton = document.querySelector('.header__menu-button');
const headerMenu = document.querySelector('.header__menu');
const headerItems = document.querySelectorAll('.header__item');
const body = document.querySelector('body');

const duration = 400;
let requestId = NaN

const startAnimation = (duration, index, callback) => {
  let startAnimation = NaN;

  requestId = requestAnimationFrame(function step(timestamp) {
    startAnimation ||= timestamp;

    const progress = (timestamp - startAnimation) / duration / (index + 1);

    callback(progress);
    if (progress < 1) {
      requestId = requestAnimationFrame(step)
    }
  })
}

headerMenuButton.addEventListener('click', () => {
  headerMenu.classList.toggle('header__menu_active');
  headerItems.forEach((item, index) => {
    startAnimation(duration, index, (progress) => item.style.opacity = `${progress}`);
  })
})


body.addEventListener('click', ({target}) => {
  if ((headerMenu.classList.contains('header__menu_active') 
        && target !== headerMenu
        && target !== headerMenuButton) || target.closest('.header__link')) {
    headerMenu.classList.remove('header__menu_active');
  }
})