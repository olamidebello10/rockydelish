// ==========================================
// ROCKYDELISH CHECKOUT
// ==========================================

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
    addDoc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// ==========================================
// GET CART
// ==========================================

let cart =
    JSON.parse(
        localStorage.getItem("rockydelishCart")
    ) || [];


// ==========================================
// ELEMENTS
// ==========================================

const checkoutForm =
    document.getElementById("checkoutForm");

const checkoutItems =
    document.getElementById("checkoutItems");

const subtotalElement =
    document.getElementById("subtotal");

const deliveryFeeElement =
    document.getElementById("deliveryFee");

const totalElement =
    document.getElementById("total");


// ==========================================
// DELIVERY FEE
// ==========================================

const deliveryFee = 1000;


// ==========================================
// DISPLAY ORDER SUMMARY
// ==========================================

function displayOrderSummary() {

    if (!checkoutItems) return;

    checkoutItems.innerHTML = "";

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <div class="empty-order">

                <p>
                    Your cart is empty.
                </p>

                <a href="products.html">
                    Browse Menu
                </a>

            </div>
        `;

        subtotalElement.textContent = "₦0";
        deliveryFeeElement.textContent = "₦0";
        totalElement.textContent = "₦0";

        return;
    }


    let subtotal = 0;


    cart.forEach((item) => {

        const quantity =
            Number(item.quantity) || 1;

        const price =
            Number(item.price) || 0;

        const itemTotal =
            price * quantity;


        subtotal += itemTotal;


        const itemElement =
            document.createElement("div");

        itemElement.className =
            "checkout-item";


        itemElement.innerHTML = `
            <div class="checkout-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    Quantity: ${quantity}
                </p>

            </div>

            <strong>
                ₦${itemTotal.toLocaleString()}
            </strong>
        `;


        checkoutItems.appendChild(
            itemElement
        );

    });


    const total =
        subtotal + deliveryFee;


    subtotalElement.textContent =
        `₦${subtotal.toLocaleString()}`;

    deliveryFeeElement.textContent =
        `₦${deliveryFee.toLocaleString()}`;

    totalElement.textContent =
        `₦${total.toLocaleString()}`;
}


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
// CHECK LOGIN
// ==========================================

async function checkLoginBeforeOrder() {

    const user =
        await getCurrentUser();


    if (!user) {

        const result =
            await Swal.fire({

                icon: "warning",

                title:
                    "Login Required",

                text:
                    "Please login or create an account before placing your order.",

                showCancelButton: true,

                confirmButtonText:
                    "Login",

                cancelButtonText:
                    "Create Account",

                confirmButtonColor:
                    "#fc8a06",

                cancelButtonColor:
                    "#071426"

            });


        if (result.isConfirmed) {

            window.location.href =
                "login.html?redirect=checkout.html";

            return false;
        }


        if (
            result.dismiss ===
            Swal.DismissReason.cancel
        ) {

            window.location.href =
                "signup.html?redirect=checkout.html";

            return false;
        }


        return false;
    }


    return user;
}


// ==========================================
// SIMULATED ONLINE PAYMENT
// ==========================================

async function simulateOnlinePayment(total) {

    const result =
        await Swal.fire({

            title:
                "Online Payment",

            html: `
                <div style="text-align: left;">

                    <p style="
                        margin-bottom: 15px;
                        font-size: 15px;
                    ">
                        Amount to pay:
                        <strong>
                            ₦${total.toLocaleString()}
                        </strong>
                    </p>


                    <input id="demoCardNumber"
       class="swal2-input"
       placeholder="Card Number"
       maxlength="19"
       inputmode="numeric"
       autocomplete="new-password"
       name="demoPaymentNumber">


                    <div style="
                        display: flex;
                        gap: 10px;
                    ">

                        <input
                            id="demoExpiry"
                            class="swal2-input"
                            placeholder="MM/YY"
                            maxlength="5"
                        >


                        <input
                            id="demoCvv"
                            class="swal2-input"
                            placeholder="CVV"
                            maxlength="3"
                        >

                    </div>

                </div>
            `,

            icon:
                "info",

            showCancelButton:
                true,

            confirmButtonText:
                "Pay Now",

            cancelButtonText:
                "Cancel",

            confirmButtonColor:
                "#fc8a06",

            cancelButtonColor:
                "#071426",

            focusConfirm:
                false,


            preConfirm: () => {

                const cardNumber =
                    document.getElementById(
                        "demoCardNumber"
                    ).value.trim();


                const expiry =
                    document.getElementById(
                        "demoExpiry"
                    ).value.trim();


                const cvv =
                    document.getElementById(
                        "demoCvv"
                    ).value.trim();


                if (
                    !cardNumber ||
                    !expiry ||
                    !cvv
                ) {

                    Swal.showValidationMessage(
                        "Please fill in all payment fields."
                    );

                    return false;
                }


                return true;
            }

        });


    // ======================================
    // PAYMENT CANCELLED
    // ======================================

    if (!result.isConfirmed) {

        return false;

    }


    // ======================================
    // PROCESSING PAYMENT
    // ======================================

    Swal.fire({

        title:
            "Processing Payment...",

        text:
            "Please wait",

        allowOutsideClick:
            false,

        allowEscapeKey:
            false,

        showConfirmButton:
            false,

        didOpen: () => {

            Swal.showLoading();

        }

    });


    // Simulate 2-second payment processing

    await new Promise((resolve) => {

        setTimeout(
            resolve,
            2000
        );

    });


    // ======================================
    // PAYMENT SUCCESSFUL
    // ======================================

    await Swal.fire({

        icon:
            "success",

        title:
            "Payment Successful! ✓",

        text:
            "Your payment has been completed successfully.",

        confirmButtonColor:
            "#fc8a06"

    });


    return true;
}


// ==========================================
// PLACE ORDER
// ==========================================

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            // ==================================
            // CHECK LOGIN
            // ==================================

            const user =
                await checkLoginBeforeOrder();


            if (!user) return;


            // ==================================
            // CHECK CART
            // ==================================

            if (cart.length === 0) {

                Swal.fire({

                    icon:
                        "warning",

                    title:
                        "Your Cart Is Empty",

                    text:
                        "Please add some food before checking out.",

                    confirmButtonColor:
                        "#fc8a06"

                });

                return;
            }


            // ==================================
            // FORM VALUES
            // ==================================

            const fullName =
                document
                    .getElementById("fullName")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const address =
                document
                    .getElementById("address")
                    .value
                    .trim();


            const city =
                document
                    .getElementById("city")
                    .value
                    .trim();


            const additionalInfo =
                document
                    .getElementById("additionalInfo")
                    .value
                    .trim();


            // ==================================
            // PAYMENT METHOD
            // ==================================

            const selectedPayment =
                document.querySelector(
                    'input[name="paymentMethod"]:checked'
                );


            let paymentMethod =
                "Cash on Delivery";


            if (selectedPayment) {

                if (
                    selectedPayment.value ===
                    "online"
                ) {

                    paymentMethod =
                        "Online Payment";

                } else {

                    paymentMethod =
                        "Cash on Delivery";

                }

            }


            // ==================================
            // VALIDATION
            // ==================================

            if (
                !fullName ||
                !phone ||
                !address ||
                !city
            ) {

                Swal.fire({

                    icon:
                        "warning",

                    title:
                        "Incomplete Information",

                    text:
                        "Please fill in all the required delivery information.",

                    confirmButtonColor:
                        "#fc8a06"

                });

                return;
            }


            // ==================================
            // CALCULATE SUBTOTAL
            // ==================================

            const subtotal =
                cart.reduce(
                    (total, item) => {

                        const quantity =
                            Number(item.quantity) || 1;


                        const price =
                            Number(item.price) || 0;


                        return (
                            total +
                            price * quantity
                        );

                    },
                    0
                );


            // ==================================
            // CALCULATE TOTAL
            // ==================================

            const total =
                subtotal + deliveryFee;


            // ==================================
            // PAYMENT STATUS
            // ==================================

            let paymentStatus =
                "Pending";


            // ==================================
            // ONLINE PAYMENT
            // ==================================

            if (
                paymentMethod ===
                "Online Payment"
            ) {

                const paymentSuccessful =
                    await simulateOnlinePayment(
                        total
                    );


                // User cancelled payment

                if (!paymentSuccessful) {

                    return;

                }


                // Simulated payment successful

                paymentStatus =
                    "Paid";

            }


            // ==================================
            // CREATE ORDER OBJECT
            // ==================================

            const order = {

                orderNumber:
                    "RD" + Date.now(),

                userId:
                    user.uid,


                customer: {

                    fullName:
                        fullName,

                    email:
                        user.email || "",

                    phone:
                        phone,

                    address:
                        address,

                    city:
                        city,

                    additionalInfo:
                        additionalInfo

                },


                items:
                    cart,


                subtotal:
                    subtotal,


                deliveryFee:
                    deliveryFee,


                total:
                    total,


                paymentMethod:
                    paymentMethod,


                paymentStatus:
                    paymentStatus,


                status:
                    "Order Placed",


                createdAt:
                    new Date().toISOString()

            };


            // ==================================
            // SAVE ORDER TO FIRESTORE
            // ==================================

            try {

                const orderRef =
                    await addDoc(
                        collection(
                            db,
                            "orders"
                        ),
                        order
                    );


                console.log(
                    "Order saved to Firestore:",
                    orderRef.id
                );


                // ==================================
                // SAVE LOCAL COPY
                // ==================================

                localStorage.setItem(

                    "rockydelishOrder",

                    JSON.stringify({

                        ...order,

                        firestoreId:
                            orderRef.id

                    })

                );


                // ==================================
                // CLEAR CART
                // ==================================

                localStorage.removeItem(
                    "rockydelishCart"
                );


                // ==================================
                // SUCCESS MESSAGE
                // ==================================

                await Swal.fire({

                    icon:
                        "success",

                    title:
                        "Order Placed Successfully! 🎉",

                    text:
                        paymentMethod ===
                        "Online Payment"

                            ? "Payment successful and your order has been placed."

                            : "Your order has been saved successfully.",

                    confirmButtonText:
                        "Track Order",

                    confirmButtonColor:
                        "#fc8a06"

                });


                // ==================================
                // GO TO ORDERS
                // ==================================

                window.location.href =
                    "orders.html";

            }


            catch (error) {

                console.error(
                    "Order error:",
                    error
                );


                Swal.fire({

                    icon:
                        "error",

                    title:
                        "Order Failed",

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
// MOBILE NAVIGATION
// ==========================================

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

            navLinks.classList.toggle(
                "active"
            );

        }
    );

}


// ==========================================
// CART COUNT
// ==========================================

function updateCartCount() {

    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (!cartCount) return;


    const currentCart =
        JSON.parse(
            localStorage.getItem(
                "rockydelishCart"
            )
        ) || [];


    const totalQuantity =
        currentCart.reduce(
            (total, item) => {

                return (
                    total +
                    (Number(item.quantity) || 1)
                );

            },
            0
        );


    cartCount.textContent =
        totalQuantity;
}


// ==========================================
// START
// ==========================================

displayOrderSummary();

updateCartCount();