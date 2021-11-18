const db = require('./../modules/connect-mysql');

const tableName = 'trunk_detail';
const pkField = 'sid';


class Order_Detail {

    constructor(defaultObj={}) {
        //`sid`, `order_sid`, `product_id`, `productname`, `size`, `price`, `quantity`
        this.data = defaultObj;
    }

    // /* 讀取所有資料, 要有篩選的功能 */
    // static async getList(member_id){
    //     const sql = `SELECT c.*, p.bookname, p.price  FROM order_detail c  LEFT JOIN products p ON c.product_id=p.sid WHERE order_sid=8 `;
    //     const [rs] = await db.query(sql, [member_id]);
    //     return rs;
    // }

    // /* 透過商品 id 找項目 */
    // static async findItem(order_sid, product_id=0){
    //     const sql = `SELECT * FROM ${tableName} WHERE order_sid=? AND product_id=?`;
    //     const [rs] = await db.query(sql, [order_sid, product_id]);
    //     if(rs && rs.length===1){
    //         return rs[0];
    //     }
    //     return null;
    // }
    /* 讀取單筆資料 */
    static async findOne(pk=0){
        const sql = `SELECT * FROM ${tableName} WHERE order_sid=?`;
        const [rs] = await db.query(sql, [pk]);
        // if(rs && rs.length===1){
        //     // return rs[0];
            return new Order_Detail(rs)
        // }
        // return null;
    }
    toJSON(){
        return this.data;
    }
    toString(){
        return JSON.stringify(this.data, null, 4);
    }

    static async add( order_sid,product_id,quantity
        //  productname, size, price,order_sid,
          ){
        const output = {
            success: false,
            error: ''
        }
        
        const obj = {
            order_sid,product_id, quantity
            // productname, size,  order_sid, 
            
        };
        const sql = `INSERT INTO ${tableName} SET ?`;
        const [r] = await db.query(sql, [obj]);
        output.success = !!r.affectedRows ? true : false;
        // output.cartList = await Cart.getList(member_id);
        return output;
    }

    // 變更數量
    static async update(order_sid, product_id, quantity){
        // TODO:
        const obj = {
            order_sid, product_id, quantity
        };

        const sql = ` UPDATE  ${tableName}  SET ?`;
        const [r] = await db.query(sql,[obj]);
        return r;
    }

    // 移除項目
    static async remove(order_sid, product_id){
        // TODO:
        const obj = {
            order_sid, product_id
        };
        const sql = `DELETE FROM ${tableName} WHERE order_sid=? AND product_id=?`;
        const [r] = await db.query(sql,[order_sid, product_id]);
        return r;
    }

    // 清空訂單
    static async clear(order_sid){
        // TODO:
        
        const sql = `DELETE FROM ${tableName} WHERE order_sid=?`;
        const [r] = await db.query(sql,[order_sid]);
        return r;
    }
}

module.exports = Order_Detail;