const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const stockRouter = require('./routes/data.api')
app.use('/api', stockRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
