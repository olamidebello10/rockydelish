/* ================================================= */
/* ================= FIREBASE ====================== */
/* ================================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";


import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


/* ================================================= */
/* ================= FIREBASE CONFIG =============== */
/* ================================================= */

const firebaseConfig = {

    apiKey: "AIzaSyBD-glXS6Z_xT-K8keF6cyuPcIPGIfQBVM",

    authDomain: "rockydelish.firebaseapp.com",

    projectId: "rockydelish",

    storageBucket: "rockydelish.firebasestorage.app",

    messagingSenderId: "39729425295",

    appId: "1:39729425295:web:76f637f53744af944479fa"

};


/* ================================================= */
/* ================= INITIALIZE FIREBASE =========== */
/* ================================================= */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


// ================= CART COUNT =================

function updateCartCount() {
    const cart = JSON.parse(
        localStorage.getItem("rockydelishCart") || "[]"
    );

    const totalQuantity = cart.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
    );

    document.querySelectorAll(".cart-count").forEach(count => {
        count.textContent = totalQuantity;
    });
}

// Run when Home page loads
updateCartCount();

// Update when returning to Home
window.addEventListener("pageshow", updateCartCount);

// Update if cart changes from another browser tab
window.addEventListener("storage", updateCartCount);

/* ================================================= */
/* ================= GET HTML ELEMENTS ============= */
/* ================================================= */

const authArea = document.getElementById("authArea");

const userArea = document.getElementById("userArea");

const userName = document.getElementById("userName");

const logoutBtn = document.getElementById("logoutBtn");


/* ================================================= */
/* ================= CHECK LOGIN STATUS ============= */
/* ================================================= */

onAuthStateChanged(auth, (user) => {

    if (user) {

        console.log("Logged in user:", user);


        /*
            Hide Login and Sign Up
        */

        authArea.classList.add("hidden");


        /*
            Show User Area
        */

        userArea.classList.remove("hidden");


        /*
            Get the user's full name
        */

        const fullName = user.displayName || "User";


        /*
            Get only the first name
        */

        const firstName = fullName.split(" ")[0];


        /*
            Display the first name
        */

        userName.textContent = firstName;

    }

    else {

        console.log("No user is logged in.");


        /*
            Show Login and Sign Up
        */

        authArea.classList.remove("hidden");


        /*
            Hide User Area
        */

        userArea.classList.add("hidden");

    }

});


/* ================================================= */
/* ================= LOGOUT ========================= */
/* ================================================= */

if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        try {

            await signOut(auth);


            if (typeof Swal !== "undefined") {

                await Swal.fire({

                    icon: "success",

                    title: "Logged Out",

                    text: "See you again at RockyDelish!",

                    confirmButtonColor: "#f97316"

                });

            }

        }

        catch (error) {

            console.log(error);


            if (typeof Swal !== "undefined") {

                Swal.fire({

                    icon: "error",

                    title: "Logout Failed",

                    text: error.message,

                    confirmButtonColor: "#f97316"

                });

            }

        }

    });

}


/* ================================================= */
/* ================= MOBILE MENU =================== */
/* ================================================= */

const menuBtn = document.getElementById("menuBtn");

const navLinks = document.getElementById("navLinks");


if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        /*
            Open or close the mobile menu
        */

        navLinks.classList.toggle("show");


        /*
            Get the menu icon
        */

        const icon = menuBtn.querySelector("i");


        /*
            Change hamburger to X
        */

        if (navLinks.classList.contains("show")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        }

        else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

}

// ================= POPULAR RESTAURANTS =================

const restaurants = [
    {
        name: "Chicken Republic",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHzq3Zm4oA312KTz-GNU08OOCxF3-f396n4dJPuagCZw&s=10"
    },

    {
        name: "Item7GO",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQygd1M8ALmLykEpLUOvZcdbEolOSMxKr-yRSwbNrIAQ&s=10"
    }

    ,

    {
        name: "KFC Nigeria",
        location: "Ibadan",
        image: "assets/restaurant3.jpg"
    },

    {
        name: "Domino's Pizza",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7-r8su3OT1PYck8pS4VSok9CSCGuYYSTOf4aJbTPluQ&s=10"
    },

    {
        name: "Kilimanjaro",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_NwKX4KcYNM3-5cEr6lQqEhld3toxuPSMQyl3Gqf8hg&s=10"
    },

    {
        name: "Mr Bigg's",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQye_OjHHYvrRjrZjGxi1jOkz5kRhvx6PC6gkFb3oP3jA&s=10"
    }
];


const restaurantsContainer =
    document.getElementById("restaurantsContainer");


restaurantsContainer.innerHTML = restaurants.map((restaurant) => {

    return `
        <a href="restaurants.html"
           class="restaurant-card">

            <div class="restaurant-image">
                <img
                    src="${restaurant.image}"
                    alt="${restaurant.name}"
                >
            </div>

            <div class="restaurant-info">

                <h3>${restaurant.name}</h3>

                <p>
                    <i class="fa-solid fa-location-dot"></i>
                    ${restaurant.location}
                </p>

            </div>

        </a>
    `;

}).join("");

// ================= ROCKYDELISH PROMOTION BUTTON =================

const promotionOrderBtn =
    document.getElementById("promotionOrderBtn");

if (promotionOrderBtn) {

    promotionOrderBtn.addEventListener("click", () => {

        window.location.href = "products.html";

    });

}
// ================= STATISTICS COUNT UP =================

const statNumbers = document.querySelectorAll(".stat-number");

const startCounting = () => {

    statNumbers.forEach((number) => {

        const target = Number(number.dataset.target);

        let currentNumber = 0;

        const duration = 2000;

        const increment = target / (duration / 20);

        const counter = setInterval(() => {

            currentNumber += increment;

            if (currentNumber >= target) {

                currentNumber = target;

                clearInterval(counter);
            }

            number.textContent =
                Math.floor(currentNumber).toLocaleString() + "+";

        }, 20);

    });

};


// Start counting when the section enters the screen

const statsSection = document.querySelector(".rockydelish-stats");

const statsObserver = new IntersectionObserver(
    (entries, observer) => {

        if (entries[0].isIntersecting) {

            startCounting();

            observer.unobserve(statsSection);
        }

    },
    {
        threshold: 0.3
    }
);


if (statsSection) {
    statsObserver.observe(statsSection);
}

/* =========================================
   HERO ORDER STATUS ANIMATION
========================================= */

const statusCards = [
    document.querySelector(".status-card-1"),
    document.querySelector(".status-card-2"),
    document.querySelector(".status-card-3")
];

const heroNumbers = [
    document.querySelector(".hero-number-1"),
    document.querySelector(".hero-number-2"),
    document.querySelector(".hero-number-3")
];

let currentStatus = 0;


function showHeroStatus(index) {

    statusCards.forEach((card, i) => {

        if (card) {
            card.classList.toggle("active", i === index);
        }

    });


    heroNumbers.forEach((number, i) => {

        if (number) {
            number.classList.toggle("active-number", i === index);
        }

    });

}


function nextHeroStatus() {

    currentStatus++;

    if (currentStatus >= statusCards.length) {
        currentStatus = 0;
    }

    showHeroStatus(currentStatus);
}


/* Start with first status */
showHeroStatus(0);


/* Change slowly */
setInterval(nextHeroStatus, 3500);