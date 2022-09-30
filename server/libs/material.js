const mysql = require('mysql');

module.exports={
    getMaterialById : async(pool,m_id)=>{
        var sql ="SELECT s.stock_id,s.stock_amount,s.branch_id,b.branch_name, m.* FROM stock s JOIN material m ON s.m_id = m.m_id JOIN branch b ON s.branch_id = b.branch_id  WHERE m.m_id = ?";
        sql = mysql.format(sql,[m_id]);
        return await pool.query(sql);
    }
}