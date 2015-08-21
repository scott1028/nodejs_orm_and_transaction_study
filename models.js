'use strict';


//
module.exports = function (db){
    return {
        User: db.define("user", {
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
        })
    }
};
