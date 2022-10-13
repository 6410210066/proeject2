
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
    },

    getByEmployeeproduct: async() => {
        var sql = `SELECT 
                    a.*,
                    b.product_type_name
                    FROM product a JOIN product_type b ON a.product_type_id = b.product_type_id WHERE b.product_type_id = ?`;
        sql = mysql.format();
        return await pool.query(sql);
    },

    updateImage: async (pool,product_img) => {
        var sql = "UPDATE product SET image_url = ? "
                    + "WHERE product_img = ?";
        sql = mysql.format(sql, [product_img]);
        return await pool.query(sql);
    },
}