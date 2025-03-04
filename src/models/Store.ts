import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({
    name: {
        type: String, riquered: true
    },
    address: {
        cep: { type: String, required: true },
        street: { type: String, required: true },
        number: { type: String, required: true },
        neighborhood: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    phoneNumber: { type: String},
    emailAddress: { type: String},
    OpeningHours: { type: String},
});

export const Store = mongoose.model("Store", StoreSchema);