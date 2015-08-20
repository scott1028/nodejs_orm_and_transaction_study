'use strict';


//
var orm = require('orm');
var transaction = require("orm-transaction");


//
orm.connect('mysql://root:password@127.0.0.1/ssd_data', function (err, db){
    if(err) throw err;

    //
    db.use(transaction);


    //
    var User = require('./models.js')(db).User;


    //
    db.sync(function (err){
        if(err) throw err;


        //
        User.find({User_ID: 'admin'}).each(function (obj){
            if(err) throw err;


            // Query
            console.log(obj.User_ID);
            console.log(obj.User_Name);
            console.log(obj.Password);


            // Update
            obj.User_Name = new Date + '';
            obj.save(function (err){
                if(err) throw err;
            });


            // transaction operation update
            db.transaction(function (err, t){
                if(err) throw err;


                //
                obj.User_Name = new Date + '';
                obj.save(function (err){
                    if(err) throw err;
                });


                //
                t.commit(function (err){
                    if(err) throw err;
                    console.log("success!");
                });
            });
        });


        // non-transaction operation
        User.find({User_ID: 'admin'}).each(function (obj){
            // Update
            obj.User_Name = new Date + '';
            obj.save(function (err){
                if(err) throw err;
            });
        });
    });
});