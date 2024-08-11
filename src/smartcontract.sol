pragma solidity ^0.8.0;

contract PatientRecords {
    struct Patient {
        uint id;
        string name;
        uint age;
        // Add more patient information as needed
    }

    struct Prescription {
        uint id;
        string medication;
        address doctor;
    }

    Patient[] public patients;
    mapping(uint => Prescription[]) public patientPrescriptions;

    function addPatient(string memory name, uint age) public {
        patients.push(Patient(patients.length, name, age));
    }

    function addPrescription(uint patientId, string memory medication, address doctor) public {
        patientPrescriptions[patientId].push(Prescription(patientPrescriptions[patientId].length, medication, doctor));
    }

    function getPatientInfo(uint patientId) public view returns (string memory, uint) {
        return (patients[patientId].name, patients[patientId].age);
    }
}