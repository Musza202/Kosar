let a = 0;
const b = 1;
let x=10;
if(true){
    let x =20;
    console.log(x);
}
console.log(x);

const add = (i,j)=>i+j;
console.log(add(1,2));

const nevx = "Jhon";
const message = `Hello ${nevx}`;
console.log(message);
const szoveg = `
     *
    ***
   *****
  *******
`;
console.log(szoveg);
const person = {
    nev: "Sanyi",
    kor:20,
}
const {nev,kor}= person;
console.log(nev,kor);

const tomb =[1,2,3,4,5];
const [elso,masodik]= tomb;
console.log(elso,masodik);

function greet(name ="Guest"){
    console.log(name);
}
greet();
greet("Dzsozef");

let tomb2=[1,2,3];
let tomb_2 = [0,...tomb2,4,5]

console.log(tomb_2);

class asd{
    constructor(nem){
        this.name= nem; 
    }
}
const dog = new asd("Dzsozef");
console.log(dog.name);

import {pi,square} from 'math.js';