package com.dctech.base.utils;

import java.util.Calendar;
import java.util.Date;

public class TimeUtil {

	public static Date getDateAfter(int day){
		return getDateAfter(null, day);
	}
	
	public static Date getDateAfter(Date date ,int day){
		Calendar c = Calendar.getInstance();
		if(date !=null){
			c.setTime(date);
		}
		c.add(Calendar.DAY_OF_YEAR, day);
		return c.getTime();
	}
}
