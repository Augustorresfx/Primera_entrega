const res = require('express/lib/response');
const fs = require('fs');
const moment = require('moment');

class CartList {
    constructor(filePath) {
        this.filePath = filePath;
    }

    createCart() {
        let data = fs.readFileSync(this.filePath, 'utf8');
        let array = JSON.parse(data);
        let cart = {
            id: array.length + 1,
            time: moment().format("h:mm:ss"),
            products: []
        }
        array.push(cart);
        fs.writeFileSync(this.filePath, JSON.stringify(array, null, 2));
        console.log(`Se creo el carrito N${cart.id}`);
    }

    getAll(id) {
        let data = fs.readFileSync(this.filePath, 'utf8');
        let newData = JSON.parse(data);
        let result = newData.filter((item) => item.id == id);
        return result;
    }

    deleteCart(id) {
        let data = fs.readFileSync(this.filePath, 'utf8')
        let newData = JSON.parse(data);
        let result = newData.filter((item) => item.id != id);
        fs.writeFileSync(this.filePath, JSON.stringify(result, null, 2))
    }

    addProduct(id, product) {
        let data = fs.readFileSync(this.filePath, 'utf8')
        let newData = JSON.parse(data);
        let result = newData.filter((item) => item.id == id);
        result[0].products.push(product);
        fs.writeFileSync(this.filePath, JSON.stringify(newData, null, 2))
    }

    deleteProduct(id, productId) {
        let data = fs.readFileSync(this.filePath, 'utf8')
        let newData = JSON.parse(data);
        let result = newData.filter((item) => item.id == id);
        result[0].products = result[0].products.filter((item) => item.id != productId);
        fs.writeFileSync(this.filePath, JSON.stringify(newData, null, 2))
    }
}

module.exports = CartList;