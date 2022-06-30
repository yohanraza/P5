let currentUrl = window.location.href;
let url = new URL(currentUrl);
let productId = url.searchParams.get("id");

let apiUrl = ("http://localhost:3000/api/products/");

let fetchUrl = apiUrl + productId;



fetch (fetchUrl)
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(value) {
  //console.log(value);
  getProduits(value);
})
.catch(function(err) {
  // Une erreur est survenue
});

class Kanap {
  constructor(_id, name, price, description, imageUrl, colors, altTxt){
    this._id = _id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.colors = colors;
    this.altTxt = altTxt;
  }
}

// fonction permettant de traiter la reponse reçu par le fetch
function getProduits(value) {
  produits.push (new Kanap(value._id, value.name, value.price, value.description, value.imageUrl, value.colors, value.altTxt))
  displayProduits();
}


let produits = []

let title = document.getElementById("title")
let itemImg = document.getElementsByClassName("item__img")[0]
let productDescription = document.getElementById("description")
let productColor = document.getElementById("colors")
let productPrice = document.getElementById("price")

// fonction permettant d'afficher le produit sur la page 
function displayProduits() {
  
  for (let produit of produits) {
    title.innerHTML += `
    ${produit.name}`
    
    productDescription.innerHTML += `${produit.description}`
    productPrice.innerHTML += `${produit.price}`
    itemImg.innerHTML += `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`
    
    for ( let color of produit.colors) {
      productColor.innerHTML += `<option value="${color}">${color}</option>`
    }
    
  };  
}


class Cartproduct {
  constructor(id, quantity, color, imageUrl, name){
    this.id = id;
    this.quantity = quantity;
    this.color = color;
    this.imageUrl= imageUrl;
    this.name = name;
    
    
  }
}



// fonction permettant d'ajouter le produit dans le panier donc le stocker sur le local storage
addToCart.onclick = () => {
  const quantitySelected = document.getElementById("quantity")
  const quantityValidation = quantitySelected.checkValidity()
  const colorValidation = productColor.checkValidity()
  //console.log(colorValidation)
  //console.log(quantityValidation)
  if (colorValidation){
    if (quantityValidation){  
      let productOfPage = new Cartproduct (productId, quantity.value, colors.value, produits[0].imageUrl, produits[0].name)
      let  productInCart = []
      if (localStorage.getItem("cart") !== null) {
        productInCart = JSON.parse(localStorage.getItem("cart"))
      }
      
      let foundId = false
      let foundColor = false
      let newQuantity = 0
      for (let product of productInCart) {
        if (product.id == productId) {
          foundId = true
          if (product.color == productOfPage.color) {
            foundColor = true
            newQuantity = parseInt(product.quantity) + parseInt(productOfPage.quantity)
            console.log(newQuantity)
            if (newQuantity > 100) {
              alert("La quantité maximale autorisée par produit est 100")
            }
            else {
            product.quantity = newQuantity
            alert("La quantité a été mise à jour !")
            }
          }
        }
      }
      
      if (foundId == true ){
        if (foundColor == true) {
          //console.log("ce produit existe")
        }
        else {
          productInCart.push(productOfPage)
          alert("Produit ajouté dans le panier")
        }
      } 
      else {
        productInCart.push(productOfPage)
        alert("Produit ajouté dans le panier")
      }
      
      //console.log(foundId)
      //console.log(foundColor)
      
      localStorage.setItem("cart",JSON.stringify(productInCart)) 
      
      //console.log(productInCart)
      
      //console.log(productOfPage)
    }
    else {alert("Veuillez selectionner une quantité comprise entre 1 et 100")}  
  }
  else {alert("Veuillez selectionner une couleur")}
}


