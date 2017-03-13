package com.dctech.dctest.paper.model;

import java.util.List;

public class OptionForm {

	List<QuestionOption> options;
	
	Question question;

	public List<QuestionOption> getOptions() {
		return options;
	}

	public void setOptions(List<QuestionOption> options) {
		this.options = options;
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}
	
	
}
