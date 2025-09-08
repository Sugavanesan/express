const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
}

const getAllEmployees = (req, res) => {
    res.json(data.employees)
}

const createNewEmployee = (req, res) => {
    console.log("data,employees", data.employees)
    const newEmployee = {
        id: data.employees.length ? data.employees[data.employees.length - 1].id + 1 : 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email
    }

    if(!newEmployee.name || !newEmployee.username || !newEmployee.email) {
        return res.status(400).json({ "message": "All fields are required" })
    }

    data.setEmployees([...data.employees, newEmployee])
    res
        .status(201)
        .json(data.employees)
}

const updateNewEmployee = (req, res) => {
    const employee = data.employees.find((emp) => emp.id === parseInt(req.body.id))
    if(!employee) {
        return res.status(400).json({ "message": `Employee id ${req.body.id} not found` })
    }
    if(!req.body.name || !req.body.username || !req.body.email) {
        return res.status(400).json({ "message": "All fields are required" })
    }

    if(req.body.firstName) employee.firstName = req.body.firstName
    if(req.body.username) employee.username = req.body.username
    if(req.body.email) employee.email = req.body.email

    const filteredEmployees = data.employees.filter((emp) => emp.id !== parseInt(req.body.id))
    const unsortedArray=[...filteredEmployees,employee]

    data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : -1))

    res.json(data.employees)   
}

const deleteEmployee = (req, res) => {
    const employee = data.employees.find((emp) => emp.id === parseInt(req.body.id))
    if(!employee) {
        return res.status(400).json({ "message": `Employee id ${req.body.id} not found` })
    }
    const filteredEmployees = data.employees.filter((emp) => emp.id !== parseInt(req.body.id))
    data.setEmployees(filteredEmployees)
    res.json(data.employees)
}

const getEmployees = (req, res) => {
    const employee = data.employees.find((emp) => emp.id === parseInt(req.params.id))
    if(!employee) {
        return res.status(400).json({ "message": `Employee id ${req.params.id} not found` })
    }
    res.json(employee)
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateNewEmployee,
    deleteEmployee,
    getEmployees
}