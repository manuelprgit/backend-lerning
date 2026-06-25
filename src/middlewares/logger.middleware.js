export const logger = (req, res, next) => {
    const start = process.hrtime.bigint();

    res.on('finish', () => {
        const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;

        const color =
            res.statusCode >= 500 ? '\x1b[31m' :
            res.statusCode >= 400 ? '\x1b[33m' :
            res.statusCode >= 300 ? '\x1b[36m' :
            '\x1b[32m';                         
        const reset = '\x1b[0m';

        console.log(
            `${req.method} ${req.originalUrl} ${color}${res.statusCode}${reset} in ${durationMs.toFixed(1)}ms`
        );
    });

    next();
};