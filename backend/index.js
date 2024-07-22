const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello from Express server!');
});

app.use('/api/users', userRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

