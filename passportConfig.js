const { response } = require('express');
const db = require('./db');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    passport.use(
        new localStrategy((username, password, done) => {
            const query = "SELECT * FROM user WHERE username = ? AND is_verified = 1";
            db.query(query, [username], (err, result) => {
                if (err) { throw err; }
                if (result.length === 0) {
                    return done(null, false);
                }
                bcrypt.compare(password, result[0].password, (err, response) => {
                    if (err) { throw err; }
                    if (response === true) {
                        return done(null, result[0]);
                    } else {
                        return done(null, false);
                    }
                })
            })
        })
    )


    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

/*
passport.serializeUser((user, done) => { 
    user.expirationDate = new Date(Date.now() + (2 * 60 * 1000));  
    done(null, user);
});
*/

    passport.deserializeUser((id, done) => {
        const query = "SELECT * FROM `user` WHERE id = ?";
        db.query(query, [id], (err, result) => {
            if (err) {
                console.error(err);
                return done(err);
            }

            if (result.length === 0) {
                console.error("User ID not found. Redirecting to home.");
                return done(null, false);
            }

            const userInfo = {
                id: result[0].id,
                username: result[0].username,
                email: result[0].email,
                coupon: result[0].coupon,
                subscribed: result[0].subscriptionId,
                role: result[0].role,
                NumberOfAttempt: result[0].attempt,
                currentPeriodEnd: result[0].currentPeriodEnd,
                Login: true,
                // add customerID 
                customerID: result[0].customerId,
                credits: result[0].credits,
                planName: result[0].planName,
                canceled: result[0].canceled,
                variantId: result[0].variantId

            };
            done(null, userInfo);
        });
    });


    /*
    passport.deserializeUser((id, done) => {
        const query = "SELECT * FROM `user` WHERE id = ?";
        db.query(query, [id], (err, result) => {
            if (err) { throw err; }
            const userInfo = {
                id: result[0].id,
                username: result[0].username,
                email: result[0].email,
                coupon: result[0].coupon,
                subscribed: result[0].subscriptionId,
                role: result[0].role,
                NumberOfAttempt: result[0].attempt,
                currentPeriodEnd: result[0].currentPeriodEnd,
                Login: true
            }
            done(null, userInfo);
        })
    })
    */



}
