import showModal from "./showModal.js";

const reservationForm = document.querySelector('.reservation__form');
const reservationPrice = document.querySelector('.reservation__price');

const reservationName = document.getElementById('reservation__name');
const reservationPhone = document.getElementById('reservation__phone');

const footerForm = document.querySelector('.footer__form');
const closeBtnOk = document.querySelector('.btn__ok');
const closeBtnErr = document.querySelector('.my_btn__error');
const URL = 'https://jsonplaceholder.typicode.com/posts'

const httpRequest = (url, {
  method = 'GET',
  callback,
  body,
  headers,
}) => {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
  
    if (headers) {
      for (const [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value)
      }
    }
  
    xhr.addEventListener('load', () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        callback(new Error(xhr.status), xhr.response);
        return;
      }
      const data = JSON.parse(xhr.response);
      if (callback) callback(null, data);
    })
  
    xhr.addEventListener('error', () => {
      callback(new Error(xhr.status), xhr.response)
    })
  
    xhr.send(JSON.stringify(body));
  } catch (error) {
    callback(new Error(err))
  }
}

const fetchRequest = async (url, {
  method = 'GET',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    } 

    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = headers;

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      if (callback) callback(null, data);
      return;
    }

    throw new Error(response.status);

  } catch (error) {
    callback(error)
  }
}

const closeMod = (btn, modal) => {
  btn.addEventListener('click', () => {
    modal.classList.remove('my_active__modal')
  })
}
const clearForm = (reservationForm) => {
  reservationForm.reset()
  reservationForm.querySelector('.reservation__data').textContent = '';
  reservationForm.querySelector('.reservation__price').textContent = '';
}

reservationName.addEventListener('input', () => {
  reservationName.value = reservationName.value.replace(/[^А-Яа-яЁё ]/g, '');
});

const phoneMask = new Inputmask('+7 (999)-999-99-99');
phoneMask.mask(reservationPhone);


const justValidate = new JustValidate(reservationForm);
justValidate
  .addField('#reservation__name', [
    {
      rule: 'required',
      errorMessage: 'Укажите ваше имя'
    },
    {
      rule : 'customRegexp',
      value: /([a-zа-я]+\s){2}([a-zа-я]+\s?)+/,
      errorMessage: 'Введите полное имя'
    }
  ])
  .addField('#reservation__phone', [
    {
      rule: 'required',
      errorMessage: 'Укажите ваш телефон'
    },
    {
      validator(value) {
        const phone = reservationPhone.inputmask.unmaskedvalue();
        return !!(Number(phone) && phone.length === 10);
      },
      errorMessage: 'Телефон некорректен!'
    },
  ])
  .addField('#reservation__date', [
    {
      rule: 'required',
      errorMessage: 'Выберите дату путешествия'
    }
  ])
  .addField('#reservation__people', [
    {
      rule: 'required',
      errorMessage: 'Укажите количество человек'
    }
  ])
  .onSuccess(async event => {
    const confirm = await showModal(reservationForm, reservationPrice);
    if (confirm) {
      fetchRequest(URL, {
        method: 'POST',
        body: {
          dates: reservationForm.dates.value,
          people: reservationForm.people.value,
          reservation__name: reservationForm.reservation__name.value,
          reservation__phone: reservationPhone.inputmask.unmaskedvalue(),
        },
        callback(err, data) {
          if (err) {
            const errorModal = document.querySelector('.overlay__error');
            errorModal.classList.add('my_active__modal');
            clearForm(reservationForm);
            closeMod(closeBtnErr ,errorModal);
            return;
          }
          reservationForm.dates.disabled = true;
          reservationForm.people.disabled = true;
          reservationForm.reservation__name.disabled = true;
          reservationForm.reservation__phone.disabled = true;
          document.querySelector('.reservation__button').disabled = true;
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  });

footerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchRequest(URL, {
    method: 'POST',
    body: {
      email: footerForm.email.value,
    },
    headers: {
      'Content-Type': 'application/json'
    },
    callback(err) {
      const footerTitle = footerForm.querySelector('.footer__title');
      const footerText = footerForm.querySelector('.footer__text');
      if (err) {
        footerTitle.textContent = 'Упс... Что-то пошло не так';
        footerText.textContent = 'Не удалось отправить заявку. Пожалуйста, повторите отправку еще раз';
        return;
      }
      footerTitle.textContent = 'Ваша заявка успешно отправлена';
      footerText.textContent = 'Наши менеджеры свяжутся с вами в течении 3-х рабочих дней';
      footerForm.querySelector('.footer__input-wrap').style.display = 'none';
    }
  })
})

