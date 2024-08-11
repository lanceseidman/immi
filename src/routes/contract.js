import express from 'express';
import { addPatient, getPatientInfo, addPrescription, contract } from '../sc.js';

const router = express.Router();

router.post('/add-medical-record', async (req, res) => {
    const { auth0Id, fullName, medName, mg, frequency, prescriber } = req.body;

    try {
        // Check if the patient already has a record
        const existingPatient = await getPatientInfo(auth0Id, 0);

        // If the patient already has a record, return an error
        if (existingPatient && existingPatient.fullName) {
            return res.status(400).send('Medical record already exists for this user.');
        }

        // Add or update the patient's medical record on-chain
        await addOrUpdatePatient(auth0Id, fullName, medName, mg, frequency, prescriber);

        res.status(200).send('Medical record added successfully.');
    } catch (err) {
        console.error('Error adding medical record:', err);
        res.status(500).send('Failed to add medical record.');
    }
});

export default router;
