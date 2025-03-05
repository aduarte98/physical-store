import express from 'express';
import { findNearbyStores  } from '../controllers/storeController';
import validateCep from '../middlewares/validateCep';

const router = express.Router();

router.get('/stores/:cep', validateCep, findNearbyStores );


export default router;