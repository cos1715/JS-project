'use strict';

const dateIds = {
  clock: 'clock-display',
  date: 'date-display',
  weather: 'weather-display',
  forecast: 'div-forecast'
};

class DateClass {
  constructor (id) {
    this.$clock = document.getElementById(id.clock);
    this.$date = document.getElementById(id.date);
    this.$weather = document.getElementById(id.weather);
    this.$forecast = document.getElementById(id.forecast);
    this.timeFormat = 'uk-UA';
    this.clockOptions = { hour: 'numeric', minute: 'numeric' };
    this.dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };

    this.showDate(this.$clock, this.timeFormat, this.clockOptions);
    this.showDate(this.$date, this.timeFormat, this.dateOptions);
    navigator.geolocation.getCurrentPosition(
      position => this.getWeather(position, this.$weather),
      () => this.errorHandle(this.$forecast));
  }

  showDate ($el, timeFormat, options) {
    const date = new Date();

    $el.textContent = date.toLocaleString(timeFormat, options);
  }

  runClock () {
    const timeInterval = 1000;

    setInterval(() =>
      this.showDate(this.$clock, this.timeFormat, this.clockOptions), timeInterval);
  }

  createforecastElement (forecast) {
    const $section = document.createElement('section');

    $section.className = 'aside-section';
    $section.innerHTML = `
    <article class="section-article">
      <p>${forecast.date}</p>
      <p>high: ${forecast.high}°C</p>
      <p>low: ${forecast.low}°C</p>
    </article>`;
    return $section;
  }

  async getWeather (position, $el) {
    const crd = position.coords;
    const lat = crd.latitude;
    const long = crd.longitude;
    try {
      const response = await fetch(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20
    weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20
    geo.places(1)%20where%20text%3D"(${lat},${long})")and%20
    u%3D%27c%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`);
      const data = await response.json();
      const forecast = data.query.results.channel.item.forecast;

      forecast.forEach((item, i) => {
        if (i > 0 && i < 6) {
          this.$forecast.appendChild(this.createforecastElement(item));
        }
      });

      $el.textContent = `${data.query.results.channel.location.city} 
    ${data.query.results.channel.item.condition.temp}°C`;
      $el.classList.add('opacity-to-one');

    } catch (error) {
      this.errorHandle(this.$forecast);
    }


  }
  errorHandle ($forecast) {
    $forecast.textContent = 'Please Enable Geoloaction';
    $forecast.classList.add('forecast-err');
  }

}

const dateClass = new DateClass(dateIds);

dateClass.runClock();

module.exports = DateClass.getWeather;