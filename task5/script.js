let cartIcon=document.querySelector('#cart-icon');
let cart=document.querySelector('.cart');
let closeCart=document.querySelector('#close-cart');
// <0pen>
cartIcon.onclick = ()=> {
    cart.classList.add("active");
};

// <===close==>
closeCart.onclick = ()=> {
    cart.classList.remove("active");
}

// <---cart working-->>

if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
} else{
    ready();

}

//function workimg
function ready(params) {
var removeCartButtons = document.getElementsByClassName('cart-remove')
console.log(removeCartButtons);
for(var i=0 ; i <removeCartButtons.length; i++ ){
    var button = removeCartButtons[i]
    button.addEventListener('click',removeCartItem)
}

var quantityInputs =document.getElementsByClassName('cart-quantity')
for(var i=0 ; i <quantityInputs.length; i++ ){
    var input =quantityInputs[i]
    input.addEventListener("change",quantityChanged);
}

// add to cart
var addCart =document.getElementsByClassName('add-cart')
for (var i = 0; i< addCart.length; i++){
    var button =addCart[i];
    button.addEventListener('click',addCartClicked);
}

// <---- buy buton ------>

document
.getElementsByClassName("btn-buy")[0]
.addEventListener('click',buyButtonClicked);

}
function buyButtonClicked () {
    alert('Your Order is Placed ')
    var cartContent =document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes) {
        cartContent.removeChild(cartContent.firstChild);
        
    }
    updatetotal();l
    
}
function removeCartItem(event){
    var buttonClicked =event.target
    buttonClicked.parentElement.remove();
    updatetotal();

}
function quantityChanged(event) {
    var input=event.target
if (isNaN(input.value) || input.value <=0 ){
    input.value = 1 ;
}   
updatetotal();
}
// add to cart 
function addCartClicked(event) {
    var button =event.target
    var shopProducts = button.parentElement
    var tittle =shopProducts.getElementsByClassName('product-tittle')[0].innerText
    var price =shopProducts.getElementsByClassName('price')[0].innerText
    var productImg=shopProducts.getElementsByClassName('product-img1')[0].src;
    addProductToCart(tittle,price,productImg);
    updatetotal();
}
function addProductToCart(tittle,price,productImg) {
    var cartShopBox =document.createElement("div")
    cartShopBox.classList.add('cart-box')
    var cartItems =document.getElementsByClassName('cart-content')[0]
    var cartItemsNames=cartItems.getElementsByClassName('cart-product-tittle')
    for (var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText==tittle){
    alert('This Item is Already Added')
    return;
    
}
    
updatetotal();
}

var cartBoxContent =  
                   `<img src=${productImg} alt="" class="cart-img">
                    <div class="detail-box">
                    <div class="cart-product-tittle">${tittle}</div>
                    <div class="cart-price">${price}</div>
                   <input type="number" value="1" class="cart-quantity">
                </div> 
                   <i class='bx bx-trash-alt cart-remove'></i>`;
                   updatetotal();
cartShopBox.innerHTML =cartBoxContent;
cartItems.append(cartShopBox);
updatetotal();
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartItem)
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChanged);
}
updatetotal();




function updatetotal() {
    var cartContent =document.getElementsByClassName('cart-content')[0] 
    var cartBoxes = document.getElementsByClassName('cart-box')
    var total = 0;
    for(var i=0 ; i <cartBoxes.length; i++) {
    var cartBox = cartBoxes[i]
    var priceElement = cartBox.getElementsByClassName('cart-price')[0]
    var quantityElement =cartBox.getElementsByClassName('cart-quantity')[0]
    var price= parseFloat(priceElement.innerText.replace("$"," "));
    var quantity = quantityElement.value 
    total= total + price * quantity;
    }

    // <-----------cents value---->

    total =Math.round(total *100)/100;

    document.getElementsByClassName("total-price")[0].innerText ='$'+ total; 

}

