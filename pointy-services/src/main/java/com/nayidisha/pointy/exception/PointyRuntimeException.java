package com.nayidisha.pointy.exception;

public class PointyRuntimeException extends RuntimeException {

	private static final long serialVersionUID = -5851973184070845138L;

	public PointyRuntimeException() { 
		super();
	}

	public PointyRuntimeException(String message) {
		super(message);
	}

	public PointyRuntimeException(Throwable cause) {
		super(cause);
	}

	public PointyRuntimeException(String message, Throwable cause) {
		super(message, cause);
	}

}