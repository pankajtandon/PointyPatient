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

public class DateDeserializer extends JsonDeserializer<Date>{

	@Override
	public Date deserialize(JsonParser json, DeserializationContext context) throws IOException, JsonProcessingException {
		try {
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            return df.parse(json.getText());
        } catch (ParseException e) {
            return null;
        }
	}

}
