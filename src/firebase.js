import { initializeApp } from "firebase/app"
import {
    getFirestore, collection, onSnapshot, getDocs,
    addDoc, deleteDoc, doc,
    query, where,
    serverTimestamp
} from "firebase/firestore"

const zipContainer = document.querySelector(".zips")

const firebaseConfig = {
    apiKey: "AIzaSyBrF1jCqt730tB26UDu2j3qwG7VYwxB3bU",
    authDomain: "nakebase1.firebaseapp.com",
    projectId: "nakebase1",
    storageBucket: "nakebase1.appspot.com",
    messagingSenderId: "332885880742",
    appId: "1:332885880742:web:0e088a2194120de4556967"
};

// Init firebase app
initializeApp(firebaseConfig)

// Init services
const db = getFirestore()

// Collection reference
const colZip = collection(db, "zipcodes")

// Get collection data
// getDocs(colZip)
//     .then((snapshot) => {
//     })
//     .catch((err) => {
//         console.log(err.message)
//     })

// Real time data collection
onSnapshot(colZip, (snapshot) => {
    const fireZips = []
    const validZips = []
    zipContainer.innerHTML = ""

    snapshot.docs.forEach((zip) => {
        fireZips.push({...zip.data()})
    })
    for(let zips of fireZips){
        validZips.push(zips.code) 
    }

    console.log(fireZips)
    if(validZips.length > 0){
        for(let zip of validZips){
            zipContainer.innerHTML += `<p class="valid-zip">${zip} </p>`
        }
    } else {
        zipContainer.innerHTML = "No valid zip codes"
    }

    const form1 = document.getElementById("form1")

    form1.addEventListener("submit",(e) => {
        e.preventDefault()

        if(validZips.includes(form1.zip.value)){
            console.log("included")
        } else{
            console.log("not included")
        }
    })
})

// Adding documents
const addZipCode = document.querySelector(".add")

addZipCode.addEventListener("submit", (e) => {
    e.preventDefault()
    addDoc(colZip, {
        code: addZipCode.code.value,
        createdAt: serverTimestamp()
    }).then(() => {
        addZipCode.reset()
    })
})


// Deleting documents
const deleteZipCode = document.querySelector('.delete')
deleteZipCode.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'zipcodes', deleteZipCode.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteZipCode.reset()
    })
})





