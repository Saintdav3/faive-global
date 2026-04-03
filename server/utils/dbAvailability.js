const isDbReady = (req) => Boolean(req.app?.locals?.dbReady);

module.exports = { isDbReady };
