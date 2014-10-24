// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ); //Web framework

//Create server
var app = express();

var fs = require('fs');
var buf = fs.readFileSync("test.html");

// Configure server
app.configure( function() {
    //parses request body and populates request.body
    app.use( express.bodyParser() );

    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );

    //perform route lookup based on url and HTTP method
    app.use( app.router );

    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//Router
//load static page
app.get('/', function(request, response) {
  response.send(buf.toString());
});

//Get a list of all books
app.get( '/api/scans', function( request, response ) {
    var scans = [
            {
                scanid: "1",
                location: "loc 1",
                releaseDate: "01/01/2014"
            },
            {
                scanid: "2",
                location: "loc 2",
                releaseDate: "02/02/2014"
            }
        ];

    response.send(scans);
});
//Insert a new book
app.post( '/api/scans', function( request, response ) {
    var scan = {
        scanid: request.body.scanid,
        location: request.body.location,
        releaseDate: request.body.releaseDate
    };
    
    response.send(scan);
});
//Get a single book by id
app.get( '/api/scans/:id', function( request, response ) {
    var book = {
        scanid: "3",
        location: "location 3",
        releaseDate: "03/03/2014"
    };
    
    response.send(book);
});
//Update a book
app.put( '/api/scans/:id', function( request, response ) {
    response.send("Updated!");
});
//Delete a book
app.delete( '/api/scans/:id', function( request, response ) {
    response.send("Deleted");
});

//Start server
var port = 4711;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});