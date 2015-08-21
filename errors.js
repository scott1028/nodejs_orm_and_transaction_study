'use strict';


//
module.exports = {
    handler: function (error){


        // make Log message
        if(error) console.log(error);


        // will break this service
        if(error) throw error;
    }
};
