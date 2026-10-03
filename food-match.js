import {
    auth,
    db
} from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// ========================================
// FOOD DATA
// ========================================

const foods = [

    {
        id: 1,
        name: "Classic Beef Burger",
        category: "burger",
        price: 4500,
        image: "assets/cat1.jpg"
    },

    {
        id: 2,
        name: "Cheese Burger",
        category: "burger",
        price: 5000,
        image: "assets/cat1.jpg"
    },

    {
        id: 3,
        name: "Chicken Burger",
        category: "burger",
        price: 4800,
        image: "assets/cat1.jpg"
    },

    {
        id: 4,
        name: "Pepperoni Pizza",
        category: "pizza",
        price: 7500,
        image: "assets/cat4.jpg"
    },

    {
        id: 5,
        name: "Chicken Pizza",
        category: "pizza",
        price: 8000,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeEj2k99QhgvsDEY_mW9N7cmLPUJsEkHyvPqR4cg4fTw&s=10"
    },

    {
        id: 6,
        name: "Margherita Pizza",
        category: "pizza",
        price: 6500,
         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcXBHXYTwnhMHWgjVI2Ke0ob_aRI-yH55TcCMI-j2cXA&s=10"
    },

    {
        id: 7,
        name: "Fried Chicken",
        category: "chicken",
        price: 5500,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8qbe-GLf1UM0SqoinENeQ5v4mzb_0G_-2jgi2Na3Sdw&s=10"
    },

    {
        id: 8,
        name: "Chicken Wings",
        category: "chicken",
        price: 5000,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGCVeWaI4B1oMLduAPEKiR-UJT5fN2mcJNKW_i-tODDw&s=10"
    },

    {
        id: 9,
        name: "Grilled Chicken",
        category: "chicken",
        price: 6500,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_4rb9TkYLQYrqnzS4ku7DXQPKqtvg0o2iZ9ieQjSnNQ&s=10"
    },

    {
        id: 10,
        name: "Jollof Rice",
        category: "rice",
        price: 4000,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfA0hO2I_gqRl32HQp_OoR0_9lKlxLyP4csrQb5xWZtw&s=10"
    },

    {
        id: 11,
        name: "Fried Rice",
        category: "rice",
        price: 4500,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpPrHcwLX-aQ3OR-2ddNLc1yIiqY9jgcbuAVXzf4op3w&s=10"
    },

    {
        id: 12,
        name: "Jollof Rice & Chicken",
        category: "rice",
        price: 6500,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEOJ57OSyw5HXyU09DAnKbEox6sNaj2P0HSheEJfkdCw&s=10"
    },

    {
        id: 13,
        name: "Chicken Shawarma",
        category: "shawarma",
        price: 4500,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQpFqTDQKdqr91eKkcYEx5h0-1SXZHElhIpiO0Psp5AA&s=10"
    },

    {
        id: 14,
        name: "Beef Shawarma",
        category: "shawarma",
        price: 5000,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBBoyirXWCiKVhoUZXjDjOouh0E4Ql_mYkNfqLZnoJTQ&s=10"
    },

    {
        id: 15,
        name: "Cheese Shawarma",
        category: "shawarma",
        price: 5500,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlAIbesW5QX-MJCAtt4gGefjsp-M6_iB7MNdIrmyBGjQ&s=10"
    },

    {
        id: 16,
        name: "Coca-Cola",
        category: "drinks",
        price: 1000,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFADpvkvS8NHmkUIKGXHiqBcylCSBot1fPhneiIUYKLg&s=10"
    },

    {
        id: 17,
        name: "Fresh Orange Juice",
        category: "drinks",
        price: 2500,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfKnohWE_iFSP3E5iDXUad635MlVu6OM8vPQKk0Y1CoQ&s=10"
    },

    {
        id: 18,
        name: "Mango Smoothie",
        category: "drinks",
        price: 3000,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFquhf3Eob6FZZVALuxkSkX_iElqSISJ5l5kwPiUXYNQ&s=10"
    },

    {
        id: 19,
        name: "Strawberry Smoothie",
        category: "drinks",
        price: 3000,
         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbiVZVgaE78qN1mQ0VFajbPM8LQns6Q-XXNdDc-HnvyA&s=10"
    },

    {
        id: 20,
        name: "Chocolate Milkshake",
        category: "drinks",
        price: 3500,
       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_l4JHzODUVtMPdfilEVHt2n9DpzDVzqSzZ0hZTG8tmQ&s=10"
    }

];


// ========================================
// STATE
// ========================================

let selectedMood = "";
let selectedBudget = "";
let selectedCategory = "";

let selectedFood = null;


// ========================================
// ELEMENTS
// ========================================

const moodChoices =
    document.querySelectorAll("#moodChoices .choice-card");

const budgetChoices =
    document.querySelectorAll("#budgetChoices .choice-card");

const categoryChoices =
    document.querySelectorAll("#categoryChoices .category-card");

const findMatchBtn =
    document.getElementById("findMatchBtn");

const surpriseBtn =
    document.getElementById("surpriseBtn");

const matchResult =
    document.getElementById("matchResult");

const resultImage =
    document.getElementById("resultImage");

const resultCategory =
    document.getElementById("resultCategory");

const resultName =
    document.getElementById("resultName");

const resultPrice =
    document.getElementById("resultPrice");

const resultReason =
    document.getElementById("resultReason");

const addResultBtn =
    document.getElementById("addResultBtn");

const cartCount =
    document.getElementById("cartCount");


// ========================================
// NAVBAR
// ========================================

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("show");

    });

}


// ========================================
// MOOD SELECTION
// ========================================

moodChoices.forEach((button) => {

    button.addEventListener("click", () => {

        moodChoices.forEach((item) => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedMood =
            button.dataset.value;

    });

});


// ========================================
// BUDGET SELECTION
// ========================================

budgetChoices.forEach((button) => {

    button.addEventListener("click", () => {

        budgetChoices.forEach((item) => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedBudget =
            Number(button.dataset.value);

    });

});


// ========================================
// CATEGORY SELECTION
// ========================================

categoryChoices.forEach((button) => {

    button.addEventListener("click", () => {

        categoryChoices.forEach((item) => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedCategory =
            button.dataset.value;

    });

});


// ========================================
// FIND MATCH
// ========================================

findMatchBtn.addEventListener("click", () => {

    if (!selectedMood) {

        Swal.fire({
            icon: "warning",
            title: "Choose your craving",
            text: "Tell us what you are craving first.",
            confirmButtonColor: "#fc8a06"
        });

        return;
    }


    if (!selectedBudget) {

        Swal.fire({
            icon: "warning",
            title: "Choose your budget",
            text: "Select your budget before continuing.",
            confirmButtonColor: "#fc8a06"
        });

        return;
    }


    if (!selectedCategory) {

        Swal.fire({
            icon: "warning",
            title: "Choose a food category",
            text: "Select what you feel like eating.",
            confirmButtonColor: "#fc8a06"
        });

        return;
    }


    findFoodMatch();

});


// ========================================
// FIND FOOD
// ========================================

function findFoodMatch() {

    let possibleFoods =
        foods.filter((food) => {

            return (
                food.category === selectedCategory &&
                food.price <= selectedBudget
            );

        });


    if (possibleFoods.length === 0) {

        Swal.fire({
            icon: "info",
            title: "No exact match",
            text: "We couldn't find an exact match within your budget. Try a higher budget.",
            confirmButtonColor: "#fc8a06"
        });

        return;
    }


    // Mood preference

    if (selectedMood === "drink") {

        possibleFoods =
            possibleFoods.filter(
                food => food.category === "drinks"
            );

    }


    // Pick random food from available matches

    selectedFood =
        possibleFoods[
            Math.floor(
                Math.random() * possibleFoods.length
            )
        ];


    showResult(
        selectedFood,
        selectedMood
    );

}


// ========================================
// SHOW RESULT
// ========================================

function showResult(food, mood) {

    resultImage.src = food.image;

    resultCategory.textContent =
        food.category;

    resultName.textContent =
        food.name;

    resultPrice.textContent =
        `₦${food.price.toLocaleString()}`;


    let reason =
        "This meal fits your preferences and budget.";


    if (mood === "hungry") {

        reason =
            "You said you're very hungry, so we picked a filling option that fits your budget.";

    }

    else if (mood === "light") {

        reason =
            "You wanted something light, so we selected a simple option within your budget.";

    }

    else if (mood === "spicy") {

        reason =
            "You said you wanted something exciting, so this meal is your RockyDelish match.";

    }

    else if (mood === "sweet") {

        reason =
            "You're in the mood for a treat, so we found something delicious within your budget.";

    }

    else if (mood === "drink") {

        reason =
            "You wanted something refreshing, so we found a drink that fits your budget.";

    }


    resultReason.textContent = reason;


    matchResult.classList.add("show");


    matchResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


// ========================================
// SURPRISE ME
// ========================================

surpriseBtn.addEventListener("click", () => {

    const randomFood =
        foods[
            Math.floor(
                Math.random() * foods.length
            )
        ];


    selectedFood = randomFood;


    showResult(
        randomFood,
        "surprise"
    );

});


// ========================================
// ADD TO CART
// ========================================

addResultBtn.addEventListener("click", () => {

    if (!selectedFood) return;


    let cart =
        JSON.parse(
            localStorage.getItem("rockydelishCart")
        ) || [];


    const existingItem =
        cart.find(
            item =>
                String(item.id) ===
                String(selectedFood.id)
        );


    if (existingItem) {

        existingItem.quantity =
            (existingItem.quantity || 1) + 1;

    }

    else {

        cart.push({
            ...selectedFood,
            quantity: 1
        });

    }


    localStorage.setItem(
        "rockydelishCart",
        JSON.stringify(cart)
    );


    updateCartCount();


    Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: `${selectedFood.name} has been added to your cart.`,
        showCancelButton: true,
        confirmButtonText: "Go to Cart",
        cancelButtonText: "Continue Shopping",
        confirmButtonColor: "#fc8a06",
        cancelButtonColor: "#071426"
    }).then((result) => {

        if (result.isConfirmed) {

            window.location.href =
                "cart.html";

        }

    });

});


// ========================================
// CART COUNT
// ========================================

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("rockydelishCart")
        ) || [];


    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total + Number(item.quantity || 1),
            0
        );


    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }

}


updateCartCount();