const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');


mongoDB();

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
}
);

app.use('/api', productRoutes)


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
}
);