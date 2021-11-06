const express = require('express');

const Order_Detail = require('./../models/Order_Detail');
const {getListData} = require("./address-book");

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

// 讀取單筆
router.get('/:id',async (req, res) => {
    const output = {
        success: false,
        data: null,
    };
    output.data = await Order_Detail.findOne(req.params.id);
    if(output.data){
        output.success = true;
    }
    res.json(output);
} );



// 新增項目
router.post('/', async (req, res) => {
    console.log('req:::::::::::::::',req.body);
    var a = await req.body.orderDetail.forEach(element => {
        // element.id
        
        Order_Detail.add(req.body.order_id,element.id,element.amount);
        console.log('element',element);
    });
    res.json(a)
    // res.json( await Order_Detail.add(req.body.order_sid,req.body.product_id,req.body.price,req.body.quantity
        // req.body.productname,req.body.size,
        // ));
    //  order_sid, product_id, productname, size, price, quantity
});

// 修改項目
router.put('/:id', async (req, res) => {
    res.json( await Order_Detail.update(req.body.order_sid, req.body.product_id, req.body.quantity));
    //  order_sid, product_id
});

// 刪除項目
router.delete('/:id', async (req, res) => {
    console.log(req.body.product_id,req.myAuth.id);
    res.json( await Order_Detail.remove(req.body.order_sid, req.body.product_id));
    // order_sid, product_id
});

// 清空購物車
router.delete('/', async (req, res) => {
    res.json( await Order_Detail.clear(req.body.order_sid));
});

module.exports = router;