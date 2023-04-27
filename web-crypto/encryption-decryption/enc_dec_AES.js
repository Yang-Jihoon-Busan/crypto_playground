const crypto = require('node:crypto').webcrypto;
const generateAesKey = require('../generateKeys/generateAESKeys');


async function aesEncrypt(plaintext) {
    const ec = new TextEncoder();
    const key = await generateAesKey();
    const iv = crypto.getRandomValues(new Uint8Array(16));

    const ciphertext = await crypto.subtle.encrypt({
        name: 'AES-CBC',
        iv,
    }, key, ec.encode(plaintext));

    return {
        key,
        iv,
        ciphertext,
    };
}

async function aesDecrypt(ciphertext, key, iv) {
    const dec = new TextDecoder();
    const plaintext = await crypto.subtle.decrypt({
        name: 'AES-CBC',
        iv,
    }, key, ciphertext);

    return dec.decode(plaintext);
}


const plain = 'jihoon is genius.';
aesEncrypt(plain)
.then(({ key, iv, ciphertext }) => {
    console.log(key, iv, ciphertext);
    return aesDecrypt(ciphertext, key, iv);
})
.then(console.log);