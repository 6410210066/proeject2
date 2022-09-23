
const mysql = require('mysql');

module.exports={

    deleteRequest: async (pool,request_id) => {
        var sql = "DELETE FROM stockrequest WHERE request_id = ?";
        sql = mysql.format(sql,[request_id]);
        console.log(sql);
        return await pool.query(sql);
    },

    getByrequestId: async(pool,request_id) => {
        var sql = "SELECT * FORM request WHERE request_id =?";
        sql = mysql.format(sql,[request_id]);
        return await pool.query(sql);
    },
    createstockrequest: async(pool,stock_amount,description,request_statues,stock_id,emp_id,branch_id) =>{
        var sql = "INSERT INTO stockrequest(request_amount,request_description,request_status,stock_id,emp_id,branch_id) VALUES(?,?,?,?,?,?)";
        sql = mysql.format(sql,[stock_amount,description,request_statues,stock_id,emp_id,branch_id]);
        console.log(sql);
        return await pool.query(sql);
    }
};