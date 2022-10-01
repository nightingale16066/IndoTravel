const tourDate = document.getElementById('tour__date');
const tourPeople = document.getElementById('tour__people');
const reservationDate = document.getElementById('reservation__date');
const reservationPeople = document.getElementById('reservation__people');
const reservationPrice = document.querySelector('.reservation__price');
const reservationData = document.querySelector('.reservation__data');

const getData = async () => {
  const response = await fetch('./date.json');
  const data = await response.json();
  return data;
}

const data = await getData();

const addDates = () => {
  data.forEach(date => {
    tourDate.insertAdjacentHTML('beforeend', `
      <option value="${date.date}" class="tour__option">${date.date}</option>
    `);
    reservationDate.insertAdjacentHTML('beforeend', `
      <option value="${date.date}" class="tour__option">${date.date}</option>
    `);
  })
}

const addOptionsPeople = (elem, value) => {
  elem.innerHTML = '<option value="" class="tour__option">Количество человек</option>'
  const item = data.find(i => i.date === value)
  for (let i = item['min-people']; i < item['max-people'] + 1; i++) {
    elem.insertAdjacentHTML('beforeend', `
      <option value="${i}" class="tour__option">${i}</option>
    `)
  }
}

export const prepareString = (amount) => {
  const words = ['человек', 'человека'];
  let word;

  if ((amount < 10 || amount > 20) && (amount % 10 >= 2 && amount % 10 <= 4)) word = words[1];
  else word = words[0];

  return word;
}

tourDate.addEventListener('change', (e) => {
  const value = e.target.value;
  addOptionsPeople(tourPeople ,value);
})

reservationDate.addEventListener('change', (e) => {
  const value = e.target.value;
  addOptionsPeople(reservationPeople, value);
  reservationData.textContent = value;
  reservationPrice.textContent = '';
})

reservationPeople.addEventListener('change', (e) => {
  const amount = e.target.value;
  const people = prepareString(amount);
  const price = data.find(i => i.date === reservationDate.value).price;

  reservationData.textContent = reservationDate.value + `, ${amount} ${people}`;
  reservationPrice.textContent = `${amount * price}₽`;
})

addDates();