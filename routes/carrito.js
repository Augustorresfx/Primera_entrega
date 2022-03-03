const { Router } = require("express");
const carrito = require('../controllers/carrito');
const router = new Router();


// API

router.get('/carrito/:id/productos', carrito.getAll);

router.post('/carrito', carrito.createCart);

router.delete('/carrito/:id', carrito.deleteCart);

router.post('/carrito/:id/productos', carrito.addProduct);

router.delete('/carrito/:id/productos/:productId', carrito.deleteProduct);


module.exports = router;