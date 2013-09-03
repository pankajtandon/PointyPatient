package com.nayidisha.pointy.services.patient;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.nayidisha.pointy.dao.patient.PatientDAO;
import com.nayidisha.pointy.domain.Patient;

@Service("patientService")
@Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
public class PatientServiceImpl implements PatientService {

	private static Logger LOG = LoggerFactory.getLogger(PatientServiceImpl.class);
	private PatientDAO patientDAO;
	
	@Inject
	public PatientServiceImpl(PatientDAO patientDAO) {
		this.patientDAO = patientDAO;
	}
	
	@Override
	public Patient findPatientById(Long patientId) { 
		return patientDAO.load(patientId);
	}
			
	@Override
	public List<Patient> findAllPatients() {
		List<Patient> validPatientList = new ArrayList<Patient>();
		List<Patient> patientList = patientDAO.loadAll();
		if (patientList != null){
			for (Patient patient : patientList) {
				if (patient.valid()){
					validPatientList.add(patient);
				} else {
					LOG.warn("Patient entity with Id: " + patient.getId() + " is invalid. Skipping...");
				}
			}
		}
		return validPatientList;
	}

	@Override
	public Patient findByLastName(String lastName) {
		return patientDAO.findByLastName(lastName);
	}

	@Transactional(readOnly=false)
	@Override
	public void createPatient(Patient patient) {
		patientDAO.save(patient);
		
	}

	@Transactional(readOnly=false)
	@Override
	public void deletePatient(Long patientId) {
		if (patientId != null){
			Patient patient = patientDAO.load(patientId);
			patientDAO.delete(patient);
		}
		
	}

}
