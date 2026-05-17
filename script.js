window.toggleSidebar = function(){

    let sidebar =
    document.querySelector(".sidebar");

    if(sidebar.style.display === "block"){

        sidebar.style.display = "none";

    }
    else{

        sidebar.style.display = "block";

    }

}

const btn =
document.getElementById('theme-btn');
btn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "YOUR_API_KEY",

  authDomain: "YOUR_AUTH_DOMAIN",

  projectId: "YOUR_PROJECT_ID",

  storageBucket: "YOUR_STORAGE_BUCKET",

  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",

  appId: "YOUR_APP_ID"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

console.log("Firestore Connected");

let currentRating = 0;

const stars = document.querySelectorAll(".star");

stars.forEach((star, index) => {

    star.addEventListener("click", function () {

        currentRating = index + 1;

        stars.forEach((s, i) => {

            if(i < currentRating){
                s.classList.add("active");
            }
            else{
                s.classList.remove("active");
            }

        });

        console.log("Rating:", currentRating);

    });

});

window.submitReview = async function(){

    let comment =
    document.getElementById("comment").value;

    console.log("Submitting Review");

    try{

        await addDoc(collection(db, "reviews"), {

            rating: currentRating,
            comment: comment,
            createdAt: new Date()

        });

        alert("Review Submitted!");

        console.log("Saved Successfully");

    }

    catch(error){

        console.log(error);

    }

}