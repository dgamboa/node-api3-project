const Users = require('../users/users-model');

function logger(req, res, next) {
  const timestamp =
    new Date()
      .toLocaleString("en-US", 
        {timeZone: "America/Chicago"});

  console.log("Request Method: ", req.method);
  console.log("Request URL: ", req.url);
  console.log("Request Timestamp: ", timestamp);

  next();
}

async function validateUserId(req, res, next) {
  const { id } = req.params;
  try {
    const user = await Users.getById(id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) { next(err) }
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data"});
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field"});
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser
}