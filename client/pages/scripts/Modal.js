import { Cart } from "../scripts/Cart.js";

var myCart = null;

function cartRender () {
    
    myCart = new Cart();
    document.body.insertAdjacentHTML('beforeend', `
    <div class="cart-wrapper">
    <div class="cart">
        <div class="cart__header">
            <div>
                My Cart <span>(<span id="cartQty">${myCart.myCart.length}</span> item)</span>
            </div>
            <i class="fa-solid fa-xmark" id="closeBtn"></i>
        </div>
        <div class="cart__body">
            <div class="cart__body-box">
            
            </div>

            <div class="cart__advertisement">
                <img src="../../../static/images/lowest-price.png" alt="">
                <p>You won't find it cheaper anywhere</p>
            </div>

        </div>
        <div class="cart__footer">
            <p>
                Promo code can be applied on payment page
            </p>
            <button class="btn">
                Proceed to checkout
                <span id="totalCartPrice">Rs. ${myCart.totalPrice} ></span>
            </button>
        </div>
    </div>
</div>
    `)
 
    for (const cartItem of myCart.myCart) {
        
        let cartRow = document.createElement('div');
        cartRow.classList.add('cart__row')
        cartRow.innerHTML = `
        <img class="img" src="../../../${cartItem.imageURL}" alt="">
        <div class="cart__info">
            <h2 class="cart__title">${cartItem.name} </h2>
            <div class="cart__toggle">
            <div class="d-flex">
                <button class="btn btn-round updateQuantity" data-id='${cartItem.id}' data-type="DECREMENT">
                <i class="fa-solid fa-minus"></i>
                </button>
                <span class="cart__count" id="${cartItem.id}">${cartItem.quantity}</span>
                <button class="btn btn-round updateQuantity" data-id='${cartItem.id}' data-type="INCREMENT" >
                    <i class="fa-solid fa-plus"></i>
                </button>
                <span class="subprice">Rs.${cartItem.totalPrice}</span>
            </div>
            <span class="price" id="price_${cartItem.id}">Rs.${cartItem.totalPrice}</span>
            </div>
        </div>
        `;
        // let cartRow = document.createElement('div');
        document.querySelector('.cart__body-box').appendChild(cartRow);
        let updateQuantity = document.querySelectorAll('.updateQuantity');
        let cartQuantity = document.querySelector('.cart__count');
        let total = document.querySelector('.price');
        // console.log("update: ", updateQuantity)

        updateQuantity.forEach(el => el.addEventListener('click', function() {
            
            console.log("updateQuantity");
            let id = this.getAttribute('data-id');
            let type = this.getAttribute('data-type');
            let cart = new Cart();
            cart.updateCart(id, type, this);
        }));

        
        // minusBtn.addEventListener('click', function(){
        //     console.log(`minus buttn clicked: ${cartItem.name}`)
        //     cartQuantity.innerText = cartItem.quantity--;
        //     let finaltotal = cartItem.quantity * cartItem.price;
        //     console.log("minus", finaltotal);
        //     total.innerText = finaltotal;
        // })
    }

    var closeBtn = document.querySelector('#closeBtn');
    var modal = document.querySelector('.cart-wrapper');
    closeBtn.addEventListener('click', function () {
        // modal.classList.remove('cart-wrapper--is-visible');
        document.querySelector('.cart-wrapper').remove()
    })

}


var modalBtn = document.querySelector('.header__cart');


modalBtn.addEventListener('click', function () {
    console.log('btn clicked')
    myCart = new Cart();
    cartRender();
    var modal = document.querySelector('.cart-wrapper');
    modal.classList.add('cart-wrapper--is-visible');
})





