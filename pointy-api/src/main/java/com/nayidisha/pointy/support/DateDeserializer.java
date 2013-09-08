package com.nayidisha.pointy.support;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.DeserializationContext;
import org.codehaus.jackson.map.JsonDeserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DateDeserializer extends JsonDeserializer<Date>{

	private static Logger LOG = LoggerFactory.getLogger(DateDeserializer.class);
	
	@Override
	public Date deserialize(JsonParser json, DeserializationContext context) throws IOException, JsonProcessingException {	
		
		try {
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            return df.parse(json.getText());
        } catch (ParseException e) {
        	//If that date format didnt work, try another...
        	try {
	        	DateFormat df = new SimpleDateFormat("MM/dd/yyyy");
	            return df.parse(json.getText());
        	} catch (Exception e1){
        		LOG.warn("Could not deserialize: " + json.getText() );
        		//proceed...
        		return null;
        	}
        }
	}

}
