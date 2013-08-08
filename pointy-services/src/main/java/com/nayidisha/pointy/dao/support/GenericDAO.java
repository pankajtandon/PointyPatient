package com.nayidisha.pointy.dao.support;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.criterion.Criterion;

public interface GenericDAO<DOMAINTYPE> {
	Session getSession();
	DOMAINTYPE save(Object data);
	DOMAINTYPE load(Object id);
	List<DOMAINTYPE> loadAll();
	void delete(DOMAINTYPE entity) ;
	void flush() ;
	void clear() ;
    List<DOMAINTYPE> findByCriteria(Criterion... criterion) ;	
}
