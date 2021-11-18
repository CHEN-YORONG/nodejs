const db = require('./../modules/connect-mysql');

const tableName = 'Trunk';
const pkField = 'sid';

class Product {

    constructor(defaultObj={}) {
        // `sid`, `author`, `bookname`, `category_sid`, `book_id`, `publish_date`, `pages`, `price`, `isbn`, `on_sale`, `introduction`
        this.data = defaultObj;
    }

    /* 讀取所有資料, 要有篩選的功能 */
    static async findAll(options={}){
        let op = {
            perPage: 32,
            page: 1,

            orderBy: '',

            category: null,
            priceLow: 0,
            priceHigh: 0,
            keyword: '',
            ...options
        };
        const output = {
            perPage: op.perPage,
            page: op.page,
            totalRows: 0,
            totalPages: 0,
            rows: [],
        };
        let where = ' WHERE 1 ';
        if(op.category){
            where += ' AND category_sid=' + parseInt(op.category) + ' ';
        }
        if(op.keyword){
            where += ' AND name LIKE ' + db.escape('%' + op.keyword + '%') + ' ';
        }
        if(op.priceLow){
            where += ' AND price >= ' + parseInt(op.priceLow) + ' ';
        }
        if(op.priceHigh){
            where += ' AND price <= ' + parseInt(op.priceHigh) + ' ';
        }


        const t_sql = `SELECT COUNT(1) totalRows FROM ${tableName} ${where}`;
        const [t_rs] = await db.query(t_sql);
        const totalRows = t_rs[0].totalRows;

        if(totalRows>0){
            output.totalRows = totalRows;
            output.totalPages = Math.ceil(totalRows/op.perPage)
            const sql = `SELECT * FROM ${tableName} ${where} LIMIT ${(op.page-1) * op.perPage}, ${op.perPage}`;
            const [rs] = await db.query(sql);
            output.rows = rs;
        }

        return output;
    }
    /* 讀取所有資料每頁顯示9項 */
    static async findnine(options={}){
        let op = {
            perPage: 9,
            page: 1,

            orderBy: '',

            category: null,
            priceLow: 0,
            priceHigh: 0,
            keyword: '',
            ...options
        };
        const output = {
            perPage: op.perPage,
            page: op.page,
            totalRows: 0,
            totalPages: [],
            totalPages1:0,
            rows: [],
        };
        let where = ' WHERE 1 ';
        if(op.category){
            where += ' AND category_sid=' + parseInt(op.category) + ' ';
        }
        if(op.keyword){
            where += ' AND name LIKE ' + db.escape('%' + op.keyword + '%') + ' ';
        }
        if(op.priceLow){
            where += ' AND price >= ' + parseInt(op.priceLow) + ' ';
        }
        if(op.priceHigh){
            where += ' AND price <= ' + parseInt(op.priceHigh) + ' ';
        }


        const t_sql = `SELECT COUNT(1) totalRows FROM ${tableName} ${where}`;
        const [t_rs] = await db.query(t_sql);
        const totalRows = t_rs[0].totalRows;

        if(totalRows>0){
            output.totalRows = totalRows;
            output.totalPages = new Array(Math.ceil(totalRows/op.perPage)).fill(0);
            output.totalPages1 = Math.ceil(totalRows/op.perPage);
            // LIMIT ${(op.page-1) * op.perPage}, ${op.perPage}
            const sql = `SELECT * FROM ${tableName} ${where} `;
            const [rs] = await db.query(sql);
            output.rows = rs;
        }

        return output;
    }
    /* 讀取所有資料每頁顯示6項 */
    static async findsix(options={}){
        let op = {
            perPage: 6,
            page: 1,

            orderBy: '',

            category: null,
            priceLow: 0,
            priceHigh: 0,
            keyword: '',
            ...options
        };
        const output = {
            perPage: op.perPage,
            page: op.page,
            totalRows: 0,
            totalPages: 0,
            rows: [],
        };
        let where = ' WHERE 1 ';
        if(op.category){
            where += ' AND category_sid=' + parseInt(op.category) + ' ';
        }
        if(op.keyword){
            where += ' AND name LIKE ' + db.escape('%' + op.keyword + '%') + ' ';
        }
        if(op.priceLow){
            where += ' AND price >= ' + parseInt(op.priceLow) + ' ';
        }
        if(op.priceHigh){
            where += ' AND price <= ' + parseInt(op.priceHigh) + ' ';
        }


        const t_sql = `SELECT COUNT(1) totalRows FROM ${tableName} ${where}`;
        const [t_rs] = await db.query(t_sql);
        const totalRows = t_rs[0].totalRows;

        if(totalRows>0){
            output.totalRows = totalRows;
            output.totalPages = Math.ceil(totalRows/op.perPage)
            const sql = `SELECT * FROM ${tableName} ${where} LIMIT ${(op.page-1) * op.perPage}, ${op.perPage}`;
            const [rs] = await db.query(sql);
            output.rows = rs;
        }

        return output;
    }
    /* 為啥不行的版本 */
    static async getListData(options={}){
        let perPage = 9;
        let page = parseInt(req.query.page) || 1;
        let keyword = req.query.keyword || '';
        keyword = keyword.trim(); // 去掉頭尾的空白

        // res.locals.keyword = keyword; // 傳給 template

        const output = {

        };

        const where = 'WHERE 1';
        const name = 'name';
        if(keyword){
            output.keyword = keyword;
            where += `AND ${name} LIKE ${ db.escape('%' + keyword + '%') }`;
        }

        const t_sql = `SELECT COUNT(1) totalRows FROM ${tableName} ${where}`;
        const [t_rs] = await db.query(t_sql);
        output.totalRows = t_rs[0].totalRows;
        output.totalPages = Math.ceil(totalRows/perPage);
        output.perPage = perPage;
        output.rows = [];
        output.page = page;

        // 如果有資料才去取得分頁的資料
        if(totalRows > 0){
            if(page < 1){
                output.page = 1;
                return output;
            }
            if(page > output.totalPages){
                output.page = output.totalPages;
                return output;
            }

            const sql = `SELECT * FROM ${tableName} ${where} ORDER BY sid DESC LIMIT ${(page-1)*perPage}, ${perPage}`;
            const [rows] = await db.query(sql)
            output.rows = rows;

        }
        return output;
    }

    /* 讀取單筆資料 */
    static async findOne(pk=0){
        const sql = `SELECT * FROM ${tableName} WHERE ${pkField}=?`;
        const [rs] = await db.query(sql, [pk]);
        if(rs && rs.length===1){
            // return rs[0];
            return new Product(rs[0])
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
        const [r] = await db.query(sql, [this.data.sid]);
        return r;
    }
}

module.exports = Product;


