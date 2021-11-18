
const jwt = require('jsonwebtoken');

const secretKey = 'kajsdflk768dhaskdjfkl38748';

(async ()=>{

    // 加密
    const token = await jwt.sign({name:'david'}, secretKey);

    console.log(token);

    const token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGF2aWQiLCJpYXQiOjE2MzE2ODU2OTF9.yERGAN-KkDdUdt8PWYYbBhseVTaU_EpMwzymp7TN6uc';

    // 解密
    const decoded = await jwt.verify(token1, secretKey);

    console.log(decoded);

})()