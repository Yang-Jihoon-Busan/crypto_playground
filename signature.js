const {
    generateKeyPairSync,
    createSign,
    createVerify,
} = require('node:crypto');
  
  const { privateKey, publicKey } = generateKeyPairSync('ec', {
        namedCurve: 'sect239k1',
  });
  
  const sign = createSign('SHA256');
  sign.write('some data to sign');
  sign.end();
  const signature = sign.sign(privateKey, 'hex');
  console.log('signature', signature);
  
  const verify = createVerify('SHA256');
  verify.write('some data to sign');
  verify.end();
  console.log(verify.verify(publicKey, signature, 'hex'));
  // Prints: true