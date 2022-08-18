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
const { response } = require("express");
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
            result: true
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



app.listen(port, () => {
    console.log("Running");
});