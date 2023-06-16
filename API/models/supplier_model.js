const supplier_model = (name, loc)=>{

    let Supplier = {
        supp_name: name,
        supp_loc: loc
    }

    return Supplier
}

module.exports = {
    supplier_model
}