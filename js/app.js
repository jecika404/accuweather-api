const cityForm = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forcast = new Forcast();

const updataUI = (data) => {
    const { cityDetails, weather} = data;

    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;


    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = null;
    if(weather.IsDayTime) {
        timeSrc = 'img/day.svg';
    }else {
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);

    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};

cityForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    forcast.updataCity(city)
        .then(data => updataUI(data))
        .catch(err => console.log(err));

        localStorage.setItem('city', city);
});

if(localStorage.getItem('city')) {
    forcast.updataCity(localStorage.getItem('city'))
        .then(data => {
            updataUI(data)
        }).catch(err => console.log(err));
}

