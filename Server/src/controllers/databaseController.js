const { sql, poolPromise } = require('../config/db');

const addDataBase = async (req, res) => {

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('DATE', sql.Date, req.body.Date)
            .input('Item', sql.VarChar(255), req.body.Item)
            .input('T1_1', sql.Int, req.body.T1_1)
            .input('T1_2', sql.Int, req.body.T1_2)
            .input('T1_3', sql.Int, req.body.T1_3)
            .input('T2_1', sql.Int, req.body.T2_1)
            .input('T2_2', sql.Int, req.body.T2_2)
            .input('T2_3', sql.Int, req.body.T2_3)
            .input('T3_1', sql.Int, req.body.T3_1)
            .input('T3_2', sql.Int, req.body.T3_2)
            .input('T3_3', sql.Int, req.body.T3_3)
            .input('T4_1', sql.Int, req.body.T4_1)
            .input('T4_2', sql.Int, req.body.T4_2)
            .input('T4_3', sql.Int, req.body.T4_3)
            .input('Type', sql.VarChar(255), req.body.Type)
            .input('Delta', sql.Float, req.body.Delta)
            .input('Time', sql.VarChar(255), req.body.Time)
            .input('ValVN30', sql.Float, req.body.ValVN30)
            .input('VolMax5m', sql.Float, req.body.VolMax5m)
            .query(`INSERT INTO StockData 
                    ([DATE], Item, T1_1, T1_2, T1_3, T2_1,T2_2, T2_3, T3_1, T3_2, T3_3, T4_1, T4_2, T4_3, [Type], [Delta], [Time], [ValVN30], [VolMax5m]) 
                    VALUES 
                    (@DATE, @Item, @T1_1, @T1_2, @T1_3, @T2_1,@T2_2, @T2_3, @T3_1, @T3_2, @T3_3, @T4_1, @T4_2, @T4_3, @Type, @Delta, @Time, @ValVN30, @VolMax5m)`
            );

        return res.status(200).json(`Successfully Insert Data into DB ${result}`)
    } catch (error) {
        return res.status(500).json(`Failed: ${error}`)
    }
}

const showDatabase = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.query("SELECT * FROM StockData")
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(`Failed: ${error}`)
    }
}

module.exports = { addDataBase, showDatabase }