const jwt = require('jsonwebtoken');
const JWT_SECRET = "harshlovesGargi";
function auth(req, res, next)
{
    const token = req.header.authentication;
    const respnse = jwt.verify(token , JWT_SECRET);
    if(response)
    {
        res.send({
            message : "You are authenticated"
        })
        next();
    }
    else
    {
        res.send({
            message : "authentication failed"
        })
    }
}
module.exports = {
    auth, 
    JWT_SECRET
}