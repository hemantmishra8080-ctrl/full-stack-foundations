// ==========================================
// MYNTRA CLONE - JAVASCRIPT
// ==========================================


// 1. SELECT ELEMENTS

const searchInput = document.querySelector(".search input");

const productCards = document.querySelectorAll(".product-card");

const cartButtons = document.querySelectorAll(".add-cart");

const wishlistButtons = document.querySelectorAll(".wishlist");

const cartIcon = document.querySelector(".user-actions div:nth-child(3)");

const wishlistIcon = document.querySelector(".user-actions div:nth-child(2)");


// 2. CART AND WISHLIST ARRAYS

let cart = JSON.parse(localStorage.getItem("myntraCart")) || [];

let wishlist = JSON.parse(localStorage.getItem("myntraWishlist")) || [];


// 3. UPDATE CART COUNT

function updateCartCount() {

    let count = document.querySelector(".cart-count");

    if (!count) {

        count = document.createElement("span");

        count.className = "cart-count";

        cartIcon.appendChild(count);

    }

    count.textContent = cart.length;

}


// 4. SAVE DATA

function saveData() {

    localStorage.setItem("myntraCart", JSON.stringify(cart));

    localStorage.setItem("myntraWishlist", JSON.stringify(wishlist));

}


// 5. ADD PRODUCT TO CART

cartButtons.forEach((button, index) => {

    button.addEventListener("click", function() {

        const product = productCards[index];

        const name = product.querySelector(
            ".product-details h3"
        ).textContent;

        const price = product.querySelector(
            ".product-price"
        ).textContent;

        cart.push({
            name: name,
            price: price
        });

        saveData();

        updateCartCount();

        alert(name + " added successfully to your bag!");

    });

});


// 6. WISHLIST FUNCTIONALITY

wishlistButtons.forEach((button, index) => {

    const name = productCards[index].querySelector(
        ".product-details h3"
    ).textContent;

    if (wishlist.some(item => item.name === name)) {

        button.textContent = "♥";

        button.style.color = "#ff3f6c";

    }

    button.addEventListener("click", function() {

        const existingIndex = wishlist.findIndex(
            item => item.name === name
        );

        if (existingIndex === -1) {

            wishlist.push({
                name: name
            });

            button.textContent = "♥";

            button.style.color = "#ff3f6c";

            alert(name + " added to Wishlist!");

        } else {

            wishlist.splice(existingIndex, 1);

            button.textContent = "♡";

            button.style.color = "#282c3f";

            alert(name + " removed from Wishlist!");

        }

        saveData();

    });

});


// 7. SEARCH PRODUCTS

searchInput.addEventListener("input", function() {

    const searchValue = this.value.toLowerCase().trim();

    productCards.forEach(card => {

        const name = card.querySelector(
            ".product-details h3"
        ).textContent.toLowerCase();

        const description = card.querySelector(
            ".product-details p"
        ).textContent.toLowerCase();

        const isMatch =
            name.includes(searchValue) ||
            description.includes(searchValue);

        card.style.display = isMatch ? "block" : "none";

    });

});


// 8. DISPLAY CART

cartIcon.addEventListener("click", function() {

    if (cart.length === 0) {

        alert("Your shopping bag is empty!");

        return;

    }

    let message = "YOUR SHOPPING BAG\n\n";

    cart.forEach((item, index) => {

        message += `${index + 1}. ${item.name} - ${item.price}\n`;

    });

    message += `\nTotal Items: ${cart.length}`;

    alert(message);

});


// 9. DISPLAY WISHLIST

wishlistIcon.addEventListener("click", function() {

    if (wishlist.length === 0) {

        alert("Your wishlist is empty!");

        return;

    }

    let message = "YOUR WISHLIST\n\n";

    wishlist.forEach((item, index) => {

        message += `${index + 1}. ${item.name}\n`;

    });

    alert(message);

});


// 10. CATEGORY NAVIGATION

document.querySelectorAll(".navbar nav a").forEach(link => {

    link.addEventListener("click", function() {

        const category = this.textContent.trim().toLowerCase();

        const target = document.getElementById(category);

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// 11. INITIALIZE WEBSITE

updateCartCount();

console.log("Myntra Clone Loaded Successfully!");