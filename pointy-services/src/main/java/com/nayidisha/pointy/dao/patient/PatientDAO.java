package com.nayidisha.pointy.dao.patient;

 
import com.nayidisha.pointy.dao.support.GenericDAO;
import com.nayidisha.pointy.domain.Patient;

public interface PatientDAO extends GenericDAO<Patient> {
	Patient findByLastName(String lastName);
}
