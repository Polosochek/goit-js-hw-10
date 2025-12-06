// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const time = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

let userSelectedDate = null;

// Кнопка неактивна за замовчуванням
startBtn.disabled = true;

flatpickr(time, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    
    // Валідація дати
    if (userSelectedDate < new Date()) {
      window.alert("Please choose a date in the future");
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  }
});

// Обробка натискання на кнопку Start
startBtn.addEventListener('click', () => {
  const now = new Date();
  const timeDifference = userSelectedDate - now;

  if (timeDifference <= 0) {
    window.alert("Please choose a date in the future");
    startBtn.disabled = true;
    return;
  }

  startBtn.disabled = true;
  time.disabled = true;

  // Зворотний відлік
  const timerInterval = setInterval(() => {
    const currentTime = new Date();
    const timeLeft = userSelectedDate - currentTime;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      updateTimerDisplay(0, 0, 0, 0);
      startBtn.disabled = false;
      time.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);
});

// Функція для конвертування мілісекунд
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функція для оновлення дисплея таймера
function updateTimerDisplay(days, hours, minutes, seconds) {
  document.querySelector('[data-days]').textContent = String(days).padStart(2, '0');
  document.querySelector('[data-hours]').textContent = String(hours).padStart(2, '0');
  document.querySelector('[data-minutes]').textContent = String(minutes).padStart(2, '0');
  document.querySelector('[data-seconds]').textContent = String(seconds).padStart(2, '0');
}