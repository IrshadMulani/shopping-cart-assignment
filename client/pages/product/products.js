import { getData } from "../scripts/Module.js";
import { Cart } from "../scripts/Cart.js";

let cart = new Cart();
class Category {
    allCategory = [];

    getAllCategories() {
        var thePromise = getData();
        thePromise.then((reqData) => {
            this.allCategory = JSON.parse(reqData);
            this.allCategory = this.allCategory.filter((cat, index) => {
                return cat.order > 0;
            })
            var categoryList = document.querySelector(".sidebar");
            for (let i = 0; i < this.allCategory.length; i++) {
                var catUl = document.createElement("ul");
                catUl.className = "side-nav"

                let catLi = document.createElement("li");
                catLi.className = "side-nav__item";
                catUl.appendChild(catLi)

                let catLink = document.createElement("a");
                catLink.className = "side-nav__link";
                catLink.innerHTML = this.allCategory[i].name;
                
                
                catLink.setAttribute('cate-id', this.allCategory[i].id);

                catLi.appendChild(catLink);

                catLink.addEventListener('click', (e) => {
                    console.log(e.target);
                    e.target.getAttribute("cate-id")
                    proRender(e.target.getAttribute("cate-id"));
                })
                
                categoryList.appendChild(catUl);
            }
        },
            function (err) {
                console.log(err);
            }
        );
    }
}

window.addEventListener('DOMContentLoaded', () => {
    var cateObj = new Category();
    cateObj.getAllCategories();
});

//products Data

const api_url = 'http://localhost:5000/products';

function truncateString(str, n) {
    if (str.length > n) {
        return str.substring(0, n) + "...";
    } else {
        return str;
    }
}

function proRender (id) {
    console.log(id);
    fetch(api_url).then((response) => response.json()).then((data) => {
        let currentData = [...data];
        document.querySelector('.products').innerHTML = '';
        data = data.filter((d) => {
            if(d.category == id){
                return true;
            }
        })
        if(data.length == 0){
            data = [...currentData];
        }
        document.getElementById('itemCount').innerText = `${cart.myCart.length} Items`;
        for (let i = 0; i < data.length; i++) {
            var productList = document.createElement('div');
            productList.className = 'products__card'
            productList.innerHTML = `
        <h2 class="products__card-title">
            ${data[i].name}
        </h2>
        
        <div class="products__card-body" >
        <div class="products__card-image">
            <img src="${data[i].imageURL}" alt="${data[i].name}" class="products__card-img">
        </div>
        <div class="products__card-desc">
            <p id="style-3">${truncateString(data[i].description, 120)}</p>
        </div>
        </div>
        <div class="products__card-footer">
            <span class="products__card-price">
            <span>MRP Rs.</span>
            ${data[i].price}
            </span>
            <span>
                <button class="btn buy-now" data-pid="${data[i].id}">
                    Buy Now
                </button>
            </span>
        </div>

        <div class="products__card-btn-sm">
            <button class="btn buy-now" data-pid="${data[i].id}">
                Buy Now @ Rs. ${data[i].price}
            </button>
        </div>
        `
            document.querySelector('.products').appendChild(productList);
            var buyNow = document.querySelectorAll('.buy-now');
        }

        buyNow.forEach(el => el.addEventListener('click', event => {
            console.log(event.target.getAttribute("data-pid"));
            let id = event.target.getAttribute("data-pid")
            let productIndex = data.findIndex(p => p.id === id);

            let filterProduct = cart.myCart.filter(c => c.id === id);
            if (filterProduct.length > 0) {
                cart.updateCart(id, 'INCREMENT')
            }
            else {
                cart.addToCart(data[productIndex]);
            }

        }));

    }).catch((err) => {
        console.log("Products not found", err)
    })
}


proRender("id");