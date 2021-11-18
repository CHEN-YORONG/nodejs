const express = require('express');
// const db = require('./../modules/connect-mysql');
const upload = require('./../modules/upload-images');
const Product = require('./../models/Product');
const Member = require('./../models/Member')
const router = express.Router();
const bcrypt = require('bcryptjs');

// 新增項目
router.post('/', async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);
    res.json( await Member.add(req.body.account,hash));

});

// 讀取單筆
router.get('/:id',async (req, res) => {
    const output = {
        success: false,
        data: null,
    };
    output.data = await Member.findOne(req.params.id);
    if(output.data){
        output.success = true;
    }
    res.json(output);
} );

// 修改
router.put('/:id', async (req, res) => {
    const output = {
        success: false,
        result: null,
    };
    const p1 = await Member.findOne(req.params.id);
    if(p1){
        output.success = true;
        // console.log(req.body.bookname)
        output.result = await p1.edit(req.body);
        // console.log(output.result)
    }
    res.json(output);
});



module.exports = router;