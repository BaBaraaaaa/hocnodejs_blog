const jwt = require('jsonwebtoken');


const authenticateToken = async (req, res, next) => {
  const authHeader = req.body.token || req.query.token || req.headers['authorization']
  console.log(authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }
  const result = verifyAccessToken(token);
  if (!result.success) {
    return res.status(403).json({ error: result.error });
  }
  req.user = result.data;
  next();


}
function verifyAccessToken(token) {
  const secret = process.env.JWT_SECRET_KEY;
  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
module.exports = authenticateToken;