const city = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorDisplay = document.querySelector(".error");

const apiKey = "76da49e69bb8e4356fe46059b8daaab0";

async function checkWeather(city){
    try{
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`

    if(city == ""){
        errorDisplay.style.display = "block";
        hideError();
        return;
    }

    const response = await fetch(apiUrl);

    if(response.status == 404){
        errorDisplay.style.display = "block";
        hideError();
        return;
    }

    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = (data.main.temp).toFixed(1) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
    }else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
    }else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
    }

    errorDisplay.style.display = "none";
    document.querySelector(".weather").style.display = "block";
    }catch(error){
        errorDisplay.style.display = "block";
        hideError();
    }
}

searchButton.addEventListener("click", () =>{
    checkWeather(city.value);
});

function hideError(){
    setTimeout(() => {
        errorDisplay.style.display = "none";
    },5000)
}