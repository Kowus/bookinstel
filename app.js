var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var client = require('./routes/client');

var date = new Date();

var api_key = 'key-a820b4d621f4ba6146a75b96eb76d07c';
var domain = 'app8b6602990d76405c8a93049d76dd28ce.mailgun.org';
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });


var app = express();

app.locals.title = 'Bookinstel';
app.locals.subtitle = 'Ditch The Middle-man';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/client', client);

app.post('/contact', function (req, res, next) {
	var data = {
		from:    req.body.email,
		to:      'sodramatic@live.com',
		subject: req.body.subject + ' time: ' + date.getUTCDate(),
		text:    req.body.message
	};
	
	mailgun.messages().send(data, function (error, body) {
		if ( error ) {
			console.log(error.message);
			res.send(error.message);
		}
		console.log(body);
		res.send('Sent!')
	});
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
