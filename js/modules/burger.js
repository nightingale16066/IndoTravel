const headerMenuButton = document.querySelector('.header__menu-button');
const headerMenu = document.querySelector('.header__menu');
const body = document.querySelector('body');
console.log('body: ', body);

headerMenuButton.addEventListener('click', () => {
  headerMenu.classList.toggle('header__menu_active');
})


body.addEventListener('click', ({target}) => {
  if ((headerMenu.classList.contains('header__menu_active') 
        && target !== headerMenu
        && target !== headerMenuButton) || target.closest('.header__link')) {
    headerMenu.classList.remove('header__menu_active');
  }
})