
const { query } = require('express');
const mysql = require('mysql');

module.exports={
    createProduct: async(pool,product_name,product_price,product_size,
                        product_weight,product_img,product_type_id) =>{
        var sql ="INSERT INTO product(product_name,product_price,product_size,"+
                "product_weight,product_img,product_type_id) VALUES (?,?,?,?,?,?)";
        sql = mysql.format(sql,[product_name,product_price,product_size,product_weight,product_img,product_type_id]);
        return await pool.query(sql);
    },
    updataProduct: async(pool,product_id,product_name,product_price,product_size,
                    product_weight,product_img,product_type_id) =>{
        var sql ="UPDATE product SET product_name =?,product_price=?,product_size=?,product_weight=?,product_img =?,product_type_id =? WHERE product_id =?";
        sql = mysql.format(sql,[product_name,product_price,product_size,product_weight,product_img,product_type_id,product_id]);
        return await pool.query(sql);
    },
    deleteProduct: async(pool,product_id) =>{
        var sql ="DELETE FROM product WHERE product_id = ?";
        sql =mysql.format(sql,[product_id]);
        return await pool.query(sql);
    },

    getByproductId: async(pool,product_id)=>{
        var sql = "SELECT * FROM product WHERE product_id = ?";
        sql = mysql.format(sql,[product_id]);
        return await pool.query(sql);
    }
}