package com.dctech.base.server.notice;

import java.util.HashMap;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import com.cloopen.rest.sdk.CCPRestSDK;

@Component
public class SmsNoticeServer  implements NoticeServer{
	private static String Url = "http://106.ihuyi.cn/webservice/sms.php?method=Submit";
	
	@Autowired
	private Environment env;
	
	@Value("${sms.account:123}")
	private String account;
	
	@Value("${sms.passWord:123}")
	private String passWord;
	
	@Value("${sms.appId:8a48b551505b4af001505c8b65eb052a}")
	private String appId;

	@Override
	public String process(String userCode, String content) {
		HashMap<String, Object> result = null;
		CCPRestSDK restAPI = new CCPRestSDK();
		restAPI.init("app.cloopen.com", "8883");// 初始化服务器地址和端口，格式如下，服务器地址不需要写https://
		restAPI.setAccount(account, passWord);// 初始化主帐号和主帐号TOKEN
		restAPI.setAppId(appId);// 初始化应用ID
		result = restAPI.sendTemplateSMS(userCode,"42129" ,new String[]{content,"30"});

		System.out.println("SDKTestSendTemplateSMS result=" + result);
		
		if("000000".equals(result.get("statusCode"))){
			//正常返回输出data包体信息（map）
			HashMap<String,Object> data = (HashMap<String, Object>) result.get("data");
			Set<String> keySet = data.keySet();
			for(String key:keySet){
				Object object = data.get(key);
				System.out.println(key +" = "+object);
			}
		}else{
			//异常返回输出错误码和错误信息
			System.out.println("错误码=" + result.get("statusCode") +" 错误信息= "+result.get("statusMsg"));
		}
		return null;
	}
	
	/*@Override
	public String process(String userCode, String content) {
		
		
		CCPRestSDK restAPI = new CCPRestSDK();
		HttpClient client = new HttpClient(); 
		PostMethod method = new PostMethod(Url);

		client.getParams().setContentCharset("GBK");
		method.setRequestHeader("ContentType","application/x-www-form-urlencoded;charset=GBK");

		int mobile_code = (int)((Math.random()*9+1)*100000);


		NameValuePair[] data = {//提交短信
			    new NameValuePair("account", account), 
			    new NameValuePair("password",passWord), //查看密码请登录用户中心->验证码、通知短信->帐户及签名设置->APIKEY
			    new NameValuePair("mobile", userCode), 
			    new NameValuePair("content", content),
		};
		method.setRequestBody(data);

		try {
			
			client.executeMethod(method);
			
			String SubmitResult =method.getResponseBodyAsString();

			//System.out.println(SubmitResult);

			Document doc = DocumentHelper.parseText(SubmitResult);
			Element root = doc.getRootElement();

			String code = root.elementText("code");
			String msg = root.elementText("msg");
			String smsid = root.elementText("smsid");

			System.out.println(code);
			System.out.println(msg);
			System.out.println(smsid);

			 if("2".equals(code)){
				System.out.println("短信提交成功");
			}

		} catch (HttpException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
		
		return null;
	}*/
	
	
	
}
