package com.dctech.dcshop.buy.dao;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.dctech.dcshop.buy.model.OrderInfo;

public interface OrderRepository extends PagingAndSortingRepository<OrderInfo, Long> {

}
