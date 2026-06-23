const validateIds = (req, res, next) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            message: 'ID inválido'
        });
    }

    req.validatedId = id;

    next();
};

export default validateIds;