const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connect = require('./utils/connect');
const { configCloudinary } = require('./middlewares/files.middleware');
const CountriesRoutes = require('./api/routes/country.routes');

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
