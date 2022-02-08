let apiUrl = ("http://localhost:3000/api/products/");
let productInCart = []
productInCart = JSON.parse(localStorage.getItem("cart"))

let cible = document.getElementById("cart__items") 
displayProduct()

console.log(productInCart)
console.log(productInCart[0].id)

//debut draft
let productPrice = []
for (let i = 0; i < productInCart.length; i++) {
    let fetchUrl = apiUrl + productInCart[i].id;
    fetchPrice(fetchUrl);
}

function fetchPrice (url) {
    fetch(url)
    .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function(value) {
        console.log(value);
        getProduitsprice(value);
      })
      .catch(function(err) {
        // Une erreur est survenue
      });
    class price {
        constructor(_id, price) {
            this._id = _id;
            this.price = price;
        }
    }  

    function getProduitsprice(value){
        productPrice.push(new price(value._id, value.price))
    }
}

console.log(productPrice);

let cartArticles = document.getElementsByClassName("cart__item__content__titlePrice")
for (let article of cartArticles) {
    let priceId = article.closest("article").dataset.id;
    console.log(priceId)
    article.innerHTML+= `<p>bonjour</p>`

}
//fin draft

function displayProduct() {
    
    for (let product of productInCart) {
        
        
        filTheCart();
        
        function filTheCart() {
            let CartProductPrice = parseInt(product.quantity) * parseInt(product.price)
            
            cible.innerHTML += `
            <article class="cart__item" data-id="${product.id}" data-color="${product.color}" >
                <div class="cart__item__img">
                    <img src="${product.imageUrl}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                        <h2>${product.name}</h2>
                        <p>${product.color}</p>
            
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>`
        }
        
    }
    
    
}

let cartTotalQuantity = 0
let cartTotalPrice = 0

for (let i=0 ; i< productInCart.length; i++ ) {
    cartTotalQuantity += parseInt(productInCart[i].quantity);
    cartTotalPrice += productInCart[i].price * productInCart[i].quantity
}
console.log(cartTotalQuantity)
console.log(cartTotalPrice)

let totalQuantity = document.getElementById("totalQuantity")
let totalPrice = document.getElementById("totalPrice")

totalQuantity.innerHTML = cartTotalQuantity;
totalPrice.innerHTML = cartTotalPrice;

//console.log(productInCart.splice(f,1))
console.log(productInCart)


function delItem () {
    let delBtn = document.getElementsByClassName("deleteItem")


    console.log(delBtn)
    
    for (let btn of delBtn) {
        
        
        btn.addEventListener("click", function () {
            let removeElt = btn.closest("article")
            removeElt.remove()
            let removeEltId = removeElt.dataset.id
            console.log(removeEltId)
            let removeEltColor = removeElt.dataset.color
            console.log(removeEltColor)
            let removeEltIndex = productInCart.findIndex(x => x.id ===removeEltId && x.color === removeEltColor)
            productInCart.splice(removeEltIndex,1)
            localStorage.setItem("cart",JSON.stringify(productInCart))
            console.log(productInCart)
             
        })        
    }
    
    
    
}
delItem();

let itemQuantity = document.getElementsByClassName("itemQuantity")

for (let changeBtn of itemQuantity){
changeBtn.addEventListener('change', quantityChange);

function quantityChange (e) {
    let quantityChangeElt = changeBtn.closest("article")
    let quantityChangeEltColor = quantityChangeElt.dataset.color
    let quantityChangeEltId = quantityChangeElt.dataset.id
    let quantityChangeEltIndex = productInCart.findIndex(x => x.id === quantityChangeEltId && x.color === quantityChangeEltColor)
    productInCart[quantityChangeEltIndex].quantity = e.target.value;
    localStorage.setItem('cart', JSON.stringify(productInCart))

    let totalPrice = document.getElementsByClassName("cart__item__content__titlePrice")
    let itemTotalPrice = totalPrice.lastChild
    console.log(totalPrice)
    console.log(itemTotalPrice) 
}
}



//productInCart[1].quantity = parseInt(10);
//localStorage.setItem("cart", JSON.stringify(productInCart));

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let adress = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");


// regex1 correspond au regex qui va servir a valider le nom prénom et la ville sachant qu'ils ont le même format 
let regex1 =/([a-zA-Z])/ ;
let regexEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/ ; 
let regexAdress = /([a-z1-9A-Z])/;

let orderButton = document.getElementById("order"); 
function submitOrder () {
    let firstNameValue = firstName.value;
    let lastNameValue= lastName.value;
    let adressValue = adress.value;
    let cityValue = city.value;
    let emailValue = email.value;
    //console.log(firstNameValue)
    //console.log(firstNameValue.match(regex1))
    //console.log(lastNameValue.match(regex1))
    //console.log(adressValue.match(regexAdress))
    //console.log(cityValue.match(regex1))
    //console.log(emailValue.match(regexEmail))
    if (firstNameValue.match(regex1) && lastNameValue.match(regex1) && cityValue.match(regex1) && adressValue.match(regexAdress) && emailValue.match(regexEmail)) {
        //fonction submit request post et blablabla
        alert("commande envoyé")
    }
    else {
        alert("Veuillez remplir tous les champs correctement !");
    }
}

orderButton.addEventListener('click', submitOrder);