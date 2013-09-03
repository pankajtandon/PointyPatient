package com.nayidisha.pointy.api;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nayidisha.pointy.domain.Patient;
import com.nayidisha.pointy.services.patient.PatientService;
import com.nayidisha.pointy.support.ApiResponse;

@Controller
@RequestMapping(value="/patients")
public class PatientController {
	public PatientService patientService;
	
	private static final Logger LOG = LoggerFactory.getLogger(PatientController.class);
	
	
	@Inject
	public PatientController(PatientService patientService){
		this.patientService = patientService;
	}

	@RequestMapping(method = RequestMethod.GET, value="")
	public @ResponseBody ApiResponse<List<Patient>> getPatientList(){
		ApiResponse<List<Patient>> apiResponse = new ApiResponse<List<Patient>>();
		List<Patient> patientList = new ArrayList<Patient>();
		patientList = patientService.findAllPatients();
		apiResponse.setPayload(patientList);
		apiResponse.setStatus(ApiResponse.STATUS_SUCCESS);
				
		return  apiResponse;
	
	}
	
	@RequestMapping(method = RequestMethod.GET, value="/{patientId}")
	public @ResponseBody ApiResponse<Patient> getPatient(@PathVariable("patientId") String id){
		ApiResponse<Patient> apiResponse = new ApiResponse<Patient>();
		Patient patient = patientService.findPatientById(Long.valueOf(id));
		if (patient != null){
			apiResponse.setPayload(patient);
			apiResponse.setStatus(ApiResponse.STATUS_SUCCESS);
		}
		return apiResponse;
	}
	@RequestMapping(method = RequestMethod.POST, value="")
	public @ResponseBody ApiResponse<Patient> createPatient(@RequestBody Patient patient){
		ApiResponse<Patient> apiResponse = new ApiResponse<Patient>();
		try {
			patientService.createPatient(patient);
			apiResponse.setPayload(patient);
			apiResponse.setStatus(ApiResponse.STATUS_SUCCESS);
		} catch (Exception e) {
			apiResponse.setCode(ApiResponse.STATUS_FAILURE);
			apiResponse.setMessage(e.getMessage());
			LOG.debug("Error posting patient data: ", e);
			e.printStackTrace();
		}
				
		return  apiResponse;
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value="/{patientId}")
	public @ResponseBody ApiResponse<Patient> deletePatient(@PathVariable("patientId") String id){
		ApiResponse<Patient> apiResponse = new ApiResponse<Patient>();
		try {
			patientService.deletePatient(Long.valueOf(id));
			apiResponse.setStatus(ApiResponse.STATUS_SUCCESS);
		} catch (Exception e) {
			apiResponse.setCode(ApiResponse.STATUS_FAILURE);
			apiResponse.setMessage(e.getMessage());
			LOG.debug("Error deleting patient: ", e);
			e.printStackTrace();
		}
				
		return  apiResponse;
	}
}
