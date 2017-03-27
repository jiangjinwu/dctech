package com.dctech.dcshop.buy.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpEntity;
import org.apache.http.HttpException;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
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
	
	@RequestMapping("paytest")
	public String payTest(Model model,HttpServletResponse res,HttpServletRequest request ) throws HttpException, IOException{
		
		
		//String redirect_uri = URLEncodedUtils.parse("http://home.nongrengongshe.com", Charset.forName("UTF-8"));
		
	   
	 
		
		
		
		if(request.getAttribute("code")==null){
			String redirect_uri= java.net.URLEncoder.encode("http://www.nongrengongshe.cn/buy/gettoken", "utf-8");
			
			String url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect" ;
			url = String.format(url, "wxc2ebb593810968f2",redirect_uri);
			  
			res.sendRedirect(url);
		} 
			
	       
		
		return "paytest";
	}
	
	@RequestMapping("gettoken")
	public String getToken(String code,Model model){
		 
		
		String getTokenUrl="https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code";
		
		getTokenUrl = String.format(getTokenUrl, "wxc2ebb593810968f2","a37ab8c87f4228d4f16426aa757fe6e3",code);
		 
	 
	
	
	 String content ="";
	 CloseableHttpClient httpclient = HttpClients.createDefault();  
        try {  
            // 创建httpget.    
            HttpGet httpget = new HttpGet(getTokenUrl);  
            System.out.println("executing request " + httpget.getURI());  
            // 执行get请求.    
            CloseableHttpResponse response = httpclient.execute(httpget);  
            try {  
                // 获取响应实体    
            	 HttpEntity      entity = response.getEntity();  
                System.out.println("--------------------------------------");  
                // 打印响应状态    
                System.out.println(response.getStatusLine());  
                if (entity != null) {  
                    // 打印响应内容长度    
                    System.out.println("Response content length: " + entity.getContentLength());  
                    // 打印响应内容    
        
                    
                    
                    content= EntityUtils.toString(entity);
                    
                    JSONObject obj=  JSONObject.parseObject(content);
                    model.addAttribute("openid",obj.getString("openid"));
                }  
                System.out.println("------------------------------------");  
            } finally {  
                response.close();  
            }  
        } catch (ClientProtocolException e) {  
            e.printStackTrace();  
        } catch (ParseException e) {  
            e.printStackTrace();  
        } catch (IOException e) {  
            e.printStackTrace();  
        } finally {  
            // 关闭连接,释放资源    
            try {  
                httpclient.close();  
            } catch (IOException e) {  
                e.printStackTrace();  
            }  
        }  
	
		
		return "gettoken";
	}
}
