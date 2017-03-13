package com.dctech.dctest.paper.service;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;

import com.dctech.dctest.paper.model.Paper;

public interface PaperService {
	public List<Paper> getPageList(PageRequest pageRequest,Specification specification);
	
	public Paper  findOne(Long id);
}