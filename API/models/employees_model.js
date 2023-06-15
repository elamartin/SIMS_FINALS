const employees_model = (lastname, firstname, age, contactno, email)=>{

    let Employee = {
        emp_lastname: lastname,
        emp_firstname: firstname,
        emp_age: age,
        emp_contactno: contactno,
        emp_email: email
    }

    return Employee
}

module.exports = {
    employees_model
}