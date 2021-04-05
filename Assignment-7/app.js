const searchInput=document.getElementById("searchbox");
const searchButton=document.getElementById("search-btn");

searchButton.addEventListener('click', (event)=>
{

event.preventDefault();
getWeather(searchInput.value);
searchInput.value='';

});

const getWeather=async (city)=>
{
    try{

        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=117a252d88fedacabc6eec68981f1c06`,
   
            {mode: 'cors'}
        );

        const weatherData= await response.json();
        console.log(weatherData);
        const{name}=weatherData;
        const{feels_like,humidity}=weatherData.main;
        const{main,icon}=weatherData.weather[0];
        document.querySelector("#location").innerText = "Weather in " + name;
        document.querySelector("#climate").innerText = main;
        document.querySelector("#temp-value").innerText = Math.round(feels_like-273);
        document.querySelector("#humidity").innerText = "Humidity : " + humidity;
        document.querySelector("#temp-icon").src ="http://openweathermap.org/img/wn/" +icon+ "@2x.png";
   
    }
catch(error)
{
    alert('city not found');
}

};

window.addEventListener("load" ,()=>{

let lon;
let lat;

if(navigator.geolocation)
{

    navigator.geolocation.getCurrentPosition((position)=>
    {

    
    lon=position.coords.longitude;
    lat=position.coords.latitude;
    const proxy="http://cors-anywhere.herokuapp.com/";

        const api=`${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=117a252d88fedacabc6eec68981f1c06`

        fetch(api).then((response)=>{

            return response.json();


        })

        .then (data =>
            {
                    const{name}=data;
                    const{feels_like,humidity}=data.main;
                    const{main,icon}=data.weather[0];
                    document.querySelector("#location").innerText = "Weather in " + name;
                    document.querySelector("#climate").innerText = main;
                    document.querySelector("#temp-value").innerText = Math.round(feels_like-273);
                    document.querySelector("#humidity").innerText = "Humidity :" + humidity;
                    document.querySelector("#temp-icon").src ="http://openweathermap.org/img/wn/" +icon+ "@2x.png";
                    console.log(data);

            })

}
    
    
    
    )}


})