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
    query,
    where,
    orderBy,
    getDocs,
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// ========================================
// ELEMENTS
// ========================================

const noOrders = document.getElementById("noOrders");
const ordersContainer = document.getElementById("ordersContainer");
const orderMoreBtn = document.getElementById("orderMoreBtn");
const cartCount = document.getElementById("cartCount");

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navRight = document.querySelector(".nav-right");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}
// ========================================
// GET CURRENT USER
// ========================================

async function getCurrentUser() {

    await authPersistence;

    return new Promise((resolve) => {

        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {

                unsubscribe();

                resolve(user);

            }
        );

    });

}


// ========================================
// FORMAT MONEY
// ========================================

function formatMoney(amount) {

    return `₦${Number(amount || 0).toLocaleString("en-NG")}`;

}


// ========================================
// FORMAT DATE
// ========================================

function formatDate(dateValue) {

    if (!dateValue) {

        return "Date unavailable";

    }

    const date = new Date(dateValue);

    if (isNaN(date.getTime())) {

        return "Date unavailable";

    }

    return date.toLocaleString("en-NG", {

        day: "numeric",

        month: "short",

        year: "numeric",

        hour: "numeric",

        minute: "2-digit",

        hour12: true

    });

}


// ========================================
// UPDATE CART COUNT
// ========================================

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("rockydelishCart")
        ) || [];


    let totalQuantity = 0;


    cart.forEach((item) => {

        totalQuantity +=
            Number(item.quantity || 0);

    });


    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }

}


// ========================================
// GET CURRENT ORDER STATUS
// ========================================

function getStatusNumber(status) {

    const statusMap = {

        "Order Placed": 1,

        "Preparing": 2,

        "On the Way": 3,

        "Delivered": 4

    };


    return statusMap[status] || 1;

}


// ========================================
// CREATE TRACKING
// ========================================

function createTracking(status) {

    const currentStep =
        getStatusNumber(status);


    const steps = [

        {
            title: "Order Placed",
            icon: "fa-check"
        },

        {
            title: "Preparing",
            icon: "fa-fire-burner"
        },

        {
            title: "On the Way",
            icon: "fa-motorcycle"
        },

        {
            title: "Delivered",
            icon: "fa-house"
        }

    ];


    let trackingHTML = "";


    steps.forEach((step, index) => {

        const stepNumber =
            index + 1;


        const active =
            stepNumber <= currentStep
                ? "active"
                : "";


        trackingHTML += `

            <div class="tracking-step ${active}">

                <div class="step-icon">

                    <i class="fa-solid ${step.icon}"></i>

                </div>

                <span>
                    ${step.title}
                </span>

            </div>

        `;


        if (index < steps.length - 1) {

            const lineActive =
                stepNumber < currentStep
                    ? "active"
                    : "";


            trackingHTML += `

                <div class="progress-line ${lineActive}"></div>

            `;

        }

    });


    return trackingHTML;

}


// ========================================
// DISPLAY ORDER
// ========================================

function displayOrder(order) {

    const orderStatus =
        order.status || "Order Placed";


    const items =
        Array.isArray(order.items)
            ? order.items
            : [];


    // ====================================
    // FOOD ITEMS
    // ====================================

    let foodItemsHTML = "";


    items.forEach((item) => {

        const quantity =
            Number(item.quantity || 1);


        const price =
            Number(item.price || 0);


        const itemTotal =
            price * quantity;


        foodItemsHTML += `

            <div class="order-item">

                <div class="order-item-image">

                    <img
                        src="${item.image || "assets/placeholder.jpg"}"
                        alt="${item.name || "Food"}"
                    >

                </div>


                <div class="order-item-info">

                    <h3>
                        ${item.name || "Food Item"}
                    </h3>


                    <p>
                        Quantity: ${quantity}
                    </p>


                    <p>
                        ${formatMoney(price)} each
                    </p>

                </div>


                <div class="order-item-price">

                    ${formatMoney(itemTotal)}

                </div>

            </div>

        `;

    });


    // ====================================
    // CUSTOMER INFORMATION
    // ====================================

    const customer =
        order.customer || {};


    const fullName =
        customer.fullName || "Not provided";


    const phone =
        customer.phone || "Not provided";


    const address =
        customer.address || "Not provided";


    const city =
        customer.city || "Not provided";


    const additionalInfo =
        customer.additionalInfo || "";


    // ====================================
    // PAYMENT
    // ====================================

    const paymentMethod =
        order.paymentMethod ||
        "Not specified";


    let paymentStatus =
        order.paymentStatus;


    if (!paymentStatus) {

        if (
            paymentMethod ===
            "Cash on Delivery"
        ) {

            paymentStatus =
                "Payment Pending";

        } else {

            paymentStatus =
                "Payment Completed";

        }

    }


    // ====================================
    // TOTALS
    // ====================================

    const subtotal =
        Number(order.subtotal || 0);


    const deliveryFee =
        Number(order.deliveryFee || 0);


    const total =
        Number(
            order.total ||
            subtotal + deliveryFee
        );


    // ====================================
    // CANCEL BUTTON
    // ====================================

    let cancelButtonHTML = "";


    if (orderStatus === "Delivered") {

        cancelButtonHTML = `

            <button
                class="order-btn danger-btn"
                type="button"
                disabled
                title="Delivered orders cannot be cancelled"
            >

                <i class="fa-solid fa-lock"></i>

                Order Delivered

            </button>

        `;

    }

    else if (orderStatus === "Cancelled") {

        cancelButtonHTML = `

            <button
                class="order-btn danger-btn"
                type="button"
                disabled
            >

                <i class="fa-solid fa-ban"></i>

                Order Cancelled

            </button>

        `;

    }

    else {

        cancelButtonHTML = `

            <button
                class="order-btn danger-btn"
                type="button"
                data-action="cancel-order"
                data-order-id="${order.firestoreId}"
            >

                <i class="fa-solid fa-xmark"></i>

                Cancel Order

            </button>

        `;

    }


    // ====================================
    // CREATE ORDER ELEMENT
    // ====================================

    const orderElement =
        document.createElement("div");


    orderElement.className =
        "order-card";


    orderElement.innerHTML = `

        <!-- ================================= -->
        <!-- ORDER HEADER -->
        <!-- ================================= -->

        <div class="order-header">

            <div>

                <span class="order-label">
                    Order Number
                </span>


                <h2>
                    #${order.orderNumber || order.firestoreId}
                </h2>

            </div>


            <div class="order-date">

                <span>
                    Order Date
                </span>


                <strong>
                    ${formatDate(order.createdAt)}
                </strong>

            </div>

        </div>


        <!-- ================================= -->
        <!-- TRACKING -->
        <!-- ================================= -->

        <div class="tracking-section">

            <div class="tracking-heading">

                <div>

                    <span>
                        Order Tracking
                    </span>


                    <h3>
                        ${orderStatus}
                    </h3>

                </div>

            </div>


            <div class="tracking-progress">

                ${createTracking(orderStatus)}

            </div>

        </div>


        <!-- ================================= -->
        <!-- ORDER GRID -->
        <!-- ================================= -->

        <div class="order-grid">


            <!-- ================================= -->
            <!-- YOUR FOOD -->
            <!-- ================================= -->

            <div class="order-items-card">

                <div class="card-heading">

                    <h3>

                        <i class="fa-solid fa-utensils"></i>

                        Your Food

                    </h3>

                </div>


                <div class="order-items">

                    ${
                        foodItemsHTML ||

                        `
                        <p>
                            No food items found.
                        </p>
                        `
                    }

                </div>

            </div>


            <!-- ================================= -->
            <!-- DELIVERY DETAILS -->
            <!-- ================================= -->

            <div class="delivery-card">

                <div class="card-heading">

                    <h3>

                        <i class="fa-solid fa-location-dot"></i>

                        Delivery Details

                    </h3>

                </div>


                <!-- NAME -->

                <div class="delivery-detail">

                    <i class="fa-solid fa-user"></i>


                    <div>

                        <span>
                            Name
                        </span>


                        <strong>
                            ${fullName}
                        </strong>

                    </div>

                </div>


                <!-- PHONE -->

                <div class="delivery-detail">

                    <i class="fa-solid fa-phone"></i>


                    <div>

                        <span>
                            Phone
                        </span>


                        <strong>
                            ${phone}
                        </strong>

                    </div>

                </div>


                <!-- ADDRESS -->

                <div class="delivery-detail">

                    <i class="fa-solid fa-location-dot"></i>


                    <div>

                        <span>
                            Address
                        </span>


                        <strong>
                            ${address}
                        </strong>

                    </div>

                </div>


                <!-- CITY -->

                <div class="delivery-detail">

                    <i class="fa-solid fa-city"></i>


                    <div>

                        <span>
                            City
                        </span>


                        <strong>
                            ${city}
                        </strong>

                    </div>

                </div>


                <!-- EXTRA INFORMATION -->

                ${
                    additionalInfo

                        ? `

                        <div class="delivery-detail">

                            <i class="fa-solid fa-note-sticky"></i>


                            <div>

                                <span>
                                    Additional Information
                                </span>


                                <strong>
                                    ${additionalInfo}
                                </strong>

                            </div>

                        </div>

                        `

                        : ""
                }


                <!-- PAYMENT METHOD -->

                <div class="delivery-detail">

                    <i class="fa-solid fa-credit-card"></i>


                    <div>

                        <span>
                            Payment
                        </span>


                        <strong>
                            ${paymentMethod}
                        </strong>

                    </div>

                </div>


                <!-- PAYMENT STATUS -->

                <div class="delivery-detail">

                    <i class="fa-solid fa-circle-check"></i>


                    <div>

                        <span>
                            Payment Status
                        </span>


                        <strong>
                            ${paymentStatus}
                        </strong>

                    </div>

                </div>

            </div>

        </div>


        <!-- ================================= -->
        <!-- ORDER TOTAL -->
        <!-- ================================= -->

        <div class="order-total-card">

            <div class="card-heading">

                <h3>

                    <i class="fa-solid fa-receipt"></i>

                    Order Summary

                </h3>

            </div>


            <!-- SUBTOTAL -->

            <div class="total-row">

                <span>
                    Subtotal
                </span>


                <strong>
                    ${formatMoney(subtotal)}
                </strong>

            </div>


            <!-- DELIVERY -->

            <div class="total-row">

                <span>
                    Delivery Fee
                </span>


                <strong>
                    ${formatMoney(deliveryFee)}
                </strong>

            </div>


            <div class="total-line"></div>


            <!-- TOTAL -->

            <div class="total-row grand-total">

                <span>
                    Total
                </span>


                <strong>
                    ${formatMoney(total)}
                </strong>

            </div>

        </div>


        <!-- ================================= -->
        <!-- ACTION BUTTONS -->
        <!-- ================================= -->

        <div class="order-actions">


            <!-- ORDER AGAIN -->

            <button
                class="order-btn secondary-btn"
                type="button"
                data-action="order-again"
                data-order-id="${order.firestoreId}"
            >

                <i class="fa-solid fa-repeat"></i>

                Order Again

            </button>


            <!-- CANCEL -->

            ${cancelButtonHTML}


        </div>

    `;


    ordersContainer.appendChild(orderElement);

}


// ========================================
// SHOW NO ORDERS
// ========================================

function showNoOrders() {

    noOrders.style.display =
        "block";


    ordersContainer.style.display =
        "none";


    ordersContainer.innerHTML =
        "";

}


// ========================================
// SHOW ORDERS
// ========================================

function showOrders() {

    noOrders.style.display =
        "none";


    ordersContainer.style.display =
        "block";

}


// ========================================
// LOAD ORDERS
// ========================================

async function loadOrders() {

    try {

        const user =
            await getCurrentUser();


        // ====================================
        // NOT LOGGED IN
        // ====================================

        if (!user) {

            await Swal.fire({

                icon: "warning",

                title: "Login Required",

                text:
                    "Please login to view your orders.",

                confirmButtonColor:
                    "#fc8a06"

            });


            window.location.href =
                "login.html?redirect=orders.html";


            return;

        }


        // ====================================
        // FIRESTORE QUERY
        // ====================================

        const ordersQuery =
            query(

                collection(
                    db,
                    "orders"
                ),


                where(
                    "userId",
                    "==",
                    user.uid
                ),


                orderBy(
                    "createdAt",
                    "desc"
                )

            );


        const snapshot =
            await getDocs(
                ordersQuery
            );


        // ====================================
        // NO ORDERS
        // ====================================

        if (snapshot.empty) {

            showNoOrders();

            return;

        }


        // ====================================
        // SHOW ORDERS
        // ====================================

        showOrders();


        ordersContainer.innerHTML =
            "";


        snapshot.forEach(
            (documentSnapshot) => {

                const order =
                    documentSnapshot.data();


                displayOrder({

                    ...order,

                    firestoreId:
                        documentSnapshot.id

                });

            }
        );


    }

    catch (error) {

        console.error(
            "Error loading orders:",
            error
        );


        Swal.fire({

            icon: "error",

            title:
                "Unable to Load Orders",

            text:
                "Something went wrong while loading your orders.",

            confirmButtonColor:
                "#fc8a06"

        });

    }

}


// ========================================
// ORDER MORE FOOD
// ========================================

if (orderMoreBtn) {

    orderMoreBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                "products.html";

        }
    );

}


// ========================================
// ORDER ACTIONS
// ========================================

ordersContainer.addEventListener(
    "click",
    async (event) => {

        const button =
            event.target.closest("button");


        if (!button) {

            return;

        }


        const action =
            button.dataset.action;


        const orderId =
            button.dataset.orderId;


        // ==================================
        // ORDER AGAIN
        // ==================================

        if (action === "order-again") {

            try {

                // ==================================
                // GET CURRENT USER
                // ==================================

                const user =
                    await getCurrentUser();


                if (!user) {

                    await Swal.fire({

                        icon: "warning",

                        title:
                            "Login Required",

                        text:
                            "Please login to order again.",

                        confirmButtonColor:
                            "#fc8a06"

                    });

                    return;

                }


                // ==================================
                // GET ORDER
                // ==================================

                const orderRef =
                    doc(
                        db,
                        "orders",
                        orderId
                    );


                const orderSnapshot =
                    await getDoc(
                        orderRef
                    );


                if (!orderSnapshot.exists()) {

                    await Swal.fire({

                        icon: "error",

                        title:
                            "Order Not Found",

                        text:
                            "This order could not be found.",

                        confirmButtonColor:
                            "#fc8a06"

                    });

                    return;

                }


                const order =
                    orderSnapshot.data();


                // ==================================
                // CHECK OWNER
                // ==================================

                if (
                    order.userId !==
                    user.uid
                ) {

                    await Swal.fire({

                        icon: "error",

                        title:
                            "Access Denied",

                        text:
                            "You cannot reorder this order.",

                        confirmButtonColor:
                            "#fc8a06"

                    });

                    return;

                }


                // ==================================
                // GET ORDER ITEMS
                // ==================================

                const orderedItems =
                    Array.isArray(order.items)
                        ? order.items
                        : [];


                if (
                    orderedItems.length ===
                    0
                ) {

                    await Swal.fire({

                        icon: "info",

                        title:
                            "No Items Found",

                        text:
                            "There are no food items in this order.",

                        confirmButtonColor:
                            "#fc8a06"

                    });

                    return;

                }


                // ==================================
                // GET CURRENT CART
                // ==================================

                let cart =
                    JSON.parse(
                        localStorage.getItem(
                            "rockydelishCart"
                        )
                    ) || [];


                // ==================================
                // ADD ITEMS TO CART
                // ==================================

                orderedItems.forEach(
                    (orderedItem) => {

                        const existingItem =
                            cart.find(
                                (cartItem) =>
                                    String(
                                        cartItem.id
                                    ) ===
                                    String(
                                        orderedItem.id
                                    )
                            );


                        // ==================================
                        // ITEM ALREADY IN CART
                        // ==================================

                        if (existingItem) {

                            existingItem.quantity =
                                Number(
                                    existingItem.quantity ||
                                    0
                                ) +

                                Number(
                                    orderedItem.quantity ||
                                    1
                                );

                        }


                        // ==================================
                        // NEW ITEM
                        // ==================================

                        else {

                            cart.push({

                                ...orderedItem,

                                quantity:
                                    Number(
                                        orderedItem.quantity ||
                                        1
                                    )

                            });

                        }

                    }
                );


                // ==================================
                // SAVE CART
                // ==================================

                localStorage.setItem(

                    "rockydelishCart",

                    JSON.stringify(cart)

                );


                // ==================================
                // UPDATE CART COUNT
                // ==================================

                updateCartCount();


                // ==================================
                // SUCCESS MESSAGE
                // ==================================

                const result =
                    await Swal.fire({

                        icon: "success",

                        title:
                            "Added to Cart!",

                        text:
                            "Your previous order has been added to your cart.",

                        showCancelButton:
                            true,

                        confirmButtonText:
                            "Go to Cart",

                        cancelButtonText:
                            "Continue Shopping",

                        confirmButtonColor:
                            "#fc8a06",

                        cancelButtonColor:
                            "#071426"

                    });


                // ==================================
                // GO TO CART
                // ==================================

                if (
                    result.isConfirmed
                ) {

                    window.location.href =
                        "cart.html";

                }

            }

            catch (error) {

                console.error(
                    "Error ordering again:",
                    error
                );


                await Swal.fire({

                    icon: "error",

                    title:
                        "Order Again Failed",

                    text:
                        "Something went wrong while adding your previous order to the cart.",

                    confirmButtonColor:
                        "#fc8a06"

                });

            }


            return;

        }


        // ==================================
        // CANCEL ORDER
        // ==================================

        if (action === "cancel-order") {

            try {

                // ==================================
                // GET CURRENT USER
                // ==================================

                const user =
                    await getCurrentUser();


                if (!user) {

                    await Swal.fire({

                        icon: "warning",

                        title:
                            "Login Required",

                        text:
                            "Please login to cancel your order.",

                        confirmButtonColor:
                            "#fc8a06"

                    });

                    return;

                }


                // ==================================
                // GET LATEST ORDER
                // ==================================

                const orderRef =
                    doc(
                        db,
                        "orders",
                        orderId
                    );


                const orderSnapshot =
                    await getDoc(
                        orderRef
                    );


                if (!orderSnapshot.exists()) {

                    await Swal.fire({

                        icon: "error",

                        title:
                            "Order Not Found",

                        text:
                            "This order could not be found.",

                        confirmButtonColor:
                            "#fc8a06"

                    });

                    return;

                }


                const latestOrder =
                    orderSnapshot.data();


                // ==================================
                // CHECK ORDER OWNER
                // ==================================

                if (
                    latestOrder.userId !==
                    user.uid
                ) {

                    await Swal.fire({

                        icon: "error",

                        title:
                            "Access Denied",

                        text:
                            "You cannot cancel this order.",

                        confirmButtonColor:
                            "#fc8a06"

                    });

                    return;

                }


                // ==================================
                // CHECK DELIVERED
                // ==================================

                if (
                    latestOrder.status ===
                    "Delivered"
                ) {

                    await Swal.fire({

                        icon: "info",

                        title:
                            "Order Already Delivered",

                        text:
                            "A delivered order cannot be cancelled.",

                        confirmButtonColor:
                            "#fc8a06"

                    });

                    return;

                }


                // ==================================
                // CHECK CANCELLED
                // ==================================

                if (
                    latestOrder.status ===
                    "Cancelled"
                ) {

                    await Swal.fire({

                        icon: "info",

                        title:
                            "Order Already Cancelled",

                        text:
                            "This order has already been cancelled.",

                        confirmButtonColor:
                            "#fc8a06"

                    });

                    return;

                }


                // ==================================
                // CONFIRM
                // ==================================

                const confirmation =
                    await Swal.fire({

                        icon: "warning",

                        title:
                            "Cancel Order?",

                        text:
                            "Are you sure you want to cancel this order?",

                        showCancelButton:
                            true,

                        confirmButtonText:
                            "Yes, Cancel Order",

                        cancelButtonText:
                            "No, Keep Order",

                        confirmButtonColor:
                            "#dc3545",

                        cancelButtonColor:
                            "#071426"

                    });


                if (
                    !confirmation.isConfirmed
                ) {

                    return;

                }


                // ==================================
                // UPDATE FIRESTORE
                // ==================================

                await updateDoc(

                    orderRef,

                    {
                        status:
                            "Cancelled"
                    }

                );


                // ==================================
                // SUCCESS
                // ==================================

                await Swal.fire({

                    icon: "success",

                    title:
                        "Order Cancelled",

                    text:
                        "Your order has been cancelled successfully.",

                    confirmButtonColor:
                        "#fc8a06"

                });


                // ==================================
                // RELOAD ORDERS
                // ==================================

                await loadOrders();

            }

            catch (error) {

                console.error(
                    "Error cancelling order:",
                    error
                );


                await Swal.fire({

                    icon: "error",

                    title:
                        "Cancellation Failed",

                    text:
                        "We could not cancel your order. Please try again.",

                    confirmButtonColor:
                        "#fc8a06"

                });

            }


            return;

        }

    }
);


// ========================================
// MOBILE NAVIGATION
// ========================================

if (
    menuBtn &&
    navRight
) {

    menuBtn.addEventListener(
        "click",
        () => {

            navRight.classList.toggle(
                "active"
            );

        }
    );

}


// ========================================
// START
// ========================================

updateCartCount();

loadOrders();