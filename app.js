var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require("passport");
//passport config:
require('./config/passport')(passport)

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var clientesRouter = require('./routes/clientes');
var despesasRouter = require('./routes/despesas');
var produtosRouter = require('./routes/produtos');
var sobrasRouter = require('./routes/sobras');
var custosRouter = require('./routes/custos');
var pdvRouter = require('./routes/pdv');
var pedidosRouter = require('./routes/pedidos');

// Core Essencials
var gerenciadosRouter = require('./routes/gerenciados');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
    })

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/clientes', clientesRouter);
app.use('/clientes/novo', clientesRouter);
app.use('/despesas', despesasRouter);
app.use('/produtos', produtosRouter);
app.use('/sobras', sobrasRouter);
app.use('/custos', custosRouter);
app.use('/pdv', pdvRouter);
app.use('/gerenciados', gerenciadosRouter);
app.use('/pedidos', pedidosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
