/**
 * @description Wrapper for async functions
 * @param {*} fn Async function
 * @returns Async function with error handling
 */
module.exports = fn => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch(e) {
            next();
        }
    }
}
