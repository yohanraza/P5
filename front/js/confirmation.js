let url = new URL(window.location.href)
let orderId =  url.searchParams.get('orderId')
let orderIdSpan = document.getElementById("orderId")

function displayOrderId() {
    orderIdSpan.innerHTML+=`${orderId}`
}

displayOrderId()