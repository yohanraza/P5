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
  console.log(value);
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
  constructor(id, quantity, color){
  this.id = id;
  this.quantity = quantity;
  this.color = color;
}
}




addToCart.onclick = () => {
  let  productInCart = []
  if (localStorage.getItem("cart") !== null) {
    productInCart = JSON.parse(localStorage.getItem("cart"))
  }
  
  productInCart.push(new Cartproduct (productId, quantity.value, colors.value))

  localStorage.setItem ("cart", JSON.stringify(productInCart)) 
}