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
    .then(response=>response.json())
    .then(data=>{
        console.log(`Name ${data.name } Current Price: ${data.market_data.current_price.usd}`)
        document.getElementById("crypto").innerHTML = `Cryptocurrency: ${data.name}<BR> Current Price: $${data.market_data.current_price.usd}`
    })
}