const checkLogin = async (req, res, next) => {
  const authorization = req.headers?.authorization;
  let token;

  if (authorization?.startsWith("Bearer")) {
    token = authorization?.split(" ")[1];

    console.log("here is session", session);
  } else {
    console.log("No token available");
  }

  req.token = token;
  next();
};

export default checkLogin;
