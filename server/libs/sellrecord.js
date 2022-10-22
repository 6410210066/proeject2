
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
        var sql = "SELECT s.*, e.firstname,e.lastname,b.branch_name FROM sellrecord s JOIN employee e ON s.emp_id = e.emp_id JOIN branch b ON s.branch_id = b.branch_id";
        return await pool.query(sql);
    },
    getSellrecordByEmp: async(pool,emp_id) => {
        var sql = "SELECT s.*, e.firstname,e.lastname,b.branch_name FROM sellrecord s JOIN employee e ON s.emp_id = e.emp_id JOIN branch b ON s.branch_id = b.branch_id WHERE s.emp_id = ?";
        sql = mysql.format(sql,[emp_id]);
        return await pool.query(sql);
    },
    getSellrecordDashboard: async(pool)=>{
        var sql ="SELECT s.s_id,SUM(piece)as sumpiece ,SUM(total) as sumtotal, COUNT(piece) as sumcustomer FROM sellrecord s JOIN employee e ON s.emp_id = e.emp_id JOIN branch b ON s.branch_id = b.branch_id WHERE DATE(datetime) = CURDATE();";
        return await pool.query(sql);
    },
    getOrderSelllist: async(pool)=>{
        var sql ="SELECT sl.product_id,p.product_name ,SUM(sl.piece ) as sumpiece FROM sellrecord s JOIN sell_list sl ON s.s_id = sl.s_id JOIN product p ON p.product_id = sl.product_id WHERE MONTH(s.datetime) = MONTH(CURRENT_TIMESTAMP) GROUP BY sl.product_id ORDER BY sumpiece DESC";
        return await pool.query(sql);
    },

    getSelllist: async(pool)=>{
        var sql ="SELECT s.*,p.product_name FROM sell_list s JOIN product p ON s.product_id = p.product_id";
        return await pool.query(sql);
    },

    getReportsellrecord : async (pool) => {
        var sql = `SELECT SUM(total) AS sell,
                    b.branch_name
                    FROM sellrecord s JOIN branch b ON s.branch_id = b.branch_id WHERE DATE(datetime) = CURDATE()
                    GROUP BY b.branch_id `;
        return await pool.query(sql);
    },

    getReportsellrecordmonth : async (pool) => {
        var sql = `SELECT SUM(total) AS sell,
                    b.branch_name
                    FROM sellrecord s JOIN branch b ON s.branch_id = b.branch_id WHERE MONTH(s.datetime) = MONTH(CURRENT_TIMESTAMP)
                    GROUP BY b.branch_id `;
        return await pool.query(sql);
    },

    
};