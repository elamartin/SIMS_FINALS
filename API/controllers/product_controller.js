const database = require('../models/connection_db')
const product_model = require('../models/product_model')

const addProduct = (req, res, next)=>{
    let username = req.body.username
    let password = req.body.password
    let prod_name = req.body.name
    let prod_desc = req.body.desc
    let prod_qty = req.body.qty
    let prod_price = req.body.price

    if (prod_name == "" || prod_name == null || prod_qty == "" || prod_qty == null){
        res.status(404).json({
            successful: false,
            message: "Product name or product quantity is not defined"
        })
    }

    else{

        let query = `SELECT prod_name FROM products_tbl WHERE prod_name = '${prod_name}'`

        database.db.query(query, (err, rows, result)=>{
            if (err){
                res.status(500).json({
                 successful: false,
                 message: err
                })
            }
            else{
                if (rows.length > 0){
                    res.status(400).json({
                        successful: false,
                        message: "Product Name already exists."
                    })
                }
                else{
                    let insertQuery = `INSERT INTO product_tbl SET?`
                    let productObj = product_model.product_model(prod_name, prod_desc, prod_qty, prod_price)

                    database.db.query(insertQuery, productObj, (err, rows, result)=>{
                        if (err){
                            res.status(500).json({
                                successful: false,
                                message: err
                            })
                        }
                        else{
                            res.status(200).json({
                                successful: true,
                                message: "Successfully added new product"
                            })
                        }
                    })
                }
            }
        })
    }
}

const viewAllProducts = (req, res, next)=>{
    let query = `SELECT * FROM products_tbl`
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
                message: "Successfully got all products",
                data: rows
            })
        }
    })
}

const viewProductsBySupplier = (req, res, next) => {
    const suppId = req.query.supplierId;
  
    let query = `SELECT * FROM products_tbl`;
  
    if (suppId) {
      query += ` WHERE suppId = ${suppId}`;
    }
  
    database.db.query(query, (err, rows, result) => {
      if (err) {
        res.status(500).json({
          successful: false,
          message: err
        });
      } else {
        res.status(200).json({
          successful: true,
          message: "Successfully retrieved products",
          data: rows
        });
      }
    });
  };
  

const updateProduct = (req, res, next)=>{
    let username = req.body.username
    let password = req.body.password
    let prod_qty = req.bbody.qty
    let prod_price = req.body.price
    let prod_name = req.body.name
    let prod_desc = req.body.desc
    
    if (prod_Id == "" || prod_Id == null){
        res.status(400).json({
            successful: false,
            message: "Product Id is missing."
        })
    }
    else{
        let query = `SELECT prod_Id FROM products_tbl WHERE prod_Id = ${prod_Id}`
        database.db.query(query, (err, rows, result)=>{
            if (err){
                res.status(500).json({
                message: "err"

                })
            }
            else{
                if(rows.length > 0){
                    let updateQuery = `UPDATE products_tbl SET prod_qty = ${prod_qty} WHERE prod_Id = ${prod_Id}`

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
                                message: "Successfully updated the product"
                            })
                        }
                    })
                }
                else{
                    res.status(400).json({
                        successful: false,
                        message: "Product does not exist."
                    })
                }
            }
        })
    }
}

const deleteProduct = (req, res, next)=>{
    let username = req.body.username
    let password = req.body.password
    let prod_Id = req.params.id

    if (prod_Id == "" || prod_Id == null){
        res.status(404).json({
            successful: false,
            message: "Product id is missing."
        })
    }
    else{
       let query = `SELECT prod_Id FROM products_tbl WHERE prod_Id = ${prod_Id}`
       
       database.db.query(query, (err, rows, result)=>{
            if (err){
                res.status(500).json({
                    successful: false,
                    message: err
                })
            }
            else{
                if (rows.length > 0){
                    let deleteQuery = `DELETE FROM products_tbl WHERE prod_Id = ${prod_Id}`

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
                                message: "Successfully delete a product."
                            })
                        }
                    })
                }
                else{
                    res.status(400).json({
                        successful: false,
                        message: "Product id does not exist."
                    })
                }
            }
       })
    }
}

module.exports = {
    addProduct,
    viewAllProducts,
    updateProduct,
    deleteProduct,
    viewProductsBySupplier
}
