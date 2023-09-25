const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const express = require('express');
const app = express();
const { default: mongoose } = require('mongoose');
const cors = require('cors');

const blogsRouter = require('./routes/blogs');
const careersRouter = require('./routes/careers');
const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');
const emailRouter = require('./routes/emails');
const careerApplicationRouter = require('./routes/careerApplications');
const overviewRouter = require('./routes/overview');

const connectDB = require('./db/connection.js');

connectDB();

app.use(express.json());

app.use(cors());

app.use('/resumes', express.static(path.join(__dirname, 'resumes')));

app.use(express.urlencoded({ extended: true }));

app.use('/api/blogs', blogsRouter);

app.use('/api/careers', careersRouter);

app.use('/api/users', usersRouter);

app.use('/api/projects', projectsRouter);

app.use('/api/emails', emailRouter);

app.use('/api/career-applications', careerApplicationRouter);

app.use('/api/overview', overviewRouter);

mongoose.connection.once('open', () => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
});
