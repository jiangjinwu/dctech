
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<!-- <html xmlns:th="http://www.thymeleaf.org"
    xmlns:layout="http://www.ultraq.net.nz/web/thymeleaf/layout"
    layout:decorator="fragments/adminLayout"> -->
<html xmlns:th="http://www.thymeleaf.org"
	th:replace="~{fragments/adminLayout2 :: layout (~{::body},'error')}">
<script type="text/javascript" src="/resources/jquery/jquery.js"></script>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
<title>Insert title here</title>
</head>
<body>
	<script type="text/javascript"
		src="/js/nestable/jquery.nestable.min.js"></script>
	<div layout:fragment="content"
		style="width: 96%; margin-left: auto; margin-right: auto;">

		<script type="text/javascript">
			function aa() {

				var arrayObj = {
					"options" : [ {
						'optionName' : '1'
					}, {
						'optionName' : 'optionName'
					} ]
				};

				arrayObj = [ {
					'optionName' : '1'
				}, {
					'optionName' : 'optionName'
				} ];
				$.ajax({
					type : 'POST',
					contentType : "application/json",
					dataType : "json",
					url : 'addQuestionAndOptions.json',
					data : $("form").serializeArray(),
					success : function(data) {
						alert(data);
					}
				});
			}

			function addQuestionAndOptions2() {
				var arrayObj = {
					"options" : [ {
						"name" : "huang"
					} ]
				}
				$.ajax({
					type : 'POST',
					dataType : "json",
					url : 'addQuestionAndOptions2.html',
					data : JSON.stringify(arrayObj),
					success : function(data) {

					}
				});
			}

			function addQuestionAndOptions3() {
				var arrayObj = {
					'paperId' : '1',
					'questionName' : 'question name',
					"questionOptions" : [ {
						"optionName" : "option name 1"
					} ]
				};

				/* ,"questionOptions":[{"optionName":"option name 1"}] */

				arrayObj.paperId = $("#paperId").val();
				arrayObj.questionName = $("#questionName").val();
				arrayObj.questionOptions = [];

				$("input[name='options.optionName']").each(
						function(index, element) {
							var option = {};
							option.optionName = $(element).val();
							arrayObj.questionOptions.push(option);
						});

				alert(JSON.stringify(arrayObj));
				$
						.ajax({
							type : 'POST',
							contentType : "application/json",
							dataType : "json",
							url : 'addQuestionAndOptions3.json',
							data : JSON.stringify(arrayObj),
							success : function(data) {

								console.info(data);
								var html = "<li>" + arrayObj.questionName
										+ "</li>";
								html += "<ol>";
								for (var i = 0; i < arrayObj.questionOptions.length; i++) {
									html += "<li>"
											+ arrayObj.questionOptions[i].optionName
											+ "</li>";
								}
								html += "</ol>";
								$("#viewList").append(html);

							}
						});
			}
		</script>
		<form action="addQuestionAndOptions.html">
			<input type="hidden" id="paperId" name="paperId"
				th:value="${param.paperId}"></input>

			<div id="questionList">
				<ol id="viewList"></ol>


				<div class="row">
					<div class="col-md-12">
						<!-- BOX -->
						<div class="box border blue">
							<div class="box-title">
								<h4>
									<i class="fa fa-arrows"></i>Draggable Headers
								</h4>
								<div class="tools hidden-xs">
									<a href="#box-config" data-toggle="modal" class="config"> <i
										class="fa fa-cog"></i>
									</a> <a href="javascript:;" class="reload"> <i
										class="fa fa-refresh"></i>
									</a> <a href="javascript:;" class="collapse"> <i
										class="fa fa-chevron-up"></i>
									</a> <a href="javascript:;" class="remove"> <i
										class="fa fa-times"></i>
									</a>
								</div>
							</div>
							<div class="box-body clearfix">
								<div class="dd" id="nestable1">
									<ol class="dd-list">
										<li class="dd-item dd3-item" data-id="1">
											<div class="dd-handle dd3-handle"></div>
											<input id="questionName" name="questionName"
											class="dd3-content" placeholder="é®é¢æè¿°"></input>
											<ol class="dd-list">
												<li class="dd-item dd3-item" data-id="16">
													<div class="dd-handle dd3-handle"></div>
													<input class="dd3-content" name="options.optionName"
													placeholder="éé¡¹"></input>
												</li>
												<li class="dd3-item" data-id="17">
													<div class="dd-handle dd3-handle"></div> <input
													class="dd3-content" name="options.optionName"
													placeholder="éé¡¹"></input>
												</li>
												<li class="dd-item dd3-item" data-id="18">
													<div class="dd-handle dd3-handle"></div>
													<input class="dd3-content" name="options.optionName"
													placeholder="éé¡¹"></input>
												</li>
												<li class="dd-item dd3-item" data-id="18">
													<div class="dd-handle dd3-handle"></div>
													<input class="dd3-content" name="options.optionName"
													placeholder="éé¡¹"></input>
												</li>
											</ol>
										</li>
									</ol>


									<ol class="dd-list">
										<li class="dd-item dd3-item" data-id="15">
											<div class="dd-handle dd3-handle"></div>
											<input id="questionName" name="questionName"
											class="dd3-content" placeholder="é®é¢æè¿°"></input>
											<ol class="dd-list">
												<li class="dd-item dd3-item" data-id="16">
													<div class="dd-handle dd3-handle"></div>
													<input class="dd3-content" name="options.optionName"
													placeholder="éé¡¹"></input>
												</li>
												<li class="dd-item dd3-item" data-id="17">
													<div class="dd-handle dd3-handle"></div> <input
													class="dd3-content" name="options.optionName"
													placeholder="éé¡¹"></input>
												</li>
												<li class="dd-item dd3-item" data-id="18">
													<div class="dd-handle dd3-handle"></div>
													<input class="dd3-content" name="options.optionName"
													placeholder="éé¡¹"></input>
												</li>
												<li class="dd-item dd3-item" data-id="18">
													<div class="dd-handle dd3-handle"></div>
													<input class="dd3-content" name="options.optionName"
													placeholder="éé¡¹"></input>
												</li>
											</ol>
										</li>
									</ol>
								</div>
							</div>
						</div>
						<!-- /BOX -->
					</div>
				</div>

				<div class="row">
					<div class="col-md-12">
						<!-- BOX -->
						<div class="box border blue">
							<div class="box-title">
								<h4>
									<i class="fa fa-arrows"></i>Draggable Headers
								</h4>
								<div class="tools hidden-xs">
									<a href="#box-config" data-toggle="modal" class="config"> <i
										class="fa fa-cog"></i>
									</a> <a href="javascript:;" class="reload"> <i
										class="fa fa-refresh"></i>
									</a> <a href="javascript:;" class="collapse"> <i
										class="fa fa-chevron-up"></i>
									</a> <a href="javascript:;" class="remove"> <i
										class="fa fa-times"></i>
									</a>
								</div>
							</div>
							<div class="box-body clearfix">
								<div class="dd" id="nestable2">
									<ol class="dd-list">
										<li class="dd-item dd3-item" data-id="15">
											<div class="dd-handle dd3-handle"></div>
											<input id="questionName" name="questionName"
											class="dd3-content" placeholder="é®é¢æè¿°"></input>
											<ol class="dd-list">
												<li class="dd-item dd3-item" data-id="16">
													<div class="dd-handle dd3-handle">éé¡¹ä¸</div>
													<input class="dd3-content" name="options.optionName"
													placeholder="éé¡¹"></input>
												</li>
												<li class="dd-item dd3-item" data-id="17">
													<div class="dd-handle dd3-handle"></div> <input
													class="dd3-content" name="options.optionName"
													placeholder="éé¡¹"></input>
												</li>
												<li class="dd-item dd3-item" data-id="18">
													<div class="dd-handle dd3-handle"></div>
													<input class="dd3-content" name="options.optionName"
													placeholder="éé¡¹"></input>
												</li>
												<li class="dd-item dd3-item" data-id="18">
													<div class="dd-handle dd3-handle"></div>
													<input class="dd3-content" name="options.optionName"
													placeholder="éé¡¹"></input>
												</li>
											</ol>
										</li>
									</ol>
								</div>
							</div>
						</div>
						<!-- /BOX -->
					</div>
				</div>

			</div>
			<input type="button" value="1" onclick="aa()" /> <input
				type="button" value="2" onclick="addQuestionAndOptions2()" /> <input
				type="button" value="3" onclick="addQuestionAndOptions3()" /> <input
				type="submit" value="form submit" /> <input type="button"
				value="ä¸ä¸é¢" onclick="addQuestionAndOptions3()" />
		</form>
		<script>
			jQuery(document).ready(function() {
				App.setPage("nestable_lists"); //Set current page
				App.init(); //Initialise plugins and elements

				$('#nestable1').nestable({
					group : 1
				});

				$('#nestable2').nestable({
					group : 2
				});

				$('#nestable3').nestable({
					group : 3
				});
			});
		</script>


	</div>
</body>
</html>