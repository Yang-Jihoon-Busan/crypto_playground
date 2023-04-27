const { subtle } = require('node:crypto').webcrypto;

async function generateEcKey(namedCurve = 'P-521') {
    const {
        publicKey,
        privateKey,
    } = await subtle.generateKey({
        name: 'ECDSA',
        namedCurve,
    }, true, ['sign', 'verify']);

    return { publicKey, privateKey };
}



generateEcKey()
.then(console.log);