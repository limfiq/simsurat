const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/database');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get('/', (req, res) => {
    res.send('SimSurat API is running...');
});

// Database Connection
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// Sync Models (Dev only)
db.sync({ alter: true }).then(() => console.log('Models synced'));

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const suratRoutes = require('./routes/suratRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const disposisiRoutes = require('./routes/disposisiRoutes');

app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/surat', suratRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/disposisi', disposisiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
