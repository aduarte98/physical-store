import axios from 'axios';
import logger from "../logger";

export const getAddressByCep = async (cep: string) => {
    try {
        const {data} = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (data.erro) return null;
            return `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
    } catch (error) {
        logger.error("Erro ao buscar o CEP:", (error as Error).message);
    }
}