const express = require('express');

const Order = require('./../models/Order');
// const {getListData} = require("./address-book");

const router = express.Router();

// router.use((req, res, next)=>{
//     // 判斷有沒有通過 jwt 驗證 (寫在 index.js 主程式)
//     if(req.myAuth && req.myAuth.id){
//         next();
//     } else {
//         res.json({success: false, error:'沒有 token 或者 token 不合法'});
//     }
// });

// 讀取購物車清單
router.get('/', async (req, res) => {
    res.json({info: 'ok'});
});

// 讀取歷史order
router.get('/getlist/:id',async (req, res) => {
    const output = {
        success: false,
        data: null,
    };
    output.data = await Order.getList(req.params.id);
    if(output.data){
        output.success = true;
    }
    res.json(output);
} );
// 讀取單筆order
router.get('/:id',async (req, res) => {
    const output = {
        success: false,
        data: null,
    };
    output.data = await Order.findOne(req.params.id);
    if(output.data){
        output.success = true;
    }
    res.json(output);
} );

// 新增項目
router.post('/', async (req, res) => {
    // req.body.product_id
    // req.body.quantity
    res.json( await Order.add(req.body.member_sid,req.body.order_sid,req.body.nickname,req.body.mobile,req.body.orderprice,req.body.delivery,req.body.receiver,req.body.delivery_address,req.body.card));
    // member_sid, name, mobile, orderprice, delivery, receiver, delivery_address, card
});


// 修改項目
router.put('/', async (req, res) => {
    res.json( await Order.update(req.myAuth.nickname, req.body.mobile, req.body.orderprice, req.body.delivery, req.body.receiver, req.body.delivery_address, req.body.card,req.myAuth.id));
    // member_sid, name, mobile, orderprice, delivery, receiver, delivery_address, card
});

// 刪除項目
router.delete('/:id', async (req, res) => {
    console.log(req.body.product_id,req.myAuth.id);
    res.json( await Cart.remove(req.myAuth.id, req.body.product_id));
});

// 清空購物車
router.delete('/', async (req, res) => {
    res.json( await Order.clear(req.myAuth.id));
});

module.exports = router;