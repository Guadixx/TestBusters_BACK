const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connect = require('./utils/connect');
const { configCloudinary } = require('./middlewares/files.middleware');
const CountriesRoutes = require('./api/routes/country.routes');
const AchievementsRoutes = require('./api/routes/achievement.routes');
const CommentsRoutes = require('./api/routes/comment.routes');
const DataRoutes = require('./api/routes/data.routes');
const FeaturedTestRoutes = require('./api/routes/featured-test.routes');
const GenericTestRoutes = require('./api/routes/generic-test.routes');
const LeaderboardRoutes = require('./api/routes/leaderboard.routes');
const RecordsRoutes = require('./api/routes/records.routes');
const UserRoutes = require('./api/routes/user.routes');


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
server.use('/api/v1/featuredtest', FeaturedTestRoutes);
server.use('/api/v1/generictest', GenericTestRoutes);
server.use('/api/v1/leaderboard', LeaderboardRoutes);
server.use('/api/v1/records', RecordsRoutes);
server.use('/api/v1/users', UserRoutes);
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
