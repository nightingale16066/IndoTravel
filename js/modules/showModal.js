import loadStyle from './loadStyle.js';
import { prepareString } from './fetchData.js';


const showModal = async (form, tourPrice) => {
  await loadStyle('css/modal.css')
  const overlay = document.createElement('div');
  const modal = document.createElement('div');
  const modalTitle = document.createElement('h2');
  const place = document.createElement('p');
  const dates = document.createElement('p');
  const price = document.createElement('p');
  const modalButtons = document.createElement('div');
  const confirmBtn = document.createElement('button');
  const editBtn = document.createElement('button');

  overlay.classList.add('overlay', 'overlay_confirm');
  modal.classList.add('modal');
  modalTitle.classList.add('modal__title');
  place.classList.add('modal__text');
  dates.classList.add('modal__text');
  price.classList.add('modal__text');
  modalButtons.classList.add('modal__button');
  confirmBtn.classList.add('modal__btn', 'modal__btn_confirm');
  editBtn.classList.add('modal__btn', 'modal__btn_edit');

  modalTitle.textContent = 'Подтверждение заявки';
  place.textContent = `Бронирование путешествия в Индию на ${form.people.value} ${prepareString(form.people.value)}`;
  dates.textContent = `В даты: ${form.dates.value}`;
  price.textContent = `Стоимость тура ${tourPrice.textContent}`;
  confirmBtn.textContent = 'Подтверждаю';
  editBtn.textContent = 'Изменить данные';

  modalButtons.append(confirmBtn, editBtn);
  modal.append(modalTitle, place, dates, price, modalButtons);
  overlay.append(modal);

  document.body.append(overlay);

  return new Promise(resolve => {
    confirmBtn.addEventListener('click', () => {
      overlay.remove();
      resolve(true);
    });

    editBtn.addEventListener('click', () => {
      overlay.remove();
      resolve(false);
    })
  })
}

export default showModal;


