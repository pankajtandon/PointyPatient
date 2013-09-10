package com.nayidisha.pointy.dto;

import java.io.Serializable;
import java.util.Date;

public class VisitFrequency implements Serializable{

	private static final long serialVersionUID = 8768660950428669900L;
	private Date visitDate;
	private int numberOfVisits;
	public Date getVisitDate() {
		return visitDate;
	}
	public void setVisitDate(Date visitDate) {
		this.visitDate = visitDate;
	}
	public int getNumberOfVisits() {
		return numberOfVisits;
	}
	public void setNumberOfVisits(int numberOfVisits) {
		this.numberOfVisits = numberOfVisits;
	}
	

}
