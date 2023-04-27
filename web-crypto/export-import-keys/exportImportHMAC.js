const { subtle } = require('node:crypto').webcrypto;

async function generateAndExportHmacKey(format = 'jwk', hash = 'SHA-512') {
    const key = await subtle.generateKey({
        name: 'HMAC',
        hash,
    }, true, ['sign', 'verify']);

    return subtle.exportKey(format, key);
}

async function importHmacKey(keyData, format = 'jwk', hash = 'SHA-512') {
    const key = await subtle.importKey(format, keyData, {
        name: 'HMAC',
        hash,
    }, true, ['sign', 'verify']);

    return key;
}


generateAndExportHmacKey()
.then(key => {
    console.log('key exported:', key);
    return importHmacKey(key);
})
.then((imported) => {
    console.log('key imported:', imported);
});