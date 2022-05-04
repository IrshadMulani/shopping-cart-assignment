function getCarousel() {
    return new Promise((resolve, reject) => {
        // async opn -> resolved / rejected
        var xmlHttpReq = new XMLHttpRequest();
        xmlHttpReq.open("GET", "http://localhost:5000/banners");
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

class Carousel {
    allImageData = [];

    getAllImageData() {
        let promiseData = getCarousel();
        promiseData.then((requestData) => {
            this.allImageData = JSON.parse(requestData);

            this.allImageData = this.allImageData.filter((img) => {
                return img.order > 0;
            })


            var caroDiv = document.getElementById('carouselExampleIndicators');
            for (let i = 0; i < this.allImageData.length; i++) {
                var carouselData = document.createElement('div');
                var carimg = document.createElement('img');
                carouselData.setAttribute('class', 'carousel-item');
                if (i == 0) {
                    carouselData.setAttribute('class', 'carousel-item active');
                }
                carimg.setAttribute('src', `../../${this.allImageData[i].bannerImageUrl}`);
                carimg.setAttribute('class', 'd-block w-100');

                carouselData.appendChild(carimg);
                document.querySelector('.carousel-inner').appendChild(carouselData);
            }

        },
            function (err) {
                console.log(err);
            }
        );
    }
}



var init = new Carousel()
init.getAllImageData();