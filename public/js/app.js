const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const city_name = document.querySelector('#city-name')
const app_humidity = document.querySelector('#app-humidity')
const time = document.querySelector('#time')
const temp = document.querySelector('#temp')
const wind_speed = document.querySelector('#wind-speed')
const clouds = document.querySelector('#clouds')
const visibility = document.querySelector('#visibility')
const sunrise = document.querySelector('#sunrise')
const sunset = document.querySelector('#sunset')


const temp_1 = document.querySelector('#temp-1')
const temp_2 = document.querySelector('#temp-2')
const temp_3 = document.querySelector('#temp-3')
const temp_4 = document.querySelector('#temp-4')
const temp_5 = document.querySelector('#temp-5')
const temp_6 = document.querySelector('#temp-6')
const temp_7 = document.querySelector('#temp-7')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading weather...'
    messageTwo.textContent = ''

    //fetching weather
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {

                messageOne.textContent = ''
                // messageTwo.textContent = data.location


                //Setting up values
                city_name.textContent = data.location.timezone

                const current_time = new Date((data.location.current.dt + data.location.timezone_offset) * 1000)
                time.textContent = current_time.toUTCString().slice(17, 29)
                temp.textContent = data.location.current.temp + '°C'

                wind_speed.textContent = data.location.current.wind_speed + ' m/sec'
                app_humidity.textContent = data.location.current.humidity + ' %'

                clouds.textContent = data.location.current.clouds + ' %'
                visibility.textContent = data.location.current.visibility + ' m'

                const sunrise_time = new Date((data.location.current.sunrise + data.location.timezone_offset) * 1000)
                const sunset_time = new Date((data.location.current.sunset + data.location.timezone_offset) * 1000)

                sunrise.textContent = sunrise_time.toUTCString().slice(17, 29)
                sunset.textContent = sunset_time.toUTCString().slice(17, 29)

                // Weather main and desc
                const weather_main = document.querySelector('#weather-main')
                const weather_desc = document.querySelector('#weather-desc')
                console.log()

                weather_main.textContent = data.location.current.weather[0].main
                weather_desc.textContent = data.location.current.weather[0].description
                const main_icon = data.location.current.weather[0].icon

                const head_icon = main_icon
                var iconurl = "http://openweathermap.org/img/w/" + head_icon + ".png";
                $('#main-icon').attr('src', iconurl);

                // Daily icons vatiables
                const day1_icon = data.location.daily[1].weather[0].icon
                const day2_icon = data.location.daily[2].weather[0].icon
                const day3_icon = data.location.daily[3].weather[0].icon
                const day4_icon = data.location.daily[4].weather[0].icon
                const day5_icon = data.location.daily[5].weather[0].icon
                const day6_icon = data.location.daily[6].weather[0].icon
                const day7_icon = data.location.daily[7].weather[0].icon


                // Setting Up daily icons
                const iconcode_1 = day1_icon
                var iconurl = "http://openweathermap.org/img/w/" + iconcode_1 + ".png";
                $('#wicon-1').attr('src', iconurl);

                const iconcode_2 = day2_icon
                var iconurl = "http://openweathermap.org/img/w/" + iconcode_2 + ".png";
                $('#wicon-2').attr('src', iconurl);

                const iconcode_3 = day3_icon
                var iconurl = "http://openweathermap.org/img/w/" + iconcode_3 + ".png";
                $('#wicon-3').attr('src', iconurl);

                const iconcode_4 = day4_icon
                var iconurl = "http://openweathermap.org/img/w/" + iconcode_4 + ".png";
                $('#wicon-4').attr('src', iconurl);

                const iconcode_5 = day5_icon
                var iconurl = "http://openweathermap.org/img/w/" + iconcode_5 + ".png";
                $('#wicon-5').attr('src', iconurl);

                const iconcode_6 = day6_icon
                var iconurl = "http://openweathermap.org/img/w/" + iconcode_6 + ".png";
                $('#wicon-6').attr('src', iconurl);

                const iconcode_7 = day7_icon
                var iconurl = "http://openweathermap.org/img/w/" + iconcode_7 + ".png";
                $('#wicon-7').attr('src', iconurl);

                //7 Days forecast values 
                temp_1.textContent = data.location.daily[1].temp.day + ' °C'
                temp_2.textContent = data.location.daily[2].temp.day + ' °C'
                temp_3.textContent = data.location.daily[3].temp.day + ' °C'
                temp_4.textContent = data.location.daily[4].temp.day + ' °C'
                temp_5.textContent = data.location.daily[5].temp.day + ' °C'
                temp_6.textContent = data.location.daily[6].temp.day + ' °C'
                temp_7.textContent = data.location.daily[7].temp.day + ' °C'

            }
        })

    })

})