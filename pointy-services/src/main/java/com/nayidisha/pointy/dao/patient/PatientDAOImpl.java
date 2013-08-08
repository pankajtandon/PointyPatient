package com.nayidisha.pointy.dao.patient;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.nayidisha.pointy.dao.support.ResourceDAO;
import com.nayidisha.pointy.domain.Patient;

@Repository
public class PatientDAOImpl extends ResourceDAO<Patient> implements PatientDAO{

	@Override
	public Patient findByLastName(String lastName) {
		Session session = getSession();
		Criteria criteria = session.createCriteria(Patient.class);

		criteria.add(Restrictions.eq("lastName", lastName));

		Patient patient = (Patient) criteria.uniqueResult();
		
		return patient;
	}
}
