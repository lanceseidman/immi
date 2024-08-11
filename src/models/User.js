import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
    medication: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    prescriber: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
    auth0Id: { type: String, required: true, unique: true }, // Unique identifier
    name: { type: String, required: true },
    age: { type: Number, required: true },
    medicalRecords: [medicalRecordSchema]
});

const User = mongoose.model('User', userSchema);

export default User;
