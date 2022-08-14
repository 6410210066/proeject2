// const jwt = require('jsonwebtoken');

const mysql = require('mysql');

module.exports={
    createUser: async (pool,username,password,role_id)=>{
        var sql = "INSERT INTO user(username,password,role_id) VALUES (?,MD5(?),?)";
        sql = mysql.format(sql,[username,password,role_id]);
        return await pool.query(sql);
    },
    updateUser: async (pool,user_id,username,password,role_id) =>{
        var sql = "UPDATE user SET username = ?,password = MD5(?),role_id =? WHERE user_id = ?";
        sql = mysql.format(sql,[username,password,role_id,user_id]);
        return await pool.query(sql);
    },
    deleteUsers: async(pool,user_id) => {
        var sql = "DELETE FROM user WHERE user_id = ?";
        sql = mysql.format(sql,[user_id]);
        return await pool.query(sql);
    },
    getByUserId: async(pool,user_id) =>{
        var sql = "SELECT * FROM user WHERE user_id = ?";
        sql = mysql.format(sql,[user_id]);
        return await pool.query(sql);
    }
};