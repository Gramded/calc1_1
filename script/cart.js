export class CartObj {

    constructor([region, term, name, summ]) {
        this.region = region;
        this.name = name;
        this.term = term;
        this.summ = summ;
    }

    getInfo() {
        console.log(this);
    }

    fetchJSON() {
        let a = JSON.stringify(this);
        fetch('http://localhost:8081', {
            method: 'POST',
            body: a
        });
    }

}



// кусок кода из script для работы с классами


// let halvaCart = new CartObj(carts[0].id, MONTH3, carts[0]);
// console.log(halvaCart.name);
//
// let test = [];
//
// for (let i = 0; i < carts.length; i++) {
//     if (i < 3) {
//         test[i] = new CartObj(carts[i].id, MONTH3, carts[i]);
//     } else if (i < 5) {
//         test[i] = new CartObj(carts[i].id, MONTH4, carts[i]);
//     } else if (i < 6) {
//         test[i] = new CartObj(carts[i].id, MONTHBELNO, carts[i]);
//     } else {
//         test[i] = new CartObj(carts[i].id, MONTHBELYES, carts[i]);
//     }
// }
// console.log(test);
//
//
//
// let allReadyBtn = document.getElementById('all_ready');
// allReadyBtn.addEventListener("click", allReady);
//
// function allReady() {
//     let selectedInfo = new CartObj(...[sborInfo]);
//     selectedInfo.getInfo();
//     console.log(sborInfo);
// }

//
//
// let allReadyBtn = document.getElementById('all_ready');
// allReadyBtn.addEventListener("click", allReady);
//
// function allReady() {
//     let selectedInfo = new CartObj(...[sborInfo]);
//     selectedInfo.getInfo();
//     console.log(sborInfo);
// }


// const MONTH3 = [3];
// const MONTH4 = [4];
// const MONTHBELNO = [5, 6, 7, 8, 9, 10, 11, 12];
// const MONTHBELYES = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];