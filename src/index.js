const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connect = require('./utils/connect');
const { configCloudinary } = require('./middlewares/files.middleware');
const CountriesRoutes = require('./api/routes/countries.routes');
const AchievementsRoutes = require('./api/routes/achievements.routes');
const CommentsRoutes = require('./api/routes/comments.routes');
const DataRoutes = require('./api/routes/data.routes');
const FeaturedTestsRoutes = require('./api/routes/featuredTests.routes');
const GenericTestsRoutes = require('./api/routes/genericTests.routes');
const LeaderboardsRoutes = require('./api/routes/leaderboards.routes');
const RecordsRoutes = require('./api/routes/records.routes');
const UsersRoutes = require('./api/routes/users.routes');


dotenv.config();
const PORT = process.env.PORT;
configCloudinary();
const server = express();
connect();

server.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
server.use(express.json({ limit: '15mb' }));
server.use(express.urlencoded({ limit: '15mb', extended: false }));
server.use('/api/v1/countries', CountriesRoutes);
server.use('/api/v1/achievements', AchievementsRoutes);
server.use('/api/v1/comments', CommentsRoutes);
server.use('/api/v1/data', DataRoutes);
server.use('/api/v1/featuredtests', FeaturedTestsRoutes);
server.use('/api/v1/generictests', GenericTestsRoutes);
server.use('/api/v1/leaderboards', LeaderboardsRoutes);
server.use('/api/v1/records', RecordsRoutes);
server.use('/api/v1/users', UsersRoutes);
server.use('*', (req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  return next(error);
});
server.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.message || 'Unexpected error');
});

server.disable('x-powered-by');

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
