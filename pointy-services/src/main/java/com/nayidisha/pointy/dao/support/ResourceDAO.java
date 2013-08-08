package com.nayidisha.pointy.dao.support;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Transient;

public class ResourceDAO<DOMAINTYPE> extends DefaultGenericDAO<DOMAINTYPE> {
	
	@PersistenceContext 
	@Transient
	private transient EntityManager entityManager;

	@Override
	public void setEntityManager(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	public EntityManager getEntityManager() {
		return entityManager;
	}
}
