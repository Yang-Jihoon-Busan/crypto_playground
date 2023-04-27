// 엘리스 입장에서 HMAC, DiffieHellman 을 이용해서 안전하게 메시지를 보낸다.

// private key 로 부터 시작해서, diffie-hellman  shared secret 을 구한다. 
// 하다고 중간에 멈춤.. 
// const alice = createDiffieHellman(32);



const assert = require('node:assert');

const {
  createDiffieHellman,
} = require('node:crypto');

// Generate Alice's keys...
const alice = createDiffieHellman(2048);
const aliceKey = alice.generateKeys();

// Generate Bob's keys...
const bob = createDiffieHellman(alice.getPrime(), alice.getGenerator());
const bobKey = bob.generateKeys();

// Exchange and generate the secret...
const aliceSecret = alice.computeSecret(bobKey);
const bobSecret = bob.computeSecret(aliceKey);

// OK
assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));