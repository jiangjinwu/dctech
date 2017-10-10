package com.tenpay.util;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.SortedMap;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;

/**
 * xml������
 * @author miklchen
 *
 */
public class XMLUtil {

	/**
	 * ����xml,���ص�һ��Ԫ�ؼ�ֵ�ԡ������һ��Ԫ�����ӽڵ㣬��˽ڵ��ֵ���ӽڵ��xml���ݡ�
	 * @param strxml
	 * @return
	 * @throws JDOMException
	 * @throws IOException
	 */
	public static Map doXMLParse(String strxml) throws JDOMException, IOException {
		strxml = strxml.replaceFirst("encoding=\".*\"", "encoding=\"UTF-8\"");

		if(null == strxml || "".equals(strxml)) {
			return null;
		}
		
		Map m = new HashMap();
		
		InputStream in = new ByteArrayInputStream(strxml.getBytes());
		SAXBuilder builder = new SAXBuilder();
		Document doc = builder.build(in);
		Element root = doc.getRootElement();
		List list = root.getChildren();
		Iterator it = list.iterator();
		while(it.hasNext()) {
			Element e = (Element) it.next();
			String k = e.getName();
			String v = "";
			List children = e.getChildren();
			if(children.isEmpty()) {
				v = e.getTextNormalize();
			} else {
				v = XMLUtil.getChildrenText(children);
			}
			
			m.put(k, v);
		}
		
		//�ر���
		in.close();
		
		return m;
	}
	
	/**
	 * ��ȡ�ӽ���xml
	 * @param children
	 * @return String
	 */
	public static String getChildrenText(List children) {
		StringBuffer sb = new StringBuffer();
		if(!children.isEmpty()) {
			Iterator it = children.iterator();
			while(it.hasNext()) {
				Element e = (Element) it.next();
				String name = e.getName();
				String value = e.getTextNormalize();
				List list = e.getChildren();
				sb.append("<" + name + ">");
				if(!list.isEmpty()) {
					sb.append(XMLUtil.getChildrenText(list));
				}
				sb.append(value);
				sb.append("</" + name + ">");
			}
		}
		
		return sb.toString();
	}
	
	/**
	 * ��ȡxml�����ַ���
	 * @param strxml
	 * @return
	 * @throws IOException 
	 * @throws JDOMException 
	 */
	public static String getXMLEncoding(String strxml) throws JDOMException, IOException {
		InputStream in = HttpClientUtil.String2Inputstream(strxml);
		SAXBuilder builder = new SAXBuilder();
		Document doc = builder.build(in);
		in.close();
		return (String)doc.getProperty("encoding");
	}
	
	public static void main(String[] args){
		
		try {
		Map map = 	XMLUtil.doXMLParse( 
			"<xml><return_code><![CDATA[SUCCESS]]></return_code>"+
			"<return_msg><![CDATA[OK]]></return_msg>"+
			"<appid><![CDATA[wxc2ebb593810968f2]]></appid>"+
			"<mch_id><![CDATA[1358293402]]></mch_id>"+
			"<nonce_str><![CDATA[BxroJ0yxvagxUSA1]]></nonce_str>"+
			"<sign><![CDATA[FAD1BFCDE85408CABB038ED3E2EA1E8D]]></sign>"+
			"<result_code><![CDATA[SUCCESS]]></result_code>"+
			"<prepay_id><![CDATA[wx20170411223903b9460511120456123308]]></prepay_id>"+
			"<trade_type><![CDATA[JSAPI]]></trade_type>"+
			"</xml>");
		
		System.out.println(map);
		} catch (JDOMException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static String map2XML(SortedMap<Object,Object> parameters){
		   StringBuffer sb = new StringBuffer();
	        sb.append("<xml>");
	        Set es = parameters.entrySet();
	        Iterator it = es.iterator();
	        while(it.hasNext()) {
	            Map.Entry entry = (Map.Entry)it.next();
	            String k = (String)entry.getKey();
	            String v = (String)entry.getValue();
	            if ("attach".equalsIgnoreCase(k)||"body".equalsIgnoreCase(k)||"sign".equalsIgnoreCase(k)) {
	                sb.append("<"+k+">"+"<![CDATA["+v+"]]></"+k+">");
	            }else {
	                sb.append("<"+k+">"+v+"</"+k+">");
	            }
	        }
	        sb.append("</xml>");
	        return sb.toString();
	}
	
}
