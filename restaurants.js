// ===============================
// RESTAURANTS DATA
// ===============================

const restaurants = [

    {
        id: 1,
        name: "Chicken Republic",
        category: "chicken",
        rating: 4.7,
        deliveryTime: "25–35 min",
        deliveryFee: "₦1,000",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHzq3Zm4oA312KTz-GNU08OOCxF3-f396n4dJPuagCZw&s=10"
    },

    {
        id: 2,
        name: "FoodCo",
        category: "nigerian food",
        rating: 4.6,
        deliveryTime: "25–40 min",
        deliveryFee: "₦1,000",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0QGlf3CGk2cYeQq3qFLO_UjW-U0-Fj0hJacfY7KVTQg&s=10"
    },

    {
        id: 3,
        name: "KFC Nigeria",
        category: "chicken",
        rating: 4.8,
        deliveryTime: "25–40 min",
        deliveryFee: "₦1,200",
        location: "Ibadan",
        image: "assets/restaurant3.jpg"
    },

    {
        id: 4,
        name: "Bukka Hut",
        category: "nigerian food",
        rating: 4.5,
        deliveryTime: "25–40 min",
        deliveryFee: "₦900",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7hfrPXs9YCNnVTaivOD617L3Uvw0qc9FvuZ0G6rrGNA&s=10"
    },

    {
        id: 5,
        name: "Mr Bigg's",
        category: "fast food",
        rating: 4.5,
        deliveryTime: "20–30 min",
        deliveryFee: "₦800",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQye_OjHHYvrRjrZjGxi1jOkz5kRhvx6PC6gkFb3oP3jA&s=10"
    },

    {
        id: 6,
        name: "Domino's Pizza",
        category: "pizza",
        rating: 4.6,
        deliveryTime: "30–40 min",
        deliveryFee: "₦1,000",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7-r8su3OT1PYck8pS4VSok9CSCGuYYSTOf4aJbTPluQ&s=10"
    },

    {
        id: 7,
        name: "Item7GO",
        category: "fast food",
        rating: 4.5,
        deliveryTime: "25–35 min",
        deliveryFee: "₦1,000",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQygd1M8ALmLykEpLUOvZcdbEolOSMxKr-yRSwbNrIAQ&s=10"
    },

    {
        id: 8,
        name: "Tastee Fried Chicken",
        category: "fast food",
        rating: 4.6,
        deliveryTime: "25–35 min",
        deliveryFee: "₦900",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuinLSWjKlIU-asJK4ojopyYoBtabHcebTAnrJDZeHQQ&s=10"
    },

    {
        id: 9,
        name: "The Place",
        category: "fast food",
        rating: 4.7,
        deliveryTime: "25–35 min",
        deliveryFee: "₦1,000",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8mARyknw1U43CsOHHTWbrpLy7XV8Scd9mYFA7kg4sWQ&s=10"
    },

    {
        id: 10,
        name: "Kilimanjaro",
        category: "nigerian food",
        rating: 4.5,
        deliveryTime: "30–45 min",
        deliveryFee: "₦1,000",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_NwKX4KcYNM3-5cEr6lQqEhld3toxuPSMQyl3Gqf8hg&s=10"
    },

    {
        id: 11,
        name: "Sweet Sensation",
        category: "fast food",
        rating: 4.4,
        deliveryTime: "20–35 min",
        deliveryFee: "₦800",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkp11CRq6jIXSKPb-Wjh5LZCzTra4OycFwy2G2akUcAA&s=10"
    },

    {
        id: 12,
        name: "Tantalizers",
        category: "fast food",
        rating: 4.4,
        deliveryTime: "25–40 min",
        deliveryFee: "₦900",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGN-3rcmG2EMgCeLkgH1b2H2zJ65fgs1vwI36lDgg9WA&s=10"
    },

    {
        id: 13,
        name: "Stone Café",
        category: "nigerian food",
        rating: 4.7,
        deliveryTime: "35–50 min",
        deliveryFee: "₦1,500",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGbhfSpxbw_AiTRtmXdIaznTGLDvkK24DLSZBiW-BTiA&s=10"
    },

    {
        id: 14,
        name: "Saire",
        category: "nigerian food",
        rating: 4.6,
        deliveryTime: "30–45 min",
        deliveryFee: "₦1,000",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJNSNUzrLUCF5dcXPqywmu3yE8SI8u8G8YNV-YBNrBBA&s=10"
    },

    {
        id: 15,
        name: "Chef Kabs",
        category: "fast food",
        rating: 4.5,
        deliveryTime: "30–45 min",
        deliveryFee: "₦1,200",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Zl-HzFSogYooRHYIof-soQdZtafeuPkV_FeZoLHT_Q&s=10"
    },

    {
        id: 16,
        name: "Black OX Bistro",
        category: "fast food",
        rating: 4.6,
        deliveryTime: "35–50 min",
        deliveryFee: "₦1,500",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHnOCbtiL1ymDGeaWMXL3ayAgVdo4twMt830z5XzeitQ&s=10"
    },

    {
        id: 17,
        name: "The Sea Pride",
        category: "nigerian food",
        rating: 4.7,
        deliveryTime: "30–45 min",
        deliveryFee: "₦1,200",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO_KJnLPXDXSwXj1r8piCK7GCVVrUZ4oFEmUV0lArxYg&s=10"
    },

    {
        id: 18,
        name: "Hans & René",
        category: "drinks",
        rating: 4.6,
        deliveryTime: "20–30 min",
        deliveryFee: "₦700",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy1J0WFck_eWmgGPIFyJTFZrfvFz0oKDChqyfNdTwS7w&s=10"
    },

    {
        id: 19,
        name: "Cold Stone Creamery",
        category: "drinks",
        rating: 4.8,
        deliveryTime: "20–30 min",
        deliveryFee: "₦800",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrcXkCUboEWTFH7G5CUD0vKBx6vxtDbv1FQgXHcYlatg&s=10"
    },

    {
        id: 20,
        name: "Krispy Kreme",
        category: "drinks",
        rating: 4.7,
        deliveryTime: "20–30 min",
        deliveryFee: "₦800",
        location: "Ibadan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ08TrjsY2XmzEnU-FiBYj2nCSqCB0-6gnQWJRWiuyKmw&s=10"
    }

];


// ===============================
// DOM ELEMENTS
// ===============================

const restaurantContainer =
    document.getElementById("restaurantContainer");

const restaurantSearch =
    document.getElementById("restaurantSearch");

const restaurantCount =
    document.getElementById("restaurantCount");

const noRestaurants =
    document.getElementById("noRestaurants");

const categoryButtons =
    document.querySelectorAll(".category-btn");


// ===============================
// CURRENT CATEGORY
// ===============================

let currentCategory = "all";


// ===============================
// DISPLAY RESTAURANTS
// ===============================

function displayRestaurants(restaurantList) {

    restaurantContainer.innerHTML = "";

    restaurantCount.textContent =
        `${restaurantList.length} Restaurant${restaurantList.length !== 1 ? "s" : ""}`;


    if (restaurantList.length === 0) {

        noRestaurants.classList.remove("hidden");

        return;
    }


    noRestaurants.classList.add("hidden");


    restaurantList.forEach(restaurant => {

        const card = document.createElement("div");

        card.className = "restaurant-card";


        card.innerHTML = `

            <div class="restaurant-image">

                <img
                    src="${restaurant.image}"
                    alt="${restaurant.name}"
                >

                <span class="restaurant-rating">
                    <i class="fa-solid fa-star"></i>
                    ${restaurant.rating}
                </span>

            </div>


            <div class="restaurant-content">

                <h3>
                    ${restaurant.name}
                </h3>


                <div class="restaurant-info">

                    <span>
                        <i class="fa-regular fa-clock"></i>
                        ${restaurant.deliveryTime}
                    </span>

                    <span>
                        <i class="fa-solid fa-motorcycle"></i>
                        ${restaurant.deliveryFee}
                    </span>

                    <span>
                        <i class="fa-solid fa-location-dot"></i>
                        ${restaurant.location}
                    </span>

                </div>


                <button
                    class="view-menu-btn"
                    data-id="${restaurant.id}"
                >
                    View Menu
                    <i class="fa-solid fa-arrow-right"></i>
                </button>

            </div>

        `;


        restaurantContainer.appendChild(card);

    });


    // ===============================
    // VIEW MENU BUTTONS
    // ===============================

    const menuButtons =
        document.querySelectorAll(".view-menu-btn");


    menuButtons.forEach(button => {

        button.addEventListener("click", () => {

            const restaurantId =
                Number(button.dataset.id);

            openRestaurantMenu(restaurantId);

        });

    });

}


// ===============================
// SEARCH + FILTER
// ===============================

function filterRestaurants() {

    const searchValue =
        restaurantSearch.value
            .trim()
            .toLowerCase();


    const filteredRestaurants =
        restaurants.filter(restaurant => {

            const matchesCategory =
                currentCategory === "all" ||
                restaurant.category === currentCategory;


            const matchesSearch =
                restaurant.name
                    .toLowerCase()
                    .includes(searchValue) ||

                restaurant.location
                    .toLowerCase()
                    .includes(searchValue);


            return matchesCategory && matchesSearch;

        });


    displayRestaurants(filteredRestaurants);

}


// ===============================
// CATEGORY BUTTONS
// ===============================

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        button.classList.add("active");


        currentCategory =
            button.dataset.category;


        filterRestaurants();

    });

});


// ===============================
// SEARCH
// ===============================

restaurantSearch.addEventListener(
    "input",
    filterRestaurants
);


// ===============================
// OPEN RESTAURANT MENU
// ===============================
function openRestaurantMenu(restaurantId) {

    const restaurant =
        restaurants.find(
            item => item.id === restaurantId
        );

    if (!restaurant) {
        return;
    }

    window.location.href =
        `restaurant-details.html?id=${restaurantId}&image=${encodeURIComponent(restaurant.image)}`;

}


// ===============================
// CART COUNT
// ===============================

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("rockydelishCart")
        ) || [];


    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total + Number(item.quantity || 0),
            0
        );


    const cartCount =
        document.querySelector(".cart-count");


    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }

}


// ===============================
// MOBILE MENU
// ===============================

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.querySelector(".nav-links");


if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("show");

    });

}


// ===============================
// INITIAL DISPLAY
// ===============================

// This now runs correctly when the page loads.

displayRestaurants(restaurants);

updateCartCount();