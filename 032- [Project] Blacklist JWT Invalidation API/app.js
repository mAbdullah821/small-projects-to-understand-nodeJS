const express = require('express');
const { SERVER_PORT } = require('./utils/config');
const { isAdmin, validateToken, isTokenValid } = require('./middleware');
const { sayHiUser } = require('./controllers/user-controllers');
const authRoutes = require('./routes/auth-routes');
const userRoutes = require('./routes/user-routes');
const adminRoutes = require('./routes/admin-routes');

const app = express();

app.use(express.json());
app.use('/', authRoutes);
app.use(validateToken);

app.get('/', sayHiUser);

app.use('/user', isTokenValid, userRoutes);
app.use('/admin', isTokenValid, isAdmin, adminRoutes);

app.use('/', (req, res) => {
  res.send({ msg: 'Endpoint not found!' });
});

app.use((err, req, res, next) => {
  res.send({ msg: err.message });
});

(async () => {
  app.listen(SERVER_PORT, async () => {
    console.log('Server is listening on port: ', SERVER_PORT);
  });
})();
