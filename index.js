var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
     host: "103.83.81.134",
    user: "visionindiapower_arteffect",
    password: "S_7@hAw#JIaU",
    database: "visionindiapower_arteffect"
});

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Server Start");
});

con.connect(function (error) {
    if (!!error) console.log(error);
    else console.log("connected");
});

app.get('/', (req, res) => {
    res.send('Welcome to express');
});
app.get('/user', function (req, res) {
    con.query('SELECT * from register', function (error, rows, fields) {
        if (!!error) console.log(error);
        else {
            console.log(rows);
            res.send(rows);
        }
    });
});

app.post('/user', function (req, res) {
    con.query('INSERT INTO register set ?', req.body, function (error, rows, fields) {
        if (!!error) console.log(error);
        else {
            console.log(rows);
            res.send(rows);
        }
    });
});

app.put('/user', function (req, res) {
    con.query('UPDATE register SET name=?, email=?, phone=?, pass=? WHERE id=?', [req.body.name, req.body.email, req.body.phone, req.body.pass, req.body.id], function (error, rows, fields) {
        if (error) throw error;
        console.log(rows);
        res.send(JSON.stringify(rows));
    });
});

app.post('/deluser', function (req, res) {
    var id = req.body.id;
    con.query('DELETE FROM register WHERE id=?', [id], function (error, rows, fields) {
        if (!!error) console.log(error);
        else {
            console.log(rows);
            res.send('success deleted');
        }
    });
});

app.get('/category', function (req, res) {
    con.query('SELECT * from category_master', function (error, rows, fields) {
        if (!!error) console.log(error);
        else {
            console.log(rows);
            res.send(rows);
        }
    });
});
app.post('/category', function (req, res) {
    con.query('INSERT INTO category_master set ?', req.body, function (error, rows, fields) {
        if (!!error) console.log(error);
        else {
            console.log(rows);
            res.send(rows);
        }
    });
});

app.put('/category', function (req, res) {
    con.query('UPDATE category_master SET name=? WHERE id=?', [req.body.name, req.body.id], function (error, rows, fields) {
        if (error) throw error;
        console.log(rows);
        res.send(JSON.stringify(rows));
    });
});

app.post('/delcategory', function (req, res) {
    var id = req.body.id;
    con.query('DELETE FROM category_master WHERE id=?', [id], function (error, rows, fields) {
        if (!!error) console.log(error);
        else {
            console.log(rows);
            res.send('success deleted');
        }
    });
});

app.post('/supplier', function (req, res) {
    var cat = req.body.category;
    var city = req.body.city;
    if (cat == '') {
        con.query('SELECT * from supplier_master WHERE city = ?', [city], function (error, rows, fields) {
            if (!!error) console.log(error);
            else {
                console.log(rows);
                res.send(rows);
            }
        });
    }
    else if(city == ''){
        con.query('SELECT * from supplier_master WHERE category = ?', [cat], function (error, rows, fields) {
            if (!!error) console.log(error);
            else {
                console.log(rows);
                res.send(rows);
            }
        });
    }
    else{
            con.query('SELECT * from supplier_master WHERE category = ? AND city = ?', [cat, city], function (error, rows, fields) {
                if (!!error) console.log(error);
                else {
                    console.log(rows);
                    res.send(rows);
                }
            });
    }
});


app.post('/addsupplier', function (req, res) {
    con.query('INSERT INTO supplier_master set ?', req.body, function (error, rows, fields) {
        if (!!error) console.log(error);
        else {
            console.log(rows);
            res.send(rows);
        }
    });
});

app.get('/viewsupplier', function (req, res) {
    con.query('SELECT * from supplier_master', function (error, rows, fields) {
        if (!!error) console.log(error);
        else {
            console.log(rows);
            res.send(rows);
        }
    });
});

app.put('/supplier', function (req, res) {
    con.query('UPDATE supplier_master SET name=?, mobile1=?, mobile2=?, category=?, city=? WHERE id=?', [req.body.name, req.body.mobile1, req.body.mobile2, req.body.category, req.body.city, req.body.id], function (error, rows, fields) {
        if (error) throw error;
        console.log(rows);
        res.send(JSON.stringify(rows));
    });
});

app.post('/delsupplier', function (req, res) {
    var id = req.body.id;
    con.query('DELETE FROM supplier_master WHERE id=?', [id], function (error, rows, fields) {
        if (!!error) console.log(error);
        else {
            console.log(rows);
            res.send('success deleted');
        }
    });
});



app.get('/city', function (req, res) {
    con.query('SELECT * from city_master', function (error, rows, fields) {
        if (!!error) console.log(error);
        else {
            console.log(rows);
            res.send(rows);
        }
    });
});

app.post('/login', function (req, res) {
    var email = req.body.email;
    var pass = req.body.pass;
    con.query('SELECT * from register WHERE email=? AND pass = ?', [email, pass], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.send({ 'success': false, 'message': 'Incorrect Username and/or Password!' });
        }
        if (rows.length > 0) {
            res.send({ 'success': true, 'user': rows[0].email });
        }
        else {
            res.send({ 'success': false, 'message': 'Incorrect Username or Password!' });
        }
    });
});

app.post('/saveimg', function (req, res) {
    var img = req.body.image;
    con.query('INSERT INTO image_master SET image= ?', [img], function (error, rows, fields) {
        if (!!error) console.log(error);
        else {
            console.log(rows);
            res.send(rows);
        }
    });
});
