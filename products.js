// ==========================================
// ROCKYDELISH PRODUCTS PAGE
// ==========================================


// ==========================================
// FIREBASE
// ==========================================

import {
    auth,
    db
} from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    collection,
    doc,
    setDoc,
    deleteDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// ==========================================
// FOOD DATA
// ==========================================

const foods = [

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
        name: "Grilled Chicken",
        category: "chicken",
        price: 6500,
        description: "Tender grilled chicken with delicious seasoning.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_4rb9TkYLQYrqnzS4ku7DXQPKqtvg0o2iZ9ieQjSnNQ&s=10"
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
        name: "Cheese Burger",
        category: "burger",
        price: 5000,
        description: "Delicious beef burger topped with melted cheese.",
        image: "assets/cat1.jpg"
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


// ==========================================
// VARIABLES
// ==========================================

const foodContainer =
    document.getElementById("foodContainer");

const searchInput =
    document.getElementById("searchInput");

const noFood =
    document.getElementById("noFood");

const categoryButtons =
    document.querySelectorAll(".category-btn");

let currentCategory = "all";


// ==========================================
// FIREBASE USER
// ==========================================

let currentUser = null;


// ==========================================
// FAVORITES SET
// ==========================================

// This stores the IDs of the user's
// favorite foods currently loaded from Firebase.

let favoriteIds = new Set();


// ==========================================
// GET CART FROM LOCAL STORAGE
// ==========================================

function getCart() {

    const savedCart =
        localStorage.getItem("rockydelishCart");

    if (!savedCart) {
        return [];
    }

    try {

        return JSON.parse(savedCart);

    } catch (error) {

        console.error(
            "Could not read cart:",
            error
        );

        return [];
    }
}


// ==========================================
// SAVE CART
// ==========================================

function saveCart(cart) {

    localStorage.setItem(
        "rockydelishCart",
        JSON.stringify(cart)
    );

}


// ==========================================
// GET FOOD QUANTITY
// ==========================================

function getFoodQuantity(foodId) {

    const cart = getCart();

    const item = cart.find(
        item => String(item.id) === String(foodId)
    );

    return item ? Number(item.quantity) : 0;
}


// ==========================================
// UPDATE CART COUNT
// ==========================================

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount") ||
        document.querySelector(".cart-count");

    if (!cartCount) {
        return;
    }

    const cart = getCart();

    const totalItems = cart.reduce(
        (total, item) =>
            total + Number(item.quantity || 0),
        0
    );

    cartCount.textContent = totalItems;
}


// ==========================================
// ADD ONE FOOD
// ==========================================

function increaseQuantity(foodId) {

    const cart = getCart();

    const existingItem = cart.find(
        item =>
            String(item.id) === String(foodId)
    );

    const food = foods.find(
        item =>
            String(item.id) === String(foodId)
    );

    if (!food) {
        return;
    }


    if (existingItem) {

        existingItem.quantity =
            Number(existingItem.quantity || 0) + 1;

    } else {

        cart.push({

            id: food.id,

            name: food.name,

            price: food.price,

            image: food.image,

            quantity: 1

        });

    }


    saveCart(cart);

    updateQuantityDisplay(foodId);

    updateCartCount();
}


// ==========================================
// REMOVE ONE FOOD
// ==========================================

function decreaseQuantity(foodId) {

    const cart = getCart();

    const existingItem = cart.find(
        item =>
            String(item.id) === String(foodId)
    );

    if (!existingItem) {
        return;
    }


    existingItem.quantity =
        Number(existingItem.quantity || 0) - 1;


    if (existingItem.quantity <= 0) {

        const itemIndex =
            cart.findIndex(
                item =>
                    String(item.id) === String(foodId)
            );

        if (itemIndex !== -1) {

            cart.splice(itemIndex, 1);

        }

    }


    saveCart(cart);

    updateQuantityDisplay(foodId);

    updateCartCount();
}


// ==========================================
// UPDATE NUMBER ON CARD
// ==========================================

function updateQuantityDisplay(foodId) {

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


// ==========================================
// LOAD FAVORITES FROM FIREBASE
// ==========================================

async function loadFavorites() {

    favoriteIds = new Set();


    if (!currentUser) {

        return;

    }


    try {

        const favoritesRef =
            collection(
                db,
                "users",
                currentUser.uid,
                "favorites"
            );


        const snapshot =
            await getDocs(favoritesRef);


        snapshot.forEach(
            favoriteDocument => {

                favoriteIds.add(
                    String(favoriteDocument.id)
                );

            }
        );


    } catch (error) {

        console.error(
            "Could not load favorites:",
            error
        );

    }

}


// ==========================================
// ADD TO FAVORITES
// ==========================================

async function addToFavorites(food) {

    if (!currentUser) {

        const result =
            await Swal.fire({

                icon: "info",

                title: "Login Required",

                text:
                    "Please login to save your favorite foods.",

                showCancelButton: true,

                confirmButtonText: "Login",

                cancelButtonText: "Cancel",

                confirmButtonColor: "#fc8a06",

                cancelButtonColor: "#071426"

            });


        if (result.isConfirmed) {

            window.location.href =
                "login.html?redirect=products.html";

        }

        return;
    }


    try {

        const favoriteRef =
            doc(
                db,
                "users",
                currentUser.uid,
                "favorites",
                String(food.id)
            );


        await setDoc(
            favoriteRef,
            {

                foodId: food.id,

                name: food.name,

                category: food.category,

                price: food.price,

                image: food.image,

                description: food.description,

                addedAt:
                    new Date().toISOString()

            }
        );


        favoriteIds.add(
            String(food.id)
        );


        filterFoods();


        await Swal.fire({

            icon: "success",

            title: "Added to Favorites ❤️",

            text:
                `${food.name} has been saved to your favorites.`,

            confirmButtonColor: "#fc8a06"

        });


    } catch (error) {

        console.error(
            "Error adding favorite:",
            error
        );


        await Swal.fire({

            icon: "error",

            title: "Something went wrong",

            text:
                "We couldn't save this food to your favorites.",

            confirmButtonColor: "#fc8a06"

        });

    }

}


// ==========================================
// REMOVE FROM FAVORITES
// ==========================================

async function removeFromFavorites(food) {

    if (!currentUser) {
        return;
    }


    try {

        const favoriteRef =
            doc(
                db,
                "users",
                currentUser.uid,
                "favorites",
                String(food.id)
            );


        await deleteDoc(favoriteRef);


        favoriteIds.delete(
            String(food.id)
        );


        filterFoods();


        await Swal.fire({

            icon: "success",

            title: "Removed from Favorites",

            text:
                `${food.name} has been removed from your favorites.`,

            confirmButtonColor: "#fc8a06"

        });


    } catch (error) {

        console.error(
            "Error removing favorite:",
            error
        );


        await Swal.fire({

            icon: "error",

            title: "Something went wrong",

            text:
                "We couldn't remove this food from your favorites.",

            confirmButtonColor: "#fc8a06"

        });

    }

}


// ==========================================
// TOGGLE FAVORITE
// ==========================================

async function toggleFavorite(food) {

    const foodId =
        String(food.id);


    if (favoriteIds.has(foodId)) {

        await removeFromFavorites(food);

    } else {

        await addToFavorites(food);

    }

}


// ==========================================
// DISPLAY FOOD
// ==========================================

function displayFoods(foodList) {

    foodContainer.innerHTML = "";


    if (foodList.length === 0) {

        noFood.style.display = "block";

        return;
    }


    noFood.style.display = "none";


    foodList.forEach(food => {

        const quantity =
            getFoodQuantity(food.id);


        const isFavorite =
            favoriteIds.has(
                String(food.id)
            );


        const foodCard =
            document.createElement("div");


        foodCard.className =
            "food-card";


        foodCard.innerHTML = `

            <div class="food-image">

                <img
                    src="${food.image}"
                    alt="${food.name}"
                >


                <!-- FAVORITE BUTTON -->

                <button
                    type="button"
                    class="favorite-btn ${isFavorite ? "favorited" : ""}"
                    data-id="${food.id}"
                    aria-label="Add ${food.name} to favorites"
                    title="${isFavorite ? "Remove from favorites" : "Add to favorites"}"
                >

                    <i
                        class="${isFavorite
                            ? "fa-solid"
                            : "fa-regular"
                        } fa-heart"
                    ></i>

                </button>

            </div>


            <div class="food-content">

                <div class="food-title-row">

                    <h3>
                        ${food.name}
                    </h3>

                    <span class="food-category">
                        ${food.category}
                    </span>

                </div>


                <p class="food-description">
                    ${food.description}
                </p>


                <div class="food-bottom">

                    <strong class="food-price">
                        ₦${food.price.toLocaleString()}
                    </strong>


                    <div class="quantity-control">

                        <button
                            type="button"
                            class="quantity-btn decrease-btn"
                            data-id="${food.id}"
                            aria-label="Decrease quantity"
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
                            aria-label="Increase quantity"
                        >
                            +
                        </button>

                    </div>


                    <a
                        href="product-details.html?id=${food.id}"
                        class="view-details-btn"
                    >
                        View Details
                    </a>

                </div>

            </div>

        `;


        foodContainer.appendChild(
            foodCard
        );

    });


    // ======================================
    // PLUS BUTTONS
    // ======================================

    document
        .querySelectorAll(".increase-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const foodId =
                        Number(button.dataset.id);

                    increaseQuantity(foodId);

                }
            );

        });


    // ======================================
    // MINUS BUTTONS
    // ======================================

    document
        .querySelectorAll(".decrease-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const foodId =
                        Number(button.dataset.id);

                    decreaseQuantity(foodId);

                }
            );

        });


    // ======================================
    // FAVORITE BUTTONS
    // ======================================

    document
        .querySelectorAll(".favorite-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                async (event) => {

                    event.preventDefault();

                    event.stopPropagation();


                    const foodId =
                        Number(button.dataset.id);


                    const food =
                        foods.find(
                            item =>
                                item.id === foodId
                        );


                    if (!food) {
                        return;
                    }


                    await toggleFavorite(
                        food
                    );

                }
            );

        });

}


// ==========================================
// FILTER FOODS
// ==========================================

function filterFoods() {

    const searchValue =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const filteredFoods =
        foods.filter(food => {

            const matchesCategory =
                currentCategory === "all" ||
                food.category === currentCategory;


            const matchesSearch =
                food.name
                    .toLowerCase()
                    .includes(searchValue) ||

                food.description
                    .toLowerCase()
                    .includes(searchValue) ||

                food.category
                    .toLowerCase()
                    .includes(searchValue);


            return (
                matchesCategory &&
                matchesSearch
            );

        });


    displayFoods(
        filteredFoods
    );

}


// ==========================================
// CATEGORY BUTTONS
// ==========================================

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            categoryButtons.forEach(
                btn =>
                    btn.classList.remove(
                        "active"
                    )
            );


            button.classList.add(
                "active"
            );


            currentCategory =
                button.dataset.category;


            filterFoods();

        }
    );

});


// ==========================================
// SEARCH
// ==========================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterFoods
    );

}


// ==========================================
// MOBILE NAVBAR
// ==========================================

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");


if (menuBtn && navLinks) {

    menuBtn.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "show"
            );

        }
    );


    navLinks
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "show"
                    );

                }
            );

        });

}


// ==========================================
// FIREBASE AUTH STATE
// ==========================================

onAuthStateChanged(
    auth,
    async (user) => {

        currentUser = user;


        if (user) {

            await loadFavorites();

        } else {

            favoriteIds = new Set();

        }


        // Re-render products so the
        // correct heart state appears.

        filterFoods();

    }
);


// ==========================================
// INITIAL DISPLAY
// ==========================================

displayFoods(
    foods
);

updateCartCount();