package com.nayidisha.pointy.util;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

public class DateSerializer extends JsonSerializer<Date> {
    @Override
    public void serialize(Date aDate, JsonGenerator generator, SerializerProvider aProvider) throws IOException, JsonProcessingException {      

        SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
        String formattedDate = formatter.format(aDate);
        generator.writeString(formattedDate);
    }
}
