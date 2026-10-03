// ==========================================
// ROCKYDELISH CART
// ==========================================


// ==========================================
// VARIABLES
// ==========================================

const cartItemsContainer =
    document.getElementById("cartItems");

const emptyCart =
    document.getElementById("emptyCart");

const subtotalElement =
    document.getElementById("subtotal");

const deliveryFeeElement =
    document.getElementById("deliveryFee");

const totalElement =
    document.getElementById("total");

const cartCountElement =
    document.getElementById("cartCount");

const itemsCountElement =
    document.getElementById("itemsCount");

const checkoutBtn =
    document.getElementById("checkoutBtn");


// ==========================================
// GET CART
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
            "Error reading cart:",
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
// FORMAT MONEY
// ==========================================

function formatMoney(amount) {

    return `₦${Number(amount).toLocaleString()}`;

}


// ==========================================
// COMPARE FOOD IDs
// ==========================================

function sameId(id1, id2) {

    return String(id1) === String(id2);

}


// ==========================================
// UPDATE CART COUNT
// ==========================================

function updateCartCount(cart) {

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + Number(item.quantity || 0),
            0
        );


    if (cartCountElement) {

        cartCountElement.textContent =
            totalItems;

    }


    if (itemsCountElement) {

        itemsCountElement.textContent =
            `${totalItems} ${
                totalItems === 1
                    ? "item"
                    : "items"
            }`;

    }

}


// ==========================================
// CALCULATE SUBTOTAL
// ==========================================

function calculateSubtotal(cart) {

    return cart.reduce(
        (total, item) =>
            total +
            (
                Number(item.price || 0) *
                Number(item.quantity || 0)
            ),
        0
    );

}


// ==========================================
// DISPLAY CART
// ==========================================

function displayCart() {

    const cart = getCart();


    if (!cartItemsContainer) {
        return;
    }


    cartItemsContainer.innerHTML = "";


    // ======================================
    // EMPTY CART
    // ======================================

    if (cart.length === 0) {

        cartItemsContainer.style.display =
            "none";


        if (emptyCart) {

            emptyCart.style.display =
                "flex";

        }


        if (subtotalElement) {

            subtotalElement.textContent =
                "₦0";

        }


        if (deliveryFeeElement) {

            deliveryFeeElement.textContent =
                "₦0";

        }


        if (totalElement) {

            totalElement.textContent =
                "₦0";

        }


        updateCartCount(cart);

        return;

    }


    // ======================================
    // CART HAS ITEMS
    // ======================================

    cartItemsContainer.style.display =
        "flex";


    if (emptyCart) {

        emptyCart.style.display =
            "none";

    }


    cart.forEach(item => {

        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        const price =
            Number(item.price || 0);


        const quantity =
            Number(item.quantity || 0);


        cartItem.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

            </div>


            <div class="cart-item-details">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${formatMoney(price)}
                </p>

            </div>


            <div class="cart-item-actions">

                <div class="quantity-control">

                    <button
                        type="button"
                        class="quantity-btn decrease-btn"
                        data-id="${item.id}"
                    >
                        −
                    </button>


                    <span>
                        ${quantity}
                    </span>


                    <button
                        type="button"
                        class="quantity-btn increase-btn"
                        data-id="${item.id}"
                    >
                        +
                    </button>

                </div>


                <strong class="item-total">

                    ${formatMoney(
                        price * quantity
                    )}

                </strong>


                <button
                    type="button"
                    class="remove-btn"
                    data-id="${item.id}"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>

        `;


        cartItemsContainer.appendChild(
            cartItem
        );

    });


    updateCartTotal(cart);

    updateCartCount(cart);

    addCartEvents();

}


// ==========================================
// UPDATE CART TOTAL
// ==========================================

function updateCartTotal(cart) {

    const subtotal =
        calculateSubtotal(cart);


    // Temporary delivery fee

    const deliveryFee =
        subtotal > 0
            ? 1000
            : 0;


    const total =
        subtotal + deliveryFee;


    if (subtotalElement) {

        subtotalElement.textContent =
            formatMoney(subtotal);

    }


    if (deliveryFeeElement) {

        deliveryFeeElement.textContent =
            formatMoney(deliveryFee);

    }


    if (totalElement) {

        totalElement.textContent =
            formatMoney(total);

    }

}


// ==========================================
// ADD CART EVENTS
// ==========================================

function addCartEvents() {


    // ======================================
    // PLUS
    // ======================================

    document
        .querySelectorAll(".increase-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    /*
                     IMPORTANT:
                     Do NOT use Number() here.

                     This allows IDs such as:
                     1
                     2
                     cr-1
                     fc-3
                     kfc-1
                     dp-2
                    */

                    const id =
                        button.dataset.id;


                    increaseItem(id);

                }
            );

        });


    // ======================================
    // MINUS
    // ======================================

    document
        .querySelectorAll(".decrease-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.id;


                    decreaseItem(id);

                }
            );

        });


    // ======================================
    // REMOVE
    // ======================================

    document
        .querySelectorAll(".remove-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.id;


                    removeItem(id);

                }
            );

        });

}


// ==========================================
// INCREASE ITEM
// ==========================================

function increaseItem(id) {

    const cart =
        getCart();


    const item =
        cart.find(
            item =>
                sameId(item.id, id)
        );


    if (!item) {

        console.log(
            "Item not found:",
            id
        );

        return;

    }


    item.quantity =
        Number(item.quantity || 0) + 1;


    saveCart(cart);

    displayCart();

}


// ==========================================
// DECREASE ITEM
// ==========================================

function decreaseItem(id) {

    const cart =
        getCart();


    const item =
        cart.find(
            item =>
                sameId(item.id, id)
        );


    if (!item) {

        console.log(
            "Item not found:",
            id
        );

        return;

    }


    item.quantity =
        Number(item.quantity || 0) - 1;


    // ======================================
    // REMOVE WHEN QUANTITY REACHES 0
    // ======================================

    if (item.quantity <= 0) {

        const itemIndex =
            cart.findIndex(
                item =>
                    sameId(item.id, id)
            );


        if (itemIndex !== -1) {

            cart.splice(
                itemIndex,
                1
            );

        }

    }


    saveCart(cart);

    displayCart();

}


// ==========================================
// REMOVE ITEM
// ==========================================

function removeItem(id) {

    const cart =
        getCart();


    const updatedCart =
        cart.filter(
            item =>
                !sameId(item.id, id)
        );


    saveCart(updatedCart);

    displayCart();

}


// ==========================================
// CHECKOUT
// ==========================================

if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        () => {

            const cart =
                getCart();


            if (cart.length === 0) {

                Swal.fire({

                    icon: "info",

                    title:
                        "Your cart is empty",

                    text:
                        "Please add some food before checking out.",

                    confirmButtonColor:
                        "#fc8a06"

                });

                return;

            }


            window.location.href =
                "checkout.html";

        }
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
// START
// ==========================================

displayCart();