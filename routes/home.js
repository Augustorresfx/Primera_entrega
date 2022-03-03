const multer = require('multer')
const path = require("path");
const { Router } = require("express");
const Contenedor = require('../models/clase');
const newProduct = new Contenedor('./database/productos.json');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images/productos"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage })
const router = new Router();

router.get('/', (req, res) => {
    const hombres = newProduct.getAll("hombres");
    const mujeres = newProduct.getAll("mujeres");
    if (hombres.length < 0) {
        res.status(200).render('index');
    } else {
        res.status(200).render('index', { hombres, mujeres });
    }
})

router.get(`/buscar`, (req, res) => {
    const producto = req.query.categoria;
    const hombres = newProduct.getAll(producto);
    res.status(200).render('category', { hombres, producto } );
})

router.get('/add', (req, res) => {
    res.status(200).render('form');
})
router.get('/result', (req, res) => {
    const producto = req.query.producto;
    res.status(200).render('result', { producto });
})

router.post('/add', upload.array('img', 2), (req, res) => {
    newProduct.save({ title: req.body.titulo, tipo: req.body.tipo, price: req.body.price, urlImg: req.body.img });
    res.status(201).redirect(`/ejs/result?product=${req.body.titulo}`);
})

module.exports = router;