

function getData() {
    return new Promise((resolve, reject) => {
        // async opn -> resolved / rejected
        var xmlHttpReq = new XMLHttpRequest();
        xmlHttpReq.open("GET", "http://localhost:5000/categories");
        xmlHttpReq.onreadystatechange = function () {
            if (xmlHttpReq.readyState == 4 && xmlHttpReq.status == 200) {
                resolve(xmlHttpReq.responseText);
            } else if (xmlHttpReq.readyState == 4 && xmlHttpReq.status !== 200) {
                reject("Something went wrong ! ");
            }
        };
        xmlHttpReq.send();
    });
}

class Category {
    allCategory = [];

    getAllCategories() {
        var thePromise = getData();
        thePromise.then((reqData) => {
            this.allCategory = JSON.parse(reqData);
            this.allCategory = this.allCategory.filter((cat, index) => {
               return  cat.order > 0
            })
            var categoryList = document.querySelector(".category-wrapper");
            for (let i = 0; i < this.allCategory.length; i++) {
                var catDiv = document.createElement("div");
                catDiv.className = "category"

                if (i % 2 != 0) {
                    let cateImg = document.createElement("div");
                    cateImg.className = "category__productimg";
                    let addImg = document.createElement("img");
                    addImg.src = this.allCategory[i].imageUrl;
                    cateImg.appendChild(addImg);
                    catDiv.appendChild(cateImg);
                }

               let cateDetails = document.createElement("div");
               cateDetails.className = "category__details";

               let cateTitle = document.createElement("div");
               cateTitle.className = "category__title";
               cateTitle.innerHTML = this.allCategory[i].name;
               cateDetails.appendChild(cateTitle);

               let catePara = document.createElement("p");
               catePara.innerHTML = this.allCategory[i].description;
               cateDetails.appendChild(catePara);

               let cateButton = document.createElement("button");
               cateButton.className = "btn";
               cateButton.innerHTML = `Explore ${this.allCategory[i].key}`;
               cateDetails.appendChild(cateButton);



               catDiv.appendChild(cateDetails);

            if (i % 2 == 0) {
                let cateImg = document.createElement("div");
                cateImg.className = "category__productimg";
                let addImg = document.createElement("img");
                addImg.src = this.allCategory[i].imageUrl;
                cateImg.appendChild(addImg);
                catDiv.appendChild(cateImg);
            }

                



                // newLi.innerHTML = this.allCategory[i].name;

                // let cateDetails = document.createElement("div");
                // cateDetails.className = "category__details"

                // newLi.className = "list-group-item";
                categoryList.appendChild(catDiv);
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

