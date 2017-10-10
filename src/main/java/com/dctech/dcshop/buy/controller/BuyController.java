package com.dctech.dcshop.buy.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.SortedMap;
import java.util.TreeMap;

import javax.net.ssl.SSLContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLContexts;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.dctech.base.model.User;
import com.dctech.base.services.UserService;
import com.dctech.base.utils.TimeUtil;
import com.dctech.base.utils.UserHolder;
import com.dctech.dcshop.buy.dao.CartRepository;
import com.dctech.dcshop.buy.dao.OrderPaperRepository;
import com.dctech.dcshop.buy.dao.OrderRepository;
import com.dctech.dcshop.buy.model.Cart;
import com.dctech.dcshop.buy.model.OrderInfo;
import com.dctech.dcshop.buy.model.OrderPaper;
import com.tenpay.AccessTokenRequestHandler;
import com.tenpay.ClientRequestHandler;
import com.tenpay.PackageRequestHandler;
import com.tenpay.PrepayIdRequestHandler;
import com.tenpay.client.TenpayHttpClient;
import com.tenpay.entitys.UnifiedOrder;
import com.tenpay.util.ConstantUtil;
import com.tenpay.util.TenpayUtil;
import com.tenpay.util.WXUtil;
import com.tenpay.util.XMLUtil;
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

	 final static Logger logger = LoggerFactory.getLogger("dctech.pay");
	 
	@Autowired
	OrderPaperRepository orderPaperRepository;
	
	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	UserService userService;
	
	@Autowired
	CartRepository cartRepository;
	
	@RequestMapping("buyView")
	public String buyView(Long paperId,Model model){
		
		model.addAttribute("paperId", paperId);
		
		return "shop/buyView";
	} 
	
	public String postOrder(OrderPaper orderPaper){
		orderPaper.setExpireDate(TimeUtil.getDateAfter(orderPaper.getPaper().getExpireDayCount()));
		orderPaperRepository.save(orderPaper);
		return "buy/pay";
	}
	
	@RequestMapping("add2cart.json")
	@ResponseBody
	public String add2Cart(@RequestBody Cart cart,HttpServletRequest request){
		//User user= (User)request.getSession().getAttribute("UserInfo");
	
		
		
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User loginUser=null;
	    if (principal instanceof UserDetails) 
	    {
	    	String code = ((User) principal).getName();
	    	User userDetail = (User) principal;
	    	/*f(StringUtils.isEmpty(code)){
	    		userDetail.getph
	    	}
	    	  loginUser = userService.findUserByEmailOrPhone(email);*/
	    	
	    	loginUser = userDetail;
	    	
	    
	    }
	    
		cart.setUser(loginUser);
		Cart cartInfo =cartRepository.getCartByUserIdAndGoodsId(loginUser.getId(),cart.getGoods().getId());
		
		if(cartInfo!=null){
			cartInfo.setBuyNum(cartInfo.getBuyNum()+cart.getBuyNum());
			cartRepository.save(cartInfo);
		}else{
			cart.setUser(loginUser);
			cartRepository.save(cart);
		}
		
		return "ok";
	} 
	
	/*@RequestMapping("cartInfo.json")
	public List<Cart> cartInfo(HttpServletRequest request){
		AccountInfo accountInfo= (AccountInfo)request.getSession().getAttribute("Account");
		List<Cart> cartList =cartRepository.getCartByUserId(accountInfo.getAccountId());
		
		return cartList;
	}*/
	
	@RequestMapping("cartInfo")
	public String cartInfo(HttpServletRequest request,Model model){
		User userInfo= UserHolder.getCurrentUser();
		List<Cart> cartList =cartRepository.getCartByUserId(userInfo.getId());
		model.addAttribute("cartList", cartList);
		return "shop/cartInfo";
	}
	
	
	@RequestMapping("paytest2")
	public String pay2(HttpServletRequest request,HttpServletResponse response) throws UnsupportedEncodingException, JSONException{
		Map<Object,Object> resInfo = new HashMap<Object, Object>();  
        //接收财付通通知的URL  
        String notify_url = "http://127.0.0.1:8180/tenpay_api_b2c/payNotifyUrl.jsp";  
  
        //---------------生成订单号 开始------------------------  
        //当前时间 yyyyMMddHHmmss  
        String currTime = TenpayUtil.getCurrTime();  
        //8位日期  
        String strTime = currTime.substring(8, currTime.length());  
        //四位随机数  
        String strRandom = TenpayUtil.buildRandom(4) + "";  
        //10位序列号,可以自行调整。  
        String strReq = strTime + strRandom;  
        //订单号，此处用时间加随机数生成，商户根据自己情况调整，只要保持全局唯一就行  
        String out_trade_no = strReq;  
        //---------------生成订单号 结束------------------------  
  
        PackageRequestHandler packageReqHandler = new PackageRequestHandler(request, response);//生成package的请求类   
        PrepayIdRequestHandler prepayReqHandler = new PrepayIdRequestHandler(request, response);//获取prepayid的请求类  
        ClientRequestHandler clientHandler = new ClientRequestHandler(request, response);//返回客户端支付参数的请求类  
        packageReqHandler.setKey(ConstantUtil.PARTNER_KEY);  
  
        int retcode ;  
        String retmsg = "";  
        String xml_body = "";  
        //获取token值   
          
        String token = AccessTokenRequestHandler.getAccessToken();  
          
    /*    log.info("获取token------值 " + token); */ 
          
        if (!"".equals(token)) {  
            //设置package订单参数  
            packageReqHandler.setParameter("bank_type", "WX");//银行渠道  
            packageReqHandler.setParameter("body", "测试"); //商品描述     
            packageReqHandler.setParameter("notify_url", notify_url); //接收财付通通知的URL    
            packageReqHandler.setParameter("partner", ConstantUtil.PARTNER); //商户号      
            packageReqHandler.setParameter("out_trade_no", out_trade_no); //商家订单号     
            packageReqHandler.setParameter("total_fee", "1"); //商品金额,以分为单位    
            packageReqHandler.setParameter("spbill_create_ip",request.getRemoteAddr()); //订单生成的机器IP，指用户浏览器端IP    
            packageReqHandler.setParameter("fee_type", "1"); //币种，1人民币   66  
            packageReqHandler.setParameter("input_charset", "GBK"); //字符编码  
  
            //获取package包  
            String packageValue = packageReqHandler.getRequestURL();  
            resInfo.put("package", packageValue);  
              
   /*         log.info("获取package------值 " + packageValue); */ 
  
            String noncestr = WXUtil.getNonceStr();  
            String timestamp = WXUtil.getTimeStamp();  
            String traceid = "";  
            ////设置获取prepayid支付参数  
            prepayReqHandler.setParameter("appid", ConstantUtil.APP_ID);  
           prepayReqHandler.setParameter("mch_id", ConstantUtil.PARTNER);  
            prepayReqHandler.setParameter("noncestr", noncestr);  
            prepayReqHandler.setParameter("package", packageValue);  
            prepayReqHandler.setParameter("timestamp", timestamp);  
            prepayReqHandler.setParameter("traceid", traceid);  
  
            //生成获取预支付签名  
            String sign = prepayReqHandler.createSHA1Sign();  
            //增加非参与签名的额外参数  
            prepayReqHandler.setParameter("app_signature", sign);  
            prepayReqHandler.setParameter("sign_method",  
                    ConstantUtil.SIGN_METHOD);  
            String gateUrl = ConstantUtil.GATEURL + token;  
            prepayReqHandler.setGateUrl(gateUrl);  
  
            //获取prepayId  
            String prepayid = prepayReqHandler.sendPrepay();  
              /*
            log.info("获取prepayid------值 " + prepayid);  */
              
            //吐回给客户端的参数  
            if (null != prepayid && !"".equals(prepayid)) {  
                //输出参数列表  
                clientHandler.setParameter("appid", ConstantUtil.APP_ID);  
                clientHandler.setParameter("appkey", ConstantUtil.APP_KEY);  
                clientHandler.setParameter("noncestr", noncestr);  
                //clientHandler.setParameter("package", "Sign=" + packageValue);  
                clientHandler.setParameter("package", "Sign=WXPay");  
                clientHandler.setParameter("partnerid", ConstantUtil.PARTNER);  
                clientHandler.setParameter("prepayid", prepayid);  
                clientHandler.setParameter("timestamp", timestamp);  
                //生成签名  
                sign = clientHandler.createSHA1Sign();  
                clientHandler.setParameter("sign", sign);  
  
                xml_body = clientHandler.getXmlBody();  
                resInfo.put("entity", xml_body);  
                retcode = 0;  
                retmsg = "OK";  
            } else {  
                retcode = -2;  
                retmsg = "错误：获取prepayId失败";  
            }  
        } else {  
            retcode = -1;  
            retmsg = "错误：获取不到Token";  
        }  
          
        resInfo.put("retcode", retcode);  
        resInfo.put("retmsg", retmsg);  
        String strJson = JSON.toJSONString(resInfo);  
       return strJson;
	}
	
	
	@RequestMapping("paytest3")
	public String pay3(HttpServletRequest request,HttpServletResponse response,Model model) throws UnsupportedEncodingException, JSONException{
		Map<Object,Object> resInfo = new HashMap<Object, Object>();  
		SortedMap<Object,Object> clientMap = new TreeMap<Object,Object>();
        //接收财付通通知的URL   
        String notify_url = "http://citymgr.nongrengongshe.com/api/notify/weixin/payNotify";  
  
        //---------------生成订单号 开始------------------------  
        //当前时间 yyyyMMddHHmmss  
        String currTime = TenpayUtil.getCurrTime();  
        //8位日期  
        String strTime = currTime.substring(8, currTime.length());  
        //四位随机数  
        String strRandom = TenpayUtil.buildRandom(4) + "";  
        //10位序列号,可以自行调整。  
        String strReq = strTime + strRandom;  
        //订单号，此处用时间加随机数生成，商户根据自己情况调整，只要保持全局唯一就行  
        String out_trade_no = strReq;  
        //---------------生成订单号 结束------------------------  
  
       // PackageRequestHandler packageReqHandler = new PackageRequestHandler(request, response);//生成package的请求类   
        PrepayIdRequestHandler prepayReqHandler = new PrepayIdRequestHandler(request, response);//获取prepayid的请求类  
       // ClientRequestHandler clientHandler = new ClientRequestHandler(request, response);//返回客户端支付参数的请求类  
       // packageReqHandler.setKey(ConstantUtil.PARTNER_KEY);  
  
        int retcode ;  
        String retmsg = "";  
        String xml_body = "";  
        //获取token值   
          
        String token = AccessTokenRequestHandler.getAccessToken();  
          
    /*    log.info("获取token------值 " + token); */ 
          
        if (!"".equals(token)) {  
        	Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    		User loginUser=null;
    	    if (principal instanceof UserDetails) 
    	    {
    	    	String email = ((UserDetails) principal).getUsername();
    	    	  loginUser = userService.findUserByEmailOrPhone(email);
    	    	
    	    	 
    	    }
        	
        	
           String noncestr = WXUtil.getNonceStr();  
           String timestamp = WXUtil.getTimeStamp();  
           
          String openId = request.getSession().getAttribute("openId").toString();
            
          SortedMap<Object,Object> paramsMap = new TreeMap<Object,Object>();
          paramsMap.put("appid", ConstantUtil.APP_ID);
          paramsMap.put("mch_id", ConstantUtil.PARTNER); 
          paramsMap.put("openid", openId); 
          paramsMap.put("out_trade_no",out_trade_no); 
          paramsMap.put("total_fee", "1"); 
          paramsMap.put("body", "測試"); 
          paramsMap.put("nonce_str", noncestr); 
          paramsMap.put("notify_url", notify_url); 
          paramsMap.put("trade_type", "JSAPI"); 
 
            //生成获取预支付签名  
            String sign = prepayReqHandler.createSign("UTF-8", paramsMap);
 
            String gateUrl = ConstantUtil.GATEURL;  
            prepayReqHandler.setGateUrl(gateUrl);  
  
            
            
            UnifiedOrder unifiedOrder = new UnifiedOrder();
            unifiedOrder.setAppid(ConstantUtil.APP_ID);
            unifiedOrder.setMch_id(ConstantUtil.PARTNER);
            unifiedOrder.setOpenid(openId);
            unifiedOrder.setOut_trade_no(out_trade_no);
            unifiedOrder.setTotal_fee("1");
            unifiedOrder.setBody("測試");
            unifiedOrder.setNonce_str(noncestr);
            unifiedOrder.setNotify_url(notify_url);
            unifiedOrder.setSign(sign);
            unifiedOrder.setTrade_type("JSAPI");
            
            
            //获取prepayId  
            String prepayid = prepayReqHandler.sendUnifiedOrder(unifiedOrder.toXml());
              /*
            log.info("获取prepayid------值 " + prepayid);  */
              
            //吐回给客户端的参数  
          
            if (null != prepayid && !"".equals(prepayid)) {  
            	
            	  String paytimestamp = WXUtil.getTimeStamp();  
            	
            	
                clientMap.put("appId", ConstantUtil.APP_ID);
                clientMap.put("nonceStr", noncestr);
                clientMap.put("package", "prepay_id="+prepayid);
                clientMap.put("timeStamp", paytimestamp);
                clientMap.put("signType", "MD5");
              
                String toPaySignString="appId=wxc2ebb593810968f2&nonceStr="+noncestr+"&package=prepay_id="
                +prepayid+"&signType=MD5&timeStamp="+paytimestamp+"&key=nrgswgwNrgswgwnrgswgwNrgswgw1234";
                
                String paySign =TenpayUtil.createSign("UTF-8", toPaySignString);
                clientMap.put("paySign2",paySign);
                clientMap.put("prepay_id", prepayid);
                
                
                logger.info(clientMap.toString());
                
                //生成签名  
                String tokenUrl = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%s&type=jsapi";
                
                  tokenUrl = String.format(tokenUrl, token);
                
                TenpayHttpClient  client = new TenpayHttpClient();
                JSONObject obj= client.callGet(tokenUrl);
                String ticket = obj.getString("ticket");
                
                SortedMap<String,String> paySignMap = new TreeMap<String,String>();
                paySignMap.put("noncestr", noncestr);
                paySignMap.put("jsapi_ticket", ticket);
                paySignMap.put("timestamp", timestamp);
                paySignMap.put("url", request.getRequestURL().toString());
                
                logger.info(request.getRequestURL().toString());
                
                String jsSign=  prepayReqHandler.createSHA1Sign2(paySignMap);
                clientMap.put("jsSign", jsSign);
                
               
                retmsg = "OK";  
            } else {  
                retcode = -2;  
                retmsg = "错误：获取prepayId失败";  
                
                logger.error("error");
            }  
        } else {  
            retcode = -1;  
            retmsg = "错误：获取不到Token";  
        }  
          
        model.addAttribute("params", clientMap);
         
       
       return "pay";
	}
	
	
	public String refund() throws KeyStoreException, NoSuchAlgorithmException,
	CertificateException, IOException, KeyManagementException, UnrecoverableKeyException{
		
		   SortedMap<Object,Object> parameters = new TreeMap<Object,Object>();
           parameters.put("appid", "wx0953bae287adfeee");
           parameters.put("mch_id", "你的微信支付商户号");
           parameters.put("nonce_str", WXUtil.getNonceStr());
          //在notify_url中解析微信返回的信息获取到 transaction_id，此项不是必填，详细请看上图文档
           parameters.put("transaction_id", "微信支付订单中调用统一接口后微信返回的 transaction_id");
           parameters.put("out_trade_no", "微信支付订单中的out_trade_no");
           parameters.put("out_refund_no", "No.QM20141215002");                              //我们自己设定的退款申请号，约束为UK
           parameters.put("total_fee", "1") ;                                                                          //单位为分
           parameters.put("refund_fee", "1");                                                                      //单位为分
           parameters.put("op_user_id", "你的微信支付商户号");
           
           String sign =  TenpayUtil.createSign("utf-8", parameters);
           parameters.put("sign", sign);
           
           String reuqestXml = XMLUtil.map2XML(parameters);
           
           
          KeyStore keyStore  = KeyStore.getInstance("PKCS12");
          FileInputStream instream = new FileInputStream(new File("D:/apiclient_cert.p12"));//放退款证书的路径
          try {
              keyStore.load(instream, "你的微信支付商户号".toCharArray());
          } finally {
              instream.close();
          }

          SSLContext sslcontext = SSLContexts.custom().loadKeyMaterial(keyStore, "你的微信支付商户号".toCharArray()).build();
          SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(
                  sslcontext,
                  new String[] { "TLSv1" },
                  null,
                  SSLConnectionSocketFactory.BROWSER_COMPATIBLE_HOSTNAME_VERIFIER);
          CloseableHttpClient httpclient = HttpClients.custom().setSSLSocketFactory(sslsf).build();
          try {

              HttpPost httpPost = new HttpPost("https://api.mch.weixin.qq.com/secapi/pay/refund");//退款接口
              
              System.out.println("executing request" + httpPost.getRequestLine());
              StringEntity  reqEntity  = new StringEntity(reuqestXml);
              // 设置类型 
              reqEntity.setContentType("application/x-www-form-urlencoded"); 
              httpPost.setEntity(reqEntity);
              CloseableHttpResponse response = httpclient.execute(httpPost);
              try {
                  HttpEntity entity = response.getEntity();

                  System.out.println("----------------------------------------");
                  System.out.println(response.getStatusLine());
                  if (entity != null) {
                      System.out.println("Response content length: " + entity.getContentLength());
                      BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(entity.getContent(),"UTF-8"));
                      String text;
                      while ((text = bufferedReader.readLine()) != null) {
                          System.out.println(text);
                      }
                     
                  }
                  EntityUtils.consume(entity);
              } finally {
                  response.close();
              }
          } finally {
              httpclient.close();
          }
		
		return "refundFinish";
	}
	
	public String buyNow(){
		return "";
	}
	
	@RequestMapping("newOrder")
	public String newOrder(){
		
		return "shop/newOrder";
	}
	
	@RequestMapping("payType")
	public String payType(Model model){
		User user = UserHolder.getCurrentUser();
		
		OrderInfo order = user.getOrders().get(0);
		
		model.addAttribute("order", order);
		return "shop/payType";
	}
	
	
	@RequestMapping("saveOrder")
	public String saveOrder(Model model,OrderInfo order,HttpServletRequest request){
		
		User user = UserHolder.getCurrentUser();
		order.createOrderSn();
		order.setOrderMoney(0.1f);
		order.setUser(user);
		
		orderRepository.save(order);
		
		if(user.getOrders()!=null){
			user.getOrders().add(order);
		}else{
			List<OrderInfo> orderList = new ArrayList<OrderInfo>();
			orderList.add(order);
			user.setOrders(orderList);
		}
		
		model.addAttribute("order", order);
		return "redirect:/buy/payType";
	}
}
