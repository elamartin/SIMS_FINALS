const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "test_db"
})

const connectDatabase = ()=>{
    db.connect((error)=>{
        if(error){
            console.log("Error connecting to database.")
        }
        else{
            console.log("Successfully connected to database.")
        }
    })
}

module.exports = {
    db,
    connectDatabase
}
