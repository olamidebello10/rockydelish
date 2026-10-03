import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

import {
    auth,
    db,
    authPersistence
} from "./firebase.js";


// ================= ELEMENTS =================

const loginForm =
    document.getElementById("loginForm");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const googleLoginBtn =
    document.getElementById("googleLoginBtn");


// ================= REDIRECT PAGE =================

function getRedirectPage() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const redirect =
        params.get("redirect");


    if (redirect === "checkout.html") {

        return "checkout.html";

    }


    if (redirect === "products.html") {

        return "products.html";

    }


    return "index.html";

}


// ================= SAVE USER =================

async function saveUserToFirestore(user) {

    await setDoc(

        doc(db, "users", user.uid),

        {

            uid:
                user.uid,

            name:
                user.displayName || "",

            email:
                user.email || "",

            photoURL:
                user.photoURL || "",

            lastLogin:
                new Date().toISOString()

        },

        {
            merge: true
        }

    );

}


// ================= EMAIL LOGIN =================

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;


            if (!email || !password) {

                Swal.fire({

                    icon: "warning",

                    title: "Missing Information",

                    text:
                        "Please enter your email and password.",

                    confirmButtonColor:
                        "#fc8a06"

                });

                return;

            }


            try {

                await authPersistence;


                const userCredential =
                    await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                const user =
                    userCredential.user;


                await saveUserToFirestore(
                    user
                );


                localStorage.setItem(

                    "rockydelishUser",

                    JSON.stringify({

                        uid:
                            user.uid,

                        name:
                            user.displayName || "",

                        email:
                            user.email || "",

                        photoURL:
                            user.photoURL || ""

                    })

                );


                Swal.fire({

                    icon: "success",

                    title: "Login Successful!",

                    text:
                        "Welcome back to RockyDelish.",

                    confirmButtonColor:
                        "#fc8a06",

                    timer:
                        1500,

                    showConfirmButton:
                        false

                }).then(() => {

                    window.location.href =
                        getRedirectPage();

                });


            }
            catch (error) {

                console.error(
                    "Login error:",
                    error
                );


                let message =
                    "Unable to login. Please try again.";


                if (
                    error.code ===
                    "auth/invalid-credential"
                ) {

                    message =
                        "Incorrect email or password.";

                }
                else if (
                    error.code ===
                    "auth/user-not-found"
                ) {

                    message =
                        "No account was found with this email.";

                }
                else if (
                    error.code ===
                    "auth/wrong-password"
                ) {

                    message =
                        "Incorrect password.";

                }


                Swal.fire({

                    icon: "error",

                    title: "Login Failed",

                    text:
                        message,

                    confirmButtonColor:
                        "#fc8a06"

                });

            }

        }
    );

}


// ================= GOOGLE LOGIN =================

if (googleLoginBtn) {

    googleLoginBtn.addEventListener(
        "click",
        async function () {

            try {

                await authPersistence;


                const provider =
                    new GoogleAuthProvider();


                const result =
                    await signInWithPopup(
                        auth,
                        provider
                    );


                const user =
                    result.user;


                await saveUserToFirestore(
                    user
                );


                localStorage.setItem(

                    "rockydelishUser",

                    JSON.stringify({

                        uid:
                            user.uid,

                        name:
                            user.displayName || "",

                        email:
                            user.email || "",

                        photoURL:
                            user.photoURL || ""

                    })

                );


                Swal.fire({

                    icon: "success",

                    title: "Login Successful!",

                    text:
                        "Welcome to RockyDelish.",

                    confirmButtonColor:
                        "#fc8a06",

                    timer:
                        1500,

                    showConfirmButton:
                        false

                }).then(() => {

                    window.location.href =
                        getRedirectPage();

                });


            }
            catch (error) {

                console.error(
                    "Google login error:",
                    error
                );


                Swal.fire({

                    icon: "error",

                    title: "Google Login Failed",

                    text:
                        error.message,

                    confirmButtonColor:
                        "#fc8a06"

                });

            }

        }
    );

}

// ================= TOGGLE LOGIN PASSWORD =================

function toggleLoginPassword() {

    const password =
        document.getElementById("password");

    const eye =
        document.getElementById("loginEye");

    if (!password || !eye) return;


    if (password.type === "password") {

        password.type = "text";

        eye.classList.remove("fa-eye");
        eye.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        eye.classList.remove("fa-eye-slash");
        eye.classList.add("fa-eye");

    }

}


// Make function available to HTML onclick
window.toggleLoginPassword = toggleLoginPassword;

// ================= GO BACK =================

function goBack() {
    window.history.back();
}

// Make function available to HTML onclick
window.goBack = goBack;