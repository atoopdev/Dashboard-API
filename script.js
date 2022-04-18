getBackgroundImage()



function getBackgroundImage(){
    fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature`, {method: "GET"})
    .then(response => response.json())
    .then(data=>{
        console.log(data)
        
        document.body.style.backgroundImage = `url('${data.urls.full}')`
        document.body.innerHTML = `<p id="photo-credit">Photo credit: ${data.user.name}</p>`
    })
}