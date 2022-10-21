
const mysql = require('mysql');

module.exports={

    deleteRequest: async (pool,request_id) => {
        var sql = "DELETE FROM stockrequest WHERE request_id = ?";
        sql = mysql.format(sql,[request_id]);
        return await pool.query(sql);
    },

    getByrequestId: async(pool,request_id) => {
        var sql = "SELECT r.*,s.status_name FROM stockrequest r JOIN status s ON r.status_id = s.status_id WHERE request_id =? ";
        sql = mysql.format(sql,[request_id]);
        return await pool.query(sql);
    },
    createstockrequest: async(pool,stock_amount,description,status,stock_id,emp_id,branch_id) =>{
        var sql = "INSERT INTO stockrequest(request_amount,request_description,status_id,stock_id,emp_id,branch_id) VALUES(?,?,?,?,?,?)";
        sql = mysql.format(sql,[stock_amount,description,status,stock_id,emp_id,branch_id]);
        return await pool.query(sql);
    },
    updateStatusRequest: async(pool,request_id,status_id) =>{
        var sql  = "UPDATE stockrequest SET status_id = ? WHERE request_id = ?";
        sql = mysql.format(sql,[status_id,request_id]);
        return await pool.query(sql);
    },
    getOrderReqeust: async(pool)=>{
        var sql ="SELECT m.m_name, m.m_unit,SUM(sq.request_amount)as sumamount FROM stockrequest sq JOIN stock s ON sq.stock_id = s.stock_id JOIN material m ON s.m_id = m.m_id WHERE MONTH(sq.request_date) = MONTH(CURRENT_TIMESTAMP) GROUP BY m.m_id ORDER BY sumamount DESC";
        return await pool.query(sql);
    }
};