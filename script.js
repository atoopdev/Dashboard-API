getBackgroundImage()
getCryptoData()
// keep time up to date
setInterval(displayTime, 1000)
getUserLocation()


function getBackgroundImage(){
    fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature`, {method: "GET"})
    .then(response => response.json())
    .then(data=>{
        // console.log(data)
        
        document.body.style.backgroundImage = `url('${data.urls.full}')`
        document.getElementById("photo-credit").innerHTML = `<a href="${data.links.html}">Photo credit: ${data.user.name}</a>`
    })
    // runs if any error thrown above
    .catch(err =>{
        console.error(err)
        // handle error here
        // add default background image
        document.body.style.backgroundImage = `url('./default.jpg')`
        document.getElementById("photo-credit").innerHTML = `<a href="https://unsplash.com/photos/x1w_Q78xNEY">Photo credit: Grant Ritchie</a>`
    })
}

function getCryptoData(){
    fetch(`https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`, {method: "GET"})
    .then(response=>
        {
            // sometimes promise comes back true but is actually an error. this scans for error codes 400-500 and manually throws and error if received
            if(!response.ok){
                throw Error("Something went wrong")
            }
            console.log(response.status)
            return response.json()
        })
    .then(data=>{
        // console.log(`Name ${data.name } Current Price: ${data.market_data.current_price.usd}`)
        // throw Error("Test error")
        document.getElementById("crypto-top").innerHTML = `<img id="crypto-img" src="${data.image.small}" alt="cypot currency image"> <span>${data.name}</span>`
        document.getElementById("crypto-bottom").innerHTML = `<span>Current Price: $${data.market_data.current_price.usd}</span>
        <span>24hr high: ${data.market_data.high_24h.usd}</span>
        <span>24hr low: ${data.market_data.low_24h.usd}</span>`
        // Current Price: $${data.market_data.current_price.usd}
    })
    // largely catches errors due to network connectivity
    .catch(err =>{
        console.error(err)
        document.getElementById("crypto").innerHTML = `<p>Bitcoin data down!</p>`
    })
}

function displayTime(){
    let today = new Date()
    
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
    let time = today.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'})
    // console.log(time)
    document.getElementById("time").innerText = time
}

// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
function getUserLocation(){
    if('geolocation' in navigator) {
        console.log("geolocation is available")
        /* geolocation is available */
      } else {
        console.log("geolocation IS NOT available")
        document.getElementById("weather-top").innerHTML = `<p class="error">Location services is currently turned off. Please check your privacy and security settings to re-enable.</p>`
        /* geolocation IS NOT available */
      }
      
      let options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
      };

      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, options)
}

function geoSuccess(pos){
    // pos.coords = whole object with more data
    let lat = pos.coords.latitude
    let long = pos.coords.longitude
    console.log(`Success! Lat: ${lat} Long: ${long}`)
    getWeather(lat, long)
    
}

function geoError(err){
    console.warn(`Error(${err.code}): ${err.message}`)
    document.getElementById("weather-top").innerHTML = `<p class="error">Location cannot be determined. Please check your privacy and security settings.</p>`
}

function getWeather(latitude, longitude){
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial`,{method:"GET"})
    .then(response=>
        {
            if(!response.ok){
                throw Error("Weather data not available")
            }
            return response.json()
        })
    .then(data =>{
        console.log("Weather data: ", data)
        let temp = Math.round(data.main.temp)
        document.getElementById("weather-top").innerHTML = `<img id="weather-icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon"><span>${temp}&#xb0; </span>`
        document.getElementById("weather-bottom").innerHTML = `<span>${data.name}</span>`
    })
    .catch(err=>{
        console.error(err)
        document.getElementById("weather-top").innerHTML = `<p class="error">Weather forecast error</p>`
    })
}