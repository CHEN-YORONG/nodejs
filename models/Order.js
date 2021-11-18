const db = require('./../modules/connect-mysql');

const tableName = 'trunk_order';
const pkField = 'sid';


class Order {

    constructor(defaultObj={}) {
        // `sid`, `member_sid`, `name`, `mobile`, `orderprice`, `delivery`, `receiver`, `delivery_address`, `card`, `order_date`
        this.data = defaultObj;
    }

    /* 讀取所有資料, 要有篩選的功能 */
    static async getList(member_id){
        const sql = `SELECT o.*, od.product_id, od.quantity ,t.* FROM trunk_order o
        JOIN trunk_detail od 
        ON o.order_sid=od.order_sid JOIN trunk t ON t.sid=od.product_id
        WHERE member_sid=? order by o.sid DESC`;
        const [rs] = await db.query(sql, [member_id]);
        return rs;
    }
     /* 讀取單筆資料 */
     static async findOne(member_sid=0){
        const sql = `SELECT * FROM ${tableName} WHERE member_sid=? order by sid DESC`;
        const [rs] = await db.query(sql, [member_sid]);

        return rs;
    }

    /* 透過商品 id 找項目 */
    static async findItem(member_id=0, product_id=0){
        const sql = `SELECT * FROM ${tableName} WHERE member_id=? AND product_id=?`;
        const [rs] = await db.query(sql, [member_id, product_id]);
        if(rs && rs.length===1){
            return rs[0];
        }
        return null;
    }

    static async add(member_sid,order_sid, name, mobile, orderprice, delivery, receiver, delivery_address, card){
        const output = {
            success: false,
            error: ''
        }
        // TODO: 三個參數都必須要有資料

        // 不要重複輸入資料
        // if(await Cart.findItem(member_id, product_id)){
        //     output.error = "資料重複了";
        //     return output;
        // }

        const obj = {
            member_sid,order_sid, name, mobile, orderprice, delivery, receiver, delivery_address, card,
        };
        const sql = `INSERT INTO ${tableName} SET ?`;
        const [r] = await db.query(sql, [obj]);
        output.success = !!r.affectedRows ? true : false;
        // output.cartList = await Cart.getList(member_id);
        return output;
    }
    // 修改
    static async update( name, mobile, orderprice, delivery, receiver, delivery_address, card,member_sid){
        // TODO:
        const obj = {
             name, mobile, orderprice, delivery, receiver, delivery_address, card
        };

        const sql = ` UPDATE  ${tableName}  SET ? WHERE member_sid=?`;
        const [r] = await db.query(sql,[obj,member_sid]);
        return r;
    }
    // 清空購物車
    static async clear(member_sid){
        // TODO:
        
        const sql = `DELETE FROM ${tableName} WHERE member_sid=?`;
        const [r] = await db.query(sql,[member_sid]);
        return r;
    }
}

module.exports = Order;


