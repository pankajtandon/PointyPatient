package com.nayidisha.pointy.api;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.io.IOException;

import javax.inject.Inject;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.type.TypeReference;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.ContextHierarchy;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.web.context.WebApplicationContext; 

import com.nayidisha.pointy.domain.Patient;
import com.nayidisha.pointy.services.patient.PatientService;
import com.nayidisha.pointy.support.ApiResponse;

/**
 * This is a sample test that represents server side tests.
 * It is not representative of full test coverage or of the types of tests that should exist on the server side. 
 * @author Pankaj Tandon
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextHierarchy({
	@ContextConfiguration("/META-INF/spring/api-bootstrap-context.xml")
})
public class PatientControllerFunctionalTests {

	private static final Logger LOG = LoggerFactory.getLogger(PatientControllerFunctionalTests.class);
	
	@Inject
	private WebApplicationContext wac;	

	@Inject
	private PatientService patientService;
	
	private ObjectMapper mapper = new ObjectMapper();
	
	private Long createdPatientId;
	
	private Patient patient;
	
	private MockMvc mockMvc; 
	
	@Before
	public void setup() {
		this.mockMvc = webAppContextSetup(this.wac).build();
		
		Patient patient = this.createTestPatient();	
		patientService.createPatient(patient);
		createdPatientId = patient.getId();
	}
	
	@Test
	public void testGettingPatient() throws Exception {
		ResultActions resultActions = this.mockMvc.perform(get("/patients/" + createdPatientId)
				.accept(MediaType.APPLICATION_JSON));
		LOG.debug("RestultActons: " + resultActions.andReturn().getResponse().getContentAsString()) ;
		resultActions.andExpect(status().isOk())
		.andExpect(content().string(containsString(String.valueOf(createdPatientId))));
	}	
	
	@Test
	public void testInsertingPatient() throws Exception {
		Patient testPatientToInsert = this.createTestPatient();
		ResultActions resultActions = null;
		ApiResponse<Patient> retrievedPatient = null;
		try {
			resultActions = this.mockMvc.perform(post("/patients").content(convertObjectToBytes(testPatientToInsert)).contentType(MediaType.APPLICATION_JSON));
			LOG.debug("RestultActons: " + resultActions.andReturn().getResponse().getContentAsString()) ;
			resultActions.andExpect(status().isOk())
						 .andExpect(content().string(notNullValue()));
			
		} finally {
			if (resultActions != null) {
				retrievedPatient = this.jsonToObject(resultActions.andReturn().getResponse().getContentAsString());
				if (retrievedPatient != null && retrievedPatient.getPayload() != null){
					patientService.deletePatient(retrievedPatient.getPayload().getId());
				}
			}
		}
	}	
	
	@Test
	public void testGettingAllPatients() throws Exception {
		ResultActions resultActions = this.mockMvc.perform(get("/patients"));
		LOG.debug("RestultActons: " + resultActions.andReturn().getResponse().getContentAsString()) ;
		resultActions.andExpect(status().isOk())
		 			 .andExpect(content().string(notNullValue()));
	}	
	
	@After
	public void afterEach() {
		patientService.deletePatient(createdPatientId);
	}
	
	private byte[] convertObjectToBytes(Object o)
			throws IOException {
		return mapper.writeValueAsBytes(o); 
	}
	
	private  ApiResponse<Patient> jsonToObject(String jsonString) throws IOException {
		mapper.setSerializationInclusion(JsonSerialize.Inclusion.NON_NULL);
		return mapper.readValue(jsonString, new TypeReference<ApiResponse<Patient>>() {});
	}
	
	private Patient createTestPatient() {
		patient = new Patient();
		patient.setFirstName("aFirstName");
		patient.setLastName("aLastName");
		patient.setAddress("anAddress");
		patient.setCity("aCity");
		patient.setState("aState");
		return patient;
	}
}