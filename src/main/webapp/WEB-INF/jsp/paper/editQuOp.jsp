
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html >
<script type="text/javascript" src="/resources/jquery/jquery.js"></script>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
<title>Insert title here</title>
</head>
<body>
	<script type="text/javascript"
		src="/js/nestable/jquery.nestable.min.js"></script>
	<div  
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

 

				arrayObj.paperId = $("#paperId").val();
				arrayObj.questionName = $("#questionName").val();
				arrayObj.questionOptions = [];

				
				$("#nestable1").find("input[name='options.optionName']").each(
						function(index, element) {
							var option = {};
							option.optionName = $(element).val();
							arrayObj.questionOptions.push(option);
				});

				alert(JSON.stringify(arrayObj));
				console.info(this);
				console.info($(this));
				console.info($(this).parent());
				

				$
						.ajax({
							type : 'POST',
							contentType : "application/json;charset=utf-8",
							dataType : "json",
							url : 'addQuestionAndOptions3.json',
							data : JSON.stringify(arrayObj),
							success : function(data) {

								/* console.info(data);
								var html = "<li>" + arrayObj.questionName
										+ "</li>";
								html += "<ol>";
								for (var i = 0; i < arrayObj.questionOptions.length; i++) {
									html += "<li>"
											+ arrayObj.questionOptions[i].optionName
											+ "</li>";
								}
								html += "</ol>";
								$("#viewList").append(html); */
								
								
								
								var div = $("#nestable1").clone(true);
								div.attr("id","");
								div.appendTo($("#questionList"));
								
								
								$("#nestable1").find("input[name='options.optionName']").each(
										function(index, element) {
											console.info($(this));
											$(this).val("");
										});
								
								$("#nestable1").find("input[name='questionName']").each(
										function(index, element) {
											$(this).val("");
								});
								
								

							}
						});
			}
		</script>
		<form action="addQuestionAndOptions.html">
			<input type="text" id="paperId" name="paperId"
				value="${paperId}"></input>

			<div >
				 <ol id="questionList">
				 
				 </ol>

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
								<div class="dd" id="">
									<ol class="dd-list" >
										<li class="dd-item dd3-item" data-id="15" id="nestable1">
											<div class="dd-handle dd3-handle"></div>
											<input id="questionName"   name="questionName"
											class="dd3-content" placeholder="问题描述"></input>
											<ol class="dd-list">
												<li class="dd-item dd3-item" data-id="16">
													<div class="dd-handle dd3-handle"></div>
													<input class="dd3-content" name="options.optionName"
													placeholder="选项"></input>
												</li>
												<li class="dd-item dd3-item" data-id="17">
													<div class="dd-handle dd3-handle"></div> <input
													class="dd3-content" name="options.optionName"
													placeholder="选项"></input>
												</li>
												<li class="dd-item dd3-item" data-id="18">
													<div class="dd-handle dd3-handle"></div>
													<input class="dd3-content" name="options.optionName"
													placeholder="选项"></input>
												</li>
												<li class="dd-item dd3-item" data-id="18">
													<div class="dd-handle dd3-handle"></div>
													<input class="dd3-content" name="options.optionName"
													placeholder="选项"></input>
												</li>
											</ol>
											<input type="button" value="添加" onclick="addQuestionAndOptions3()" />  
										</li>
									</ol>
								</div>
									
							</div>
							
							
						
						</div>
						<!-- /BOX -->
					</div>
				</div>

				

			
			
				  
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