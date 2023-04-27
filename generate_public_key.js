const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');


// DiffieHellman 알고리즘에 의하면, 엘리스 와 밥은 사전에 Prime 과 Generater 를 사전에 정한다고 되어 있다.

const {
    createDiffieHellman,
} = require('node:crypto');

// Generate Alice's keys...
const alice = createDiffieHellman(32);
const aliceKey = alice.generateKeys();

console.log('prime:', alice.getPrime('hex'));

fs.writeFileSync(path.resolve(__dirname) + '/keys/alice_private_key', alice.getPrivateKey('hex'));
fs.writeFileSync(path.resolve(__dirname) + '/keys/alice_key', aliceKey.toString('hex'));



// // Generate Alice key 2
// const alice2 = createDiffieHellman(alice.getPrime(), alice.getGenerator());
// alice2.setPrivateKey(alicePrivateKey, 'hex');
// const aliceKey2 = alice2.generateKeys();
// console.log("alice2's private key", alice2.getPrivateKey('hex'));
// console.log("alice2's public key", aliceKey2.toString('hex'));

// assert.strictEqual(aliceKey2.toString('hex'), aliceKey.toString('hex'));
// assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));


// Generate Bob's keys...
const bob = createDiffieHellman(alice.getPrime(), alice.getGenerator());
const bobKey = bob.generateKeys();

fs.writeFileSync(path.resolve(__dirname) + '/keys/bob_private_key', bob.getPrivateKey('hex'));
fs.writeFileSync(path.resolve(__dirname) + '/keys/bob_key', bobKey.toString('hex'));

// Exchange and generate the secret...
const aliceSecret = alice.computeSecret(bobKey);
const bobSecret = bob.computeSecret(aliceKey);

// OK
assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));