module.exports = fn => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch(e) {
            next();
        }
    }
}
// module.exports = fn => {
//     try {
//         fn(req, res, next);
//     } catch (e) {
        
//     }
//     return (req, res, next) => {
//         fn(req, res, next).catch(next);
//     }
// }