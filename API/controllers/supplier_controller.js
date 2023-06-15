const database = require('../models/connection_db')
const supplier_model = require('../models/supplier_model')

const addSuppliers = (req, res, next)=>{

    let username = req.body.username
    let password = req.body.password
    let supp_name = req.body.name
    let supp_loc = req.body.loc

    if (username == "" || password == ""){
        res.status(400).json({
            successful: false, 
            message: "Username or password is missing"
        })
    }
    else{
        
        let searchQuery = `SELECT * FROM supp_table WHERE supplier= '${supplier}'`
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
                        message : "Supplier is already in the database"
                    })
                }
                else {
                    let supplier_obj = supplier_model.supplier_model(username,password)
                    let insertQuery = `INSERT INTO supp_tbl SET ?`

                    db.db.query(insertQuery, supplier_obj, (err, rows, result)=>{
                        if (err){
                            res.status(500).json({
                                successful: false,
                                message: err
                            })
                        }
                        else{
                            res.status(200).json({
                                successful: true,
                                message:"Successfully added new supplier to the database"
                            })
                        }
                    })
                }
            }
        })
    }
}

const updateSupplier = (req, res, next)=>{
    let username = req.params.username
    let password = req.body.password
    let supp_name = req.body.name

    if (username == "" || password == ""){
        res.status(400).json({
            successful: false,
            message : "Username or password is missing."
        })
    }
    else{
        let searchQuery = `SELECT * FROM emp_tbl WHERE username = '${username}'`
        db.db.query(searchQuery, (err, rows, result)=>{
            if (err){
                res.status(500).json({
                    successful: false,
                    message : err
                })
            }
            else{
                if (rows.length > 0){
                    
                    let updateQuery = `UPDATE supp_tbl SET supplierDetails= $'{supplierDetails}'
                    WHERE supplier = '${supplier}'`

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
                        message: "Successfully updated supplier details!"
                    })
                }
            })
    }
    else{
        res.status(500).json({
            successful : false,
            message : "Supplier does not exist"
        })
    }
}
})
}
}

const updateSupplierLocation = (req, res, next)=>{
    let suppId = req.params.suppId
    let supp_loc = req.body.loc
    
    if (suppId == "" || suppId == null){
        res.status(400).json({
            successful: false,
            message: "Supplier Id is missing."
        })
    }
    else{
        let query = `SELECT supp_loc FROM supp_tbl WHERE supp_loc = ${supp_loc}`
        database.db.query(query, (err, rows, result)=>{
            if (err){
                res.status(500).json({
                message: "err"

                })
            }
            else{
                if(rows.length > 0){
                    let updateQuery = `UPDATE supp_tbl SET supp_loc = ${supp_loc} WHERE suppId = ${suppId}`

                    database.db.query(updateQuery, (err, rows, result)=>{
                        if (err){
                            res.status(500).json({
                                successful: false,
                                message: err
                            })
                        }
                        else{
                            res.status(200).json({
                                successful: true,
                                message: "Successfully updated the supplier location!"
                            })
                        }
                    })
                }
                else{
                    res.status(400).json({
                        successful: false,
                        message: "Supplier can not be found in database"
                    })
                }
            }
        })
    }
}

const deleteSupplier = (req, res, next)=>{
    let username = req.params.username
    let password = req.body.password
    let suppId = req.params.id

    if (suppId == "" || suppId == null){
        res.status(404).json({
            successful: false,
            message: "Supplier Id is missing."
        })
    }
    else{
       let query = `SELECT suppId FROM supp_tbl WHERE suppId = ${suppId}`
       
       database.db.query(query, (err, rows, result)=>{
            if (err){
                res.status(500).json({
                    successful: false,
                    message: err
                })
            }
            else{
                if (rows.length > 0){
                    let deleteQuery = `DELETE FROM supp_tbl WHERE suppId = ${suppId}`

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
                                message: "Successfully delete a supplier."
                            })
                        }
                    })
                }
                else{
                    res.status(400).json({
                        successful: false,
                        message: "Supplier ID does not exist."
                    })
                }
            }
       })
    }
}

const viewAllSuppliers = (req, res, next)=>{
    let query = `SELECT * FROM supp_tbl`
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
                message: "Successfully got all suppliers",
                data: rows
            })
        }
    })
}

const viewSupplierByLocation = (req, res, next)=>{
    let query = `SELECT location FROM supp_tbl`
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
                message: "Successfully got the list of suppliers based on location",
                data: rows
            })
        }
    })
}

module.exports = {
    addSuppliers,
    updateSupplier,
    updateSupplierLocation,
    deleteSupplier,
    viewAllSuppliers,
    viewSupplierByLocation

}