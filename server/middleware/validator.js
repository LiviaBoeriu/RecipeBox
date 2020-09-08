module.exports = (req, res, next) => {
    const { username, password, firstname, lastname } = req.body;
  
    function validUsername(username) {
        // username should not start with a number
        // be between 6-30 characters
        // the username can only containt alphanumeric characters
        //needs revision
        return /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{4,29}$/.test(username);
    }
  
    if (req.path === "/register") {
      console.log(!username.length);
      if (![username, password, firstname, lastname].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validUsername(username)) {
        return res.status(401).json("Invalid username");
      }
    } else if (req.path === "/login") {
      if (![username, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } else if (!validUsername(username)) {
        return res.json("Invalid Username");
      }
    }
  
    next();
  };