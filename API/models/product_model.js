const product_model = (name, desc, qty, price)=>{

    let product = {
        prod_name: name,
        prod_desc: desc,
        prod_qty: qty,
        prod_price: price
    }

    return product
}

module.exports = {
    product_model
}