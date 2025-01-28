const product = [
    {id: 1, name: "alma", price: 150, quantity: 1},
    {id: 2, name: "körte", price: 250, quantity: 1},
    {id: 3, name: "barack", price: 350, quantity: 1}
];

class cart {
    constructor(asd) {
        this.items = asd; 
    }

    addProduct(productid, productname, productprice = 400, productquantity = 1) {
        const cartitem = this.items.find(p => p.id == productid);
        if (cartitem === undefined) {
            this.items.push({id: productid, name: productname, price: productprice, quantity: productquantity});
        } else {
            cartitem.quantity += productquantity;
        }
    }

    updateProduct(productid, quantity) {
        const cartitem = this.items.find(p => p.id == productid);
        if (cartitem) {
            cartitem.quantity = quantity;
        }
    }

    getItems() {
        return this.items;
    }
}

function renderProductList() {
    let productBody = document.getElementById("product-list-body");
    productBody.innerHTML = "";

    for (let i = 0; i < product.length; i++) {
        let tr = document.createElement("tr");
        let nevCell = document.createElement("td");
        let arCell = document.createElement("td");
        let vasarolCell = document.createElement("td");
        let kosarba = document.createElement("button");

        nevCell.innerText = product[i].name;
        arCell.innerText = product[i].price;
        kosarba.innerText = "Hozzáad";
        kosarba.classList.add("add-to-cart");

        const isProductInCart = peldany.items.some(item => item.id === product[i].id);

        if (isProductInCart) {
            kosarba.disabled = false;
            kosarba.innerText = "Hozzáadás";
            kosarba.onclick = function () {
                peldany.addProduct(product[i].id, product[i].name, product[i].price, 1);
                kiir(peldany);
                renderProductList(); 
            };
        } else {
            kosarba.onclick = function () {
                peldany.addProduct(product[i].id, product[i].name, product[i].price, 1);
                kiir(peldany);
                renderProductList();
            };
        }

        vasarolCell.appendChild(kosarba);
        tr.appendChild(nevCell);
        tr.appendChild(arCell);
        tr.appendChild(vasarolCell);
        productBody.appendChild(tr);
    }
}

function kiir(asd) {
    let tbody = document.createElement("tbody");
    tbody.id = "kimenet-body";
    asd.getItems().forEach(item => {
        let tr = document.createElement("tr");
        let idCell = document.createElement("td");
        let nameCell = document.createElement("td");
        let priceCell = document.createElement("td");
        let quantityCell = document.createElement("td");

        idCell.innerText = item.id;
        nameCell.innerText = item.name;
        priceCell.innerText = item.price;
        quantityCell.innerText = item.quantity;

        tr.appendChild(idCell);
        tr.appendChild(nameCell);
        tr.appendChild(priceCell);
        tr.appendChild(quantityCell);
        tbody.appendChild(tr);
    });

    let regiTbody = document.getElementById("kimenet-body");
    regiTbody.parentNode.replaceChild(tbody, regiTbody);
}

function hozad(asd) {
    let p_id = Number(document.getElementById("id").value);
    let p_nev = document.getElementById("nev").value;
    let p_ar = Number(document.getElementById("ar").value);
    let p_darab = Number(document.getElementById("darab").value);

    const isProductInCart = asd.items.some(item => item.id === p_id);
    
    if (p_id && p_nev && p_ar && p_darab) {
        if (!isProductInCart) {
            asd.addProduct(p_id, p_nev, p_ar, p_darab);
        } else {
            alert("Ez a termék már a kosárban van!");
        }

        kiir(asd);
        renderProductList(); 
    } else {
        alert("Hibás adatbevitel!");
    }
}


const peldany = new cart(product);
window.onload = function () {
    kiir(peldany);
    renderProductList();
}
