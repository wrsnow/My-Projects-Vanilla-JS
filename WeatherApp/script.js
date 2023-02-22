const currentTemp = document.querySelector("#currentTemp");
const minTemp = document.querySelector("#minTemp");
const maxTemp = document.querySelector("#maxTemp");
const currentLocation = document.querySelector("#location");
const weatherCondition = document.querySelector("#weatherCondition");
const weatherIcon = document.querySelector("#weatherIcon");
const humidityValue = document.querySelector("#humidityValue");
const pressureValue = document.querySelector("#pressureValue");

const getGeolocationBTN = document.querySelector("#get-location-btn");
const searchBTN = document.querySelector("#search-btn");
const cityName = document.querySelector("#city_name");

const countryFlagContainer = document.querySelector(".country-flag");
let isQuerySearchEnabled = true;
let queryInterval;

let popUpTimer;

const URL = "https://pond-judicious-fright.glitch.me/weather";

getGeolocationBTN.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
});

searchBTN.addEventListener("click", () => {
    let city = cityName.value;
    console.log(city);
    cityName.value = "";
    if (!city) {
        popUp("City name is required");
        // popUp("City name is required.");
        return;
    }
    if (isQuerySearchEnabled && city) {
        fetchByCityName(city).then((data) => displayData(data));
        popUp("Success!");
        disableSearch();
        return;
    } else {
        popUp("Must wait for 10 seconds between requests.");
        return;
    }
});

const successCallback = (position) => {
    const { latitude, longitude } = position.coords;
    if (isQuerySearchEnabled) {
        popUp("Success!");
        fetchByGeolocation(latitude, longitude).then((data) =>
            displayData(data)
        );
        disableSearch();
        return;
    }
    popUp("Must wait for 10 seconds between requests.");

    return;
};

const errorCallback = () => {
    popUp("Location permision failed.");
};

async function fetchByGeolocation(lat, long) {
    try {
        const res = await axios.post(URL + "/bygeolocation", {
            lat,
            long,
        });

        return res.data;
    } catch (error) {
        popUp(error.response.data.message);
        console.log(error);
    }
}

// async function fetchByCityName(city) {
//     console.log(city);
//     try {
//         const res = await axios.get(`${URL}/bycityname/${city}`);
//         return res.data;
//     } catch (error) {
//         popUp(error.response.data.message);
//         console.log(error);
//     }
// }
async function fetchByCityName(city) {
    try {
        const res = await axios.post(URL + "/bycityname", {
            city,
        });
        return res.data;
    } catch (error) {
        popUp(error.response.data.message);
        console.log(error);
    }
}

function disableSearch() {
    isQuerySearchEnabled = false;
    clearTimeout(queryInterval);
    queryInterval = setTimeout(() => {
        isQuerySearchEnabled = true;
    }, 10000);
    return;
}

function displayData(data) {
    const { temp, temp_min, temp_max, pressure, humidity, feels_like } =
        data.main;
    const { name } = data;
    const { description, icon } = data.weather[0];
    const { speed, deg } = data.wind;
    const { country } = data.sys;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

    currentTemp.textContent = Math.round(temp);
    minTemp.textContent = Math.round(temp_min);
    maxTemp.textContent = Math.round(temp_max);
    currentLocation.textContent = name;
    weatherCondition.textContent = description;
    weatherIcon.setAttribute("src", iconUrl);
    humidityValue.textContent = humidity + "%";
    pressureValue.textContent = pressure + " mb";

    fetchCountryFlag(country).then((data) =>
        countryFlagContainer.setAttribute("src", data)
    );
}

async function fetchCountryFlag(countryCode) {
    const res = await axios.get(
        `https://restcountries.com/v2/alpha?codes=${countryCode}`
    );

    return res.data[0].flags.svg;
}

////  FALLING SNOW FEATURE ////////////////////

// const flurryContainer = document.querySelector("#flurryContainer");
// let fallingSnow;

// fallingSnow = setInterval(() => {
//     const childrenCount = flurryContainer.children.length;
//     console.log(childrenCount);
//     generateSnow();
//     flurryContainer.children[childrenCount - 1].style.transform =
//         "translate(-800%, 1400%) rotate(0.8turn)";
//     flurryContainer.children[childrenCount - 1].style.opacity = "0";
// }, 140);

// function generateSnow() {
//     let snow = document.createElement("span");
//     snow.setAttribute("class", "snow");
//     snow.textContent = "❄";
//     snow.style.fontSize = `${randomFontSize()}px`;
//     snow.style.top = "-50px";
//     snow.style.left = `${randomX()}px`;
//     snow.style.transform = "translate(0%, 0%) rotate(0)";
//     snow.style.transition = "4s linear";
//     flurryContainer.appendChild(snow);

//     setTimeout(() => {
//         flurryContainer.children[0].remove();
//     }, 4100);
// }

// const randomY = () => {
//     return Math.floor(Math.random() * (400 - 100) + 100);
// };

// const randomX = () => {
//     return Math.floor(Math.random() * (800 - 0) + 0);
// };

// const randomFontSize = () => {
//     return Math.ceil(Math.random() * 28);
// };

function popUp(msg) {
    clearTimeout(popUpTimer);
    let notification = document.querySelector(".notification");
    notification.classList.add("active");
    notification.innerHTML = `<h1>${msg}</h1>`;
    popUpTimer = setTimeout(() => {
        notification.classList.remove("active");
    }, 2600);
}
