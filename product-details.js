import { restaurantFoods } from "./food-data.js";


// =====================================================
// GET URL PARAMETERS
// =====================================================

const params = new URLSearchParams(window.location.search);

const oldId = params.get("id");
const restaurantId = params.get("restaurantId");
const foodId = params.get("foodId");


// =====================================================
// GET HTML ELEMENTS
// =====================================================

const foodImage = document.getElementById("foodImage");
const foodCategory = document.getElementById("foodCategory");
const foodName = document.getElementById("foodName");
const foodPrice = document.getElementById("foodPrice");
const foodDescription = document.getElementById("foodDescription");

const quantityNumber = document.getElementById("quantityNumber");

const increaseBtn = document.getElementById("increaseBtn");
const decreaseBtn = document.getElementById("decreaseBtn");

const addToCartBtn = document.getElementById("addToCartBtn");


// =====================================================
// CATALOG FOOD
// =====================================================

const catalogFoods = [

    {
        id: 1,
        name: "Classic Beef Burger",
        category: "burger",
        price: 4500,
        description: "Juicy beef burger with fresh vegetables and special sauce.",
        image: "assets/cat1.jpg"
    },

    {
        id: 2,
        name: "Cheese Burger",
        category: "burger",
        price: 5000,
        description: "Delicious beef burger topped with melted cheese.",
        image: "assets/cat1.jpg"
    },

    {
        id: 3,
        name: "Chicken Burger",
        category: "burger",
        price: 4800,
        description: "Crispy chicken burger with fresh lettuce and sauce.",
        image: "assets/cat1.jpg"
    },

    {
        id: 4,
        name: "Pepperoni Pizza",
        category: "pizza",
        price: 7500,
        description: "Hot pizza topped with pepperoni and melted cheese.",
        image: "assets/cat4.jpg"
    },

    {
        id: 5,
        name: "Chicken Pizza",
        category: "pizza",
        price: 8000,
        description: "Freshly baked pizza with delicious chicken toppings.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeEj2k99QhgvsDEY_mW9N7cmLPUJsEkHyvPqR4cg4fTw&s=10"
    },

    {
        id: 6,
        name: "Margherita Pizza",
        category: "pizza",
        price: 6500,
        description: "Classic pizza with tomato, cheese and herbs.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcXBHXYTwnhMHWgjVI2Ke0ob_aRI-yH55TcCMI-j2cXA&s=10"
    },

    {
        id: 7,
        name: "Fried Chicken",
        category: "chicken",
        price: 5500,
        description: "Crispy golden fried chicken.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8qbe-GLf1UM0SqoinENeQ5v4mzb_0G_-2jgi2Na3Sdw&s=10"
    },

    {
        id: 8,
        name: "Chicken Wings",
        category: "chicken",
        price: 5000,
        description: "Crispy and spicy chicken wings.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGCVeWaI4B1oMLduAPEKiR-UJT5fN2mcJNKW_i-tODDw&s=10"
    },

    {
        id: 9,
        name: "Grilled Chicken",
        category: "chicken",
        price: 6500,
        description: "Tender grilled chicken with delicious seasoning.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_4rb9TkYLQYrqnzS4ku7DXQPKqtvg0o2iZ9ieQjSnNQ&s=10"
    },

    {
        id: 10,
        name: "Jollof Rice",
        category: "rice",
        price: 4000,
        description: "Delicious Nigerian jollof rice.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfA0hO2I_gqRl32HQp_OoR0_9lKlxLyP4csrQb5xWZtw&s=10"
    },

    {
        id: 11,
        name: "Fried Rice",
        category: "rice",
        price: 4500,
        description: "Tasty fried rice served with vegetables.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpPrHcwLX-aQ3OR-2ddNLc1yIiqY9jgcbuAVXzf4op3w&s=10"
    },

    {
        id: 12,
        name: "Jollof Rice & Chicken",
        category: "rice",
        price: 6500,
        description: "Nigerian jollof rice served with juicy chicken.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEOJ57OSyw5HXyU09DAnKbEox6sNaj2P0HSheEJfkdCw&s=10"
    },

    {
        id: 13,
        name: "Chicken Shawarma",
        category: "shawarma",
        price: 4500,
        description: "Loaded chicken shawarma with fresh vegetables.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQpFqTDQKdqr91eKkcYEx5h0-1SXZHElhIpiO0Psp5AA&s=10"
    },

    {
        id: 14,
        name: "Beef Shawarma",
        category: "shawarma",
        price: 5000,
        description: "Delicious beef shawarma with special sauce.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBBoyirXWCiKVhoUZXjDjOouh0E4Ql_mYkNfqLZnoJTQ&s=10"
    },

    {
        id: 15,
        name: "Cheese Shawarma",
        category: "shawarma",
        price: 5500,
        description: "Shawarma filled with beef, vegetables and cheese.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlAIbesW5QX-MJCAtt4gGefjsp-M6_iB7MNdIrmyBGjQ&s=10"
    },

    {
        id: 16,
        name: "Coca-Cola",
        category: "drinks",
        price: 1000,
        description: "Cold refreshing Coca-Cola.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFADpvkvS8NHmkUIKGXHiqBcylCSBot1fPhneiIUYKLg&s=10"
    },

    {
        id: 17,
        name: "Fresh Orange Juice",
        category: "drinks",
        price: 2500,
        description: "Freshly prepared orange juice.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfKnohWE_iFSP3E5iDXUad635MlVu6OM8vPQKk0Y1CoQ&s=10"
    },

    {
        id: 18,
        name: "Mango Smoothie",
        category: "drinks",
        price: 3000,
        description: "Creamy and refreshing mango smoothie.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFquhf3Eob6FZZVALuxkSkX_iElqSISJ5l5kwPiUXYNQ&s=10"
    },

    {
        id: 19,
        name: "Strawberry Smoothie",
        category: "drinks",
        price: 3000,
        description: "Fresh strawberry smoothie.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbiVZVgaE78qN1mQ0VFajbPM8LQns6Q-XXNdDc-HnvyA&s=10"
    },

    {
        id: 20,
        name: "Chocolate Milkshake",
        category: "drinks",
        price: 3500,
        description: "Creamy chocolate milkshake.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_l4JHzODUVtMPdfilEVHt2n9DpzDVzqSzZ0hZTG8tmQ&s=10"
    }

];


// =====================================================
// FIND SELECTED FOOD
// =====================================================

let selectedFood = null;


// Restaurant food
if (restaurantId && foodId) {

    const restaurantFoodsList =
        restaurantFoods[Number(restaurantId)] || [];

    selectedFood = restaurantFoodsList.find(
        food => String(food.id) === String(foodId)
    );
}


// Normal catalog food
if (!selectedFood && oldId) {

    selectedFood = catalogFoods.find(
        food => String(food.id) === String(oldId)
    );
}


// =====================================================
// IF FOOD WAS NOT FOUND
// =====================================================

if (!selectedFood) {

    Swal.fire({
        icon: "error",
        title: "Food Not Found",
        text: "Sorry, this food could not be found.",
        confirmButtonColor: "#ff7a00"
    }).then(() => {
        window.location.href = "products.html";
    });

} else {

    // =================================================
    // DISPLAY FOOD
    // =================================================

    foodImage.src = selectedFood.image;
    foodImage.alt = selectedFood.name;

    foodCategory.textContent = selectedFood.category;

    foodName.textContent = selectedFood.name;

    foodPrice.textContent =
        `₦${selectedFood.price.toLocaleString()}`;

    foodDescription.textContent =
        selectedFood.description;

}


// =====================================================
// CART
// =====================================================

const CART_KEY = "rockydelishCart";


function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem(CART_KEY) || "[]"
        );

    } catch (error) {

        return [];

    }

}


function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

    updateCartCount();

}


function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) return;

    const cart = getCart();

    const totalQuantity = cart.reduce(
        (total, item) =>
            total + Number(item.quantity || 0),
        0
    );

    cartCount.textContent = totalQuantity;

}


// =====================================================
// GET FOOD QUANTITY IN CART
// =====================================================

function getFoodQuantity() {

    if (!selectedFood) return 0;

    const cart = getCart();

    const item = cart.find(
        item => String(item.id) === String(selectedFood.id)
    );

    return item ? Number(item.quantity || 0) : 0;

}


let quantity = getFoodQuantity();

quantityNumber.textContent = quantity;


// =====================================================
// INCREASE QUANTITY
// =====================================================

increaseBtn.addEventListener("click", () => {

    quantity++;

    quantityNumber.textContent = quantity;

});


// =====================================================
// DECREASE QUANTITY
// =====================================================

decreaseBtn.addEventListener("click", () => {

    if (quantity > 0) {

        quantity--;

        quantityNumber.textContent = quantity;

    }

});


// =====================================================
// ADD TO CART
// =====================================================

addToCartBtn.addEventListener("click", () => {

    if (!selectedFood) return;


    if (quantity < 1) {

        Swal.fire({
            icon: "warning",
            title: "Select Quantity",
            text: "Please select at least one item.",
            confirmButtonColor: "#ff7a00"
        });

        return;

    }


    const cart = getCart();


    const existingItem = cart.find(
        item =>
            String(item.id) ===
            String(selectedFood.id)
    );


    if (existingItem) {

        existingItem.quantity =
            Number(existingItem.quantity || 0) +
            quantity;

    } else {

        cart.push({
            ...selectedFood,
            quantity: quantity
        });

    }


    saveCart(cart);


    Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: `${selectedFood.name} has been added to your cart.`,
        showCancelButton: true,
        confirmButtonText: "Go to Cart",
        cancelButtonText: "Continue Shopping",
        confirmButtonColor: "#ff7a00"
    }).then((result) => {

        if (result.isConfirmed) {

            window.location.href = "cart.html";

        }

    });

});


// =====================================================
// MOBILE NAVBAR
// =====================================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");


if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", (event) => {

        event.stopPropagation();

        navLinks.classList.toggle("show");

        const isOpen =
            navLinks.classList.contains("show");

        menuBtn.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    // Close menu when a link is clicked
    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    // Close menu when clicking outside
    document.addEventListener("click", (event) => {

        if (
            navLinks.classList.contains("show") &&
            !navLinks.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {

            navLinks.classList.remove("show");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


// =====================================================
// INITIAL CART COUNT
// =====================================================

updateCartCount();