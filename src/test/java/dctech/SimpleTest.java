package dctech;

import com.tenpay.util.TenpayUtil;

public class SimpleTest {

	public static void main(String[] args) {
     String noncestr="e6d8545daa42d5ced125a4bf747b3688";
      String prepayid="wx201704162059173947b036cd0975265514";
      String timestamp ="1492347608";
        String toPaySignString="appid=wxc2ebb593810968f2&nonceStr="+noncestr+"&package=prepay_id="+prepayid+"&signType=MD5&timeStamp="+timestamp+"&key=nrgswgwNrgswgwnrgswgwNrgswgw1234";
        
        String sign = TenpayUtil.createSign("UTF-8", toPaySignString);
        
        System.out.println(sign);
        
	}
}
