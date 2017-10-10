<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<!--  <html xmlns:th="http://www.thymeleaf.org"
    xmlns:layout="http://www.ultraq.net.nz/web/thymeleaf/layout"
    layout:decorator="fragments/adminLayout">  -->
<!-- <html xmlns:th="http://www.thymeleaf.org"> -->
 <html xmlns:th="http://www.thymeleaf.org" th:replace="~{fragments/adminLayout2 :: layout (~{::body},'error')}">

<script type="text/javascript" src="/js/jquery.min.js"></script>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
<title>Insert title here</title>
</head>
<body>

<div   style="width:96%;margin-left:auto;margin-right:auto;">
<div class="row">
							<div class="col-sm-12">
								<div class="page-header">
									<!-- STYLER -->
									
									<!-- /STYLER -->
									<!-- BREADCRUMBS -->
									<ul class="breadcrumb">
										<li>
											<i class="fa fa-home"></i>
											<a href="index.html">Home</a>
										</li>
										<li>
											<a href="#">UI Features</a>
										</li>
										<li>Buttons &amp; Icons</li>
									</ul>
								 
									
									<div class="box border lite">
									
									<div class="box-body center">
									
									
										<p class="btn-toolbar">
										<div class="btn-group">
											<a href="createPaper.html" class="btn btn-xs btn-default"><i class="fa fa-pencil"></i>Default</a>
											<button class="btn btn-xs btn-default"><i class="fa fa-pencil"></i> Write</button>
											<button class="btn btn-xs btn-primary">Primary</button>
											<button class="btn btn-xs btn-info">Info</button>
											<button class="btn btn-xs btn-success">Success</button>
											<button class="btn btn-xs btn-warning">Warning</button>
											<button class="btn btn-xs btn-danger">Danger</button>
											<button class="btn btn-xs btn-inverse">Inverse</button>
											</div>
										</p>
										
									</div>
								</div>
								</div>
							</div>
						</div>
<div class="table-responsive">
<table border="1" class="table table-hover table-striped">  
<thead>
              <tr>  
               <th>用户名</th>  
               <th>邮箱</th>  
                <th>管理员</th>  
        <th>操作</th>  
              </tr> 
</thead>         
<tbody>
<c:forEach var="user" items="${paperList}">
              <tr  th:each="user: ${paperList}">  
                <td >${user.name}</td>  
                <td >${user.price}</td>  
                <td>${user.paperUid}</td>  
                 <td >
                 <a  href="editPaper.html?paperId=${user.id}" class="btn btn-xs btn-default"><i class="fa fa-edit"></i></a>
                 <a  href="editQuOp.html?paperId=${user.id}" class="btn btn-xs btn-default"><i class="fa fa-plus">editQuestion</i></a>
                 
                  <a href="viewPaper.html?paperId=${user.id}" class="btn btn-xs btn-default"><i class="fa fa-dot-circle-o">view</i></a>
                 
                 
                 </td>  
              
              </tr> 
              </c:forEach>
</tbody>  
            </table> 
</div>
<script>
		jQuery(document).ready(function() {		
			App.setPage("elements");  //Set current page
			App.init(); //Initialise plugins and elements
		});
	</script> 
</div>
</body>
</html>