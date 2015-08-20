'use strict';


var orm = require('orm');

orm.connect('mysql://root:27562952@127.0.0.1/ssd_data', function(err, db){
	if(err) throw err;


	//
	var User = db.define("user", {
        User_ID: String,
        User_Name: String,
        Password: String,
    }, {
        methods: {
            fullName: function () {
                return this.User_Name + '(' + this.User_ID + ')';
            }
        },
        validations: {
            
        }
    });


	//
	db.sync(function(err){
		if(err) throw err;


		//
		User.find({User_ID: 'admin'}, function(err, obj){
			if(err) throw err;

			console.log(obj);

			console.log(obj[0].User_ID);
			console.log(obj[0].User_Name);
			console.log(obj[0].Password);
			obj[0].User_Name = 'test by nodeJs';
			obj[0].save(function(err){
				if(err) throw err;
			});
		});
	});
});