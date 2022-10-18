
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
        var sql ="SELECT a.*,b.m_name ,b.m_unit ,b.m_type,b.Minimum FROM stock a JOIN material b ON a.m_id =b.m_id WHERE a.branch_id = ?";
        sql = mysql.format(sql,[branch_id]);
        return await pool.query(sql);
    },

    getSumStock : async (pool,branch_id) => {
        var sql = `SELECT 
        s.m_id, 
        b.branch_id, 
        b.branch_name, 
        m.m_name, 
        s.stock_amount
        FROM stock s JOIN branch b ON s.branch_id = b.branch_id 
        JOIN material m ON s.m_id = m.m_id
        WHERE b.branch_id = ?;`;
        sql = mysql.format(sql,[branch_id]);
        return await pool.query(sql);
    },

    getByStockId: async(pool,stock_id) =>{
        var sql = "SELECT * FROM stock";
        sql = mysql.format(sql,[stock_id]);
        return await pool.query(sql);
    },
    getReportStock: async (pool) =>{
        var sql ="SELECT s.m_id, SUM(s.stock_amount) as stock_count, m.m_name FROM stock s JOIN material m ON s.m_id = m.m_id GROUP BY m.m_id";
        return await pool.query(sql);
    },
    checkStock : async(pool,m_id,branch_id) =>{
        // var sql = "SELECT sum(s.stock_amount) FROM stock s JOIN material m ON s.m_id = m.m_id WHERE m.m_id = ? AND s.stock_amount >= m.Minimum + ? AND s.branch_id <> ?;";
        var sql = "SELECT sum(s.stock_amount)as sum ,m.Minimum,COUNT(*)as count FROM stock s JOIN material m ON s.m_id = m.m_id WHERE m.m_id = ? AND s.branch_id <> ?"
        sql =mysql.format(sql,[m_id,branch_id]);
        return await pool.query(sql);
    }
}