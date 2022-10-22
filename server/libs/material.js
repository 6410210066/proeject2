const mysql = require('mysql');

module.exports={
    getMaterialById : async(pool,m_id)=>{
        var sql ="SELECT s.stock_id,s.stock_amount,s.branch_id,b.branch_name, m.* FROM stock s JOIN material m ON s.m_id = m.m_id JOIN branch b ON s.branch_id = b.branch_id  WHERE m.m_id = ?";
        sql = mysql.format(sql,[m_id]);
        return await pool.query(sql);
    },
    getMaterial: async(pool)=>{
        var sql ="SELECT * FROM material";
        return await pool.query(sql);
    },
    createMaterial: async(pool,m_name,m_unit,m_type,Minimum)=>{
        var sql ="INSERT INTO material (m_name,m_unit,m_type,Minimum) VALUES (?,?,?,?)";
        sql = mysql.format(sql,[m_name,m_unit,m_type,Minimum]);
        console.log(sql);
        return await pool.query(sql);
    },
    editMaterial: async(pool,m_id,m_name,m_unit,m_type,Minimum)=>{
        var sql = "UPDATE material SET m_name =? ,m_unit = ? , m_type =? ,Minimum =? WHERE  m_id = ?";
        sql = mysql.format(sql,[m_name,m_unit,m_type,Minimum,m_id]);
        return await pool.query(sql);
    },
    deleteMaterial: async(pool,m_id)=>{
        var sql ="DELETE FROM material WHERE m_id = ?";
        sql = mysql.format(sql,[m_id]);
        return await pool.query(sql);
    }
}