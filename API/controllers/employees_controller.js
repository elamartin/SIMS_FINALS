const database = require('../models/connection_db')
const employees_model = require('../models/employees_model')

const addEmployees = (req, res, next)=>{

    let username = req.body.username
    let password = req.body.password
    let emp_lastname = req.body.lastname
    let emp_firstname = req.body.firstname
    let emp_age = req.body.age
    let emp_contactno = req.body.contactno
    let emp_email = req.body.email

    if (username == "" || password == ""){
        res.status(400).json({
            successful: false, 
            message: "Username or password is missing"
        })
    }
    else{
        
        let searchQuery = `SELECT * FROM supp_table WHERE emp_Id = '${emp_Id}'`
        db.db.query(searchQuery, (err, rows, result)=>{
            if (err){
                res.status(500).json({
                    successful: false,
                    message : err
                })
            }
            else{
                if (rows.length > 0){
                    res.status(400).json({
                        successful : false,
                        message : "Employee is already in the database"
                    })
                }
                else {
                    let employee_obj = employees_model.employees_model(username,password)
                    let insertQuery = `INSERT INTO supp_table SET ?`

                    db.db.query(insertQuery, employees_obj, (err, rows, result)=>{
                        if (err){
                            res.status(500).json({
                                successful: false,
                                message: err
                            })
                        }
                        else{
                            res.status(200).json({
                                successful: true,
                                message:"Successfully added new employee to the database"
                            })
                        }
                    })
                }
            }
        })
    }
}

const updateEmployees = (req, res, next)=>{
    let username = req.params.id
    let password = req.body.password

    if (username == "" || password == ""){
        res.status(400).json({
            successful: false,
            message : "Username or password is missing."
        })
    }
    else{
        let searchQuery = `SELECT * FROM emp_tbl WHERE emp_Id = '${emp_Id}'`
        db.db.query(searchQuery, (err, rows, result)=>{
            if (err){
                res.status(500).json({
                    successful: false,
                    message : err
                })
            }
            else{
                if (rows.length > 0){
                    
                    let updateQuery = `UPDATE emp_tbl SET employeeDetails= $'{employeeDetails}'
                    WHERE employees = '${employees}'`

                    db.db.query(updateQuery, (err, rows, result)=>{
                        if (err){
                            res.status(500).json({
                                successful : false,
                                message: err
                            })
                        }
                    else{
                    res.status(200).json({
                        successful : false,
                        message: "Successfully updated employee details!"
                    })
                }
            })
    }
    else{
        res.status(500).json({
            successful : false,
            message : "Employee does not exist"
        })
    }
}
})
}
}

const deleteEmployees = (req, res, next)=>{
    let username = req.params.id
    let password = req.body.password

    if (empId == "" || empId == null){
        res.status(404).json({
            successful: false,
            message: "Employee Id is missing."
        })
    }
    else{
       let query = `SELECT empId FROM emp_tbl WHERE empId = ${empId}`
       
       database.db.query(query, (err, rows, result)=>{
            if (err){
                res.status(500).json({
                    successful: false,
                    message: err
                })
            }
            else{
                if (rows.length > 0){
                    let deleteQuery = `DELETE FROM emp_tbl WHERE empId = ${empId}`

                    database.db.query(deleteQuery, (err, rows, result)=>{
                        if (err){
                            res.status(500).json({
                                successful: false,
                                message: err
                            })
                        }
                        else{
                            res.status(200).json({
                                successful: true,
                                message: "Successfully delete an employee."
                            })
                        }
                    })
                }
                else{
                    res.status(400).json({
                        successful: false,
                        message: "Employee id does not exist."
                    })
                }
            }
       })
    }
}

const viewAllEmployees = (req, res, next)=>{
    let query = `SELECT * FROM emp_tbl`
    database.db.query(query, (err, rows, result)=>{
        if (err){
            res.status(500).json({
                successful: false,
                message: err
            })
        }
        else{
            res.status(200).json({
                successful: true,
                message: "Successfully got all employees",
                data: rows
            })
        }
    })
}

module.exports = {
    addEmployees,
    viewAllEmployees,
    updateEmployees,
    deleteEmployees
}
