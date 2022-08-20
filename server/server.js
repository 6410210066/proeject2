const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const cors = require("cors");
const util = require('util');
// const multer = require("multer");
const users = require('../server/libs/users');
const product = require('../server/libs/product');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
// app.use('/images', express.static('images'));

var mysql = require('mysql');
const { response, query } = require("express");
const employee = require("./libs/employee");
const branch = require("./libs/branch");

var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "db_chawhor"
})
pool.query = util.promisify(pool.query);


// function
let checkAuth = (req, res, next) => {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        token = req.query.token;
    } else {
        token = req.body.token;
    }

    if (token) {
        jwt.verify(token, "MySecretKey", (err, decoded) => {
            if (err) {
                res.send(JSON.stringify({
                    result: false,
                    message: "ไม่ได้เข้าสู่ระบบ"
                }));
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(401).send("Not authorized");
    }
}




// end point
app.post("/api/authen_request", (req, res) => {
    const query = "SELECT * FROM user WHERE MD5(username) = ?";
    pool.query(query, [req.body.username], (error, results) => {
        var response;
        if (error) {
            response = {
                result: false,
                message: error.message
            };
        } else {
            if (results) {
                var payload = {username: req.body.username};
                var secretKey = "MySecretKey";
                const authToken = jwt.sign(payload.username, secretKey);
                response = {
                    result: true,
                    data: {
                        auth_token: authToken
                    }
                };
            } else {
                response = {
                    result: false,
                    message: "Username ไม่ถูกต้อง"
                };
            }
        }
        res.json(response);
    });
});

app.post("/api/access_request", (req, res) => {
    const authenSignature = req.body.auth_signature;
    const authToken = req.body.auth_token;

    var decoded = jwt.verify(authToken, "MySecretKey");

    if (decoded) {
        const query = "SELECT a.user_id, a.username, a.role_id, b.role_name "
            + "FROM user a JOIN roles b ON a.role_id = b.role_id WHERE MD5(CONCAT(username, '&', password)) =  ?";
        pool.query(query,[authenSignature], (error,results) =>{
            var response;
            if (error) {
                response = {
                    result: false,
                    message: error.message
                };
            } else {
                if (results.length) {
                    var payload = {
                        user_id: results[0].user_id, username: results[0].username, 
                        role_id: results[0].role_id, role_name: results[0].role_name
                    };
                    const accessToken = jwt.sign(payload, "MySecretKey");
                    response =  { result: true, data: { access_token: accessToken, account_info: payload}};
                } else {
                    response = { result: false, message: "Username หรือ Password ไม่ถูกต้อง"}
                }
            }
            res.json(response)
        });
    }
});


app.post("/login", (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;

    pool.query("SELECT * FROM user WHERE username = ? AND password = MD5(?)", [username, password], function(error, results, fields){
        if (error) {
            res.json({
                result: false,
                message: error.message
            });
        }

        if (results.length) {
            res.json({
                result: true
            });
        } else {
            res.json({
                result:false,
                message: "ไม่พบ Username หรือ Password ไม่ถูกต้อง"
            });
        }
    });

});

app.post('/home', (req, res) =>{
    let {username} = req.body

    pool.query("SELECT * FROM user WHERE username = ?", [username], function(error, results, fields){
        if (error) {
            res.json({
                result: false,
                message: error.message
            });
        }

        if (results.length) {
            res.json({
                result: true,
                data:results[0].role_id
            });
        } else {
            res.json({
                result:false,
                message: "ไม่พบ Username หรือ Password ไม่ถูกต้อง"
            });
        }
    });
})

app.get('/api/users', (req,res)=>{
    pool.query("SELECT * FROM user",function(error,results,fields){
        if(error){
            res.json({
                result: false,
                message: error.message
            });
        }

        if(results.length){
            res.json({
                result:true,
                data: results
            });
        }else{
            res.json({
                result: false,
                message: "ไม่พบบัญชีผู้ใช้"
            });
        }
    });
});

app.post('/api/users/add',checkAuth ,async(req,res)=>{
    const input = req.body;

    try{
        var result = await users.createUser(pool,input.username,input.password,input.role_id);
        res.json({
            result: true,
            data: result
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }
});

app.post('/api/users/update',checkAuth,async(req,res)=>{
    const input = req.body;
    
    try{
        var result = await users.updateUser(pool,input.user_id,input.username,input.password,input.role_id,input.checkpassword);
        res.json({
            result: true
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }
});

app.post('/api/users/delete',checkAuth,async(req,res)=>{
    const input = req.body;

    try{
        var result = await users.deleteUsers(pool,input.user_id);
        res.json({
            result: true
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }
});

app.post('/api/users/search',async(req,res)=>{
    let {username} = req.body;
    console.log(username);
    try{

        pool.query(`SELECT * FROM user WHERE username LIKE '%${username}%'`, function(error,results,fields){
            console.log("inquery"+results);
            if (error) {
                res.json({
                    result: false,
                    message: error.message
                });
            }
    
            if (results.length) {
                res.json({
                    result: true,
                    data:results
                });
                
            } else {
                res.json({
                    result:false,
                    message: "ไม่พบ user นี้"
                });
            }
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }
});

app.get('/api/users/:user_id',async(req,res)=>{
    const userid = req.params.user_id;

    try{
        var result = await users.getByUserId(pool,userid);
        res.json({
            result: true,
            data: result
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }
});

app.get('/api/product', (req,res)=>{
    pool.query("SELECT * FROM product",function(error,results,fields){
        if(error){
            res.json({
                result: false,
                message: error.message
            });
        }

        if(results.length){
            res.json({
                result:true,
                data: results
            });
            
        }else{
            res.json({
                result: false,
                message: "ไม่พบสินค้า"
            });
        }
    });
});

app.post('/api/product/add',checkAuth, async(req,res)=>{
    const input = req.body;

    try{
        var result = await product.createProduct(pool,input.product_name,input.product_price,input.product_size,
                                                input.product_weight,input.product_img,input.product_type_id);
        res.json({
            result: true,
            data: result
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }
});

app.post('/api/product/update',checkAuth,async(req,res)=>{
    const input = req.body;
    
    try{
        var result = await product.updataProduct(pool,input.product_id,input.product_name,input.product_price,input.product_size,
                                                input.product_weight,input.product_img,input.product_type_id);
        res.json({
            result: true
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }
});


app.post('/api/product/delete',async(req,res)=>{
    const input = req.body;

    try{
        var result = await product.deleteProduct(pool,input.product_id);
        res.json({
            result: true
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }
});

app.get('/api/product/:product_id',async(req,res)=>{
    const product_id = req.params.product_id;

    try{
        var result = await product.getByproductId(pool,product_id);
        res.json({
            result: true,
            data: result
        });
        console.log("re ="+ result);

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }
});

app.get('/api/employee', (req,res)=>{
    pool.query("SELECT * FROM employee",function(error,results,fields){
        if(error){
            res.json({
                result: false,
                message: error.message
            });
        }
        if(results.length){
            res.json({
                result:true,
                data: results
            });
        }else{
            res.json({
                result: false,
                message: "ไม่พบบัญชีผู้ใช้"
            });
        }
    });
});

app.post('/api/employee/add',checkAuth,async(req,res)=>{
    const input = req.body;

    try{
        var result = await employee.createEmp(pool,input.firstname,input.lastname,input.address,
                                            input.salary,input.phone_number,input.branch_id,input.user_id);
        res.json({
            result: true
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }
});

app.post('/api/employee/update',checkAuth,async(req,res)=>{
    const input = req.body;
    
    try{
        var result = await employee.updateEmp(pool,input.emp_id,input.firstname,input.lastname,input.address,
                                            input.salary,input.phone_number,input.branch_id);
        res.json({
            result: true
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }
});

app.post('/api/employee/delete',checkAuth,async(req,res)=>{
    const input = req.body;

    try{
        var result = await employee.deleteEmp(pool,input.emp_id);
        res.json({
            result: true
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }
});

app.get('/api/employee/:emp_id',async(req,res)=>{
    const empid = req.params.emp_id;

    try{
        var result = await employee.getByEmpId(pool,empid);
        res.json({
            result: true,
            data: result
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }
});
app.get('/api/stock', (req,res)=>{
    pool.query("SELECT a.stock_id,b.m_name, a.stock_amount, b.m_unit,c.branch_name FROM stock a join material b join branch c WHERE a.m_id = b.m_id AND a.branch_id =c.branch_id",function(error,results,fields){
        if(error){
            res.json({
                result: false,
                message: error.message
            });
        }
        if(results.length){
            res.json({
                result:true,
                data: results
            });
        }else{
            res.json({
                result: false,
                message: "ไม่พบรายการ"
            });
        }
    });
});



app.get('/api/branch', (req,res)=>{
    pool.query("SELECT a.branch_id,a.branch_name,a.branch_address,b.firstname,b.lastname  FROM branch a JOIN employee b ON a.emp_id = b.emp_id",function(error,results,fields){
        if(error){
            res.json({
                result: false,
                message: error.message
            });
        }
        if(results.length){
            
            res.json({
                result:true,
                data: results
            });
        }else{
            res.json({
                result: false,
                message: "ไม่พบข้อมูลจัดการคำขอ"
            });
        }
    });
});

app.post('/api/branch/add',checkAuth,async(req,res)=>{
    const input = req.body;
    console.log(input);
    try{
        var result = await branch.createBranch(pool,input.branch_name,input.branch_address);
        res.json({
            result: true
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }
});

app.post('/api/branch/update',checkAuth,async(req,res)=>{
    const input = req.body;
    
    try{
        var result = await branch.updateBranch(pool,input.branch_id,input.branch_name,input.branch_address);
        res.json({
            result: true
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }
});

app.post('/api/branch/delete',checkAuth,async(req,res)=>{
    const input = req.body;

    try{
        var result = await branch.deleteBranchId(pool,input.branch_id);
        res.json({
            result: true
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }

})



app.get('/api/branch/:branch_id',async(req,res)=>{
    const branchid = req.params.branch_id;

    try{
        var result = await branch.getByBranchId(pool,branchid);
        res.json({
            result: true,
            data: result
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }
});


app.listen(port, () => {
    console.log("Running");
});

