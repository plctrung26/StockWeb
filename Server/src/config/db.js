const sql = require('mssql');

const dbConfig = {
    user: 'TRUNG',
    password: '1234567',
    server: 'LAPTOP-9T98U3JP\\CHITRUNG',
    database: 'Stock',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Connected to the database');
        return pool;
    })
    .catch(err => {
        console.error('Database connection failed: ', err.message);
        throw err;
    });

module.exports = {
    sql,
    poolPromise,
};
