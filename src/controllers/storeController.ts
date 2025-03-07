import { Request, Response } from "express";
import { Store } from "../models/Store";
import { getAddressByCep } from "../services/cepService";
import { getCoordinates } from "../services/geocodeService";
import { calculateDistance  } from "../utils/distanceCalculator";
import logger from "../logger";

export const findNearbyStores = async (req: Request, res: Response): Promise<void> =>  {
    const {cep} = req.params

    try {
        logger.info(`Buscando endereço para o CEP: ${cep}`);

        const address = await getAddressByCep(cep)
        if (!address) {
            res.status(404).send({error: 'CEP não encontrado'})
            return
        }
        logger.info(`Endereço encontrado: ${address}`);

        const coordinates = await getCoordinates(address)
        if (!coordinates) {
            res.status(500).json({error: 'Erro ao encontrar coordenadas'})
            return
        }
        logger.info(`Coordenadas encontradas: ${coordinates.latitude}, ${coordinates.longitude}`);

        const { latitude, longitude } = coordinates

        const stores = await Store.find()

        const storesWithDistance = stores.map(store => {
            if (!store.address) {
                return null;
            }
            const storeLat = store.address.latitude
            const storeLon = store.address.longitude
            const distance = calculateDistance(latitude, longitude, storeLat, storeLon)

            if (distance === null || distance > 100) return null;

            return {
                name: store.name,
                address: {
                    cep: store.address.cep,
                    street: store.address.street,
                    number: store.address.number,
                    neighborhood: store.address.neighborhood,
                    city: store.address.city,
                    state: store.address.state,
                },
                phoneNumber: store.phoneNumber,
                emailAddress: store.emailAddress,
                OpeningHours: store.OpeningHours,
                distance: distance ? distance.toFixed(2) + " km" : "N/A",
            };
        })
        .filter(store => store !== null)
        .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

        if (storesWithDistance.length === 0) {
            logger.info(`Nenhuma loja encontrada a 100 km do CEP: ${cep}`);
            res.status(404).json('Nenhuma loja encontrada a 100 km do CEP fornecido.');
            return;
        }

        res.json({stores: storesWithDistance});

        logger.info({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        logger.error("Erro ao buscar lojas: " + (error as Error).message);
        res.status(500).json({error: "Erro ao buscar lojas próximas"});
    }
};