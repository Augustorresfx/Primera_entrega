const CartList = require('../models/cartList');
const cart = new CartList('./database/carrito.json');

module.exports = {
    getAll: (req, res) => {
        let result = cart.getAll(req.params.id);
        res.send(result[0].products);
    },
    createCart: (req, res) => {
        cart.createCart()
        res.sendStatus(200)
    },
    deleteCart: (req, res) => {
        cart.deleteCart(req.params.id)
        res.sendStatus(200)
    },
    addProduct: (req, res) => {
        console.log(req.body)
        cart.addProduct(req.params.id, { title: req.body.title, tipo: req.body.tipo, precio: req.body.price, urlImg: req.body.img });
        res.sendStatus(200)
    },
    deleteProduct: (req, res) => {
        cart.deleteProduct(req.params.id, req.params.productId);
        res.sendStatus(200)
    }
}