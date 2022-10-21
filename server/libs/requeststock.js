
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
        var sql ="SELECT sl.product_id,p.product_name ,SUM(sl.piece ) as sumpiece FROM sellrecord s JOIN sell_list sl ON s.s_id = sl.s_id JOIN product p ON p.product_id = sl.product_id WHERE MONTH(s.datetime) = MONTH(CURRENT_TIMESTAMP) GROUP BY sl.product_id ORDER BY sumpiece DESC";
        return await pool.query(sql);
    }
};