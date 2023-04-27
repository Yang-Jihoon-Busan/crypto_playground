const { subtle } = require('node:crypto').webcrypto;
const generateHMACKey = require('../generateKeys/generateHMACKey');
const generateRSAKeyPairs = require('../generateKeys/generateRSAKeyPairs');


async function sign(key, data) {
    const ec = new TextEncoder();
    const signature = await subtle.sign('RSASSA-PKCS1-v1_5', key, ec.encode(data));
    return signature;
}

async function verify(key, signature, data) {
    const ec = new TextEncoder();
    const verified = await subtle.verify(
        'RSASSA-PKCS1-v1_5',
        key,
        signature,
        ec.encode(data)
    );
    return verified;
}



generateRSAKeyPairs()
.then(({ publicKey, privateKey }) => {
    const ec = new TextEncoder();
    const message = ec.encode('I love cupcakes');

    sign(privateKey, message)
    .then(signature => {
        return verify(publicKey, signature, message)
    })
    .then((isVerified) => {
        console.log(isVerified);
    })
})