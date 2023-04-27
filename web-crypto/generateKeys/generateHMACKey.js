const { subtle } = require('node:crypto').webcrypto;

async function generateHmacKey(hash = 'SHA-256') {
    const key = await subtle.generateKey({
        name: 'HMAC',
        hash,
    }, true, ['sign', 'verify']);

    return key;
}



module.exports = generateHmacKey;


// generateHmacKey()
// .then(console.log);