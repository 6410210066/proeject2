const mysql = require('mysql');

module.exports={
    createTransfer: async (pool,status_id,origin_branch,destination_branch,request_id,m_id,stock_amount)=>{
        var sql = "INSERT INTO transfer (status_id,origin_branch,destination_branch,request_id,m_id,stock_amount,t_description_sender,t_description_recipient) VALUES (?,?,?,?,?,?,'','')";
        sql = mysql.format(sql,[status_id,origin_branch,destination_branch,request_id,m_id,stock_amount]);
        return await pool.query(sql);
    },
    getTransfer: async(pool)=>{
        var sql = "SELECT t.*, m.m_name,m.m_unit , s.status_name FROM transfer t JOIN material m ON t.m_id = m.m_id JOIN status s ON t.status_id = s.status_id ORDER BY t.t_id DESC";
        return await pool.query(sql);
    },
    getTransferByBranch: async(pool,branch_id)=>{
        var sql = "SELECT t.*,m.m_name,s.status_name FROM `transfer` t JOIN material m ON t.m_id = m.m_id JOIN status s ON t.status_id = s.status_id WHERE t.origin_branch = ? OR t.destination_branch = ?  ORDER BY t.t_id DESC";
        sql = mysql.format(sql,[branch_id,branch_id]);
        return await pool.query(sql);
    },
    updateStatus: async(pool,t_id,status_id)=>{
        var sql = "UPDATE transfer SET status_id = ? WHERE t_id = ?";
        sql = mysql.format(sql,[status_id,t_id]);
        return await pool.query(sql);
    },
    updateDescriptionSender: async(pool,t_description_sander,time_sender,t_id)=>{
        var sql = "UPDATE transfer SET t_description_sender = ? , time_sender = ? WHERE t_id = ? ";
        sql = mysql.format(sql,[t_description_sander,time_sender,t_id]);
        console.log(sql);
        return await pool.query(sql);
    },updataDescriptionRecipient: async(pool,t_description_recipient,time_recipient,t_id)=>{
        var sql = "UPDATE transfer SET t_description_recipient = ? , time_recipient = ? WHERE t_id = ? ";
        sql = mysql.format(sql,[t_description_recipient,time_recipient,t_id]);
        return await pool.query(sql);
    }
   
}