const product = [
    {id: 1, name: "alma", price: 150, quantity: 1},
    {id: 2, name: "körte", price: 250, quantity: 1},
    {id: 3, name: "barack", price: 350, quantity: 1}
];

let ki = document.getElementById("kimenet-body");

class cart {
    constructor(asd){
        this.items = asd;
    }
    viewCart(){
        console.table(this.items);
    }
    addProduct(productid, productname, productprice = 400, productquantity = 1){
        const cartitem = this.items.find(p => p.id == productid); 
        if(cartitem === undefined){
            this.items = [...this.items, {id: productid, name: productname, price: productprice, quantity: productquantity}];
            console.log(`Termék hozzáadva: ${productname} - Mennyiség: ${productquantity}`);
        } else {
            let hosz = this.items.length;
            for(let i = 0; i < hosz; i++){
                if(this.items[i].id == productid){
                    this.items[i].quantity += productquantity;
                    console.log(`Termék frissítve: ${productname} - Új mennyiség: ${this.items[i].quantity}`);
                }
            }
        }
    }
    removeProduct(productid){
        const cartitem = this.items.find(p => p.id == productid); 
        console.log(cartitem);
        if(cartitem === undefined){
            console.log("Nem található id!");
        } else {
            this.items = this.items.filter(item => item.id !== productid);
        }
    }
    updateProduct(productid, productquantity){
        this.items = this.items.map(item => item.id == productid ? {...item, quantity: productquantity} : item);
    }
    cleanCart(){
        this.items = [];
    }
    calTotal(){
        let szamol = 0;
        for(let i = 0; i < this.items.length; i++){
            szamol += this.items[i].price * this.items[i].quantity; 
        }
        console.log(szamol);
    }
}

function kiir(asd){
    let tbody = document.createElement("tbody");
    tbody.id = "kimenet-body";
    for(let i = 0; i < asd.items.length; i++){
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
    }

    let regiTbody = document.getElementById("kimenet-body");
    regiTbody.parentNode.replaceChild(tbody, regiTbody);
}

function hozad(asd){
    let p_id = Number(document.getElementById("id").value);
    let p_nev = document.getElementById("nev").value;
    let p_ar = Number(document.getElementById("ar").value);
    let p_darab = Number(document.getElementById("darab").value);
    
    if(p_id && p_nev && p_ar && p_darab){
        asd.addProduct(p_id, p_nev, p_ar, p_darab);
    }

    kiir(asd);
}

function renderProductList() {
    let productBody = document.getElementById("product-list-body");
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
        kosarba.onclick = function() {
            peldany.addProduct(product[i].id, product[i].name, product[i].price, 1);
            kiir(peldany);
        };

        vasarolCell.appendChild(kosarba);
        tr.appendChild(nevCell);
        tr.appendChild(arCell);
        tr.appendChild(vasarolCell);
        productBody.appendChild(tr);
    }
}

const peldany = new cart(product);
kiir(peldany);
renderProductList();
