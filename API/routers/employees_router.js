const express = require('express')
const employees_controller = require('../controllers/employees_controller')

const employees_router = express.Router()

employees_router.post('/add.employees', employees_controller.addEmployees)
employees_router.get('/view/all', employees_controller.viewAllEmployees)
employees_router.put('/update/:id', employees_controller.updateEmployees)
employees_router.delete('/delete/:id', employees_controller.deleteEmployees)

module.exports = employees_router