getBackgroundImage()
getCryptoData()


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
        // Current Price: $${data.market_data.current_price.usd}
    })
    // largely catches errors due to network connectivity
    .catch(err =>{
        console.error(err)
        document.getElementById("crypto").innerHTML = `<p>Bitcoin data down!</p>`
    })
}