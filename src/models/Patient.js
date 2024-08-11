import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    auth0Id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number, required: true }
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;