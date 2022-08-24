const {User} = require('../db.js')


module.exports = {
  


  validateToken : (req, res, next) =>  {
    const accessToken = req.headers["authorized"];
    if (!accessToken) {
        res.status(401).send("Access denied")
    }
    jwt.verify(accessToken, process.env.SECRET, (err, user) => {
        if (err) {
          res.status(403).send("Access denied")
        }
        else {
            req.body.user = user;
            next()
        }
    })
  }
}
