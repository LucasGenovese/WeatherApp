const loading = document.getElementById("loader");
const mainContent = document.getElementById("main");
const tempLocation = document.getElementById("location")
const tempDisplay = document.getElementById("tempDisplay");
const tempIcon = document.getElementById("tempIcon");
const pressure = document.getElementById("pressure");
const humidity = document.getElementById("humidity");
const footer = document.querySelector("footer");

async function getTemp(){

    const locationResponse = await fetch('http://ip-api.com/json/', {mode: 'cors'});
    const locationData = await locationResponse.json();

    const weatherResponse = await fetch('https://api.openweathermap.org/data/2.5/weather?lat='+ locationData.lat + '&lon=' + locationData.lon + '&units=metric' + '&appid=a39226f81ca95577239d98ca71b6a45e', {mode: 'cors'})
    const weatherData = await weatherResponse.json();

    if (new Date().valueOf() / 1000 < weatherData.sys.sunset){
        document.body.style.backgroundColor = "#09B1EC";
        mainContent.classList.add("dayTheme");
    } else {
        document.body.style.backgroundColor = "#0f0f41";
        mainContent.classList.add("nightTheme");
    }

    tempLocation.innerHTML = weatherData.name + ', ' + locationData.country;
    tempDisplay.innerHTML = weatherData.main.temp + '°C';
    tempIcon.src = 'http://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png';
    pressure.innerHTML = 'Pressure: ' + weatherData.main.pressure + ' hPa';
    humidity.innerHTML = 'Humidity: ' + weatherData.main.humidity + '%';

    mainContent.classList.remove("hide");
    footer.classList.remove("hide");
    loading.remove();
}

getTemp();