/**
 * login panel
 * author:Chris.Chien
 * describe:This is login model,main url:http://192.168.0.xxxx:3000/web/login
 */
'use strict';
const Login = require('express').Router();
const sakilaTables = require('../public/sakila_tables');
const { Statusfunc, StatusInfo } = require('../config/status_config');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var userData = null;
// 该路由使用的中间件
Login.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// console.log(user_list)
// console.log(passport)
// 定义网站主页的路由
// Login.post('/', function(req, res) {
//     console.log(req.user)
//     let params = req.body;
//     let username = params.username;
//     let lastname = params.lastname;
//     if (!username || !lastname) {
//         console.error('you hava no username or lastname');
//         let errorText = new Statusfunc(401, '没有收到身份验证请求', null).fail();
//         res.json(errorText);
//         return;
//     }
//     res.json('success');
//     // try {
//     //     sakilaTables.actor.findAll({
//     //         where: {
//     //             first_name: username,
//     //             last_name: lastname
//     //         }
//     //     }).then(function(result) {
//     //         let success = new Statusfunc(200, null, result[0]).success();
//     //         res.json(success);
//     //     }).catch(function(err) {
//     //         console.error(err);
//     //         let errorText = new Statusfunc(401, '没有收到身份验证请求', null).fail();
//     //         res.json(errorText);
//     //     });
//     // } catch (error) {
//     //     console.log(error);
//     // }
//     // res.json() req.models.actor.keys = 'actor_id'; res.json(params)
// });
passport.use('login', new LocalStrategy(
    function(username, password, done) {
        if (!username || !password) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        sakilaTables.user_list.findAll({
            where: {
                USERNAME: username,
                PASSWORD: password
            }
        }).then(function(res) {
            userData = res[0].dataValues;
            return done(null, userData);
        }).catch(function(err) {
            return done(null, false, { message: 'i have no idea' });
        });
    }
));
passport.serializeUser(function(user, done) { //保存user对象
    done(null, user); //可以通过数据库方式操作
});

passport.deserializeUser(function(user, done) { //删除user对象
    done(null, user); //可以通过数据库方式操作
});
Login.post('/', passport.authenticate('login', {
    successRedirect: 'login/loginsuccess',
    failureRedirect: 'login/loginfail'
}));
/**
 * define callback router
 */
Login.get('/loginsuccess', function(req, res) {
    if (req.isAuthenticated()) {
        let success = new Statusfunc(200, null, userData).success();
        res.json(success);
    }
});
Login.get('/loginfail', function(req, res) {
    res.json('login fail');
});
// exports router;
module.exports = Login;