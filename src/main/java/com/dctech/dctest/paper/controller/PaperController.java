package com.dctech.dctest.paper.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.dctech.base.utils.WebUtil;
import com.dctech.dctest.paper.dao.BaseRepository;
import com.dctech.dctest.paper.dao.OptionRepository;
import com.dctech.dctest.paper.dao.PaperRepository;
import com.dctech.dctest.paper.dao.TestInfoRepository;
import com.dctech.dctest.paper.model.Paper;
import com.dctech.dctest.paper.model.Question;
import com.dctech.dctest.paper.model.QuestionOption;
import com.dctech.dctest.paper.model.TestInfo;
import com.dctech.dctest.paper.service.PaperService;


@Controller()
@RequestMapping("paper/")
public class PaperController {

 
	@Autowired
	PaperRepository paperRepository;
	
	@Autowired
	PaperService paperService;
	
	@Autowired
	BaseRepository baseRepository;
	
	@Autowired
	OptionRepository optionRepository;
	
	@Autowired
	TestInfoRepository testRepository;
	
	
	
	@InitBinder("question")  
	public void initBinderFormQuestion(WebDataBinder binder) {    
        binder.setFieldDefaultPrefix("question.");    
    } 
	@InitBinder("explain")  
	public void initBinderFormExplain(WebDataBinder binder) {    
        binder.setFieldDefaultPrefix("question.explain");    
    } 
	
	
	@RequestMapping("index.html")
	public String index() {
	/* Paper 	 paper  = paperService.getPaper();*/
		return "index";
	}
	
	@RequestMapping("list")
	public String list(Model model) {
	 
		PageRequest pageRequest = new PageRequest(0, 10);
		
		Specification specification = new Specification<Paper> () {  
			@Override
			   public Predicate toPredicate(Root<Paper> root,  
			    CriteriaQuery<?> query, CriteriaBuilder cb) {  
			    Path<String> namePath = root.get("paperName");
			   
			   /* query.where(cb.like(namePath, "%111%"));*/ //杩欓噷鍙互璁剧疆浠绘剰鏉℃煡璇㈡潯浠�  
			     
			    return null;  
			   }
			  };
		
		List<Paper> paperList = paperService.getPageList(pageRequest,specification);
		model.addAttribute("paperList", paperList);
		return "paper/list";
	}
	
	@RequestMapping("createPaper.html")
	public String createPage() {
	 
		return "paper/createPaper";
	}
	
	@RequestMapping("viewPaper.html")
	public String viewPaper(String paperId,Model model) {
	 
		Long pid =Long.parseLong(paperId);
		
		Paper paper = paperService.findOne(pid);
		List<Question> questionList = baseRepository.findByPaperId(pid);
		model.addAttribute("paper", paper);
		model.addAttribute("questionList", questionList);
		return "paper/viewPaper";
	}
	
	@RequestMapping("dotest.html")
	public String dotest(String paperId,  Model model) {
		
		Long pid =Long.parseLong(paperId);
		
		Paper paper = paperService.findOne(pid);
		List<Question> questionList = baseRepository.findByPaperId(pid);
		
		TestInfo testInfo = testRepository.getPaperNotFinishTestInfo(pid);
		
		if(testInfo == null){
			testInfo = new TestInfo();
			testInfo.setPaperId(pid);
			testInfo.setTestTime(new Date());
			testRepository.save(testInfo);
		}
		
		
		model.addAttribute("paper", paper);
		model.addAttribute("questionList", questionList);
		model.addAttribute("testInfo", testInfo);
		
		
		return "paper/dotest";
	}
	
	@RequestMapping("editPaper.html")
	public String editPaper(Integer paperId,Model model) {
	/*	Paper paper = paperService.findOne(paperId);
		model.addAttribute("paper", paper);*/
		return "paper/editPaper";
	}
	
	
	@RequestMapping("save.html")
	public String save(Paper paper) {
		
		
		
		
		paper.setPaperUid(WebUtil.getCurrentUser().getId());
		
		paper.setPaperCtime(Calendar.getInstance().getTime().getTime());
	
		
		paperRepository.save(paper);
		/*baseRepository.save(paper);*/
		return "redirect:list";
	}
	
	@RequestMapping("editQuOp.html")
	public String editQuOp(String paperId,Model model){
		
		model.addAttribute("paperId", paperId);
		return "paper/editQuOp";
	}
	
	@RequestMapping("addQuestionAndOptions.json")
	@ResponseBody
	public String addQuestionAndOptions( Question optionform) {
		
		
		/*int i=0;
		paperRepository.save(optionform);*/
	
		 return "success";
	}
	
	@RequestMapping("addQuestionAndOptions.html")
	@ResponseBody
	public String addQuestionAndOptionsForm( Question optionform) {
		
		
		int i=0;
		
		//,@RequestBody ArrayList<Option> options
		//@RequestBody  Question question
		//question.setQuestionId(UUID.randomUUID().toString());
	  //paperService.saveQuestionAndOptioins(question, options);
		 return "success";
	}
	
	@RequestMapping("addQuestionAndOptions2.html")
	@ResponseBody
	//public void addQuestionAndOptions(/* @RequestBody Question question*/ @RequestBody List<Option> options) {
		
		public void addQuestionAndOptions2(String options) {
		int i=0;
		
		
	}
	
	/*@RequestMapping("addQuestionAndOptions3.json")
	@ResponseBody
		public void addQuestionAndOptions3(@RequestBody Question question) {
		int i=0;
		i++;
		
	}*/
	
	@RequestMapping("addQuestionAndOptions3.json")
	@ResponseBody
		public Question addQuestionAndOptions3(@RequestBody String param) throws UnsupportedEncodingException {
		
      /*  JSONObject jo=new JSONObject();  
        JSONObject jsonObject = jo.JSONValue*/
		param = URLDecoder.decode(param, "utf-8");
		 // param ="{'paperId':'1','questionName':'question name'}";
        	/*Object obj =  JSONObject.parse(param,Question.class);*/
        	Question question =JSON.parseObject(param,Question.class);
        	//Object obj2=	JSONValue.parse(param);
        	 Set<QuestionOption> questionOptions = question.getQuestionOptions();
        	 question.setQuestionOptions(null);
         	baseRepository.save(question);
         	/* question.setQuestionOptions(questionOptions);
         	baseRepository.save(question);*/
         	
         	Iterator it =questionOptions.iterator();
         	
         	while(it.hasNext()){
         		QuestionOption q = (QuestionOption)it.next();
         		q.setQuestion(question);
         		optionRepository.save(q);
         	}
         	//baseRepository.save(questionOptions);
		int i=0;
		i++;
		//question.setQuestionOptions(questionOptions);
		return question;
		
	}


}
