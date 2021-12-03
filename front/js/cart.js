let productInCart = []
let listePanier = []
productInCart = JSON.parse(localStorage.getItem("cart"))

let cible = document.getElementById("cart__items") 
displayProduct()


function displayProduct() {
    
    for (let product of productInCart) {
        let apiUrl = ("http://localhost:3000/api/products/");
        
        let fetchUrl = apiUrl + product.id;
        
        
        
        fetch (fetchUrl)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {
            console.log(value);
            filTheCart(value);

        })
        .catch(function(err) {
            // Une erreur est survenue
        });
        
      
        
        function filTheCart(value) {
            let CartProductPrice = parseInt(product.quantity) * parseInt(value.price)
            cible.innerHTML += `<article class="cart__item" data-id="${value._id}">
            <div class="cart__item__img">
              <img src="${value.imageUrl}" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__titlePrice">
                <h2>${value.name}</h2>
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

