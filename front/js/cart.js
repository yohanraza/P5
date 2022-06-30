let apiUrl = ("http://localhost:3000/api/products/");
let productInCart = []

//récupération de la liste des produit du panier stockée dans le localstorage
productInCart = JSON.parse(localStorage.getItem("cart"))

let cible = document.getElementById("cart__items") 
displayProduct()


console.log(productInCart)


//console.log(productPrice);


let cartArticles = document.getElementsByClassName("cart__item__content__titlePrice")
//console.log(cartArticles)
displayPrice()

// fonction permettant de recupérer le prix du produit dans le pannier
async function displayPrice () {
    for (let article of cartArticles) {
        let priceId = article.closest("article").dataset.id;
        let priceColor = article.closest("article").dataset.color;
        let fetchUrl = apiUrl + priceId
        let mainArticle = article.closest("article")
        let priceSelector = mainArticle.querySelector(".cart__item__content__titlePrice__price")
        //console.log(priceSelector)
        let articleIndex = productInCart.findIndex(x => x.id ===priceId && x.color === priceColor)
        const response = await fetch(fetchUrl)
        if (response.ok){
            const value = await response.json()
            let price = value.price
            let totalPrice = parseInt(productInCart[articleIndex].quantity) * parseInt(price)
            cartPriceList.push(totalPrice)
            //console.log(totalPrice)
            //console.log(value.price)
            priceSelector.innerHTML = `<p>${totalPrice}</p>`
        }
        //console.log(priceId)
        //console.log(fetchUrl)
        
        
    }
}

// Fonction permettant d'afficher dans la page la liste de produits du panier 
function displayProduct() {
    if(productInCart === null || productInCart.length < 1 ) {
        cible.innerHTML+='<p>Votre pannier est vide </p>'
    }
    else {
        for (let product of productInCart) {
            
            
            filTheCart();
            
            function filTheCart() {
                
                cible.innerHTML += `
                <article class="cart__item" data-id="${product.id}" data-color="${product.color}" >
                <div class="cart__item__img">
                <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                <h2>${product.name}</h2>
                <p>${product.color}</p>
                <p class="cart__item__content__titlePrice__price"><p>
                
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
    
    
}

//let cartTotalQuantity = 0
//let cartTotalPrice = 0
let cartPriceList = []


// Fonction permettant d'afficher la quantité de produit totale dans le pannier

function CartTotalQuantity () {
    let cartTotalQuantity = 0
    for (let i=0 ; i< productInCart.length; i++ ) {
        cartTotalQuantity += parseInt(productInCart[i].quantity);
    }
    
    //console.log(cartTotalQuantity)
    
    let totalQuantity = document.getElementById("totalQuantity")
    
    
    totalQuantity.innerHTML = cartTotalQuantity;
    
}

async function displayCartTotalPrice() {
    
    let cartTotalPrice = 0
    let totalPrice = document.getElementById("totalPrice")
    for (let product of productInCart) {
        let fetchUrl = apiUrl + product.id
        //console.log(product.id)
        const response = await fetch(fetchUrl)
        if (response.ok) {
            const value = await response.json()
            cartTotalPrice += parseInt(value.price)*parseInt(product.quantity)
            totalPrice.innerHTML = cartTotalPrice
            //console.log(cartTotalPrice)
            //console.log(product.quantity)
            //console.log(value.price)
        }
    }
}

displayCartTotalPrice();
CartTotalQuantity();

//console.log(productInCart.splice(f,1))
//console.log(productInCart)

// fonction permettant de supprimer les articles du pannier
function delItem () {
    let delBtn = document.getElementsByClassName("deleteItem")
    
    
    console.log(delBtn)
    
    for (let btn of delBtn) {
        
        
        btn.addEventListener("click", function () {
            let removeElt = btn.closest("article")
            removeElt.remove()
            let removeEltId = removeElt.dataset.id
            //console.log(removeEltId)
            let removeEltColor = removeElt.dataset.color
            //console.log(removeEltColor)
            let removeEltIndex = productInCart.findIndex(x => x.id ===removeEltId && x.color === removeEltColor)
            productInCart.splice(removeEltIndex,1)
            localStorage.setItem("cart",JSON.stringify(productInCart))
            //console.log(productInCart)
            displayCartTotalPrice();
            CartTotalQuantity();
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
        console.log(e.target.value)
        if (e.target.value <= 100 && e.target.value >= 1){ // Vérification si la quantitée est bien comprise entre 1 et 100 dans la page panier
            productInCart[quantityChangeEltIndex].quantity = e.target.value; // si oui la quantité du produit est mise à jour
            localStorage.setItem('cart', JSON.stringify(productInCart))
            
            let totalPrice = document.getElementsByClassName("cart__item__content__titlePrice")
            displayPrice()
            displayCartTotalPrice();
            CartTotalQuantity();
        }

        else if (e.target.value > 100) (
            alert("pas plus de 100 article !")
        )
        
        else if (e.target.value < 1  ) {
            alert("veuillez choisir au moins une quantité superieur à 1")
        }
        //console.log(totalPrice)
        //console.log(itemTotalPrice) 
    }
}




let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");


// regex1 correspond au regex qui va servir a valider le nom prénom et la ville sachant qu'ils ont le même format 
// regex qui permet de rajouter certains caractères spéciaux pour les prénoms, noms et villes
let regex1 =/(^[a-zA-Z àâäéèêëïîôöùûüÿç]+$)/ ; 
let regexEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/ ; 
let regexAdress = /(^[a-z1-9A-Z ]+$)/;

let orderButton = document.getElementById("order"); 
function submitOrder () {
    let firstNameValue = firstName.value;
    let lastNameValue= lastName.value;
    let addressValue = address.value;
    let cityValue = city.value;
    let emailValue = email.value;
    
    if(productInCart.length == 0) {  // verification que le panier n'est pas vide
        alert("votre panier est vide")
    }
    else {
        if(firstNameValue.match(regex1)){
            
            if(lastNameValue.match(regex1)){
                
                if( addressValue.match(regexAdress)){
                    
                    if (cityValue.match(regex1)) {
                        
                        if(emailValue.match(regexEmail)){
                            class contactToSend {
                                constructor(firstName, lastName, address, city, email){
                                    this.firstName = firstName;
                                    this.lastName = lastName;
                                    this.address = address;
                                    this.city = city; 
                                    this.email = email;
                                }
                            }
                            
                            let contact = new contactToSend(firstName.value, lastName.value, address.value, city.value, email.value) // création de l'objet contact
                            let products = []
                            //console.log(contact);
                            cartStringIdList(products); // création de la liste des id des produits commandé
                            orderToSend(contact, products); // fonction permettant d'envoyer la commande
                            alert("commande envoyé")    
                        }
                        else {
                            let alertEmail = document.getElementById("emailErrorMsg")
                            alertEmail.innerHTML = 'Veuillez remplir le mail correctement' // en cas d'erreur une alerte s'affiche temporairement
                            setTimeout(()=> {alertEmail.innerHTML ="" }, 1500) // affiche l'alerte d'erreur temporairement (1,5 s)
                        }
                    }
                    else {
                        let alertCity = document.getElementById("cityErrorMsg")
                        alertCity.innerHTML = 'Veuillez remplir la ville correctement'
                        setTimeout(()=> {alertCity.innerHTML ="" }, 1500)
                    }
                    
                }
                else {
                    let alertAdress = document.getElementById("addressErrorMsg")
                    alertAdress.innerHTML = `Veuillez remplir l'adresse correctement`
                    setTimeout(()=> {alertAdress.innerHTML ="" }, 1500)
                }
            }
            else {
                let alertLastName = document.getElementById("lastNameErrorMsg")
                alertLastName.innerHTML = 'Veuillez remplir le Nom correctement'
                setTimeout(()=> {alertLastName.innerHTML ="" }, 1500)
            }
            
        }
        
        else {
            let alertFirstName = document.getElementById("firstNameErrorMsg")
            alertFirstName.innerHTML = 'Veuillez remplir le prénom correctement'
            setTimeout(()=> {alertFirstName.innerHTML ="" }, 1500)
            //setTimeout permet d'enlever l'alerte d'erreur au bout de 1,5 secondes
            
        }
    }
}

orderButton.addEventListener('click', submitOrder);

// fonction pour creer un array contenant les Id des produit dans le pannier
function cartStringIdList(value) {
    for (let product of productInCart){
        let productId = product.id;
        value.push(productId)
    }
    //console.log(value)
}

// fonction permettant de creer l'objet à envoyer (les éléments de contact + Array contenant les Id)
function orderToSend(contact, products) {
    let orderToSend = {
        contact,
        products
    }
    //console.log(orderToSend)
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
    //console.log(serverResponse);
    saveOrderId(serverResponse)
    //storeOrderId(serverResponse); 
})

.catch(function(err) {
    console.error('Erreur lors de la requête : ', err);
});
}

//fonction permettant d'envoyer le orderId en paramètres dans l'URL de la page de confirmation
function saveOrderId (value) {
    let urlEncoded = encodeURI(document.location.href)
    urlEncoded = urlEncoded.replace('cart', 'confirmation') 
    let urlConf = new URL(urlEncoded)
    urlConf.searchParams.set('orderId', value.orderId)
    window.location = urlConf
    productInCart = []
    localStorage.setItem('cart', JSON.stringify(productInCart))   
}

