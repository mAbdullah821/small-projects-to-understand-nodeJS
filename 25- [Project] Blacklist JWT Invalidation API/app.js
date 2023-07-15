const express = require('express');
const { SERVER_PORT } = require('./utils/config');
const { sayHiUser } = require('./controllers/user-controllers');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const authRoutes = require('./routes/auth-routes');
const userRoutes = require('./routes/user-routes');
const adminRoutes = require('./routes/admin-routes');
const {
  extractTokenData,
  isWhitelistedToken,
  validateToken,
  isTokenValid,
  isAdmin,
} = require('./middleware');

const app = express();

app.use(express.json());
app.use('/', authRoutes);

app.use(extractTokenData);
app.use(isWhitelistedToken);
app.use(validateToken);

app.get('/', sayHiUser);

app.use('/user', isTokenValid, userRoutes);
app.use('/admin', isTokenValid, isAdmin, adminRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', (req, res) => {
  res.status(404).send({ msg: 'Endpoint not found!' });
});

app.use((err, req, res, next) => {
  res.status(req.statusCode).send({ status: 'Error', msg: err.message });
});

(async () => {
  app.listen(SERVER_PORT, async () => {
    console.log('Server is listening on port: ', SERVER_PORT);
  });
})();
