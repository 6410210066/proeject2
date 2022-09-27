
const mysql = require('mysql');

module.exports={
    createStock: async(pool,m_id,stock_amount,branch_id) =>{
        var sql ="INSERT INTO stock (m_id,stock_amount,branch_id) VALUES (?,?,?)";
        sql =mysql.format(sql,[m_id,stock_amount,branch_id]);
        return await pool.query(sql);
    },
    updataStock: async(pool,stock_id,stock_amount) =>{
        var sql ="UPDATE stock SET stock_amount = ? WHERE stock_id =?";
        sql = mysql.format(sql,[stock_amount,stock_id]);
        return await pool.query(sql);
    },
    deleteStock: async(pool,stock_id) =>{
        var sql ="DELETE FROM stock WHERE stock_id =?";
        sql =mysql.format(sql,[stock_id]);
        return await pool.query(sql);
    },
    checkStockBybranch: async(pool,branch_id) =>{
        var sql ="SELECT a.*,b.m_name ,b.m_unit ,b.m_type FROM stock a JOIN material b ON a.m_id =b.m_id WHERE a.branch_id = ?";
        sql = mysql.format(sql,[branch_id]);
        return await pool.query(sql);
    },
    getByStockId: async(pool,stock_id) =>{
        var sql = "SELECT * FROM stock";
        sql =mysql.format(sql,[stock_id]);
        return await pool.query(sql);
    }

}