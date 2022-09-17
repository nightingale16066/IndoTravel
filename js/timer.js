const timerField = document.querySelector('.timer');
const heroTimer = document.querySelector('.hero__timer');
const deadline = timerField.dataset.timerDeadline;
const dataTimer = document.querySelector('[data-timer-deadline]');


const renderPage = () => {
  heroTimer.insertAdjacentHTML('beforebegin', `<p class="hero__text">Действует скидка 20% на туры от 6&nbsp;человек</p>`);

  heroTimer.insertAdjacentHTML('beforeend', `
    <p class="timer__title">До конца акции осталось:</p>
    <p class="timer__item timer__item_days">
      <span class="timer__count timer__count_days">2</span>
      <span class="timer__units timer__units_days">дня</span></p>
    <p class="timer__item timer__item_hours">
      <span class="timer__count timer__count_hours">05</span>
      <span class="timer__units timer__units_hours">часов</span></p>
    <p class="timer__item timer__item_minutes">
      <span class="timer__count timer__count_minutes">12</span>
      <span class="timer__units timer__units_minutes">минут</span></p>
    <p class="timer__item timer__item_seconds" style="display: none;">
      <span class="timer__count timer__count_seconds">10</span>
      <span class="timer__units timer__units_seconds">секунд</span></p> 
  `);
}


const timer = deadline => {
  const heroText = document.querySelector('.hero__text');
  const timerItemDays = document.querySelector('.timer__item_days');
  const timerItemSeconds = document.querySelector('.timer__item_seconds');
  const timerCountDays = document.querySelector('.timer__count_days');
  const timerUnitsDays = document.querySelector('.timer__units_days');
  const timerCountHours = document.querySelector('.timer__count_hours');
  const timerUnitsHours = document.querySelector('.timer__units_hours');
  const timerCountMinutes = document.querySelector('.timer__count_minutes');
  const timerUnitsMinutes = document.querySelector('.timer__units_minutes');
  const timerCountSeconds = document.querySelector('.timer__count_seconds');
  const timerUnitsSeconds = document.querySelector('.timer__units_seconds');
  

  const setRightWord = (time, timeUnit) => {
    const words = {
      hours: ['часов', 'час', 'часа'],
      minutes: ['минут', 'минута', 'минуты'],
      days: ['дней', 'день', 'дня'],
      seconds: ['секунд', 'секунда', 'секунды'],
    };

    let word;

    if (time === 1 || (time > 20 && time % 10 === 1)) word = words[timeUnit][1];
    else if ((time < 10 || time > 20) && (time % 10 >= 2 && time % 10 <= 4)) word = words[timeUnit][2];
    else word = words[timeUnit][0];

    return word;
  }

  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = Date.now();
    const timeRemaining = dateStop - dateNow;

    const seconds = Math.floor(timeRemaining / 1000 % 60);
    const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
    const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

    const fseconds = seconds < 10 ? '0' + seconds : seconds;
    const fminutes = minutes < 10 ? '0' + minutes : minutes;
    const fhours = hours < 10 ? '0' + hours : hours;

    const secondWord = setRightWord(seconds, 'seconds');
    const hourWord = setRightWord(hours, 'hours');
    const minuteWord = setRightWord(minutes, 'minutes');
    const dayWord = setRightWord(days, 'days');

    return {timeRemaining, days, fhours, fminutes, hourWord, minuteWord, dayWord, fseconds, secondWord};
  }

  const update = () => {
    const {timeRemaining, days, fhours, fminutes, hourWord, minuteWord, dayWord, fseconds, secondWord} = getTimeRemaining();

    timerCountDays.textContent = days;
    timerCountHours.textContent = fhours;
    timerCountMinutes.textContent = fminutes;

    timerUnitsDays.textContent = dayWord;
    timerUnitsHours.textContent = hourWord;
    timerUnitsMinutes.textContent = minuteWord;

    if (timeRemaining < 24 * 60 * 60 * 1000) {
      timerItemDays.style.display = 'none';
      timerItemSeconds.style.display = 'flex';
      timerCountSeconds.textContent = fseconds;
      timerUnitsSeconds.textContent = secondWord;
    }

    const intervalId = setTimeout(update, 1000);

    if (timeRemaining <= 0) {
      clearTimeout(intervalId);
      heroText.style.display = 'none';
      heroTimer.style.display = 'none';
    }
  }
  
  update();
}


if (dataTimer) {
  renderPage();
  timer(deadline);
}


