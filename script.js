// ===== product data =====
// IMAGE NOTE: I could not use real celebrity photos directly.
// Download the photos from social media / Google and save them in the "images" folder
// with the same names written below (for example images/ranveer1.jpg).
// If you use a different file name, just change it in the "img" line.

var products = [
  {
    id: 1,
    name: "Bold Printed Jacket",
    star: "Ranveer Singh Style",
    price: 2499,
    category: "men",
    img: "ranveer1.jpg"   // ADD IMAGE: Ranveer Singh in jacket
  },
  {
    id: 2,
    name: "Classic Black Suit",
    star: "Shah Rukh Khan Style",
    price: 5999,
    category: "men",
    img: "images/srk.jpg"        // ADD IMAGE: Shah Rukh Khan in suit
  },
  {
    id: 3,
    name: "Casual Denim Shirt",
    star: "Ranbir Kapoor Style",
    price: 1299,
    category: "men",
    img: "images/ranbir.jpg"     // ADD IMAGE: Ranbir Kapoor in denim
  },
  {
    id: 4,
    name: "Street Style Hoodie",
    star: "Ranveer Singh Style",
    price: 1799,
    category: "men",
    img: "images/ranveer2.jpg"   // ADD IMAGE: Ranveer Singh in hoodie
  },
  {
    id: 5,
    name: "Floral Summer Dress",
    star: "Alia Bhatt Style",
    price: 1999,
    category: "women",
    img: "images/alia.jpg"       // ADD IMAGE: Alia Bhatt in dress
  },
  {
    id: 6,
    name: "Elegant Red Saree",
    star: "Deepika Padukone Style",
    price: 3499,
    category: "women",
    img: "images/deepika.jpg"    // ADD IMAGE: Deepika Padukone in saree
  },
  {
    id: 7,
    name: "Chic Co-ord Set",
    star: "Kiara Advani Style",
    price: 2299,
    category: "women",
    img: "images/kiara.jpg"      // ADD IMAGE: Kiara Advani in co-ord set
  },
  {
    id: 8,
    name: "Party Wear Kurta",
    star: "Ranveer Singh Style",
    price: 2799,
    category: "men",
    img: "images/ranveer3.jpg"   // ADD IMAGE: Ranveer Singh in kurta
  }
];

// cart is an empty array at the start
var cart = [];

// getting elements from html
var productGrid = document.getElementById("product-grid");
var cartPanel = document.getElementById("cart-panel");
var cartItemsDiv = document.getElementById("cart-items");
var cartCount = document.getElementById("cart-count");
var cartTotal = document.getElementById("cart-total");

// ===== show products on the page =====
function showProducts(category) {
  productGrid.innerHTML = "";

  for (var i = 0; i < products.length; i++) {
    var p = products[i];

    // show only the selected category
    if (category == "all" || p.category == category) {
      productGrid.innerHTML +=
        '<div class="card">' +
        '<img src="' + p.img + '" alt="' + p.name + '">' +
        '<div class="card-info">' +
        '<h4>' + p.name + '</h4>' +
        '<p class="star">' + p.star + '</p>' +
        '<p class="price">Rs. ' + p.price + '</p>' +
        '<button class="add-btn" onclick="addToCart(' + p.id + ')">Add to Cart</button>' +
        '</div>' +
        '</div>';
    }
  }
}

// ===== toast message =====
var toast = document.getElementById("toast");
var toastTimer; // used to hide the toast after some time

function showToast(product) {
  document.getElementById("toast-img").src = product.img;
  document.getElementById("toast-text").innerText = product.name + " is added to your cart";

  toast.classList.add("show");

  // make the cart button jump
  var cartBtn = document.getElementById("cart-btn");
  cartBtn.classList.remove("bump");
  void cartBtn.offsetWidth; // small trick to restart the animation
  cartBtn.classList.add("bump");

  // hide the toast after 2.5 seconds
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 2500);
}

// ===== add item to cart =====
function addToCart(id) {
  // find the product and show the message
  for (var k = 0; k < products.length; k++) {
    if (products[k].id == id) {
      showToast(products[k]);
    }
  }

  // check if the item is already in cart
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      cart[i].qty++;
      updateCart();
      return;
    }
  }

  // if not in cart, find the product and add it
  for (var j = 0; j < products.length; j++) {
    if (products[j].id == id) {
      cart.push({
        id: products[j].id,
        name: products[j].name,
        price: products[j].price,
        img: products[j].img,
        qty: 1
      });
    }
  }
  updateCart();
}

// ===== increase / decrease / remove =====
function changeQty(id, amount) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      cart[i].qty += amount;
      if (cart[i].qty <= 0) {
        cart.splice(i, 1); // remove item when quantity is 0
      }
      break;
    }
  }
  updateCart();
}

// ===== update cart panel, count and total =====
function updateCart() {
  cartItemsDiv.innerHTML = "";
  var total = 0;
  var count = 0;

  if (cart.length == 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
  }

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    total += item.price * item.qty;
    count += item.qty;

    cartItemsDiv.innerHTML +=
      '<div class="cart-item">' +
      '<img src="' + item.img + '" alt="' + item.name + '">' +
      '<div>' + item.name + '<br>Rs. ' + item.price + ' x ' + item.qty + '</div>' +
      '<button onclick="changeQty(' + item.id + ', -1)">-</button>' +
      '<button onclick="changeQty(' + item.id + ', 1)">+</button>' +
      '</div>';
  }

  cartCount.innerText = count;
  cartTotal.innerText = total;
}

// ===== filter buttons =====
var filterButtons = document.getElementsByClassName("filter-btn");

for (var i = 0; i < filterButtons.length; i++) {
  filterButtons[i].onclick = function () {
    // remove active from all buttons, then add to clicked one
    for (var j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove("active");
    }
    this.classList.add("active");
    showProducts(this.getAttribute("data-cat"));
  };
}

// ===== open and close cart =====
document.getElementById("cart-btn").onclick = function () {
  cartPanel.classList.add("open");
};

document.getElementById("close-cart").onclick = function () {
  cartPanel.classList.remove("open");
};

// ===== checkout =====
document.getElementById("checkout-btn").onclick = function () {
  if (cart.length == 0) {
    alert("Please add something to the cart first!");
  } else {
    alert("Thank you for shopping! Your order is placed.");
    cart = [];
    updateCart();
    cartPanel.classList.remove("open");
  }
};

// ===== run when page loads =====
showProducts("all");
updateCart();
