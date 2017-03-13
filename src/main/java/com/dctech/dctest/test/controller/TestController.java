package com.dctech.dctest.test.controller;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dctech.dctest.paper.dao.UserAnswerRepository;
import com.dctech.dctest.paper.model.UserAnswer;


@Controller
@RequestMapping("/test")
public class TestController {

	@Autowired
	UserAnswerRepository userAnswerRepository;
	
	public String startTest(Long paperId) {

		// 读取试卷信息到缓存：试题呈现方式，试题列表

		return "testPage";
	}

	public String nextQuestion(Long questionId) {

		// 读取试卷信息到缓存：试题呈现方式，试题列表

		return "testPage";
	}

	@RequestMapping("postAnswer.json")	
	@ResponseBody
	public String postAnswer(@RequestBody  List<UserAnswer> userAnswerList) {
		Iterator<UserAnswer> entities = userAnswerList.iterator();
	/*	userAnswerRepository.save(entities);*/
		
		while(entities.hasNext()){
			UserAnswer entity = entities.next();
			//entity.setTestId(testId);
			userAnswerRepository.save(entity);
		}
		return "OK";

	}
}
