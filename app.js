'use strict';


//
var orm = require('orm');
var transaction = require("orm-transaction");
var error = require('./errors.js');


//
orm.connect('mysql://root:password@127.0.0.1/ssd_data', function (err, db){
    error.handler(err);


    //
    db.use(transaction);


    //
    var User = require('./models.js')(db).User;


    //
    db.sync(function (err){
        error.handler(err);


        //
        User.find({User_ID: 'admin'}).each(function (obj){


            // Query
            console.log(obj.User_ID);
            console.log(obj.User_Name);
            console.log(obj.Password);


            // Update
            obj.User_Name = new Date + '';
            obj.save(function (err){
                error.handler(err);
            });


            // transaction operation update
            db.transaction(function (err, t){
                error.handler(err);


                //
                obj.User_Name = new Date + '';
                obj.save(function (err){
                    error.handler(err);
                });


                //
                t.commit(function (err){
                    error.handler(err);
                    console.log("success!");
                });
            });
        });


        // non-transaction operation
        User.find({User_ID: 'admin'}).each(function (obj){
            // Update
            obj.User_Name = new Date + '';
            obj.save(function (err){
                error.handler(err);
            });
        });
    });
});