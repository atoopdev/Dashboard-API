getBackgroundImage()

// async function getBackgroundImage(){
//     let response = await fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature`, {method: "GET"})
//     let data = await response.json()
//     console.log("Image data: ", data)
//     let backgroundEL = document.getElementById("bg-img")

//     backgroundEL.innerHTML = `<img src = "${data.urls[0]}" alt = "${data.alt_description}" />`
    
// }

function getBackgroundImage(){
    fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature`, {method: "GET"})
    .then(response => response.json())
    .then(data=>{
        console.log(data)
        
        let backgroundEL = document.getElementById("bg-img")
        backgroundEL.style.backgroundImage = `url('${data.urls.regular}')`

        // backgroundEL.innerHTML = `<img src= "${data.urls.regular}" alt="${data.alt_description}" />`
    })
}