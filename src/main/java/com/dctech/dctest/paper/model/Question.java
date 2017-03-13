package com.dctech.dctest.paper.model;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Question {

	
	Long questionId;
	String questionName;
	String sectionId;
	Long paperId;
	int questionScore;
	
	Set<QuestionOption> questionOptions;
	
	

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getQuestionId() {
		return questionId;
	}
	public void setQuestionId(Long questionId) {
		this.questionId = questionId;
	}
	public String getQuestionName() {
		return questionName;
	}
	public void setQuestionName(String questionName) {
		this.questionName = questionName;
	}
	public String getSectionId() {
		return sectionId;
	}
	public void setSectionId(String sectionId) {
		this.sectionId = sectionId;
	}
	public Long getPaperId() {
		return paperId;
	}
	public void setPaperId(Long paperId) {
		this.paperId = paperId;
	}
	public int getQuestionScore() {
		return questionScore;
	}
	public void setQuestionScore(int questionScore) {
		this.questionScore = questionScore;
	}
	
	@OneToMany(cascade = CascadeType.ALL,fetch=FetchType.LAZY,mappedBy="question")
	public Set<QuestionOption> getQuestionOptions() {
		return questionOptions;
	}
	

	public void setQuestionOptions(Set<QuestionOption> options) {
		this.questionOptions = options;
	}
	
	
	
}
