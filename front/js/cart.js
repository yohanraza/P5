let productInCart = []
productInCart = JSON.parse(localStorage.getItem("cart"))

let cible = document.getElementById("cart__items") 
displayProduct()

console.log(productInCart)
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
            <p id ="product__color">${product.color}<p>
            <p>${CartProductPrice} €</p>
            
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