const newYear = "2024-01-01";
const secondsElement = document.querySelector('#seconds');
const minutesElement = document.querySelector('#minutes');
const hoursElement = document.querySelector('#hours');
const daysElement = document.querySelector('#days');

function countDown() {
    const newYearDate = new Date(newYear);
    const currentDate = new Date();
    const exactDate = (newYearDate - currentDate) / 1000;
    const days = Math.floor(exactDate / 3600 / 24);
    const hours = Math.floor((exactDate / 3600) % 24);
    const minutes = Math.floor((exactDate / 60) % 60);
    const seconds = Math.floor(exactDate % 60);
    secondsElement.textContent = seconds;
    minutesElement.textContent = minutes;
    hoursElement.textContent = hours;
    daysElement.textContent = days;   
}
setInterval(countDown, 1000);