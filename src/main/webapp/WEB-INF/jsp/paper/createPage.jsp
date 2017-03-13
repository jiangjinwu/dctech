<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<script type="text/javascript" src="<%= request.getContextPath() %>/js/jquery.min.js"></script>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>

<script type="text/javascript">
function addQuestionAndOptions(){
	
	alert($("form").serialize());
	
	var arrayObj = {
			'optioins.optionName':['a','b','c','d'],
			"questionName":'question name'
	};
	
	 
	$.ajax({
		//contentType: "application/x-www-form-urlencoded; charset=utf-8",  
		url:'addQuestionAndOptions.html',
		datas:arrayObj,
		success:function(data){
			
		}
	});
}


</script>
<form action="save.html">
<input type="hidden" name="paperId">
<input name="paperName">
<input name="paperPrice">
<input type="submit">

<div id="preview">

</div>
<div>
<dl>
<dd>题干：<textarea rows="" cols="" name="question.questionName"></textarea></dd>
<dd>选项1：<input name="optioins.optionName"></dd>
<dd>选项2：<input name="optioins.optionName"></dd>
<dd>选项3：<input name="optioins.optionName"></dd>
<dd>选项4：<input name="optioins.optionName" ></dd>
</dl>

</div>
<input type="button" value="保存" onclick="addQuestionAndOptions()">
<input type="button" value="下一题" onclick="">
</form>
</body>
</html>