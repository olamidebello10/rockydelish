// ==========================================
// ROCKYDELISH ACCOUNT
// ==========================================

import {
    auth,
    db,
    authPersistence
} from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// ==========================================
// ELEMENTS
// ==========================================

const userName =
    document.getElementById("userName");

const userEmail =
    document.getElementById("userEmail");

const fullName =
    document.getElementById("fullName");

const email =
    document.getElementById("email");

const phone =
    document.getElementById("phone");

const dateOfBirth =
    document.getElementById("dateOfBirth");

const profileImageContainer =
    document.getElementById(
        "profileImageContainer"
    );

const logoutBtn =
    document.getElementById("logoutBtn");

const cartCount =
    document.getElementById("cartCount");

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");


// ==========================================
// GET CURRENT USER
// ==========================================

async function getCurrentUser() {

    await authPersistence;

    return new Promise((resolve) => {

        const unsubscribe =
            onAuthStateChanged(
                auth,
                (user) => {

                    unsubscribe();

                    resolve(user);

                }
            );

    });

}


// ==========================================
// DISPLAY USER INFORMATION
// ==========================================

async function loadAccount() {

    const user =
        await getCurrentUser();


    // ======================================
    // USER NOT LOGGED IN
    // ======================================

    if (!user) {

        Swal.fire({

            icon: "warning",

            title: "Login Required",

            text:
                "Please login to view your account.",

            confirmButtonColor:
                "#fc8a06"

        }).then(() => {

            window.location.href =
                "login.html";

        });

        return;

    }


    // ======================================
    // FIREBASE AUTH INFORMATION
    // ======================================

    const authName =
        user.displayName ||
        "RockyDelish User";

    const authEmail =
        user.email ||
        "No email";


    // ======================================
    // DISPLAY BASIC INFORMATION
    // ======================================

    userName.textContent =
        authName;

    userEmail.textContent =
        authEmail;

    fullName.textContent =
        authName;

    email.textContent =
        authEmail;


    // ======================================
    // GOOGLE PROFILE IMAGE
    // ======================================

    if (user.photoURL) {

        profileImageContainer.innerHTML = `

            <img
                src="${user.photoURL}"
                alt="Profile Picture"
                class="profile-image"
            >

        `;

    }


    // ======================================
    // GET USER FROM FIRESTORE
    // ======================================

    try {

        const userRef =
            doc(
                db,
                "users",
                user.uid
            );


        const userSnapshot =
            await getDoc(userRef);


        if (userSnapshot.exists()) {

            const userData =
                userSnapshot.data();


            // ==================================
            // NAME
            // ==================================

            if (
                userData.name
            ) {

                userName.textContent =
                    userData.name;

                fullName.textContent =
                    userData.name;

            }


            // ==================================
            // EMAIL
            // ==================================

            if (
                userData.email
            ) {

                userEmail.textContent =
                    userData.email;

                email.textContent =
                    userData.email;

            }


            // ==================================
            // PHONE
            // ==================================

            phone.textContent =
                userData.mobileNumber ||
                "Not provided";


            // ==================================
            // DATE OF BIRTH
            // ==================================

            dateOfBirth.textContent =
                userData.dateOfBirth ||
                "Not provided";


            // ==================================
            // FIRESTORE PROFILE IMAGE
            // ==================================

            if (
                userData.photoURL &&
                !user.photoURL
            ) {

                profileImageContainer.innerHTML = `

                    <img
                        src="${userData.photoURL}"
                        alt="Profile Picture"
                        class="profile-image"
                    >

                `;

            }

        } else {

            phone.textContent =
                "Not provided";

            dateOfBirth.textContent =
                "Not provided";

        }

    }
    catch (error) {

        console.error(
            "Error loading account:",
            error
        );

        phone.textContent =
            "Not available";

        dateOfBirth.textContent =
            "Not available";

    }

}


// ==========================================
// LOGOUT
// ==========================================

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        async () => {

            const result =
                await Swal.fire({

                    icon: "question",

                    title: "Logout?",

                    text:
                        "Are you sure you want to logout?",

                    showCancelButton: true,

                    confirmButtonText:
                        "Yes, Logout",

                    cancelButtonText:
                        "Cancel",

                    confirmButtonColor:
                        "#fc8a06"

                });


            if (!result.isConfirmed) {

                return;

            }


            try {

                await signOut(auth);


                localStorage.removeItem(
                    "rockydelishUser"
                );


                await Swal.fire({

                    icon: "success",

                    title: "Logged Out",

                    text:
                        "You have been logged out successfully.",

                    timer: 1500,

                    showConfirmButton: false

                });


                // ==================================
                // RETURN TO HOME
                // ==================================

                window.location.href =
                    "index.html";

            }
            catch (error) {

                console.error(
                    "Logout error:",
                    error
                );


                Swal.fire({

                    icon: "error",

                    title: "Logout Failed",

                    text:
                        error.message,

                    confirmButtonColor:
                        "#fc8a06"

                });

            }

        }
    );

}


// ==========================================
// CART COUNT
// ==========================================

function updateCartCount() {

    if (!cartCount) return;


    const cart =
        JSON.parse(
            localStorage.getItem(
                "rockydelishCart"
            )
        ) || [];


    const quantity =
        cart.reduce(
            (total, item) => {

                return (
                    total +
                    (Number(item.quantity) || 1)
                );

            },
            0
        );


    cartCount.textContent =
        quantity;

}


// ==========================================
// MOBILE NAVIGATION
// ==========================================

if (
    menuBtn &&
    navLinks
) {

    menuBtn.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "active"
            );

        }
    );

}


// ==========================================
// START
// ==========================================

updateCartCount();

loadAccount();