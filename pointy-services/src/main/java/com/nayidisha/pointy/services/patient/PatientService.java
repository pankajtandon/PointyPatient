package com.nayidisha.pointy.services.patient;

import java.util.List;

import com.nayidisha.pointy.domain.Patient;

public interface PatientService {

	List<Patient> findAllPatients();
	
	Patient findPatientById(Long patientId);
	
	Patient findByLastName(String lastName);
	
	void createPatient(Patient patient);
	
	void deletePatient(Long patientId);
}
