package com.nayidisha.pointy.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.io.IOException;
import java.util.List;

import javax.inject.Inject;

import org.apache.commons.lang3.time.DateUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.type.TypeReference;
import org.joda.time.DateTime;
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
import org.springframework.util.Assert;
import org.springframework.web.context.WebApplicationContext;

import com.nayidisha.pointy.domain.Patient;
import com.nayidisha.pointy.dto.VisitFrequency;
import com.nayidisha.pointy.services.patient.PatientService;
import com.nayidisha.pointy.services.reporting.ReportingService;
import com.nayidisha.pointy.support.ApiResponse;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextHierarchy({
	@ContextConfiguration("/META-INF/spring/api-bootstrap-context.xml")
})
public class ReportingControllerFunctionalTests {

	private static final Logger LOG = LoggerFactory.getLogger(ReportingControllerFunctionalTests.class);
	
	@Inject
	private WebApplicationContext wac;	

	@Inject
	private PatientService patientService;

	@Inject
	private ReportingService reportingService;
	
	@Inject
	private ObjectMapper jacksonObjectMapper;
	
	private Long createdPatientId1;
	private Long createdPatientId2;
	private Long createdPatientId25;
	private Long createdPatientId3;
	private Long createdPatientId4;
	
	private MockMvc mockMvc; 
	
	private DateTime today;
	private DateTime tomorrow;
	private DateTime dayAfter;
	private DateTime yesterday;
	@Before
	public void setup() {
		this.mockMvc = webAppContextSetup(this.wac).build();
		
		today = new DateTime();
		tomorrow = today.plusDays(1);
		dayAfter = tomorrow.plusDays(1);
		yesterday = today.minusDays(1);
		
		Patient patient1 = this.createTestPatient(yesterday);
		Patient patient2 = this.createTestPatient(today);
		Patient patient25 = this.createTestPatient(today);
		Patient patient3 = this.createTestPatient(tomorrow);
		Patient patient4 = this.createTestPatient(dayAfter);
		
		patientService.createPatient(patient1);
		patientService.createPatient(patient2);
		patientService.createPatient(patient25);
		patientService.createPatient(patient3);
		patientService.createPatient(patient4);
		createdPatientId1 = patient1.getId();
		createdPatientId2 = patient2.getId();
		createdPatientId25 = patient25.getId();
		createdPatientId3 = patient3.getId();
		createdPatientId4 = patient4.getId();
	}
	
	@Test
	public void testGettingAllVisitFreqs() throws Exception {
		ResultActions resultActions = this.mockMvc.perform(get("/reporting/visitFrequency" )
				.accept(MediaType.APPLICATION_JSON));
		String result = resultActions.andReturn().getResponse().getContentAsString();
		LOG.debug("RestultActons: " + result) ;
		
		resultActions.andExpect(status().isOk());
		ApiResponse<List<VisitFrequency>> apiResponse = jsonToObject(result); 

		List<VisitFrequency> vfList = apiResponse.getPayload();
		int days = 0;
		for (VisitFrequency visitFrequency : vfList) {
			if (DateUtils.isSameDay(visitFrequency.getVisitDate(), yesterday.toDate())){
				Assert.isTrue(visitFrequency.getNumberOfVisits() == 1);
				days++;
			}
			if (DateUtils.isSameDay(visitFrequency.getVisitDate(), today.toDate())){
				Assert.isTrue(visitFrequency.getNumberOfVisits() == 2);
				days++;
			}
			if (DateUtils.isSameDay(visitFrequency.getVisitDate(), tomorrow.toDate())){
				Assert.isTrue(visitFrequency.getNumberOfVisits() == 1);
				days++;
			}
			if (DateUtils.isSameDay(visitFrequency.getVisitDate(), dayAfter.toDate())){
				Assert.isTrue(visitFrequency.getNumberOfVisits() == 1);
				days++;
			}
		}		
		Assert.isTrue(days >= 4);
	}	
	
	@After
	public void afterEach() {
		patientService.deletePatient(createdPatientId1);
		patientService.deletePatient(createdPatientId2);
		patientService.deletePatient(createdPatientId25);
		patientService.deletePatient(createdPatientId3);
		patientService.deletePatient(createdPatientId4);
		
	}
	
	private  ApiResponse<List<VisitFrequency>> jsonToObject(String jsonString) throws IOException {
		jacksonObjectMapper.setSerializationInclusion(JsonSerialize.Inclusion.NON_NULL);
		return jacksonObjectMapper.readValue(jsonString, new TypeReference<ApiResponse<List<VisitFrequency>>>() {});
	}
	
	private Patient createTestPatient(DateTime datetime) {
		Patient patient = new Patient();
		patient.setFirstName("aFirstName");
		patient.setLastName("aLastName");
		patient.setAddress("anAddress");
		patient.setCity("aCity");
		patient.setState("aState");
		patient.setVisitDate(datetime.toDate());
		return patient;
	}
}