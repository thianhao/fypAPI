var API_KEY = 1234

var express = require('express')
var router = express.Router()
var moment = require('moment')


//GET
router.get('/', function (req, res, next) {
    res.send('Hello World')
})

module.exports = router

//=======================
//USER TABLE
//POST /GET
//=======================

router.get('/user', async (req, res, next) => {
    console.log(req.query);
    if (req.query.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    } else {
        var ID = req.query.ID;
        if (ID != null) {

           
                req.getConnection(function (error, conn) {
                    conn.query('SELECT ID,Email,Name,Address,PhoneNumber FROM USER where ID=?', [ID], function (err, rows, fields) { 

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    } else {

                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        } else {
                            res.send(JSON.stringify({ success: false, message: "Empty Data" }))
                        }
                    }

                    })
                })
 
          
        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing ID" }));
        }
    }
})

router.post('/user', async (req, res, next) => {
    console.log(req.body)
    if (req.body.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    }
    else {
        var user_name = req.body.userName;
        var user_address = req.body.userAddress;
        var user_email = req.body.userEmail;
        var user_phone = req.body.userPhone;
        var ID = req.body.ID;

        if (ID != null) {


            req.getConnection(function (error, conn) {
                conn.query('INSERT INTO User(ID,Email,Name,Address,PhoneNumber)VALUES(?,?,?,?,?) ON DUPLICATE KEY UPDATE Email=VALUES(Email),Name=VALUES(Name),Address=VALUES(Address),PhoneNumber=VALUES(PhoneNumber)', [ID,user_email,user_name,user_address,user_phone], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    } else {

                        if (rows.affectedRows > 0) {
                            res.send(JSON.stringify({ success: true, message: "Success" }))
                        } 
                    }

                })
            })


        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing ID in Post Query" }));
        }
    }
})


//=======================
//Token TABLE
//POST /GET
//=======================


router.get('/token', async (req, res, next) => {
    console.log(req.query);
    if (req.query.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    } else {
        var ID = req.query.ID;
        if (ID != null) {


            req.getConnection(function (error, conn) {
                conn.query('SELECT * FROM Token WHERE ID=?', [ID], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    } else {

                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        } else {
                            res.send(JSON.stringify({ success: false, message: "Empty Data" }))
                        }
                    }

                })
            })


        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing ID" }));
        }
    }
})

router.post('/token', async (req, res, next) => {
    console.log(req.body)
    if (req.body.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    }
    else {
  
        var token = req.body.token;
        var ID = req.body.ID;

        if (ID != null) {


            req.getConnection(function (error, conn) {
                conn.query('INSERT INTO Token(ID,Token)VALUES(?,?) ON DUPLICATE KEY UPDATE Token=VALUES(Token)', [ID, token], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    } else {

                        if (rows.affectedRows > 0) {
                            res.send(JSON.stringify({ success: true, message: "Success" }))
                        }
                    }

                })
            })


        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing ID in Post Query" }));
        }
    }
})

//=======================
//Restaurant TABLE
//GET
//=======================

router.get('/restaurant', async (req, res, next) => {
    console.log(req.query);
    if (req.query.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    } else {
        req.getConnection(function (error, conn) {
            conn.query('SELECT * FROM Restaurant', function (err, rows, fields) {

                if (err) {
                    res.status(500)
                    res.send(JSON.stringify({ success: false, message: err.message }));
                } else {
                    if (rows.length > 0) {
                        res.send(JSON.stringify({ success: true, result: rows }))
                    } else {
                        res.send(JSON.stringify({ success: false, message: "Empty Data" }))
                    }
                }
            })

        })
    }
} )

router.get('/restaurantByID', async (req, res, next) => {
    console.log(req.query);
    if (req.query.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    } else {
        var ID = req.query.ID;
        if (ID != null) {


            req.getConnection(function (error, conn) {
                conn.query('SELECT ID, Name, lat, lng, UserOwner, Image, PaymentUrl, Address, ROUND(AVG(RATING),1) as Rating FROM Restaurant INNER JOIN Rating on ID=RestaurantID WHERE ID=? GROUP BY ID', [ID], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    } else {

                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        } else {
                            res.send(JSON.stringify({ success: false, message: "Empty Data" }))
                        }
                    }

                })
            })


        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing ID" }));
        }
    }
})


router.get('/nearbyrestaurant', async (req, res, next) => {
    console.log(req.query);
    if (req.query.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    } else {
        var user_lat = parseFloat(req.query.lat)
        var user_lng = parseFloat(req.query.lng)
        var distance = parseInt(req.query.distance)

        if (user_lat != Number.NaN && user_lng != Number.NaN) {

            req.getConnection(function (error, conn) {
                conn.query('SELECT ID, Name, lat, lng, UserOwner, Image, PaymentUrl, Address, ROUND(AVG(RATING),1) as Rating FROM '
                    + '(SELECT ID, Name, lat, lng, UserOwner, Image, PaymentUrl, Address, '
                    + 'ROUND(111.045 * '
                    + 'DEGREES(ACOS('
                    + 'COS(RADIANS(?)) * COS(RADIANS(lat))'
                    + ' * COS(RADIANS(lng) - RADIANS(?))'
                    + '+ SIN(RADIANS(?))'
                    + ' * SIN(RADIANS(lat))'
                    + ')),2 '
                    + ') AS distance_in_km FROM Restaurant) tempTable INNER JOIN Rating on ID=RestaurantID'
                    + ' WHERE distance_in_km < ? GROUP BY ID', [user_lat, user_lng, user_lat, distance], function (err, rows, field) {

                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ success: false, message: err.message }));
                        } else {

                            if (rows.length > 0) {
                                res.send(JSON.stringify({ success: true, result: rows }));
                            }
                            else {
                                res.send(JSON.stringify({ success: false, message: "Empty Data" }));
                            }

                        }
                    })
            })

            } else {
                res.send(JSON.stringify({ success: false, message: "Missing lat or lng in query" }));
            }
                
    }

    
})

router.get('/searchrestaurant', async (req, res, next) => {
    console.log(req.query);
    if (req.query.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    } else {
        var search_query = '%' + req.query.restaurantName + '%';
        if (search_query != null) {


            req.getConnection(function (error, conn) {
                conn.query('SELECT  ID, Name, lat, lng, UserOwner, Image, PaymentUrl, Address,  ROUND(AVG(RATING),1) as Rating FROM Restaurant INNER JOIN Rating on ID=RestaurantID where Name LIKE ? GROUP BY ID', [search_query], function (err, rows, fields) {

                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ success: false, message: err.message }))
                        } else {

                            if (rows.length > 0) {
                                res.send(JSON.stringify({ success: true, result: rows }))
                            } else {
                                res.send(JSON.stringify({ success: false, message: "Empty Data" }))
                            }``
                        }

                    })
            })


        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing restaurantName in query" }));
        }
    }
})

//=======================
//Rating TABLE
//GET/POST
//=======================

router.get('/ratingByID', async (req, res, next) => {
    console.log(req.query);
    if (req.query.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    } else {
        var ID = req.query.ID;
        if (ID != null) {


            req.getConnection(function (error, conn) {
                conn.query('SELECT  ROUND(AVG(RATING),1) FROM Rating where RestaurantID=?', [ID], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    } else {

                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        } else {
                            res.send(JSON.stringify({ success: false, message: "Empty Data" }))
                        }
                    }

                })
            })


        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing restaurantID" }));
        }
    }
})

router.post('/rating', async (req, res, next) => {
    console.log(req.body)
    if (req.body.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    }
    else {

        var rating = req.body.rating;
        var resID = req.body.resID;
        var comment = req.body.comment;
        var userID = req.body.userID;

        if (resID != null) {


            req.getConnection(function (error, conn) {
                conn.query('INSERT INTO Rating(RestaurantID,Rating,Comments,UserID)VALUES(?,?,?,?)', [resID, rating, comment, userID], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    } else {

                        if (rows.affectedRows > 0) {
                            res.send(JSON.stringify({ success: true, message: "Success" }))
                        }
                    }

                })
            })


        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing ID in Post Query" }));
        }
    }
})

//=======================
//MENU TABLE
//GET
//=======================

router.get('/menu', async (req, res, next) => {
    console.log(req.query);
    if (req.query.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    } else {
        var ID = req.query.restaurantID;
        if (ID != null) {


            req.getConnection(function (error, conn) {
                conn.query('SELECT * FROM MENU WHERE ID IN'
                    + '(SELECT MenuID FROM Restaurant_Menu WHERE RestaurantID=?)', [ID], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    } else {

                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        } else {
                            res.send(JSON.stringify({ success: false, message: "Empty Data" }))
                        }
                    }

                })
            })


        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing restaurantID" }));
        }
    }
})

//=======================
//FOOD TABLE
//GET
//=======================

router.get('/food', async (req, res, next) => {
    console.log(req.query);
    if (req.query.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    } else {
        var ID = req.query.restaurantID;
        if (ID != null) {

            req.getConnection(function (error, conn) {
                conn.query('SELECT ID,Name,Description,Image,Price,CASE WHEN IsSize=1 THEN \'TRUE\' ELSE \'FALSE\' END as IsSize,'
                    + 'CASE WHEN IsAddon=1 THEN \'TRUE\' ELSE \'FALSE\' END as IsAddon FROM Food WHERE ID IN'
                    + '(SELECT FoodID FROM Restaurant_Food WHERE RestaurantID=?)', [ID], function (err, rows, fields) {

                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ success: false, message: err.message }))
                        } else {

                            if (rows.length > 0) {
                                res.send(JSON.stringify({ success: true, result: rows }))
                            } else {
                                res.send(JSON.stringify({ success: false, message: "Empty Data" }))
                            }
                        }

                    })
            })

        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing restaurantID" }));
        }
    }
})

router.get('/foodByID', async (req, res, next) => {
    console.log(req.query);
    if (req.query.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    } else {
        var ID = req.query.foodID;
        if (ID != null) {


            req.getConnection(function (error, conn) {
                conn.query('SELECT ID,Name,Description,Image,Price,CASE WHEN IsSize=1 THEN \'TRUE\' ELSE \'FALSE\' END as IsSize,'
                    + 'CASE WHEN IsAddon=1 THEN \'TRUE\' ELSE \'FALSE\' END as IsAddon FROM Food where ID=?', [ID], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    } else {

                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        } else {
                            res.send(JSON.stringify({ success: false, message: "Empty Data" }))
                        }
                    }

                })
            })


        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing foodID" }));
        }
    }
})

router.get('/nutrientsByID', async (req, res, next) => {
    console.log(req.query);
    if (req.query.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    } else {
        var ID = req.query.foodID;
        if (ID != null) {


            req.getConnection(function (error, conn) {
                conn.query('SELECT * FROM nutrientsinfo where foodID=?', [ID], function (err, rows, fields) {

                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ success: false, message: err.message }))
                        } else {

                            if (rows.length > 0) {
                                res.send(JSON.stringify({ success: true, result: rows }))
                            } else {
                                res.send(JSON.stringify({ success: false, message: "Empty Data" }))
                            }
                        }

                    })
            })


        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing foodID" }));
        }
    }
})

router.get('/searchfood', async (req, res, next) => {
    console.log(req.query);
    if (req.query.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    } else {
        var search_query = '%' + req.query.foodName + '%';
        if (search_query != null) {


            req.getConnection(function (error, conn) {
                conn.query('SELECT ID,Name,Description,Image,Price,CASE WHEN IsSize=1 THEN \'TRUE\' ELSE \'FALSE\' END as IsSize,'
                    + 'CASE WHEN IsAddon=1 THEN \'TRUE\' ELSE \'FALSE\' END as IsAddon FROM Food where Name LIKE ?', [search_query], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    } else {

                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        } else {
                            res.send(JSON.stringify({ success: false, message: "Empty Data" }))
                        }
                    }

                })
            })


        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing foodName in query" }));
        }
    }
})

//=======================
//Categories TABLE
//GET
//=======================

router.get('/category', async (req, res, next) => {
    console.log(req.query);
    if (req.query.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    } else {
        

            req.getConnection(function (error, conn) {
                conn.query('SELECT * FROM Categories', function (err, rows, fields) {

                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ success: false, message: err.message }))
                        } else {

                            if (rows.length > 0) {
                                res.send(JSON.stringify({ success: true, result: rows }))
                            } else {
                                res.send(JSON.stringify({ success: false, message: "Empty Data" }))
                            }
                        }

                    })
            })

    }
})

router.get('/foodcategories', async (req, res, next) => {
    console.log(req.query);
    if (req.query.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    } else {
        var ID = req.query.categoryID;
        if (ID != null) {

            req.getConnection(function (error, conn) {
                conn.query('SELECT ID, Name, lat, lng, UserOwner, Image, PaymentUrl, Address, AVG(Rating) as Rating FROM Restaurant INNER JOIN Rating on ID=RestaurantID WHERE ID IN'
                    + '(SELECT RestaurantID FROM Categories_Restaurant WHERE CategoryID=?) GROUP BY ID', [ID], function (err, rows, fields) {

                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ success: false, message: err.message }))
                        } else {

                            if (rows.length > 0) {
                                res.send(JSON.stringify({ success: true, result: rows }))
                            } else {
                                res.send(JSON.stringify({ success: false, message: "Empty Data" }))
                            }
                        }

                    })
            })

        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing CategoryID" }));
        }
    }
})

//=======================
//SIZE TABLE
//GET
//=======================

router.get('/size', async (req, res, next) => {
    console.log(req.query);
    if (req.query.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    } else {
        var ID = req.query.foodID;
        if (ID != null) {

            req.getConnection(function (error, conn) {
                conn.query('SELECT * FROM Size WHERE ID IN'
                    + '(SELECT SizeID FROM Food_Size WHERE FoodID=?)', [ID], function (err, rows, fields) {

                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ success: false, message: err.message }))
                        } else {

                            if (rows.length > 0) {
                                res.send(JSON.stringify({ success: true, result: rows }))
                            } else {
                                res.send(JSON.stringify({ success: false, message: "Empty Data" }))
                            }
                        }

                    })
            })


        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing foodID" }));
        }
    }
})

//=======================
//ADDON TABLE
//GET
//=======================

router.get('/addon', async (req, res, next) => {
    console.log(req.query);
    if (req.query.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    } else {
        var ID = req.query.foodID;
        if (ID != null) {

            req.getConnection(function (error, conn) {
                conn.query('SELECT * FROM Addon WHERE ID IN'
                    + '(SELECT AddonID FROM Food_Addon WHERE FoodID=?)', [ID], function (err, rows, fields) {

                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ success: false, message: err.message }))
                        } else {

                            if (rows.length > 0) {
                                res.send(JSON.stringify({ success: true, result: rows }))
                            } else {
                                res.send(JSON.stringify({ success: false, message: "Empty Data" }))
                            }
                        }

                    })
            })


        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing foodID" }));
        }
    }
})

//=======================
//ORDER & ORDERDETAILS TABLE
//GET /POST
//=======================

router.get('/order', async (req, res, next) => {
    console.log(req.query);
    if (req.query.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    } else {
        var ID = req.query.userID;
        if (ID != null) {

            req.getConnection(function (error, conn) {
                conn.query('SELECT * FROM userorder2 WHERE UserID=? ORDER BY OrderID DESC',[ID], function (err, rows, fields) {

                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ success: false, message: err.message }))
                        } else {

                            if (rows.length > 0) {
                                res.send(JSON.stringify({ success: true, result: rows }))
                            } else {
                                res.send(JSON.stringify({ success: false, message: "Empty Data" }))
                            }
                        }

                    })
            })


        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing userID" }));
        }
    }
})

router.get('/getOrderByStatus', async (req, res, next) => {
    console.log(req.query);
    if (req.query.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    } else {
        var status = req.query.status;
        if (status != null) {

            req.getConnection(function (error, conn) {
                conn.query('SELECT * FROM UserOrder2 WHERE OrderStatus=?', [status], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    } else {

                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        } else {
                            res.send(JSON.stringify({ success: false, message: "Empty Data" }))
                        }
                    }

                })
            })


        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing status" }));
        }
    }
})

router.get('/getOrderByID', async (req, res, next) => {
    console.log(req.query);
    if (req.query.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    } else {
        var ID = req.query.ID;
        if (ID != null) {

            req.getConnection(function (error, conn) {
                conn.query('SELECT * FROM UserOrder2 WHERE OrderID=?',[ID], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    } else {

                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        } else {
                            res.send(JSON.stringify({ success: false, message: "Empty Data" }))
                        }
                    }

                })
            })


        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing ID" }));
        }
    }
})


router.post('/createOrder', async (req, res, next) => {
    console.log(req.body)
    if (req.body.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    }
    else {
       
        var user_id = req.body.userID;
        var user_name = req.body.userName;
        var order_address = req.body.orderAddress;
        var order_status = req.body.orderStatus;
        var order_date = moment(req.body.orderDate, "MM/DD/YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
        var restaurant_id = req.body.resID;
        var restaurant_name = req.body.resName
        var transaction_id = req.body.tranID;
        var total_price = req.body.totalPrice;
        var num_item = req.body.num;
        var lat = req.body.lat;
        var lng = req.body.lng;
        var shippingFees = req.body.shippingFees;


        if (user_id != null) {


            req.getConnection(function (error, conn) {
                conn.query('INSERT INTO userorder2(UserID, UserName, OrderAddress, OrderStatus, OrderDate, RestaurantID, RestaurantName, TransactionID, TotalPrice, NumOfItem, Lat, Lng, ShippingFees)'
                    + 'VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)', [user_id, user_name, order_address, order_status, order_date, restaurant_id, restaurant_name, transaction_id, total_price, num_item, lat, lng, shippingFees], function (err, rows, fields) {

                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ success: false, message: err.message }))
                        } else {

                            conn.query('SELECT OrderID as orderNumber FROM `userorder2` WHERE UserID=? AND NumOfItem > 0' +
                                ' ORDER BY orderNumber DESC LIMIT 1', [user_id], function (err, rows, fields) {

                                    if (err) {
                                        res.status(500)
                                        res.send(JSON.stringify({ success: false, message: err.message }))
                                    } else {

                                        res.send(JSON.stringify({ success: true, result: rows }))
                                    }
                                }
                            )
                        }
                     
                    }

                )
            })

        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing userID in Post Query" }));
        }
    }
})

router.post('/updateStatus', async (req, res, next) => {
    console.log(req.body)
    if (req.body.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    }
    else {

        var order_id = req.body.orderID;
        var order_status = req.body.status;


        if (order_id != null) {

            
            req.getConnection(function (error, conn) {
                conn.query('UPDATE userorder2 SET OrderStatus=? WHERE OrderID=?', [order_status,order_id], function (err, rows, fields) {

                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ success: false, message: err.message }))
                        } else {
                            if (rows.affectedRows > 0) {
                                res.send(JSON.stringify({ success: true, message: "Success" }))
                            }
                        }

                    }

                )
            })

        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing orderID in Post Query" }));
        }
    }
})

router.get('/orderdetails', async (req, res, next) => {
    console.log(req.query);
    if (req.query.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    } else {
        var ID = req.query.orderID;
        if (ID != null) {

            req.getConnection(function (error, conn) {
                conn.query('SELECT * FROM orderdetails123 WHERE OrderID=?', [ID], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    } else {

                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        } else {
                            res.send(JSON.stringify({ success: false, message: "Empty Data" }))
                        }
                    }

                })
            })


        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing orderID" }));
        }
    }
})

router.post('/updateOrder', async (req, res, next) => {
    console.log(req.body)
    if (req.body.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    }
    else {

        var order_id = req.body.orderID;
        var order_details;

        try {
            order_details = JSON.parse(req.body.orderDetails);
        }

        catch (err) {
            console.log(err)
            res.status(500)
            res.send(JSON.stringify({ success: false, message: err.message }));
        }


        if (order_id != null && order_details != null) {

            var data_insert = []
            for (i = 0; i < order_details.length; i++) {
                data_insert[i] = [
                    order_id,
                    order_details[i]["foodID"],
                    order_details[i]["foodPrice"],
                    order_details[i]["foodDiscount"],
                    order_details[i]["foodQuantity"],
                    order_details[i]["foodSize"],
                    parseFloat(order_details[i]["foodExtraPrice"]),
                    order_details[i]["foodAddon"],
                    order_details[i]["specialRequest"],
                ]
            }


            req.getConnection(function (error, conn) {
                conn.query('INSERT INTO OrderDetails123(OrderID, FoodID, Price, Discount, Quantity, Size, ExtraPrice, Addon, SpecialRequest)'
                    + 'VALUES(?)', data_insert, function (err, rows, fields) {

                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ success: false, message: err.message }))
                        } else {

                            if (rows.affectedRows > 0) {
                                res.send(JSON.stringify({ success: true, message: "Success" }))
                            }
                        }

                    })
            })

        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing orderID or orderDetails in body of Post Request" }));
        }

    }
})


//=======================
//SHIPORDER TABLE
//GET /POST
//=======================

router.post('/shippingOrder', async (req, res, next) => {
    console.log(req.body)
    if (req.body.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    }
    else {

        var orderID = req.body.orderID;
        var restaurant_id = req.body.resID;
        var rider_id = req.body.riderID;;
        var status = req.body.status;
        var resName = req.body.resName;
        var delAdd = req.body.delAdd;
        var earnings = req.body.earnings;
        var date = moment(req.body.date, "MM/DD/YYYY").format("YYYY-MM-DD");
       

        if (orderID != null && restaurant_id != null) { 

        
            req.getConnection(function (error, conn) {
                conn.query('INSERT INTO shiporder(OrderID, RestaurantID, RiderID, ShippingStatus,RestaurantName,DeliverAddress,Earnings,DeliverDate)'
                    + 'VALUES(?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE ShippingStatus=VALUES(ShippingStatus)', [orderID, restaurant_id, rider_id, status, resName, delAdd, earnings, date], function (err, rows, fields) {

                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ success: false, message: err.message }))
                        } else {

                            res.send(JSON.stringify({ success: true, message: "Success" }))
                        }

                    }

                )
            })

        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing orderID or RestaurantID in Post Query" }));
        }
    }
})

router.post('/updateShipOrder', async (req, res, next) => {
    console.log(req.body)
    if (req.body.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    }
    else {

        var order_id = req.body.orderID;
        var shipping_status = req.body.status;


        if (order_id != null) {


            req.getConnection(function (error, conn) {
                conn.query('UPDATE shiporder SET ShippingStatus=? WHERE OrderID=?', [shipping_status, order_id], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    } else {
                        if (rows.affectedRows > 0) {
                            res.send(JSON.stringify({ success: true, message: "Success" }))
                        }
                    }

                }

                )
            })

        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing orderID in Post Query" }));
        }
    }
})

router.get('/shippingOrder', async (req, res, next) => {
    console.log(req.query);
    if (req.query.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    } else {
        var ID = req.query.riderID;
        if (ID != null) {


            req.getConnection(function (error, conn) {
                conn.query('SELECT * FROM shiporder where RiderID=?', [ID], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    } else {

                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        } else {
                            res.send(JSON.stringify({ success: false, message: "Empty Data" }))
                        }
                    }

                })
            })


        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing riderID" }));
        }
    }
})

//=======================
//RIDER TABLE
//POST /GET
//=======================

router.get('/rider', async (req, res, next) => {
    console.log(req.query);
    if (req.query.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    } else {
        var ID = req.query.ID;
        if (ID != null) {


            req.getConnection(function (error, conn) {
                conn.query('SELECT * FROM rider where ID=?', [ID], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    } else {

                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        } else {
                            res.send(JSON.stringify({ success: false, message: "Empty Data" }))
                        }
                    }

                })
            })


        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing ID" }));
        }
    }
})

router.post('/rider', async (req, res, next) => {
    console.log(req.body)
    if (req.body.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    }
    else {
        var user_name = req.body.userName;
        var plate_number = req.body.plateNumber;
        var user_phone = req.body.userPhone;
        var vehicle = req.body.vehicle;
        var email = req.body.email;
        var ID = req.body.ID;

        if (ID != null) {


            req.getConnection(function (error, conn) {
                conn.query('INSERT INTO rider(ID,Phone,Name,PlateNumber,Vehicle,Email)VALUES(?,?,?,?,?,?)'
                    +' ON DUPLICATE KEY UPDATE Phone = VALUES(Phone), Name = VALUES(Name), PlateNumber = VALUES(PlateNumber), Vehicle = VALUES(Vehicle), Email = VALUES(Email)', [ID, user_phone, user_name, plate_number, vehicle, email], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    } else {

                        if (rows.affectedRows > 0) {
                            res.send(JSON.stringify({ success: true, message: "Success" }))
                        }
                    }

                })
            })


        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing ID in Post Query" }));
        }
    }
})

//=======================
//RiderToken TABLE
//POST /GET
//=======================


router.get('/ridertoken', async (req, res, next) => {
    console.log(req.query);
    if (req.query.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    } else {
        var ID = req.query.ID;
        if (ID != null) {


            req.getConnection(function (error, conn) {
                conn.query('SELECT * FROM ridertoken WHERE ID=?', [ID], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    } else {

                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        } else {
                            res.send(JSON.stringify({ success: false, message: "Empty Data" }))
                        }
                    }

                })
            })


        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing ID" }));
        }
    }
})

router.post('/ridertoken', async (req, res, next) => {
    console.log(req.body)
    if (req.body.key != API_KEY) {
        res.send(JSON.stringify({ success: false, message: "WRONG API key" }));
    }
    else {

        var token = req.body.token;
        var ID = req.body.ID;

        if (ID != null) {


            req.getConnection(function (error, conn) {
                conn.query('INSERT INTO ridertoken(ID,Token)VALUES(?,?) ON DUPLICATE KEY UPDATE Token=VALUES(Token)', [ID, token], function (err, rows, fields) {

                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    } else {

                        if (rows.affectedRows > 0) {
                            res.send(JSON.stringify({ success: true, message: "Success" }))
                        }
                    }

                })
            })


        }
        else {
            res.end(JSON.stringify({ success: false, message: "Missing ID in Post Query" }));
        }
    }
})


module.exports = router;
