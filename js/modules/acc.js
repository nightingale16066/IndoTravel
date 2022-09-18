const travelItem = document.querySelectorAll('.travel__item');
const travelItemTitle = document.querySelectorAll('.travel__item-title');
const travelItemWrapper = document.querySelectorAll('.travel__item-text-wrapper');

let maxHeight = 0;

travelItemWrapper.forEach(item => {
  if (item.scrollHeight > maxHeight) {
    maxHeight = item.scrollHeight;
  }
})

travelItemTitle.forEach((item, index) => {
  item.addEventListener('click', ({target}) => {
    for (let i = 0; i < travelItemTitle.length; i++) {
      if (index === i) {
        travelItemWrapper[i].style.height =
          travelItem[i].classList.contains('travel__item_active') ? 
          '' : `${maxHeight}px`;
          travelItem[i].classList.toggle('travel__item_active');
      } else {
        travelItemWrapper[i].style.height = '';
        travelItem[i].classList.remove('travel__item_active');
      }
    }
  })
})