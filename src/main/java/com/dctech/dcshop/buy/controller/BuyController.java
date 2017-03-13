package com.dctech.dcshop.buy.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dctech.base.model.AccountInfo;
import com.dctech.base.utils.TimeUtil;
import com.dctech.dcshop.buy.dao.CartRepository;
import com.dctech.dcshop.buy.dao.OrderPaperRepository;
import com.dctech.dcshop.buy.model.Cart;
import com.dctech.dcshop.buy.model.OrderPaper;
/**
 * 
 * @author jiangjinwu
 *  澧炲姞绲勫悎濂楄
 *  璐墿杞�
 *  
 */
@Controller
@RequestMapping("buy/")
public class BuyController {

	
	@Autowired
	OrderPaperRepository orderPaperRepository;
	
	@Autowired
	CartRepository cartRepository;
	
	@RequestMapping("buyView")
	public String buyView(Long paperId,Model model){
		
		model.addAttribute("paperId", paperId);
		
		return "buy/buyView";
	} 
	
	public String postOrder(OrderPaper orderPaper){
		orderPaper.setExpireDate(TimeUtil.getDateAfter(orderPaper.getPaper().getExpireDayCount()));
		orderPaperRepository.save(orderPaper);
		return "buy/pay";
	}
	
	@RequestMapping("add2cart.json")
	@ResponseBody
	public String add2Cart(@RequestBody Cart cart,HttpServletRequest request){
		AccountInfo accountInfo= (AccountInfo)request.getSession().getAttribute("Account");
		cart.setAccountId(accountInfo.getAccountId());
		
		Cart cartInfo =cartRepository.getCartByAccountIdAndPaperId(cart.getCartId(),cart.getAccountId());
		
		if(cartInfo!=null){
			cartInfo.setBuyNum(cartInfo.getBuyNum()+cart.getBuyNum());
		}
		cartRepository.save(cartInfo);
		return "ok";
	} 
	
	@RequestMapping("cartInfo.json")
	public List<Cart> cartInfo(HttpServletRequest request){
		AccountInfo accountInfo= (AccountInfo)request.getSession().getAttribute("Account");
		List<Cart> cartList =cartRepository.getCartByAccountId(accountInfo.getAccountId());
		
		return cartList;
	}
}
