package com.dctech.dctest.paper.model;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
/*@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)*/
public class QuestionOption implements Serializable {

	
	Long optionId;
	String optionName;
	String nextOptionId;
	
	Question question;
	
	public  QuestionOption() {
		super();
		
	}
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getOptionId() {
		return optionId;
	}
	public void setOptionId(Long optionId) {
		this.optionId = optionId;
	}
	public String getOptionName() {
		return optionName;
	}
	public void setOptionName(String optionName) {
		this.optionName = optionName;
	}

	public String getNextOptionId() {
		return nextOptionId;
	}
	public void setNextOptionId(String nextOptionId) {
		this.nextOptionId = nextOptionId;
	}

	//(cascade = { CascadeType.MERGE, CascadeType.REFRESH }, optional = false)
	@ManyToOne
	@JoinColumn(name = "question_id")
	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}
	
	
	
}
