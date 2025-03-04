import express from 'express';
import { findNearbyStores  } from '../controllers/storeController';

const router = express.Router();

router.get('/stores/:cep', findNearbyStores );


export default router;