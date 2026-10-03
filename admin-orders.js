// ==========================================
// ADMIN ORDERS
// ==========================================

import {
    adminAuth,
    adminDb,
    adminAuthPersistence
} from "./admin-firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    collection,
    getDocs,
    query,
    updateDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// ==========================================
// ADMIN EMAIL
// ==========================================

const ADMIN_EMAIL = "belloolamide957@gmail.com";


// ==========================================
// DOM ELEMENT
// ==========================================

const ordersContainer =
    document.getElementById("ordersContainer");


// ==========================================
// CHECK ADMIN LOGIN
// ==========================================

async function checkAdmin() {

    // Wait for Firebase admin persistence
    await adminAuthPersistence;


    onAuthStateChanged(
        adminAuth,
        async (user) => {

            // ======================================
            // NO ADMIN LOGIN
            // ======================================

            if (!user) {

                window.location.href =
                    "admin-login.html";

                return;
            }


            console.log(
                "Admin user:",
                user.email
            );


            // ======================================
            // CHECK ADMIN EMAIL
            // ======================================

            if (user.email !== ADMIN_EMAIL) {

                await Swal.fire({

                    icon: "error",

                    title: "Access Denied",

                    text:
                        "This account is not authorized to access the admin panel.",

                    confirmButtonColor:
                        "#fc8a06"

                });


                // Sign out from ADMIN authentication
                await adminAuth.signOut();


                // Return to admin login
                window.location.href =
                    "admin-login.html";

                return;
            }


            // ======================================
            // ADMIN IS AUTHORIZED
            // ======================================

            console.log(
                "Admin access granted."
            );


            loadOrders();

        }
    );
}


// ==========================================
// LOAD ALL ORDERS
// ==========================================

async function loadOrders() {

    try {

        // Make sure the container exists
        if (!ordersContainer) {

            console.error(
                "ordersContainer was not found."
            );

            return;
        }


        // Show loading message
        ordersContainer.innerHTML = `

            <div class="empty">

                <i
                    class="fa-solid fa-spinner fa-spin"
                    style="
                        font-size: 35px;
                        color: #fc8a06;
                        margin-bottom: 15px;
                    "
                ></i>

                <h2>
                    Loading Orders...
                </h2>

                <p>
                    Please wait while we load customer orders.
                </p>

            </div>

        `;


        // ======================================
        // GET ORDERS FROM FIRESTORE
        // ======================================

        const ordersQuery = query(
            collection(adminDb, "orders")
        );


        const snapshot =
            await getDocs(ordersQuery);


        console.log(
            "Number of orders:",
            snapshot.size
        );


        // ======================================
        // NO ORDERS
        // ======================================

        if (snapshot.empty) {

            ordersContainer.innerHTML = `

                <div class="empty">

                    <i
                        class="fa-solid fa-receipt"
                        style="
                            font-size: 45px;
                            color: #fc8a06;
                            margin-bottom: 15px;
                        "
                    ></i>

                    <h2>
                        No Orders Yet
                    </h2>

                    <p>
                        There are currently no customer orders.
                    </p>

                </div>

            `;

            return;
        }


        // ======================================
        // CLEAR LOADING
        // ======================================

        ordersContainer.innerHTML = "";


        // ======================================
        // DISPLAY ORDERS
        // ======================================

        snapshot.forEach(
            (orderDocument) => {

                const order =
                    orderDocument.data();


                console.log(
                    "Order:",
                    order
                );


                displayOrder({

                    ...order,

                    id: orderDocument.id

                });

            }
        );


    } catch (error) {

        console.error(
            "Error loading orders:",
            error
        );


        if (ordersContainer) {

            ordersContainer.innerHTML = `

                <div class="empty">

                    <i
                        class="fa-solid fa-circle-exclamation"
                        style="
                            font-size: 45px;
                            color: #e74c3c;
                            margin-bottom: 15px;
                        "
                    ></i>

                    <h2>
                        Unable to Load Orders
                    </h2>

                    <p>
                        ${error.message}
                    </p>

                </div>

            `;

        }

    }

}


// ==========================================
// DISPLAY ORDER
// ==========================================

function displayOrder(order) {

    if (!ordersContainer) {
        return;
    }


    // ======================================
    // CUSTOMER INFORMATION
    // ======================================

    const customer =
        order.customer || {};


    // ======================================
    // ORDER ITEMS
    // ======================================

    const items =
        Array.isArray(order.items)
            ? order.items
            : [];


    let itemsHTML = "";


    items.forEach(
        (item) => {

            const quantity =
                Number(item.quantity || 1);


            const price =
                Number(item.price || 0);


            const itemTotal =
                price * quantity;


            itemsHTML += `

                <div class="item">

                    <span>

                        ${item.name || "Food Item"}

                        × ${quantity}

                    </span>


                    <strong>

                        ₦${itemTotal.toLocaleString("en-NG")}

                    </strong>

                </div>

            `;

        }
    );


    // ======================================
    // ORDER CARD
    // ======================================

    const orderCard =
        document.createElement("div");


    orderCard.className =
        "admin-order";


    orderCard.innerHTML = `

        <!-- ORDER HEADER -->

        <div class="order-top">

            <div>

                <p>
                    Order Number
                </p>

                <h2>

                    #${order.orderNumber || order.id}

                </h2>

            </div>


            <div>

                <p>
                    Current Status
                </p>

                <strong>

                    ${order.status || "Order Placed"}

                </strong>

            </div>

        </div>


        <!-- CUSTOMER INFORMATION -->

        <div class="customer-info">

            <h3>

                <i class="fa-solid fa-user"></i>

                Customer Information

            </h3>


            <p>

                <strong>Name:</strong>

                ${customer.fullName || "Not provided"}

            </p>


            <p>

                <strong>Email:</strong>

                ${customer.email || "Not provided"}

            </p>


            <p>

                <strong>Phone:</strong>

                ${customer.phone || "Not provided"}

            </p>


            <p>

                <strong>Address:</strong>

                ${customer.address || "Not provided"}

            </p>


            <p>

                <strong>City:</strong>

                ${customer.city || "Not provided"}

            </p>


            ${
                customer.additionalInfo
                    ? `
                        <p>

                            <strong>
                                Additional Information:
                            </strong>

                            ${customer.additionalInfo}

                        </p>
                    `
                    : ""
            }

        </div>


        <!-- FOOD ORDERED -->

        <div class="items">

            <h3>

                <i class="fa-solid fa-utensils"></i>

                Food Ordered

            </h3>


            ${
                itemsHTML ||
                "<p>No food items found.</p>"
            }

        </div>


        <!-- PAYMENT -->

        <div class="customer-info">

            <h3>

                <i class="fa-solid fa-credit-card"></i>

                Payment Information

            </h3>


            <p>

                <strong>
                    Payment Method:
                </strong>

                ${order.paymentMethod || "Not specified"}

            </p>


            <p>

                <strong>
                    Payment Status:
                </strong>

                ${
                    order.paymentStatus ||
                    (
                        order.paymentMethod ===
                        "Cash on Delivery"
                            ? "Payment Pending"
                            : "Payment Completed"
                    )
                }

            </p>

        </div>


        <!-- TOTAL -->

        <div class="total">

            <span>
                Total
            </span>


            <strong>

                ₦${Number(
                    order.total || 0
                ).toLocaleString("en-NG")}

            </strong>

        </div>


        <!-- STATUS -->

        <div class="status-box">

            <label>
                Update Order Status
            </label>


            <select
                class="status-select"
                data-order-id="${order.id}"
            >

                <option
                    value="Order Placed"
                    ${
                        order.status ===
                        "Order Placed"
                            ? "selected"
                            : ""
                    }
                >
                    Order Placed
                </option>


                <option
                    value="Preparing"
                    ${
                        order.status ===
                        "Preparing"
                            ? "selected"
                            : ""
                    }
                >
                    Preparing
                </option>


                <option
                    value="On the Way"
                    ${
                        order.status ===
                        "On the Way"
                            ? "selected"
                            : ""
                    }
                >
                    On the Way
                </option>


                <option
                    value="Delivered"
                    ${
                        order.status ===
                        "Delivered"
                            ? "selected"
                            : ""
                    }
                >
                    Delivered
                </option>

            </select>


            <button
                type="button"
                class="update-btn"
                data-order-id="${order.id}"
            >

                <i class="fa-solid fa-rotate"></i>

                Update Status

            </button>

        </div>

    `;


    ordersContainer.appendChild(
        orderCard
    );

}


// ==========================================
// UPDATE ORDER STATUS
// ==========================================

if (ordersContainer) {

    ordersContainer.addEventListener(
        "click",
        async (event) => {

            const button =
                event.target.closest(
                    ".update-btn"
                );


            // Not an update button
            if (!button) {
                return;
            }


            const orderId =
                button.dataset.orderId;


            const orderCard =
                button.closest(
                    ".admin-order"
                );


            if (!orderCard) {
                return;
            }


            const select =
                orderCard.querySelector(
                    ".status-select"
                );


            if (!select) {
                return;
            }


            const newStatus =
                select.value;


            try {

                // Disable button
                button.disabled = true;


                button.innerHTML = `

                    <i
                        class="fa-solid fa-spinner fa-spin"
                    ></i>

                    Updating...

                `;


                // ==================================
                // UPDATE FIRESTORE
                // ==================================

                await updateDoc(

                    doc(
                        adminDb,
                        "orders",
                        orderId
                    ),

                    {
                        status: newStatus
                    }

                );


                // ==================================
                // UPDATE SCREEN
                // ==================================

                const currentStatus =
                    orderCard.querySelector(
                        ".order-top strong"
                    );


                if (currentStatus) {

                    currentStatus.textContent =
                        newStatus;

                }


                // ==================================
                // SUCCESS MESSAGE
                // ==================================

                await Swal.fire({

                    icon: "success",

                    title: "Status Updated",

                    text:
                        `Order status changed to "${newStatus}".`,

                    confirmButtonColor:
                        "#fc8a06",

                    timer: 1800,

                    showConfirmButton: false

                });


            } catch (error) {

                console.error(
                    "Error updating order:",
                    error
                );


                // ==================================
                // ERROR MESSAGE
                // ==================================

                await Swal.fire({

                    icon: "error",

                    title: "Update Failed",

                    text:
                        error.message,

                    confirmButtonColor:
                        "#fc8a06"

                });

            } finally {

                // Re-enable button
                button.disabled = false;


                button.innerHTML = `

                    <i class="fa-solid fa-rotate"></i>

                    Update Status

                `;

            }

        }
    );

}


// ==========================================
// START ADMIN PAGE
// ==========================================

checkAdmin();