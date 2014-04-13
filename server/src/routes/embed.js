var util = require('./util'),
    handlebars = require('handlebars'),
    fs = require('fs');

bootstrapTemplate = handlebars.compile(
    fs.readFileSync(__dirname + "/../templates/bootstrap.js.handlebars").toString())

exports.bootstrap = function(req, res, next) {
    function randomId() {
        return "" + Math.floor(Math.random() * 167772159999999).toString(16);
    }

    var jsFile =  bootstrapTemplate({
        ENABLE_UI  : req.query.ui,
        SCRIPT_ID  : req.query.scriptId || randomId(),
        DIV_ID     : req.query.divId || randomId(),
        RENDERED   : '<div id="ekho-container"> <form action="" id="search"> <div> <label for="name">Text Input:</label> <div id="info-field"> <input type="text" name="name" id="info-input" class="attention" value="" tabindex="1" placeholder="Search..."/> </div> <div class="effect-copy attention"></div> <div id="button-field"> <input type="submit" id="button-input" class="attention" value="Submit" /> </div> </div> </form> </div>',
        SERVER_URL : 'http://localhost:3000/'
    });

    res.setHeader("Content-Type", "text/javascript");
    return res.status(200).end(jsFile);
};
