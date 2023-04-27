const { subtle } = require('node:crypto').webcrypto;

async function generateAesKey(length = 256) {
    const key = await subtle.generateKey({
        name: 'AES-CBC',
        length,
    }, true, ['encrypt', 'decrypt']);

    return key;
}


module.exports = generateAesKey;

// generateAesKey()
// .then(console.log);