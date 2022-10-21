
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

    getSellrecord: async(pool) => {
        var sql = "SELECT * FROM sellrecord";
        return await pool.query(sql);
    },
    getSellrecordByEmp: async(pool,emp_id) => {
        var sql = "SELECT e.firstname,e.lastname FROM sellrecord s JOIN employee e ON s.emp_id = e.emp_id WHERE emp_id = ?";
        sql = mysql.format(sql,[emp_id]);
        return await pool.query(sql);
    }
};