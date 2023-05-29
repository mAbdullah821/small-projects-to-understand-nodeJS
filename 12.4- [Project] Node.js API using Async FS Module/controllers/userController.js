const { isUsernameExist, createNewUser, setLoggedIn } = require('../model');
module.exports.register = async (req, res, next) => {
  try {
    let { username, password, firstName } = req.body;
    // user pass all required attribute
    if (!username || !password || !firstName)
      throw new Error(
        'Please provide all the attributes {username, password, firstName}'
      );
    username = username.toLowerCase();
    // username is unique
    if (await isUsernameExist(username))
      throw new Error('That username is used, add a new one');
    // create the user
    await createNewUser({ username, password, firstName });
    res.send({ message: 'user was registered successfully' });
  } catch (err) {
    err.statusCode = 404;
    return next(err);
  }
};

const validCredentials = async (username, password) => {
  // get the user
  const user = await isUsernameExist(username);
  if (!user) throw new Error('That username is not exist');
  // check the password matching
  if (user.password !== password)
    throw new Error('The password is not correct');
  return true;
};

module.exports.login = async (req, res, next) => {
  try {
    let { username, password } = req.body;
    // user pass all required attributes
    if (!username || !password)
      throw new Error('Please provide all the attributes {username, password}');
    username = username.toLowerCase();
    // validate credentials
    await validCredentials(username, password);
    // loggedIn = true
    await setLoggedIn(username, true);
    // set a cookie with a username to the user
    res.cookie('username', username, { maxAge: 3 * 24 * 60 * 60 * 1000 }); // 3 days
    // send the response
    res.send({
      message: 'logged in successfully',
      profile: { name: username },
    });
  } catch (err) {
    err.statusCode = 404;
    return next(err);
  }
};

module.exports.logout = async (req, res) => {
  // set loggedIn = false
  const username = req.cookies.username;
  // if (!username) next(new Error('Please, Login before logout'));
  setLoggedIn(username, false);
  res.clearCookie('username');
  res.send({ message: 'Logged out successfully' });
};
