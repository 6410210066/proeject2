
const mysql = require('mysql');

module.exports={
    updataStock: async(pool,stock_id,stock_amount) =>{
    var sql ="UPDATE stock SET stock_amount = ? WHERE stock_id =?";
    sql = mysql.format(sql,[stock_amount,stock_id]);
    return await pool.query(sql);
    }
}