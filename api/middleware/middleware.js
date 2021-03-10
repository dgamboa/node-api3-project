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

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
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
}