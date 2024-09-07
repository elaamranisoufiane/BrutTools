const mysql = require("mysql");
const axios = require('axios');
const connection = require('./db');
const apiKey = process.env.LEMONSQUEEZY_API_KEY;



async function getUserSubscriptionPlan(userId) {
    /*
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'bgai',
    });
*/

    // connection.connect();

    const userQuery = `SELECT subscriptionId,attempt, currentPeriodEnd, customerId, variantId, role,credits, canceled FROM user WHERE id = ?`;

    let user;
    await new Promise((resolve, reject) => {
        connection.query(userQuery, [userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                user = results[0];
                resolve();
            }
        });
    });

    if (!user) {
        throw new Error("User not found");
    }

    let checkVarNumberAttempt = true;


    // if (user.variantId === '101465' && user.attempt > 3) {

    //Credits plans 
    // if (user.variantId === 'price_1OngBeG7wv77vtTGouN8RGtu' && user.attempt > user.credits) {
    //     checkVarNumberAttempt = false;
    // }
    // if (user.variantId === 'price_1OngAsG7wv77vtTGhNTD1JPM' && user.attempt > user.credits) {
    //     checkVarNumberAttempt = false;
    // }
    // if (user.variantId === 'price_1OngAGG7wv77vtTGJwgXp6DX' && user.attempt > user.credits) {
    //     checkVarNumberAttempt = false;
    // }

    //monthly checkout plans 
    if (user.variantId === 'price_1Onm8SG7wv77vtTG3feWL5yz' && user.attempt > user.credits) {
        checkVarNumberAttempt = false;
    }
    if (user.variantId === 'price_1OnmB8G7wv77vtTGeNefIme2' && user.attempt > user.credits) {
        checkVarNumberAttempt = false;
    }

    if (user.credits === 0) {
        checkVarNumberAttempt = false;
    }


    // Check if user is on a pro plan.
    let isPro = null;
    //if (user.variantId === 'price_1OngBeG7wv77vtTGouN8RGtu' || user.variantId === 'price_1OngAsG7wv77vtTGhNTD1JPM' || user.variantId === 'price_1OngAGG7wv77vtTGJwgXp6DX') {

    // if (user.currentPeriodEnd == null && user.credits > 0) {
    //     isPro = (user.credits > 0 && checkVarNumberAttempt && !user.canceled) || (user.role == 'admin');
    // } else {

    isPro =
        (user.variantId &&
            user.currentPeriodEnd &&
            user.currentPeriodEnd.getTime() > Date.now() &&
            checkVarNumberAttempt) || (user.role == 'admin');
    //user.currentPeriodEnd.getTime() + 2_678_400_000 > Date.now();

    // }


    // Retrieve subscription data from the "client"
    let subscription;


    try {
        const response = await axios.get('https://api.lemonsqueezy.com/v1/subscriptions', {
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': `Bearer ${apiKey}`,
            }
        });

        subscription = response.data.data[0];
    } catch (err) {
        // res.status(500).json({ message: err.message || err });
        console.log('message:' + err.message);
    }
    /*
        // If the user has a pro plan, check cancel status on Stripe.
        let isCanceled = false;
    
        if (isPro) {
            isCanceled = subscription.attributes.cancelled;
        }
    */
    //connection.end();

    return {
        subscriptionId: user.subscriptionId,
        currentPeriodEnd: user.currentPeriodEnd ? user.currentPeriodEnd.getTime() : null,
        customerId: user.customerId,
        variantId: user.variantId,
        // isCanceled,
        isPro,
        //updatePaymentMethodURL: subscription.attributes.urls.update_payment_method,
    };

}

module.exports = {
    getUserSubscriptionPlan,
};
