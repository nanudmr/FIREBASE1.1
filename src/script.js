const form1 = document.getElementById("form1")
const zipContainer = document.querySelector(".zips")

const validZips = ["21", "22", "23", "24"]

form1.addEventListener("submit",(e) => {
    e.preventDefault()

    if(validZips.includes(form1.zip.value)){
        console.log("included")
    } else{
        console.log("not included")
    }
})

if(validZips.length > 0){
    for(zip of validZips){
        zipContainer.innerHTML += `<p class="valid-zip">${zip} </p>`
    }
} else {
    zipContainer.innerHTML = "Empty string"
}
