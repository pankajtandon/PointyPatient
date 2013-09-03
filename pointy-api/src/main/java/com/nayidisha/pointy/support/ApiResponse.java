package com.nayidisha.pointy.support;

import java.io.Serializable;

public class ApiResponse<T> implements Serializable {

	private static final long serialVersionUID = -5584906004219908759L;
	public static String STATUS_SUCCESS = "SUCCESS";
	public static String STATUS_FAILURE = "FAILURE";
	
	private String status = STATUS_SUCCESS;
	private String code = "200";
	private String message = "Request processed successfully";

	private T payload;
	
	public T getPayload() {
		return payload;
	}

	public void setPayload(T payload) {
		this.payload = payload;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
