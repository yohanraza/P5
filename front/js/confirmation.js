let url = new URL(window.location.href)
let orderId =  url.searchParams.get('orderId') // recupération du orderId qui a été passé en paramètre avec url.SearchParams 
let orderIdSpan = document.getElementById("orderId")

// fonction permettant d'afficher le orderId dans le DOM
function displayOrderId() {
    orderIdSpan.innerHTML+=`${orderId}`
}

displayOrderId()