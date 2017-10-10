package com.dctech.dcshop.buy.dao;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.dctech.dcshop.buy.model.Cart;

public interface CartRepository extends PagingAndSortingRepository<Cart, Long> {

	Cart getCartByUserIdAndGoodsId(Long paperId,Long AccountId);
	
	
	List<Cart> getCartByUserId(Long AccountId);
}
