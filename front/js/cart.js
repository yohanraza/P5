let apiUrl = ("http://localhost:3000/api/products/");
let productInCart = []
productInCart = JSON.parse(localStorage.getItem("cart"))

let cible = document.getElementById("cart__items") 
displayProduct()

console.log(productInCart)


//console.log(productPrice);


let cartArticles = document.getElementsByClassName("cart__item__content__titlePrice")
console.log(cartArticles)

displayPrice()

async function displayPrice () {
    for (let article of cartArticles) {
        let priceId = article.closest("article").dataset.id;
        let priceColor = article.closest("article").dataset.color;
        let fetchUrl = apiUrl + priceId
        let articleIndex = productInCart.findIndex(x => x.id ===priceId && x.color === priceColor)
        const response = await fetch(fetchUrl)
        if (response.ok){
            const value = await response.json()
            let price = value.price
            let totalPrice = parseInt(productInCart[articleIndex].quantity) * parseInt(price)
            cartPriceList.push(totalPrice)
            console.log(totalPrice)
            console.log(value.price)
            article.innerHTML+= `<p>${totalPrice}</p>`
        }
        console.log(priceId)
        console.log(fetchUrl)
        
        
    }
}
//fin draft

// Fonction permettant d'afficher la liste de produit du pannier 
function displayProduct() {
    
    for (let product of productInCart) {
        
        
        filTheCart();
        
        function filTheCart() {
            
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
let cartPriceList = []
function CartTotalQuantity () {
    for (let i=0 ; i< productInCart.length; i++ ) {
        cartTotalQuantity += parseInt(productInCart[i].quantity);
    }
    
    console.log(cartTotalQuantity)
    
    let totalQuantity = document.getElementById("totalQuantity")
    
    
    totalQuantity.innerHTML = cartTotalQuantity;
    
}

async function displayCartTotalPrice() {
    const res = await displayPrice()
    //if (res.ok) {
    //    const response = await res.json()
    //}
    
    console.log(response)
    for (let i=0 ; i< cartPriceList.length; i++ ){
        cartTotalQuantity += parseInt(cartPriceList[i])
        //cartTotalQuantity += parseInt(price)
        //console.log(cartTotalPrice)
    }
    console.log(cartTotalPrice)
    /*
    let totalPrice = document.getElementById("totalPrice");
    totalPrice.innerHTML = cartTotalPrice;*/
}
//displayCartTotalPrice();
CartTotalQuantity();

//console.log(productInCart.splice(f,1))
console.log(productInCart)

// fonction permettant de supprimer les articles du pannier
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

// Boucle for pour selectionner chaque bouton "quantité" du panier
for (let changeBtn of itemQuantity){
    changeBtn.addEventListener('change', quantityChange);
// Fonction permettant de mettre à jour la quantité dans local storage    
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
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");


// regex1 correspond au regex qui va servir a valider le nom prénom et la ville sachant qu'ils ont le même format 
let regex1 =/(^[a-zA-Z ]+$)/ ;
let regexEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/ ; 
let regexAdress = /(^[a-z1-9A-Z ]+$)/;

let orderButton = document.getElementById("order"); 
function submitOrder () {
    let firstNameValue = firstName.value;
    let lastNameValue= lastName.value;
    let addressValue = address.value;
    let cityValue = city.value;
    let emailValue = email.value;
    
    if (firstNameValue.match(regex1) && lastNameValue.match(regex1) && cityValue.match(regex1) && addressValue.match(regexAdress) && emailValue.match(regexEmail)) {
        class contactToSend {
            constructor(firstName, lastName, address, city, email){
                this.firstName = firstName;
                this.lastName = lastName;
                this.address = address;
                this.city = city; 
                this.email = email;
            }
        }
        
        let contact = new contactToSend(firstName.value, lastName.value, address.value, city.value, email.value)
        let products = []
        console.log(contact);
        cartStringIdList(products);
        orderToSend(contact, products);
        //send(order);
        //fonction submit request post et blablabla
        alert("commande envoyé")
    }
    else {
        alert("Veuillez remplir tous les champs correctement !");
    }
}

orderButton.addEventListener('click', submitOrder);

// fonction pour creer un array contenant les Id des produit dans le pannier
function cartStringIdList(value) {
    for (let product of productInCart){
        let productId = product.id;
        value.push(productId)
    }
    console.log(value)
}

// fonction permettant de creer l'objet à envoyer (les éléments de contact + Array contenant les Id)
function orderToSend(contact, products) {
    let orderToSend = {
        contact,
        products
    }
    console.log(orderToSend)
    let banane = JSON.stringify(orderToSend)
    console.log(banane)
    send(orderToSend)
    //sendOrder(orderToSend)
}

// fonction permettant d'envoyer la commande 
function send(orderToSend) {
    fetch('http://localhost:3000/api/products/order', {
        method : "POST",
        headers : {
            'Accept' : 'application/json',
            'Content-type' : 'application/json',
        },
        body : JSON.stringify(orderToSend)
    })

    .then(function(response) {
        if (response.ok) {
            return response.json(); 
        }
    })

    .then(function(serverResponse) {
        console.log(serverResponse);
        //storeOrderId(serverResponse); 
    })

    .catch(function(err) {
        console.error('Erreur lors de la requête : ', err);
    });
}