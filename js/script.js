const bars = document.getElementById("bars");
const nav = document.getElementById("nav");
const navItems = document.querySelectorAll("a");
function toggleMenu() {
  nav.classList.toggle("active");
  bars.classList.toggle("active");
}
bars.addEventListener("click", toggleMenu);
navItems.forEach((item) => {
  item.addEventListener("click", toggleMenu);
});
const lazyLoading = () => {
  var lazyImages = document.querySelectorAll(".lazy-load");
  lazyImages.forEach((img) => {
    if (
      img.getBoundingClientRect().top < window.innerHeight &&
      img.getAttribute("data-src")
    ) {
      img.src = img.getAttribute("data-src");
      img.removeAttribute("data-src");
      img.classList.add("loading");
    }
  });
};
window.onload = () => {
  lazyLoading();
};
window.onscroll = () => {
  lazyLoading();
};
let cart = [];
const openModalButton = document.querySelector("#open-modal");
const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");
const toggleModal = () => {
  modal.style.display = "block";
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
};
[openModalButton, closeModalButton, fade].forEach((el) => {
  el.addEventListener("click", () => toggleModal());
});
const article = document.querySelectorAll(".sellers-content img");
const modalItem = document.getElementById("modal-item");
const modalItemImg = document.getElementById("modal-item-img");
const modalItemTitle = document.getElementById("seller-card-title");
const modalItemDescript = document.getElementById("seller-card-description");
const modalItemDescriptItem = document.getElementById(
  "seller-card-description-item"
);
const modalItemPrice = document.getElementById("seller-card-value");
const productsBagQts = document.getElementById("span-item");
const toggleModalItem = () => {
  modalItem.style.display = "block";
  modalItem.classList.toggle("hide");
  fade.classList.toggle("hide");
};
article.forEach((imgA) => {
  imgA.onclick = function () {
    const paiItemClicked = imgA.parentElement.parentElement;
    const itemId = paiItemClicked.id;
    const itemIdNum = itemId.replace("item-", "");
    const itemTitle = document.querySelectorAll(".seller-card-title");
    const itemDescript = document.querySelectorAll(".seller-card-description");
    const itemDescriptItem = document.querySelectorAll(
      ".seller-card-description-item"
    );
    const itemPrice = document.querySelectorAll(".seller-card-value");
    modalItemImg.src = this.src;
    modalItemTitle.innerHTML = itemTitle[itemIdNum - 1].innerText;
    modalItemDescript.innerHTML = itemDescript[itemIdNum - 1].innerText;
    modalItemDescriptItem.innerHTML = itemDescriptItem[itemIdNum - 1].innerText;
    modalItemPrice.innerHTML = itemPrice[itemIdNum - 1].innerText;
    toggleModalItem();
  };
});
const closeModalItem = document.querySelector("#close-modal-item");
[closeModalItem, fade].forEach((el) => {
  el.addEventListener("click", () => toggleModalItem());
});
const clickedMinus = (idBtnPlus) => {
  const addQtsToCart = document.getElementsByClassName("seller-card");
  for (var i = 0; i < addQtsToCart.length; i++) {
    const btnPlus = addQtsToCart[i].getElementsByClassName("fa-minus")[0].id;
    if (idBtnPlus == btnPlus) {
      const numItensCart = parseInt(
        addQtsToCart[i].getElementsByClassName("qts-sellers")[0].innerText
      );
      const valueNew = numItensCart - 1;
      const father =
        addQtsToCart[i].getElementsByClassName("fa-minus")[0].parentNode
          .parentNode;
      const troca = father.querySelector("#qts-sellers");
      if (valueNew < 0) {
      } else {
        troca.innerHTML = valueNew;
      }
    } else {
    }
  }
};
const clickedPlus = (idBtnPlus) => {
  const addQtsToCart = document.getElementsByClassName("seller-card");
  for (var i = 0; i < addQtsToCart.length; i++) {
    const btnPlus = addQtsToCart[i].getElementsByClassName("fa-plus")[0].id;
    if (idBtnPlus == btnPlus) {
      const numItensCart = parseInt(
        addQtsToCart[i].getElementsByClassName("qts-sellers")[0].innerText
      );
      const valueNew = numItensCart + 1;
      const father =
        addQtsToCart[i].getElementsByClassName("fa-plus")[0].parentNode
          .parentNode;
      const troca = father.querySelector("#qts-sellers");
      troca.innerHTML = valueNew;
    }
  }
};
const clickedAddToBag = (id) => {
  const addToCartButtons = document.getElementsByClassName("seller-card");
  for (var i = 0; i < addToCartButtons.length; i++) {
    const idProduct = addToCartButtons[i].lastElementChild.id;
    if (idProduct == id) {
      const itemClicked = addToCartButtons[i];
      const productImage =
        itemClicked.getElementsByClassName("seller-card-img")[0].src;
      const productTitle =
        itemClicked.getElementsByClassName("seller-card-title")[0].innerText;
      const productName = itemClicked.getElementsByClassName(
        "seller-card-description"
      )[0].innerText;
      const productPrice =
        itemClicked.getElementsByClassName("seller-card-value")[0].innerText;
      const productQts =
        itemClicked.getElementsByClassName("qts-sellers")[0].innerText;
      const productBtn =
        itemClicked.getElementsByClassName("seller-button")[0].id;
      const valueItemNum = productPrice.replace("US$ ", "");
      const productValue = parseFloat(valueItemNum * productQts).toFixed(2);
      if (productQts == 0) {
        alert("*You need to enter a quantity");
      } else {
        const existingItem = cart.find(
          (item) => item.productName == productName
        );
        if (existingItem) {
          let totalItens = parseInt(existingItem.productQts);
          let totalItens1 = parseInt(productQts);
          existingItem.productQts = totalItens + totalItens1;
          let totalValue = parseFloat(existingItem.productValue);
          let totalValue1 = parseFloat(productValue);
          existingItem.productValue = totalValue + totalValue1;
        } else {
          cart.push({
            productImage,
            productTitle,
            productName,
            productPrice,
            productQts,
            productValue,
          });
        }
        itemClicked.querySelector("#qts-sellers").innerHTML = 0;
        updateCartModal();
      }
    }
  }
};
const articleModalItem = document.getElementById("seller-content-cart");
const modalTotalUnity = document.getElementById("modal-total-unity");
const modalTotalValue = document.getElementById("modal-total-value");
function updateCartModal() {
  if (cart.length === 0) {
    productsBagQts.innerHTML = 0;
    modalTotalUnity.innerHTML = 0;
    modalTotalValue.innerHTML = 0;
  }
  articleModalItem.innerHTML = "";
  let total = 0;
  let totalUnity = parseInt(0);
  let totalPayment = parseFloat(0);
  cart.forEach((item) => {
    const cartItemElement = document.createElement("article");
    cartItemElement.classList.add("seller-card-cart");
    cartItemElement.innerHTML = `
      <figure class="seller-card-image-cart">
          <img id="modal-item-img" src=${item.productImage} class="seller-card-img-cart lazy-load" />
      </figure>
      <footer class="seller-card-text-cart">
          <h2 id="seller-card-title-cart" class="seller-card-title-cart">${item.productTitle}</h2>
          <p id="seller-card-description-cart" class="seller-card-description-cart">${item.productName}
          </p>
          <h2 id="seller-card-value-cart" class="seller-card-value-cart">${item.productPrice}</h2>
          <p class="unit-cart"><span id="qts-sellers-cart" class="qts-sellers-cart">${item.productQts}</span> Unit</p>
          <span id="total-item-sellers-cart" class="total-item-sellers-cart"> US$ ${item.productValue}</span>
          <button class="remove-item-modal" name-item="${item.productName}"><i class="fa-solid fa-trash"></i></button>
      </footer>
    `;
    articleModalItem.appendChild(cartItemElement);
    totalUnity += parseInt(item.productQts);
    totalPayment += parseFloat(item.productValue);
    total += 1;
    productsBagQts.innerHTML = total;
    modalTotalUnity.innerHTML = totalUnity;
    modalTotalValue.innerHTML = totalPayment.toFixed(2);
  });
}
articleModalItem.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-item-modal")) {
    const name = event.target.getAttribute("name-item");
    removeItemCart(name);
  }
});

function removeItemCart(name) {
  const index = cart.findIndex((item) => item.productName === name);
  if (index !== -1) {
    const item = cart[index];

    cart.splice(index, 1);
    updateCartModal();
  }
}
const modalFinalizePurchase = document.getElementById("modal-payment");
const btnFinalizePurchase = document.getElementById("modal-cart-btn");
const btnFinalizePurchaseClose = document.getElementById("close-modal-payment");
const toggleModalPayment = () => {
  modalFinalizePurchase.style.display = "block";
  modalFinalizePurchase.classList.toggle("hide");
  fade.classList.toggle("hide");
};
[btnFinalizePurchase, btnFinalizePurchaseClose, fade].forEach((el) => {
  el.addEventListener("click", () => toggleModal() & toggleModalPayment());
});
const form = document.querySelector("#credit-card");
const cardNumber = document.querySelector("#card-number");
const cardHolder = document.querySelector("#name-text");
const cardExpiration = document.querySelector("#valid-thru-text");
const cardCVV = document.querySelector("#cvv-text");
const cardNumberText = document.querySelector(".number-vl");
const cardHolderText = document.querySelector(".name-vl");
const cardExpirationText = document.querySelector(".expiration-vl");
const cardCVVText = document.querySelector(".cvv-vl");
cardNumber.addEventListener("keyup", (e) => {
  if (!e.target.value) {
    cardNumberText.innerText = "1234 5678 9101 1121";
  } else {
    const valuesOfInput = e.target.value.replaceAll(" ", "");
    if (e.target.value.length > 14) {
      e.target.value = valuesOfInput.replace(
        /(\d{4})(\d{4})(\d{4})(\d{0,4})/,
        "$1 $2 $3 $4"
      );
      cardNumberText.innerHTML = valuesOfInput.replace(
        /(\d{4})(\d{4})(\d{4})(\d{0,4})/,
        "$1 $2 $3 $4"
      );
    } else if (e.target.value.length > 9) {
      e.target.value = valuesOfInput.replace(
        /(\d{4})(\d{4})(\d{0,4})/,
        "$1 $2 $3"
      );
      cardNumberText.innerHTML = valuesOfInput.replace(
        /(\d{4})(\d{4})(\d{0,4})/,
        "$1 $2 $3"
      );
    } else if (e.target.value.length > 4) {
      e.target.value = valuesOfInput.replace(/(\d{4})(\d{0,4})/, "$1 $2");
      cardNumberText.innerHTML = valuesOfInput.replace(
        /(\d{4})(\d{0,4})/,
        "$1 $2"
      );
    } else {
      cardNumberText.innerHTML = valuesOfInput;
    }
  }
});
cardHolder.addEventListener("keyup", (e) => {
  if (!e.target.value) {
    cardHolderText.innerHTML = "NOAH JACOB";
  } else {
    cardHolderText.innerHTML = e.target.value.toUpperCase();
  }
});
cardExpiration.addEventListener("keyup", (e) => {
  if (!e.target.value) {
    cardExpirationText.innerHTML = "02/40";
  } else {
    const valuesOfInput = e.target.value.replace("/", "");

    if (e.target.value.length > 2) {
      e.target.value = valuesOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
      cardExpirationText.innerHTML = valuesOfInput.replace(
        /^(\d{2})(\d{0,2})/,
        "$1/$2"
      );
    } else {
      cardExpirationText.innerHTML = valuesOfInput;
    }
  }
});
cardCVV.addEventListener("keyup", (e) => {
  if (!e.target.value) {
    cardCVVText.innerHTML = "123";
  } else {
    cardCVVText.innerHTML = e.target.value;
  }
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Credit Card Added!");
  window.location.reload();
});
