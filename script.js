const temperatureField = document.querySelector('.temp_text');
const locationField = document.querySelector('.location');
const dateTimeField = document.querySelector('.date_time');
const conditionField = document.querySelector('.condition_text');
const weatherIcon = document.getElementById('weather_icon');

const searchField = document.querySelector(".search_area");
const form = document.querySelector('form');

form.addEventListener('submit', searchForLocation);

let target = 'Dhaka';

const fetchResults = async (location) => {
    try {
        let url = `https://api.weatherapi.com/v1/current.json?key=be4992a2db1143d48c7145844262505&q=${location}&aqi=no`;
        
        const res = await fetch(url);
        if(!res.ok) throw new Error('City not found');
        
        const data = await res.json();

        let locationName = data.location.name;
        let country = data.location.country;
        let time = data.location.localtime;
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;
        let iconUrl = data.current.condition.icon; // API থেকে আইকন ইউআরএল নিলাম

        updateDetails(temp, `${locationName}, ${country}`, time, condition, iconUrl);
    } catch (error) {
        alert("Please enter a valid location name!");
        console.error(error);
    }
};

function updateDetails(temp, locationName, time, condition, iconUrl) {
    // স্পেস ট্রিম করে ডেট এবং টাইম আলাদা করার নিরাপদ উপায় (RegEx)
    let parts = time.split(/\s+/);
    let splitDate = parts[0];
    let splitTime = parts[1];

    let currentDay = getDayName(new Date(splitDate).getDay());

    temperatureField.innerText = Math.round(temp) + "°C"; // দশমিক এড়াতে রাউন্ড ফিগার
    locationField.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${locationName}`;
    dateTimeField.innerText = `${currentDay}, ${splitDate} | ${splitTime}`;
    conditionField.innerText = condition;
    weatherIcon.src = `https:${iconUrl}`; // ডাইনামিক আইকন সেট
}

function searchForLocation(e) {
    e.preventDefault();
    if(searchField.value.trim() === "") return;
    target = searchField.value;
    fetchResults(target);
    searchField.value = ""; // সার্চ শেষে ইনপুট বক্স ক্লিয়ার করবে
}

fetchResults(target);

function getDayName(number) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[number] || '';
}