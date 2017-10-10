package com.tenpay.client;

import java.io.FileInputStream;
import java.security.KeyStore;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

import javax.net.ssl.TrustManager;
import javax.net.ssl.TrustManagerFactory;
import javax.net.ssl.X509TrustManager;

public class MyX509TrustManager implements X509TrustManager {
	  X509TrustManager sunJSSEX509TrustManager;   
	  
      MyX509TrustManager() throws Exception {   
          // create a "default" JSSE X509TrustManager.   
 
          KeyStore ks = KeyStore.getInstance("JKS");   
          ks.load(new FileInputStream("trustedCerts"),   
              "passphrase".toCharArray());   
 
          TrustManagerFactory tmf =   
          TrustManagerFactory.getInstance("SunX509", "SunJSSE");   
 
           tmf.init(ks);   
 
        TrustManager tms [] = tmf.getTrustManagers();   
 
        /*  
         * Iterate over the returned trustmanagers, look  
         * for an instance of X509TrustManager. If found,  
         * use that as our "default" trust manager.  
         */  
        for (int i = 0; i < tms.length; i++) {   
            if (tms[i] instanceof X509TrustManager) {   
                sunJSSEX509TrustManager = (X509TrustManager) tms[i];   
                return;   
            }   
        }   
 
        /*  
         * Find some other way to initialize, or else we have to fail the  
         * constructor.  
         */  
        throw new Exception("Couldn't initialize");   
}

	@Override
	public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {
		try {   
            sunJSSEX509TrustManager.checkClientTrusted(chain, authType);   
        } catch (CertificateException excep) {   
            // do any special handling here, or rethrow exception.   
        }   
		
	}

	@Override
	public void checkServerTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public X509Certificate[] getAcceptedIssuers() {
		// TODO Auto-generated method stub
		return null;
	}
}
