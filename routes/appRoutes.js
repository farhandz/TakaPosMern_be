const express = require('express')
const router = express.Router()
const respnse = require('../helper/response')
const category = require('../controllers/api/category')
const produk = require('../controllers/api/produk')
const auth = require('../controllers/api/auth')

// category
router.get('/', category.getAlldata)
router.get('/category/:id', category.getByidCategory)
router.post('/category', category.insertCategory)
router.put('/category/:id', category.updateCategory)
router.delete('/category/:id', category.deleteCategory)

// produk
router.post('/produk', produk.insertProduk )
router.get('/produk', produk.viewProduk)
router.delete('/produk/:id', produk.deleteProduk)
router.put('/produk/:id', produk.updateProduk)



// auth
router.post('/register', auth.register)

module.exports = router