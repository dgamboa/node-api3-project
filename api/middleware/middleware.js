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
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId
}