const { subtle } = require('node:crypto').webcrypto;

async function digest(data, algorithm = 'SHA-512') {
    const ec = new TextEncoder();
    const digest = await subtle.digest(algorithm, ec.encode(data));
    return digest;
}



const very_short_data = 'im jihoon you are sohye';
digest(very_short_data)
.then(digested => {
    console.log(digested);
})