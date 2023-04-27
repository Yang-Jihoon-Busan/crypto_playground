const { subtle } = require('node:crypto').webcrypto;
const publicExponent = new Uint8Array([1, 0, 1]);

async function generateRSAKeyPairs(modulusLength = 2048, hash = 'SHA-256') {
    const {
        publicKey,
        privateKey,
    } = await subtle.generateKey({
        name: 'RSASSA-PKCS1-v1_5',
        modulusLength,
        publicExponent,
        hash,
    }, true, ['sign', 'verify']);

    return { publicKey, privateKey };
}


module.exports = generateRSAKeyPairs;

// generateRsaKey()
// .then(console.log);