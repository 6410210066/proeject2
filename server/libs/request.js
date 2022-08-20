const mysql = require('mysql');

module.exports={
    getByrequestId: async(pool,request_id) =>{
        var sql = "SELECT * FORM request WHERE request_id =?";
        sql = mysql.format(pool,[request_id]);
        return await pool.query(sql);
    },
    
}