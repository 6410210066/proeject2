const mysql = require('mysql');

module.exports={
    createTransfer: async (pool,status_id,origin_branch,destination_branch,request_id,m_id,stock_amount)=>{
        var sql = "INSERT INTO transfer (status_id,origin_branch,destination_branch,request_id,m_id,stock_amount,t_description) VALUES (?,?,?,?,?,?,'')";
        sql = mysql.format(sql,[status_id,origin_branch,destination_branch,request_id,m_id,stock_amount]);
        return await pool.query(sql);
    },
    getTransfer: async(pool)=>{
        var sql = "SELECT t.*, m.m_name , s.status_name FROM transfer t JOIN material m ON t.m_id = m.m_id JOIN status s ON t.status_id = s.status_id";
        return await pool.query(sql);
    }
   
}