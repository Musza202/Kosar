let product = [
    {id: 1, name: "alma", price: 150, quantity: 1},
    {id: 2, name: "körte", price: 250, quantity: 1},
    {id: 3, name: "barack", price: 350, quantity: 1}
];
function alma() {
    fetch("https://fakestoreapi.com/products")
        .then(x => x.json())
        .then(i => render(i))  
        .catch(err => console.error("Hiba a fetch során:", err));
}

function render(adat) {
    let bele = adat.map(elem => {
        return {
            id: Number(elem.id), 
            name: elem.title,  
            price: Number(elem.price),
            quantity: 1
        };
    });

    product = bele;  
    kiir(peldany); 
    renderProductList(); 
}

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

function kiir(asd) {
    let tbody = document.createElement("tbody");
    tbody.id = "kimenet-body";
    for (let i = 0; i < asd.items.length; i++) {
        let tr = document.createElement("tr");
        let idCell = document.createElement("td");
        let nameCell = document.createElement("td");
        let priceCell = document.createElement("td");
        let quantityCell = document.createElement("td");

        idCell.innerText = asd.items[i].id;
        nameCell.innerText = asd.items[i].name;
        priceCell.innerText = asd.items[i].price;
        quantityCell.innerText = asd.items[i].quantity;

        tr.appendChild(idCell);
        tr.appendChild(nameCell);
        tr.appendChild(priceCell);
        tr.appendChild(quantityCell);
        tbody.appendChild(tr);
    };

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




const peldany = new cart(product);
alma();
