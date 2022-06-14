export default function validateSchema(schema) {
    return (req, res, next) => {
        const {body} = req;
        const {error} = schema.validate(body, {abortEarly: false});

        if (error) {
            return res.status(422).send(error.details.map(error => {
                return error.message;
            }))
        }

        next();
    }
};