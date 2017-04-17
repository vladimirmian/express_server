const join = require('path').join;
const routerPath = join(__dirname, 'router');
const login = require('../router/login');
const routers = function(app, bodyParser, session, cookieParser,passport) {
    /**解析body */
    app.use(bodyParser.json({ limit: '1mb' }));
    app.use(bodyParser.urlencoded({ keepExtensions: true, extended: true }));
    /* 设置cookie */
    app.use(cookieParser());
    /* 设置session */
    app.use(session({
        secret: 'Chris.blog.cn',
        saveUninitialized: true,
        resave: true,
        cookie:{maxAge:1800000}
    }));
    // Passport init
    app.use(passport.initialize());
    app.use(passport.session());
    /* 跨域请求 */
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Credentials', false);
        res.header('Access-Control-Max-Age', '86400');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
    });
    app.use(function(err, req, res, next) {
        // treat as 404
        if (err.message && (~err.message.indexOf('not found') || (~err.message.indexOf('Cast to ObjectId failed')))) {
            return next();
        }

        console.error(err.stack);

        if (err.stack.includes('ValidationError')) {
            res.status(422).render('422', { error: err.stack });
            return;
        }

        // error page
        res.status(500).render('500', { error: err.stack });
    });

    /* router define */
    app.use('/web/login', login);
}
module.exports = routers;