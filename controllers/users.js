/**
 * @file Users controllers
 */

const User = require('../models/user'); // require user mongoose model
const randomString = require('../utils/randomString'); // require random string utility
const bcrypt = require('bcryptjs'); // bcrypt to hash passwords and other secret codes
const nodemailer = require('nodemailer'); // require nodemailer to send pwd recovery email

// Transporter to send pwd recovery email
const transporter = nodemailer.createTransport({
    service: 'Zoho',
    auth: {
        user: 'nao.responda@dashgen.tech',
        pass: process.env.EMAIL_PWD
    }
});

// render register form
module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

// register new user
module.exports.register = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Bem-vindo(a) ao DashGen!')
            return res.redirect('/');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

// perform login
module.exports.login = (req, res, next) => {
    req.flash('success', 'Bem-vindo(a) de volta!');
    let redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

// perform logout
module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', 'Você saiu da sua conta com sucesso.');
        res.redirect('/');
    });
}

// Render forgot password form (user types email)
module.exports.renderForgotPwd = (req, res, next) => {
    res.render('users/forgotPwd');
}

// Send password recovery email
module.exports.sendPwdEmail = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ username: email });
    if (!user) {
        req.flash('error', `Ops, não encontramos ${email} em nosso banco de dados.`);
        res.redirect('/forgotPwd');
    } else {
        const randCode = randomString.generateString();
        bcrypt.hash(randCode, 10, async function (err, hash) {
            if (!err) {
                await User.updateOne({ username: email }, { randCodeHash: hash, randCodeTimeStamp: Math.floor(Date.now() / 1000) });
                const mailOptions = {
                    from: 'nao.responda@dashgen.tech',
                    to: email,
                    subject: 'Recuperar senha',
                    html: `<h1>Olá!</h1>
                            <p>Para recuperar sua senha do DashGen, utilize o seguinte código:</p>
                            <h2>${randCode}</h2>
                            <p>Att.</p><p>Equipe DashGen</p>`
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        req.flash('error', 'Algo deu errado ao enviar o email. Tente novamente dentro de alguns segundos.');
                        res.redirect('/forgotPwd');
                    } else {
                        res.render('users/changePwd', { email });
                    }
                });
            } else {
                req.flash('error', 'Ops, algo deu errado. Por favor, tente novamente.');
                req.redirect('/forgotPwd');
            }
        });
    }
}

// remove code from db, hash code
module.exports.changePwd = async (req, res, next) => {
    const { code, password, email } = req.body;
    const user = await User.findOne({ username: email });
    if (!user) {
        req.flash('error', 'Ops, algo deu errado. Por favor, tente recuperar sua senha novamente.');
        req.redirect('/forgotPwd');
    } else {
        if (Math.floor(Date.now() / 1000) > user.randCodeTimeStamp + 5 * 60) {
            await User.updateOne({ username: email }, { randCodeHash: undefined, randCodeTimeStamp: undefined });
            req.flash('error', 'Ops, parece que seu código expirou. Por favor, tente novamente.');
            res.redirect('/forgotPwd');
        }
        else {
            bcrypt.compare(code, user.randCodeHash, async function (error, result) {
                if (!error) {
                    if (result) {
                        user.setPassword(password, async function () {
                            user.randCodeHash = undefined;
                            user.randCodeTimeStamp = undefined;
                            await user.save(); // save to the database
                            req.flash('success', 'Senha atualizada com sucesso.');
                            res.redirect('/');
                        });
                    } else {
                        const message = 'Código incorreto.'
                        res.render('users/changePwd', { message, email });
                    }
                } else {
                    req.flash('error', 'Ops, algo deu errado. Por favor, tente novamente.');
                    req.redirect('/forgotPwd');
                }
            });
        }
    }
}