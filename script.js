getBackgroundImage()
getCryptoData()
displayTime()


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
    let hours = today.getHours()
    let midday = "";

    if(hours>12){
        hours-=12
        midday = "PM"
    }else{
        midday = "AM"
    }
    // https://bobbyhadz.com/blog/javascript-get-minutes-with-leading-zero
    // if already 2 digit will not pad with 0
    let minutes = String(today.getMinutes()).padStart(2,'0')

    let time = `${hours}:${minutes}${midday}`
    console.log(time)
    document.getElementById("time").innerText = time
}