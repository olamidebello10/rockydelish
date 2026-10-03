import {
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup
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

const signupForm =
    document.getElementById("signupForm");

const fullNameInput =
    document.getElementById("fullName");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const mobileInput =
    document.getElementById("mobileNumber");

const dateOfBirthInput =
    document.getElementById("dateOfBirth");

const googleSignupBtn =
    document.getElementById("googleSignupBtn");


// ================= REDIRECT =================

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

async function saveUserToFirestore(user, extraData = {}) {

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

            ...extraData,

            createdAt:
                new Date().toISOString()

        },

        {
            merge: true
        }

    );

}


// ================= EMAIL SIGNUP =================

if (signupForm) {

    signupForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const fullName =
                fullNameInput.value.trim();

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;

            const mobileNumber =
                mobileInput
                    ? mobileInput.value.trim()
                    : "";

            const dateOfBirth =
                dateOfBirthInput
                    ? dateOfBirthInput.value
                    : "";


            if (
                !fullName ||
                !email ||
                !password
            ) {

                Swal.fire({

                    icon: "warning",

                    title: "Missing Information",

                    text:
                        "Please fill in all required fields.",

                    confirmButtonColor:
                        "#fc8a06"

                });

                return;

            }


            if (password.length < 6) {

                Swal.fire({

                    icon: "warning",

                    title: "Password Too Short",

                    text:
                        "Your password must contain at least 6 characters.",

                    confirmButtonColor:
                        "#fc8a06"

                });

                return;

            }


            try {

                await authPersistence;


                const userCredential =
                    await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                const user =
                    userCredential.user;


                await updateProfile(

                    user,

                    {
                        displayName:
                            fullName
                    }

                );


                await saveUserToFirestore(

                    user,

                    {

                        mobileNumber:
                            mobileNumber,

                        dateOfBirth:
                            dateOfBirth

                    }

                );


                localStorage.setItem(

                    "rockydelishUser",

                    JSON.stringify({

                        uid:
                            user.uid,

                        name:
                            fullName,

                        email:
                            user.email || "",

                        photoURL:
                            user.photoURL || ""

                    })

                );


                Swal.fire({

                    icon: "success",

                    title: "Account Created!",

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
                    "Signup error:",
                    error
                );


                let message =
                    "Unable to create your account.";


                if (
                    error.code ===
                    "auth/email-already-in-use"
                ) {

                    message =
                        "An account already exists with this email.";

                }
                else if (
                    error.code ===
                    "auth/invalid-email"
                ) {

                    message =
                        "Please enter a valid email address.";

                }
                else if (
                    error.code ===
                    "auth/weak-password"
                ) {

                    message =
                        "Your password is too weak.";

                }


                Swal.fire({

                    icon: "error",

                    title: "Signup Failed",

                    text:
                        message,

                    confirmButtonColor:
                        "#fc8a06"

                });

            }

        }
    );

}


// ================= GOOGLE SIGNUP =================

if (googleSignupBtn) {

    googleSignupBtn.addEventListener(
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

                    title: "Account Ready!",

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
                    "Google signup error:",
                    error
                );


                Swal.fire({

                    icon: "error",

                    title: "Google Signup Failed",

                    text:
                        error.message,

                    confirmButtonColor:
                        "#fc8a06"

                });

            }

        }
    );

}

// ================= TOGGLE SIGNUP PASSWORD =================

function togglePassword() {

    const password =
        document.getElementById("password");

    const eye =
        document.getElementById("eyeIcon");

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
window.togglePassword = togglePassword;

// ================= GO BACK =================

function goBack() {

    window.history.back();

}


// Make function available to HTML onclick
window.goBack = goBack;