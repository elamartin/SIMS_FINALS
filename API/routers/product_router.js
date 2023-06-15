const express = require('express')
const product_controller = require('../controllers/product_controller')

const product_router = express.Router()

product_router.post('/add.product', product_controller.addProduct)
product_router.get('/view/all', product_controller.viewAllProducts)
product_router.put('/update/:id', product_controller.updateProduct)
product_router.delete('/delete/:id', product_controller.deleteProduct)
product_router.get('/view/all', product_controller.viewProductsBySupplier)

module.exports = product_router