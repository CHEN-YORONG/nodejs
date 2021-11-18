const db = require('../modules/connect-mysql');

const tableName = 'mymembers';
const pkField = 'sid';

class Member {

    constructor(defaultObj={}) {
        // `sid`, `author`, `bookname`, `category_sid`, `book_id`, `publish_date`, `pages`, `price`, `isbn`, `on_sale`, `introduction`
        this.data = defaultObj;
    }

    //註冊
    static async add(account, password){
        const output = {
            success: false,
            error: ''
        }
        
 
        const obj = {
            account, password
        };
        const sql = `INSERT INTO ${tableName} SET ?`;
        const [r] = await db.query(sql, [obj]);
        output.success = !!r.affectedRows ? true : false;
        // output.cartList = await Cart.getList(member_id);
        return output;
    }
    /* 讀取單筆資料 */
    static async findOne(pk=0){
        const sql = `SELECT * FROM ${tableName} WHERE ${pkField}=?`;
        const [rs] = await db.query(sql, [pk]);
        if(rs && rs.length===1){
            // return rs[0];
            return new Member(rs[0])
        }
        return null;
    }

    /* 讀取sid>32的資料 */
    static async findSome(options={}){
        const sql = `SELECT * FROM ${tableName} WHERE ${pkField}>${some}`;
        const [rs] = await db.query(sql);
        if(rs && rs.length===1){
            // return rs[0];
            return new Product(rs[0])
        }
        return null;
    }

    toJSON(){
        return this.data;
    }
    toString(){
        return JSON.stringify(this.data, null, 4);
    }
    async save(){
        // 若有 PK 則表示要做修改
        if(this.data.sid){
            const sid = this.data.sid;
            const data = {...this.data};
            delete data.sid;
            const sql = `UPDATE ${tableName} SET ? WHERE ${pkField}=?`;
            const [r] = await db.query(sql, [data, sid]);
            return r;
        } else {
            // 沒有 PK 則表示要做新增
            const sql = `INSERT INTO ${tableName} SET ?`;
            const [r] = await db.query(sql, [this.data]);
            return r;
        }
    }
    async edit(obj={}){
        for(let i in this.data){
            if(i===pkField) continue;
            if(obj[i]){
                this.data[i] = obj[i];
            }
        }
        return await this.save();
    }

    async remove(){
        const sql = `DELETE FROM ${tableName} WHERE ${pkField}=?`;
        const [r] = await db.query(sql, [this.data.id]);
        return r;
    }
}

module.exports = Member;


