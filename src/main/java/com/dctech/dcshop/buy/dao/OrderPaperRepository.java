package com.dctech.dcshop.buy.dao;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.dctech.dcshop.buy.model.OrderPaper;

public interface OrderPaperRepository extends PagingAndSortingRepository<OrderPaper, Long>{

}
