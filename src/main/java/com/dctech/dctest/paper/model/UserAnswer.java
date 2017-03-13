package com.dctech.dctest.paper.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class UserAnswer {

	
	Long userAnswerId;
	Long testId;
	Long questionId;
	Long optionId;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public Long getUserAnswerId() {
		return userAnswerId;
	}
	public void setUserAnswerId(Long userAnswerId) {
		this.userAnswerId = userAnswerId;
	}
	 
	
	
	public Long getTestId() {
		return testId;
	}
	public void setTestId(Long testId) {
		this.testId = testId;
	}
	public Long getQuestionId() {
		return questionId;
	}
	public void setQuestionId(Long questionId) {
		this.questionId = questionId;
	}
	public Long getOptionId() {
		return optionId;
	}
	public void setOptionId(Long optionId) {
		this.optionId = optionId;
	}
	
	
	
	
}
