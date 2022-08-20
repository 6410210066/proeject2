const mysql = require('mysql');

module.exports={
    createBranch: async (pool,branch_name,branch_address)=>{
        var sql = "INSERT INTO branch(branch_name,branch_address) VALUES (?,?)";
        sql = mysql.format(sql,[branch_name,branch_address]);
        return await pool.query(sql);
    },
    updateBranch: async (pool,branch_id,branch_name,branch_address)=>{
        var sql = "UPDATE branch SET branch_name = ?,branch_address = ? WHERE branch_id = ?";
        sql = mysql.format(sql,[branch_name,branch_address,branch_id]);
        return await pool.query(sql);
    },
    
    deleteBranchId: async (pool,branch_id) => {
        var sql = "DELETE FROM branch WHERE branch_id = ?";
        sql = mysql.format(sql,[branch_id]);
        return await pool.query(sql);
    },
   

    getByBranchId: async (pool,branch_id) => {
        var sql = "SELECT * FROM branch WHERE branch_id = ?";
        sql = mysql.format(sql,[branch_id]);
        return await pool.query(sql);
    },
};