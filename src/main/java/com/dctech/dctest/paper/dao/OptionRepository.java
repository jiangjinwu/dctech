package com.dctech.dctest.paper.dao;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.dctech.dctest.paper.model.QuestionOption;

public interface OptionRepository  extends PagingAndSortingRepository<QuestionOption, Long> {

}
