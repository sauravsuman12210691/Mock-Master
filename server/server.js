const express = require('express');
const cors = require('cors');
const path = require('path');


const app = express();
app.use(express.json())
app.use(cors());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authRoutes = require('./Routes/authRoutes');
const resumeRoutes = require('./Routes/resumeRoutes');
const atsRoutes = require('./Routes/atsRoutes');
const resultRoutes = require('./Routes/resultRoutes');
const mockInterviewRoutes = require('./Routes/mockInterviewRoutes');
const profileRoutes = require('./Routes/profileRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/ats', atsRoutes);
app.use('/api/result', resultRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/mock-interview', mockInterviewRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
