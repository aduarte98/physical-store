import { Request, Response, NextFunction } from "express";

const validateCep = (req: Request, res: Response, next: NextFunction) => {
    let {cep} = req.params;
    cep = cep.replace(/\D/g, '');

    if (cep.length !== 8) {
        res.status(400).json({error: 'CEP inválido. Certifique-se de que o CEP tenha 8 dígitos, com ou sem hífen.'});
        return;
    }

    next()
};

export default validateCep;