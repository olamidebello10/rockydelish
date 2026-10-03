import { restaurantFoods } from "./food-data.js";


// ==================================================
// GET URL PARAMETERS
// ==================================================

const params =
    new URLSearchParams(window.location.search);


const restaurantId =
    Number(params.get("id"));


const restaurantImage =
    params.get("image");


// ==================================================
// ELEMENTS
// ==================================================

const restaurantImageElement =
    document.getElementById("restaurantImage");


const restaurantName =
    document.getElementById("restaurantName");


const restaurantLocation =
    document.getElementById("restaurantLocation");


const restaurantDescription =
    document.getElementById("restaurantDescription");


const restaurantFoodContainer =
    document.getElementById("restaurantFoodContainer");


// ==================================================
// RESTAURANT INFORMATION
// ==================================================

const restaurants = {

    1: {
        name: "Chicken Republic",
        location: "Ibadan",
        description:
            "Enjoy delicious chicken meals, burgers, rice and more from Chicken Republic."
    },

    2: {
        name: "FoodCo",
        location: "Ibadan",
        description:
            "Enjoy freshly prepared meals and delicious food from FoodCo."
    },

    3: {
        name: "KFC Nigeria",
        location: "Ibadan",
        description:
            "Enjoy crispy chicken, burgers, wings and tasty sides from KFC."
    },

    4: {
        name: "Bukka Hut",
        location: "Ibadan",
        description:
            "Enjoy delicious Nigerian meals and freshly prepared local dishes."
    },

    5: {
        name: "Mr Bigg's",
        location: "Ibadan",
        description:
            "Enjoy delicious pastries, burgers, rice meals and more."
    },

    6: {
        name: "Domino's Pizza",
        location: "Ibadan",
        description:
            "Enjoy freshly baked pizzas, chicken wings and delicious sides."
    },

    7: {
        name: "Item7GO",
        location: "Ibadan",
        description:
            "Enjoy tasty meals prepared fresh and delivered with great service."
    },

    8: {
        name: "Tastee Fried Chicken",
        location: "Ibadan",
        description:
            "Enjoy crispy fried chicken, burgers and delicious rice meals."
    },

    9: {
        name: "The Place",
        location: "Ibadan",
        description:
            "Enjoy delicious meals, grilled food, rice and refreshing drinks."
    },

    10: {
        name: "Kilimanjaro",
        location: "Ibadan",
        description:
            "Enjoy delicious African meals, rice dishes and chicken."
    },

    11: {
        name: "Sweet Sensation",
        location: "Ibadan",
        description:
            "Enjoy cakes, pastries, desserts and delicious meals."
    },

    12: {
        name: "Tantalizers",
        location: "Ibadan",
        description:
            "Enjoy delicious Nigerian meals, chicken, rice and other tasty dishes."
    },

    13: {
        name: "Stone Café",
        location: "Ibadan",
        description:
            "Enjoy delicious meals, burgers, pizza and freshly prepared food."
    },

    14: {
        name: "Saire",
        location: "Ibadan",
        description:
            "Enjoy freshly prepared Nigerian meals and delicious food."
    },

    15: {
        name: "Chef Kabs",
        location: "Ibadan",
        description:
            "Enjoy specially prepared meals and delicious Nigerian dishes."
    },

    16: {
        name: "Black OX Bistro",
        location: "Ibadan",
        description:
            "Enjoy premium burgers, grilled meals and delicious food."
    },

    17: {
        name: "The Sea Pride",
        location: "Ibadan",
        description:
            "Enjoy delicious meals and freshly prepared dishes."
    },

    18: {
        name: "Hans & René",
        location: "Ibadan",
        description:
            "Enjoy delicious ice cream, drinks and tasty treats."
    },

    19: {
        name: "Cold Stone Creamery",
        location: "Ibadan",
        description:
            "Enjoy creamy ice cream and delicious dessert combinations."
    },

    20: {
        name: "Krispy Kreme",
        location: "Ibadan",
        description:
            "Enjoy freshly prepared doughnuts, desserts and refreshing drinks."
    }

};


// ==================================================
// CHECK RESTAURANT
// ==================================================

const selectedRestaurant =
    restaurants[restaurantId];


if (!selectedRestaurant) {

    restaurantFoodContainer.innerHTML = `

        <div class="empty-food">

            <h2>
                Restaurant not found
            </h2>

            <p>
                The restaurant you are looking for does not exist.
            </p>

            <a href="restaurants.html">
                Back to Restaurants
            </a>

        </div>

    `;

    throw new Error("Restaurant not found");

}


// ==================================================
// DISPLAY RESTAURANT INFORMATION
// ==================================================

restaurantName.textContent =
    selectedRestaurant.name;


restaurantLocation.textContent =
    selectedRestaurant.location;


restaurantDescription.textContent =
    selectedRestaurant.description;


// ==================================================
// DISPLAY RESTAURANT IMAGE
// ==================================================

if (
    restaurantImageElement &&
    restaurantImage
) {

    restaurantImageElement.src =
        restaurantImage;

    restaurantImageElement.alt =
        selectedRestaurant.name;

}


// ==================================================
// GET RESTAURANT FOODS
// ==================================================

const foods =
    restaurantFoods[restaurantId] || [];


// ==================================================
// CART
// ==================================================

const CART_KEY =
    "rockydelishCart";


function getCart() {

    return JSON.parse(
        localStorage.getItem(CART_KEY) || "[]"
    );

}


function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

    updateCartCount();

}


// ==================================================
// UPDATE CART COUNT
// ==================================================

function updateCartCount() {

    const cart =
        getCart();


    const total =
        cart.reduce(
            (sum, item) =>
                sum + Number(item.quantity || 0),
            0
        );


    document
        .querySelectorAll(".cart-count")
        .forEach(element => {

            element.textContent =
                total;

        });

}


// ==================================================
// GET FOOD QUANTITY
// ==================================================

function getFoodQuantity(foodId) {

    const cart =
        getCart();


    const item =
        cart.find(
            item =>
                String(item.id) ===
                String(foodId)
        );


    return item
        ? Number(item.quantity || 0)
        : 0;

}


// ==================================================
// DISPLAY FOODS
// ==================================================

function displayFoods() {

    restaurantFoodContainer.innerHTML = "";


    // NO FOOD

    if (foods.length === 0) {

        restaurantFoodContainer.innerHTML = `

            <div class="empty-food">

                <h2>
                    No food available
                </h2>

                <p>
                    There are currently no food items
                    available from this restaurant.
                </p>

            </div>

        `;

        return;

    }


    // DISPLAY EACH FOOD

    foods.forEach(food => {


        const quantity =
            getFoodQuantity(food.id);


        const foodCard =
            document.createElement("div");


        foodCard.className =
            "restaurant-food-card";


        foodCard.innerHTML = `

            <div class="food-card-image">

                <img
                    src="${food.image}"
                    alt="${food.name}"
                >

            </div>


            <div class="food-card-content">

                <h3>
                    ${food.name}
                </h3>


                <p class="food-description">
                    ${food.description}
                </p>


                <div class="food-card-bottom">

                    <strong class="food-price">
                        ₦${Number(food.price).toLocaleString()}
                    </strong>


                    <div class="quantity-control">

                        <button
                            type="button"
                            class="quantity-btn decrease-btn"
                            data-id="${food.id}"
                            aria-label="Decrease ${food.name} quantity"
                        >
                            −
                        </button>


                        <span
                            class="quantity-number"
                            id="quantity-${food.id}"
                        >
                            ${quantity}
                        </span>


                        <button
                            type="button"
                            class="quantity-btn increase-btn"
                            data-id="${food.id}"
                            aria-label="Increase ${food.name} quantity"
                        >
                            +
                        </button>

                    </div>

                </div>


                <a
                    href="product-details.html?restaurantId=${restaurantId}&foodId=${encodeURIComponent(food.id)}"
                    class="food-details-btn"
                >
                    View Details
                </a>

            </div>

        `;


        restaurantFoodContainer.appendChild(
            foodCard
        );

    });


    // ==================================================
    // INCREASE QUANTITY
    // ==================================================

    document
        .querySelectorAll(".increase-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {


                    const foodId =
                        button.dataset.id;


                    const food =
                        foods.find(
                            item =>
                                String(item.id) ===
                                String(foodId)
                        );


                    if (!food) {
                        return;
                    }


                    const cart =
                        getCart();


                    const existingItem =
                        cart.find(
                            item =>
                                String(item.id) ===
                                String(foodId)
                        );


                    if (existingItem) {

                        existingItem.quantity =
                            Number(
                                existingItem.quantity || 0
                            ) + 1;

                    } else {

                        cart.push({

                            ...food,

                            quantity: 1

                        });

                    }


                    saveCart(cart);


                    updateFoodQuantity(
                        foodId
                    );

                }
            );

        });


    // ==================================================
    // DECREASE QUANTITY
    // ==================================================

    document
        .querySelectorAll(".decrease-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {


                    const foodId =
                        button.dataset.id;


                    const cart =
                        getCart();


                    const itemIndex =
                        cart.findIndex(
                            item =>
                                String(item.id) ===
                                String(foodId)
                        );


                    if (itemIndex === -1) {
                        return;
                    }


                    cart[itemIndex].quantity =
                        Number(
                            cart[itemIndex].quantity || 0
                        ) - 1;


                    if (
                        cart[itemIndex].quantity <= 0
                    ) {

                        cart.splice(
                            itemIndex,
                            1
                        );

                    }


                    saveCart(cart);


                    updateFoodQuantity(
                        foodId
                    );

                }
            );

        });

}


// ==================================================
// UPDATE FOOD QUANTITY
// ==================================================

function updateFoodQuantity(foodId) {

    const quantityElement =
        document.getElementById(
            `quantity-${foodId}`
        );


    if (!quantityElement) {
        return;
    }


    quantityElement.textContent =
        getFoodQuantity(foodId);

}


// ==================================================
// MOBILE NAVIGATION
// ==================================================

const menuBtn =
    document.getElementById("menuBtn");


const navLinks =
    document.getElementById("navLinks");


if (
    menuBtn &&
    navLinks
) {

    menuBtn.addEventListener(
        "click",
        () => {


            const isOpen =
                navLinks.classList.toggle("show");


            menuBtn.setAttribute(
                "aria-expanded",
                isOpen
            );


            // Change icon

            const icon =
                menuBtn.querySelector("i");


            if (icon) {

                if (isOpen) {

                    icon.classList.remove(
                        "fa-bars"
                    );

                    icon.classList.add(
                        "fa-xmark"
                    );

                } else {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }
    );


    // CLOSE MENU WHEN A LINK IS CLICKED

    navLinks
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "show"
                    );


                    menuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    const icon =
                        menuBtn.querySelector("i");


                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }
            );

        });

}


// ==================================================
// START PAGE
// ==================================================

displayFoods();

updateCartCount();