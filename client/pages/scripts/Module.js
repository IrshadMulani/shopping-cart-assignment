export function getData() {
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