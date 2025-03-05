import axios from 'axios';
import logger from '../logger';

export const getCoordinates = async (address: string) => {
    try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        const {data} = await axios.get(url);
        if (data.length === 0) return null;
        return {
            latitude: parseFloat(data[0].lat),
            longitude: parseFloat(data[0].lon)
        };
    } catch (error) {
        logger.error('Erro ao obter coordenadas:', (error as Error).message);
        return null;
    }
};