// fetch permettant de recupérer les produits à partir du backend
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

  // Création de la classe Kanap qui nous permettra de créer notre tableau de produits pour ensuite l'afficher sur la page d'acceuil
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

// Fonction permettant de creer les objets pour les stocker dans le array produits   
function getProduits(value) {
    for(let produit of value) {
      produits.push (new Kanap(produit._id, produit.name, produit.price, produit.description, produit.imageUrl, produit.colors, produit.altTxt))
    }
    displayProduits();
}


let produits = []


cible = document.getElementById("items")



let urlENcoded = encodeURI(document.location.href)
// remplacer index dans l'URL par product nous permet de créer un URL qui mène vers la page produit
urlENcoded = urlENcoded.replace('index', 'product')
let urlProduit = new URL(urlENcoded)


// fonction permettant d'afficher les produits dans la page d'acceuil à partir du tableau produits
function displayProduits() {
  
  for (let produit of produits) {
    urlProduit.searchParams.set('id',produit._id)
    // Pour chaque produit un paramètre qui correspond à l'id du produit est rajouté
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
 

