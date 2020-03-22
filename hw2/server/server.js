const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = 8081;

const authRoute = require('./routes/api/auth');
const noteRoute = require('./routes/api/notes');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true}, () => 
    console.log("Database connected!")
);


app.use(express.json());
app.use(cors());
app.use('/api/user', authRoute);
app.use('/api/notes', noteRoute);



app.listen(PORT, () => console.log(`Server start at PORT: ${PORT}`));