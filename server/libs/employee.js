const mysql = require('mysql');

module.exports={
    createEmp: async (pool,firstname,lastname,address,
                    salary,phone_number,branch_id,user_id)=>{
        var sql = "INSERT INTO employee(firstname,lastname,address,salary,phone_number,branch_id,user_id) VALUES (?,?,?,?,?,?,?)";
        sql = mysql.format(sql,[firstname,lastname,address,salary,phone_number,branch_id,user_id]);
        return await pool.query(sql);
    },
    updateEmp: async (pool,emp_id,firstname,lastname,address,
                    salary,phone_number,branch_id)=>{
        var sql = "UPDATE employee SET firstname = ?,lastname = ?,address = ?,salary = ?,phone_number = ?,branch_id = ? WHERE emp_id = ?";
        sql = mysql.format(sql,[firstname,lastname,address,salary,phone_number,branch_id,emp_id]);
        return await pool.query(sql);
    },

    deleteEmp: async (pool,emp_id) => {
        var sql = "DELETE FROM employee WHERE emp_id = ?";
        sql = mysql.format(sql,[emp_id]);
        return await pool.query(sql);
    },

    getByEmpId: async (pool,emp_id) =>{
        var sql = "SELECT * FROM employee WHERE emp_id = ?";
        sql = mysql.format(sql,[emp_id]);
        return await pool.query(sql);
    },
};