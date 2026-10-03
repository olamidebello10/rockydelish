import {
    auth,
    db,
    authPersistence
} from "./firebase.js";


import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";



/* =========================================
   ELEMENTS
========================================= */

const favoritesContainer =
    document.getElementById(
        "favoritesContainer"
    );


const emptyFavorites =
    document.getElementById(
        "emptyFavorites"
    );


const cartCount =
    document.getElementById(
        "cartCount"
    );


const menuBtn =
    document.getElementById(
        "menuBtn"
    );


const navLinks =
    document.getElementById(
        "navLinks"
    );



/* =========================================
   MOBILE NAVBAR
========================================= */

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



/* =========================================
   CART COUNT
========================================= */

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem(
                "rockydelishCart"
            ) || "[]"
        );


    const total =
        cart.reduce(
            (
                total,
                item
            ) => {

                return total +
                    Number(
                        item.quantity || 0
                    );

            },
            0
        );


    if (cartCount) {

        cartCount.textContent =
            total;

    }

}


updateCartCount();



/* =========================================
   SHOW LOGIN
========================================= */

async function showLogin() {

    const result =
        await Swal.fire({

            icon: "info",

            title: "Login Required",

            text:
                "Please login to view your favorite foods.",

            confirmButtonText:
                "Login",

            showCancelButton:
                true,

            cancelButtonText:
                "Cancel",

            confirmButtonColor:
                "#ff7a00"

        });


    if (result.isConfirmed) {

        window.location.href =
            "login.html?redirect=favorites.html";

    }

}



/* =========================================
   LOAD FAVORITES
========================================= */

async function loadFavorites(user) {

    try {


        favoritesContainer.innerHTML =
            "";


        emptyFavorites.style.display =
            "none";


        const favoritesRef =
            collection(
                db,
                "users",
                user.uid,
                "favorites"
            );


        const snapshot =
            await getDocs(
                favoritesRef
            );


        /* ===============================
           NO FAVORITES
        =============================== */

        if (snapshot.empty) {

            emptyFavorites.style.display =
                "block";

            return;

        }



        /* ===============================
           DISPLAY FAVORITES
        =============================== */

        snapshot.forEach(
            favoriteDocument => {

                const food =
                    favoriteDocument.data();


                const favoriteId =
                    favoriteDocument.id;


                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "favorite-card";


                card.innerHTML = `

                    <div class="favorite-image">

                        <img
                            src="${food.image || "assets/placeholder.jpg"}"
                            alt="${food.name || "Favorite food"}"
                            loading="lazy"
                        >

                        <button
                            type="button"
                            class="remove-favorite"
                            data-id="${favoriteId}"
                            aria-label="Remove ${food.name || "food"} from favorites"
                        >

                            <i class="fa-solid fa-heart"></i>

                        </button>

                    </div>


                    <div class="favorite-content">

                        <span class="favorite-category">

                            ${food.category || "Food"}

                        </span>


                        <h3>

                            ${food.name || "Food Item"}

                        </h3>


                        <p class="favorite-description">

                            ${
                                food.description ||
                                "A delicious RockyDelish meal."
                            }

                        </p>


                        <div class="favorite-bottom">

                            <strong class="favorite-price">

                                ₦${Number(
                                    food.price || 0
                                ).toLocaleString()}

                            </strong>


                            <a
                                href="product-details.html?id=${food.foodId || food.id || favoriteId}"
                                class="view-details-btn"
                            >

                                View Details

                            </a>

                        </div>

                    </div>

                `;


                favoritesContainer.appendChild(
                    card
                );

            }
        );



        /* ===============================
           REMOVE FAVORITE
        =============================== */

        document
            .querySelectorAll(
                ".remove-favorite"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    async () => {

                        const foodId =
                            button.dataset.id;


                        const result =
                            await Swal.fire({

                                icon: "question",

                                title:
                                    "Remove Favorite?",

                                text:
                                    "This food will be removed from your favorites.",

                                showCancelButton:
                                    true,

                                confirmButtonText:
                                    "Remove",

                                cancelButtonText:
                                    "Keep",

                                confirmButtonColor:
                                    "#ff7a00"

                            });


                        if (
                            !result.isConfirmed
                        ) {

                            return;

                        }


                        try {

                            await deleteDoc(

                                doc(
                                    db,
                                    "users",
                                    user.uid,
                                    "favorites",
                                    foodId
                                )

                            );


                            await Swal.fire({

                                icon: "success",

                                title:
                                    "Removed",

                                text:
                                    "Food removed from your favorites.",

                                timer: 1300,

                                showConfirmButton:
                                    false

                            });


                            loadFavorites(
                                user
                            );


                        } catch (error) {

                            console.error(
                                "Remove favorite error:",
                                error
                            );


                            Swal.fire({

                                icon: "error",

                                title:
                                    "Something went wrong",

                                text:
                                    "We couldn't remove this favorite.",

                                confirmButtonColor:
                                    "#ff7a00"

                            });

                        }

                    }
                );

            });


    } catch (error) {

        console.error(
            "Favorites error:",
            error
        );


        Swal.fire({

            icon: "error",

            title:
                "Unable to Load Favorites",

            text:
                "Something went wrong while loading your favorite foods.",

            confirmButtonColor:
                "#ff7a00"

        });

    }

}



/* =========================================
   AUTH STATE
========================================= */

onAuthStateChanged(
    auth,
    async user => {


        if (!user) {

            emptyFavorites.style.display =
                "block";


            favoritesContainer.innerHTML =
                `

                    <div class="empty-favorites">

                        <div class="empty-icon">

                            <i class="fa-solid fa-lock"></i>

                        </div>


                        <h3>
                            Login to view favorites
                        </h3>


                        <p>
                            Sign in to access the foods
                            you have saved.
                        </p>


                        <a
                            href="login.html?redirect=favorites.html"
                            class="empty-btn"
                        >

                            <i class="fa-solid fa-right-to-bracket"></i>

                            Login

                        </a>

                    </div>

                `;


            return;

        }


        loadFavorites(user);

    }
);