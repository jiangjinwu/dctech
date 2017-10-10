package com.dctech.base.messge.websocket;

public enum SubscribeType {

	  NewOrder("NewOrder");
	   
	   private String type;
		
		private SubscribeType(String str){
			this.type = str;
		}
		
		public SubscribeType getByCode(String code){
		 return	this.valueOf(code);
		}
}
