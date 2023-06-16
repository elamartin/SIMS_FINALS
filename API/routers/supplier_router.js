const express = require('express')
const supplier_controller = require('../controllers/supplier_controller')

const supplier_router = express.Router()

supplier_router.post('/add.suppliers', supplier_controller.addSuppliers)
supplier_router.get('/view/all', supplier_controller.viewAllSuppliers)
supplier_router.get('/view/all', supplier_controller.viewSupplierByLocation)
supplier_router.put('/update/:id', supplier_controller.updateSupplier)
supplier_router.put('/update/:id', supplier_controller.updateSupplierLocation)
supplier_router.delete('/delete/:id', supplier_controller.deleteSupplier)

module.exports = supplier_router