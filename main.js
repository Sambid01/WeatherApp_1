const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description");
const locationElement = document.querySelector(".location p");

const spanClass = document.querySelector(".spanClass")

const key = "32c00f94785b9955d05d2f292fb16843";
const kelvin = 273;

if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition (setPosition, showError);
}
else{
    console.log("Nothing")
    //notificationElement.innerHTML.style.display = "block";
    // notificationElement.innerHTML = "<p>Brouser doesn't Support Geolocation</p>"
}


function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude,longitude);


    console.log(position)
    console.log(latitude, longitude)  
}
//console.log(notificationElement.innerHTML)

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`;
    console.log(notificationElement.innerHTML)
}


function getWeather(latitude,longitude){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`)
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        const temp_value = data['main']['temp'];
        const desc_value = data['weather']['0']['description'];
        const city_value = data.name;
        const country_value = data.sys.country;
        const icon_value = data['weather']['0']['icon']


        let cel = Math.floor(temp_value-kelvin)
        
        tempElement.innerHTML =`<p>${cel}° <span>C</span></p>`;
        descElement.innerHTML = `<p>${desc_value}</p>`
        locationElement.innerHTML = `<p>${city_value} ${country_value}</p>`
        iconElement.innerHTML = `<img src="icons/${icon_value}.png"/>`

        
        console.log(cel)

      


        function celsiusToFrah (temperature){
            return (temperature*9/5)+32;
        }

        let a = 'celsius'
        tempElement.addEventListener('click',function(){
            const fah = Math.floor((cel*9/5)+32)
            
            if (a == "celsius"){
                tempElement.innerHTML = `${fah}°<span>F</span>`
                a = "faherinit";
            }
            else{
                tempElement.innerHTML = `${cel}°<span>C</span>`
                a = "celsius";
            }

        })
       



    })
}


