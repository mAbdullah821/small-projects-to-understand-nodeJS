const send = async (email, message) => {
  console.log(email, ' =--> ', message);

  return 'Done';
};

module.exports = { send };
