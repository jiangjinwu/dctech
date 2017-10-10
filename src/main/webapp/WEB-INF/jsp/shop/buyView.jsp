<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@include file="../taglib.jsp" %>
<html>

<head>
    <title >Welcome!</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	<link rel="stylesheet" type="text/css" href="${rootURL}resources/css/weui/weui.css" >
	<link rel="stylesheet" type="text/css" href="${rootURL}resources/css/styles.css" >
	<link rel="stylesheet" type="text/css" href="/resouces/css/weui/example.css" >
		<link rel="stylesheet" type="text/css" href="/static/css/cloud-admin.css" >
<script type="text/javascript" src="${rootURL}resources/jquery/jquery-1.10.2.js"></script>
		<script src="/static/js/jquery/jquery-2.0.3.min.js"></script>
	<script type="text/javascript" src="/resources/plugins/jquery.bootstrap.numberUI.js"></script>
		<script src="/resources/utils/json2.js"></script>
		
		
		
		<link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<%-- <script type="text/javascript" src="${rootURL}resources/bootstrap/js/bootstrap.js"></script> --%>

<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
     
	<style>
	.span-btn {
	cursor: pointer;
	}
	.input_mini{
	}
	
	</style>
	
	<script>
	$(function(){
		$(".number").numberUI({stepLength:1,name:'buyNum'}); 
	});
	
	function add2cart(){
		var buyNum = $("input[name='buyNum']").val();
		var datas={};
		var goods={};
		goods.id=$("#paperId").val();
		datas.goods=goods;
		datas.buyNum=buyNum;
		$.ajax({
			type:'POST',
			contentType: "application/json",
			dataType:"json",
			url:"/buy/add2cart.json",
			data:JSON.stringify(datas),
			success:function(){
				console.info(datas);
			}
			
		});
		
	}
	</script>
</head>
<body>
<div class="container">

<div class="box border green">
											<div class="box-title">
												<h4><i class="fa fa-bars"></i>Form states</h4>
												<div class="tools hidden-xs">
													<a href="#box-config" data-toggle="modal" class="config">
														<i class="fa fa-cog"></i>
													</a>
													<a href="javascript:;" class="reload">
														<i class="fa fa-refresh"></i>
													</a>
													<a href="javascript:;" class="collapse">
														<i class="fa fa-chevron-up"></i>
													</a>
													<a href="javascript:;" class="remove">
														<i class="fa fa-times"></i>
													</a>
												</div>
											</div>
											<div class="box-body big">
												<form class="form-horizontal" role="form">
												<input id="paperId" name="goodsId" value="${paperId}"/>
												  <div class="form-group">
													<label class="col-sm-3 control-label">Input focus</label>
													<div class="col-sm-9">
													  <input class="form-control" id="focusedInput" type="text" value="This is focused...">
													</div>
												  </div>
												  <div class="form-group">
													<label class="col-sm-3 control-label">Disabled inputs</label>
													<div class="col-sm-9">
														<input class="form-control" id="disabledInput" type="text" placeholder="Disabled input here..." disabled="">
													</div>
												  </div>
												  <div class="form-group">
													<label class="col-sm-3 control-label">Field with tooltip on focus</label>
													<div class="col-sm-9">
														<input type="text" name="regular" title="" class="form-control tip-focus" data-original-title="Tooltip on focus">
													</div>
												  </div>
												  <div class="form-group">
													<label class="col-sm-3 control-label">Field with tooltip on hover</label>
													<div class="col-sm-9">
														<input type="text" name="regular" title="" class="form-control tip" data-original-title="Tooltip on hover">
													</div>
												  </div>
												  <div class="form-group has-success">
													<label class="col-sm-3 control-label">Input with success</label>
													<div class="col-sm-9">
														<input type="text" class="form-control" id="inputSuccess">														
													</div>
												  </div>
												  <div class="form-group has-warning">
													<label class="col-sm-3 control-label">Input with warning</label>
													<div class="col-sm-9">
														<input type="text" class="form-control" id="inputWarning">														
													</div>
												  </div>
												  <div class="input-group">
														  <span class="input-group-addon span-btn">-</span>
														  <input type="number" name="buyNum"  value="1" class="form-control col-sm-3 number">
														  <span class="input-group-anddon span-btn">+</span>
												   </div>
												   
												   
												   <div class="input-group ">
												   </div>
												  <div class="form-group">
													<div class="col-sm-offset-2 col-sm-10">
													  <button type="button" onclick="add2cart()" class="btn btn-pink">add2cart</button>
													   <button type="submit" class="btn btn-pink">buy now</button>
													</div>
												
												  </div>
												  
												
												 </form>
											</div>
										</div>
</div>

<div class="weui-tabbar">
                <a href="javascript:;" class="weui-tabbar__item">
                    <span style="display: inline-block;position: relative;">
                        <img src="./images/icon_tabbar.png" alt="" class="weui-tabbar__icon">
                        <span class="weui-badge" style="position: absolute;top: -2px;right: -13px;">8</span>
                    </span>
                    <p class="weui-tabbar__label">微信</p>
                </a>
                <a href="/buy/cartInfo" class="weui-tabbar__item weui-bar__item_on">
                    <img src="${rootURL}resources/images/weui/icon_tabbar.png" alt="" class="weui-tabbar__icon">
                    <p class="weui-tabbar__label">购物车</p>
                </a>
                <a href="javascript:;" class="weui-tabbar__item">
                    <span style="display: inline-block;position: relative;">
                        <img src="./images/icon_tabbar.png" alt="" class="weui-tabbar__icon">
                        <span class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>
                    </span>
                    <p class="weui-tabbar__label">发现</p>
                </a>
                <a href="javascript:;" class="weui-tabbar__item">
                    <img src="./images/icon_tabbar.png" alt="" class="weui-tabbar__icon">
                    <p class="weui-tabbar__label">我</p>
                </a>
            </div>
</body>
</html>