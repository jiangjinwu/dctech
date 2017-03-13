<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org"
    xmlns:layout="http://www.ultraq.net.nz/web/thymeleaf/layout"
    layout:decorator="fragments/adminLayout">

<script type="text/javascript" src="/js/jquery.min.js"></script>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
<title>预览试卷</title>
</head>
<body>
	<div layout:fragment="content" style="width:96%;margin-left:auto;margin-right:auto;">
		<div class="box border inverse">
				<div class="box-title">
					<h4><i class="fa fa-bars"></i>试卷管理</h4>
		
				</div>
				<div class="box-body big">
					<!-- <h3 class="form-title">Supported controls</h3> -->
					<form class="form-horizontal" action="save.html" role="form">
					  <div class="form-group">
						<label class="col-sm-3 control-label">试卷名称：</label>
						<div class="col-sm-9">
						  <input class="form-control" th:value="${paper.paperName}" name="paperName"></input>
						</div>
					  </div>
					   <div class="form-group">
						<label class="col-sm-3 control-label">编号：</label>
						<div class="col-sm-9">
						<input class="form-control" th:value="${paper.paperNo}" name="paperNo"></input>
						</div>
					  </div>
					  <div class="form-group">
						<label class="col-sm-3 control-label">价格：</label>
						<div class="col-sm-9">
						<input class="form-control" th:value="${paper.paperPrice}" name="paperPrice"></input>
						</div>
					  </div>
		
		              <ol >
${questionList}
			          <c:forEach var="q" items="${questionList}">
			          
			           <li> ${q.questionName} </li>
			               <ol  >
			                 
			                   <c:forEach var="o" items="${q.questionOptions}">
			              	 	<li  th:text=""> ${o.optionName} </li>
			              	 	</c:forEach>
			               </ol>
			          
			          </c:forEach>
		               </ol>
					 </form>
				</div>
			</div>
	</div>
</body>
</html>