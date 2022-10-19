
const mysql = require('mysql');

module.exports={

    createSellrecord: async (pool,emp_id,branch_id,piece,total,getmoney,paychange)=>{
        var sql = "INSERT INTO sellrecord(emp_id,branch_id,piece,total,getmoney,paychange) VALUES (?,?,?,?,?,?)";
        sql = mysql.format(sql,[emp_id,branch_id,piece,total,getmoney,paychange]);
        return await pool.query(sql);
    },

    createSelllist: async (pool,product_id,piece,branch_id,total,s_id) => {
        var sql = "INSERT INTO sell_list(product_id,piece,branch_id,total,s_id) VALUES (?,?,?,?,?)";
        sql = mysql.format(sql,[product_id,piece,branch_id,total,s_id]);
        return await pool.query(sql);
    },

    selectMaxId : async(pool) => {
        var sql = "SELECT MAX(s_id) AS s_id FROM sellrecord";
        sql = mysql.format(sql,[]);
        return await pool.query(sql);
    }
};