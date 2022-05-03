fetch ("http://localhost:3000/api/products")
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
    for(let produit of value) {
      produits.push (new Kanap(produit._id, produit.name, produit.price, produit.description, produit.imageUrl, produit.colors, produit.altTxt))
    }
    displayProduits();
}


let produits = []


cible = document.getElementById("items")



let urlENcoded = encodeURI(document.location.href)
urlENcoded = urlENcoded.replace('index', 'product')
let urlProduit = new URL(urlENcoded)

function displayProduits() {
  
  for (let produit of produits) {
    urlProduit.searchParams.set('id',produit._id)
    cible.innerHTML += `
    <a href=${urlProduit}>
    <article>
    <img src=${produit.imageUrl} alt=${produit.altTxt}>
    <h3 class="productName">${produit.name}</h3>
    <p class="productDescription">${produit.description}</p>
    </article>
    </a>`
  }
  
}
 

