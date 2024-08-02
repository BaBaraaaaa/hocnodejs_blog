isPrivate = (req, res, next) => {
    const token  = req.cookies.token;
    console.log('token: ', token);

    if (!token) {
        console.log('token: undefined');

      } else {
        req.headers.authorization = 'Bearer ' + token; 
      }
      
   
      next();
}
module.exports = isPrivate;
