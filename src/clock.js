'use strict';

const $clock = document.getElementById('clock-display');
const $date = document.getElementById('date-display');

const showDate = ($el, options) => {
    const date = new Date();
    $el.textContent = date.toLocaleString('uk-UA', options);
}

const initClock = () => {
    const clockOptions = { hour: 'numeric', minute: 'numeric' };
    const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    showDate($clock, clockOptions);
    showDate($date, dateOptions);
    setInterval(() => showDate($clock, clockOptions), 1000);
}

initClock();