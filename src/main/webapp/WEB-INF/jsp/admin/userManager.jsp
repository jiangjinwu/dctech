<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>

<link href="http://www.bootcss.com/p/layoutit/css/bootstrap-combined.min.css" rel="stylesheet">
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
<script src="http://libs.baidu.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
<script src="/resources/js/jgestures.js"></script>
</head>
<body>
<div class="container-fluid">
	<div class="row-fluid">
		<div class="span12">
			<div class="navbar">
				<div class="navbar-inner">
					<div class="container-fluid">
						 <a data-target=".navbar-responsive-collapse" data-toggle="collapse" class="btn btn-navbar"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></a> <a href="#" class="brand">网站名</a>
						<div class="nav-collapse collapse navbar-responsive-collapse">
							<ul class="nav">
								<li class="active">
									<a href="/userSearch">用户列表</a>
								</li>
								<li>
									<a href="/systemUserSaveIndex">绑定手机号</a>
								</li>
								
									</ul>
								</li>
							</ul>
						</div>
						
					</div>
				</div>
				
			</div>
		</div>
	</div>
</div>
<div class="container-fluid">
<form action="">

account:<input name="account"/>
userid:<input name="user_id"/>
<input type="submit" value="提交"/>

</form>

<table class="table">
<thead>
<tr>
<th>用户Id</th>
<th>手机号</th>
<th>绑定时间</th>
<th>重新绑定</th>
<th>删除绑定</th>
</tr>
</thead>


<c:forEach var="user" items="${userList }">
<tr>
<td>${user.user_id}</td>
<td>${user.account}</td>
<td>${user.createtime}</td>
<td>

<button class="btn btn-primary btn-lg" onclick="update_info('${user.id}','${user.user_id}','${user.account}')" data-toggle="modal" data-target="#myModal">
    编辑
</button>
</td>
<td>
<button class="btn btn-primary btn-lg" onclick="delete_info('${user.id}')">
删除绑定
</button>
</td>
</tr>

</c:forEach>


</table>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    重新绑定手机号
                </h4>
            </div>
            <form id="form_data" class="form-horizontal" role="form">
           <div class="form-group">
            <label for="user_id" class="col-sm-3 control-label">用户ID：</label>
             <div class="col-sm-9">
                <input type="text" id="user_id" readonly="readonly" name="user_id"/>
                </div>
                </div>
                 <div class="form-group">
                  <label for="account" class="col-sm-3 control-label">手机号：</label>
                   <div class="col-sm-9">
                 <input type="text" id="account" name="account"/>
                 </div>
                <input type="hidden" id="systemuserid" value="add" name="id"/>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                </button>
                <button type="button" onclick="updateform()" class="btn btn-primary">
                    提交更改
                </button>
            </div>
            </form>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->

</div>

<script>
function update_info(id,user_id,account){
	$("#user_id").val(user_id);
	$("#account").val(account);
	$("#systemuserid").val(id);
	
}

function updateform()
{
    var user_id = $.trim($('#user_id').val());
    var act     = $.trim($('#act').val());

    if(!user_id)
    {
        alert('用户ID不能为空！');
        return false;
    }
       var form_data = $('#form_data').serialize();
    // 异步提交数据到action/add_action.php页面
    $.ajax(
            {
                url: "/updateAccount",
                data: form_data,
                type: "post",
                beforeSend:function()
                {
                    $("#tip").html("<span style='color:blue'>正在处理...</span>");
                    return true;
                },
                success:function(data)
                {
                   
                	console.info(data);

                        var msg = "添加";
                        if(act == "edit") msg = "编辑";
                        $("#tip").html("<span style='color:blueviolet'>恭喜，" +msg+ "成功！</span>");
                        // document.location.href='system_notice.php'
                        alert(data.msg + "OK！");
                        $("#myModal").hide();
                        location.reload();
                    
                     
                },
                error:function()
                {
                    alert('请求出错');
                },
                complete:function()
                {
                    $('#acting_tips').hide();
                }
            });

    return false;
}


function delete_info(user_id)
{
   alert(user_id);
    if(!user_id)
    {
        alert('用户ID不能为空！');
        return false;
    }
       var form_data = $('#form_data').serialize();
    // 异步提交数据到action/add_action.php页面
    $.ajax(
            {
                url: "/deleteAccount",
                data: {id:user_id},
                type: "post",
                beforeSend:function()
                {
                    $("#tip").html("<span style='color:blue'>正在处理...</span>");
                    return true;
                },
                success:function(data)
                {

                        var msg = "添加";
                        alert(data.msg + "OK！");
                        location.reload();
                },
                error:function()
                {
                    alert('请求出错');
                },
                complete:function()
                {
                    $('#acting_tips').hide();
                }
            });

    return false;
}


$(function(){
	var msg="${msg}";
	if(msg){
		alert(msg);
	}
	
	
});




</script>
</body>
</html>