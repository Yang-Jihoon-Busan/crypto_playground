const { subtle } = require('node:crypto').webcrypto;

async function generateAndWrapHmacKey(format = 'jwk', hash = 'SHA-512') {
    const [
        key,
        wrappingKey,
    ] = await Promise.all([
        subtle.generateKey({
            name: 'HMAC', hash,
        }, true, ['sign', 'verify']),
        subtle.generateKey({
            name: 'AES-KW',
            length: 256,
        }, true, ['wrapKey', 'unwrapKey']),
    ]);

    const wrappedKey = await subtle.wrapKey(format, key, wrappingKey, 'AES-KW');

    return { wrappedKey, wrappingKey };
}

async function unwrapHmacKey(
    wrappedKey,
    wrappingKey,
    format = 'jwk',
    hash = 'SHA-512'
) {
    const key = await subtle.unwrapKey(
        format,
        wrappedKey,
        wrappingKey,
        'AES-KW',
        { name: 'HMAC', hash },
        true,
        ['sign', 'verify']);

    return key;
}

generateAndWrapHmacKey()
.then(({ wrappedKey, wrappingKey }) => {
    console.log('wrappedKey:', wrappedKey);
    console.log('wrappingKey:', wrappingKey);
    return unwrapHmacKey(wrappedKey, wrappingKey);
})
.then(key => {
    console.log('key:', key);
});