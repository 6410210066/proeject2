const mysql = require('mysql');

module.exports={

    deleteRequest: async (pool,request_id) => {
        var sql = "DELETE FROM stockrequest WHERE request_id = ?";
        sql = mysql.format(sql,[request_id]);
        return await pool.query(sql);
    },

    getByrequestId: async(pool,request_id) => {
        var sql = "SELECT * FORM request WHERE request_id =?";
        sql = mysql.format(pool,[request_id]);
        return await pool.query(sql);
    },
    
};