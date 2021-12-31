module.exports = checkErr => (req, res, next) => {
    Promise.resolve(checkErr(req,res,next)).catch(next);
}