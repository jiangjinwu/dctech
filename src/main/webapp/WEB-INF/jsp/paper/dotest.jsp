<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>

<script type="text/javascript" src="/resources/jquery/jquery.js"></script>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
<title>预览试卷</title>
</head>
<body>
	<div  style="width:96%;margin-left:auto;margin-right:auto;">
		<div class="box border inverse">
				<div class="box-title">
					<h4><i class="fa fa-bars"></i>试卷管理</h4>
		
				</div>
				<div class="box-body big">
					<!-- <h3 class="form-title">Supported controls</h3> -->
					<form class="form-horizontal" action="save.html" role="form">
					
					<input type="hidden" id="testId"  name="testId" value="${testInfo.testId}" />
		              <ol >
		              <c:forEach  var="q" items="${questionList}">
		               <li  th:text=""> ${q.questionName} </li>
		               <ol  >
			              <c:forEach  var="o" items="${q.questionOptions}">
			              <li> <input name="${q.questionId}" value="${o.optionId}" type="radio"/>${o.optionName}
			              </c:forEach>
			              </ol>
		              </c:forEach>
		              <span th:each="q: ${questionList}">
		             	   <li  th:text="${q.questionName}">  </li>
			               <ol  >
			               <span th:each="o:${q.questionOptions}">
			              	 	<li> <input th:name="${q.questionId}" th:value="${o.optionId}" type="radio"/>  <label th:text="${o.optionName}"></label> </li>
			              	 	</span>
			               </ol>
			               </span>
		               </ol>
		               
		               <input type="button" value="提交" onclick="postAnswer()"/>
					 </form>
				</div>
			</div>
	</div>
	
	<script>
	
	function postAnswer(){
		var userAnswer=[];
		$("input[type='radio']:checked").each(function(index,element){
			var obj = $(element);
			var json = {};
			json.testId = $("#testId").val();
			json.questionId= obj.attr("name");
			json.optionId =obj.val();
			userAnswer.push(json);
		});
		
		
		  $.ajax({
				type:'POST',
				contentType: "application/json",
				 dataType:"json",  
				url:'test/postAnswer.json',
				data:JSON.stringify(userAnswer),
				success:function(data){
					
				}
			});  
	}
	
	</script>
</body>
</html>