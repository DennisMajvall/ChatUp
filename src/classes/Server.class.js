'use strict';

module.exports = class Server {
  constructor() {
    // save our settings to this
    this.settings = g.settings.Server;

    // add express to this
    this.app = m.express();

    // run the setup method
    this.setup();
  }

  setup() {
  	// Set up all routes used by this application
  	if (m.routing) {
  		m.routing(this.app);
  	}

	// Send a new message
	this.app.get('/send-message/:message',function(req,res){
		console.log('it\'s working');
		res.json({ok:"messaged recieved"});
	});


    // tell express to use middleware to parse JSON
    this.app.use(m.bodyparser.json());

    // declare a webroot
    this.app.use(
      m.express.static(
        m.path.join(g.settings.appRoot, this.settings.webroot)
      )
    );

    // compress all files using gzip
    this.app.use(m.compression());

    // parse all request cookies
    this.app.use(m.cookieparser());

    // parse all urlencoded request body data
    // for example from "standard" HTML forms
    this.app.use(m.bodyparser.urlencoded({extended: false}));

    // listen on port 3000
    var me = this;
    this.app.listen(this.settings.port,  function() {
      console.log("Server listening on port "+me.settings.port);
    });
  }
}
