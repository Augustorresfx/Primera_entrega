const Contenedor = require('../models/clase');
const newProduct = new Contenedor('./database/productos.json');

const isAdmin = true;

module.exports = {
    getProducts: (req, res) => {
        const id = req.params.id
        const producto = newProduct.getById(id)
        if (id === undefined) {
            res.status(200).send(newProduct.getAll())
        } else {
            res.status(200).send(producto)
        }
    },
    addProduct: (req, res) => {
        if (isAdmin) {
            newProduct.save({ title: req.body.title, tipo: req.body.tipo, precio: req.body.price, urlImg: req.body.img })
            let length = newProduct.arrayLenght()
            res.status(201).send(`Se ha agregado el producto ${req.body.title} con el id N°${length}`)
            return
        }
        res.status(403).send({
            error: -1,
            description: "ruta: /api/productos POST solo para administradores"
        })
    },
    editProduct: (req, res) => {
        if (isAdmin) {
            const id = parseInt(req.params.id)
            newProduct.deleteById(id)
            newProduct.save({ title: req.body.title, tipo: req.body.tipo, precio: req.body.price, urlImg: req.body.img, id: id })
            res.status(201).send(`Se ha modificado el producto correctamente`)
            return
        }
        res.status(403).send({
            error: -1,
            description: "ruta: /api/productos PUT solo para administradores"
        })
    },
    deleteProduct: (req, res) => {
        if (isAdmin) {
            const id = parseInt(req.params.id)
            newProduct.deleteById(id)
            res.status(200).send('Se ha borrado el producto correctamente!')
            return
        }
        res.status(403).send({
            error: -1,
            description: "ruta: /api/productos DELETE solo para administradores"
        })
    }
}