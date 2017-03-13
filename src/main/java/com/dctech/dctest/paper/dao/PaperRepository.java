package com.dctech.dctest.paper.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.dctech.dctest.paper.model.Paper;
/*
@NoRepositoryBean
@Repository*/
public interface PaperRepository  extends PagingAndSortingRepository<Paper, Long> {

	
	Page<Paper> findAll(Specification<Paper> spec, Pageable pageable);  //鍒嗛〉鎸夋潯浠舵煡璇�  
	  
	List<Paper> findAll(Specification<Paper> spec);
}
