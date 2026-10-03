import {
    adminAuth,
    adminDb,
    adminAuthPersistence
} from "./admin-firebase.js";

import {
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


const ADMIN_EMAIL =
    "belloolamide957@gmail.com";


const adminGoogleBtn =
    document.getElementById("adminGoogleBtn");


const provider =
    new GoogleAuthProvider();


adminGoogleBtn.addEventListener(
    "click",
    async () => {

        try {

            adminGoogleBtn.disabled = true;

            adminGoogleBtn.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Signing in...
            `;


            await adminAuthPersistence;


            const result =
                await signInWithPopup(
                    adminAuth,
                    provider
                );


            const user =
                result.user;


            console.log(
                "Admin login:",
                user.email
            );


            // --------------------------------------
            // CHECK ADMIN EMAIL
            // --------------------------------------

            if (user.email !== ADMIN_EMAIL) {

                await adminAuth.signOut();


                await Swal.fire({

                    icon: "error",

                    title: "Access Denied",

                    text:
                        "This account is not authorized to access the admin panel.",

                    confirmButtonColor:
                        "#fc8a06"

                });


                return;
            }


            // --------------------------------------
            // SUCCESS
            // --------------------------------------

            await Swal.fire({

                icon: "success",

                title: "Welcome Admin!",

                text:
                    "You have successfully signed in.",

                confirmButtonColor:
                    "#fc8a06",

                timer: 1500,

                showConfirmButton: false

            });


            window.location.href =
                "admin-orders.html";


        } catch (error) {

            console.error(
                "Admin login error:",
                error
            );


            Swal.fire({

                icon: "error",

                title: "Login Failed",

                text:
                    error.message,

                confirmButtonColor:
                    "#fc8a06"

            });


        } finally {

            adminGoogleBtn.disabled = false;

            adminGoogleBtn.innerHTML = `
                <i class="fa-brands fa-google"></i>
                Continue with Google
            `;

        }

    }
);