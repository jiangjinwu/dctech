package com.dctech.dctest.paper.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class TestInfo {

	Long testId;
	Long userId;
	Long paperId;
	Date testTime;
	boolean finish;
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public Long getTestId() {
		return testId;
	}
	public void setTestId(Long testId) {
		this.testId = testId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getPaperId() {
		return paperId;
	}
	public void setPaperId(Long paperId) {
		this.paperId = paperId;
	}
	public Date getTestTime() {
		return testTime;
	}
	public void setTestTime(Date testTime) {
		this.testTime = testTime;
	}
	
	public boolean isFinish() {
		return finish;
	}
	public void setFinish(boolean finish) {
		this.finish = finish;
	}
	
	
	
}
