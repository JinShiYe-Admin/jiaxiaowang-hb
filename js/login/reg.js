mui.plusReady(
	//加载下一步的监听事件
	function(){
		var btn_nextReg=document.getElementById('reg');
		reg.addEventListener('tap',function(){
			
		})
	}
)
//获取各输入框内容
function getInput(){
	
}

//判断是不是邮箱
function isEmail(email){
	//邮箱的正则表达式
	var emailRegular=/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/; 
	return emailRegular.test(email);
}
//判断注册码正确与否
function isRegisterNo(no){
	
}
//判断昵称是否重复
function nicknameIsRepeat(nickname){
	
}
//判断昵称是否合法
function nicknameIsLegal(nickname){
	//中英文开头，中文、字母、数字、下划线组合
	var nicknameRegular = /^[\u4e00-\u9fa5a-zA-Z]+[\u4e00-\u9fa5a-zA-Z0-9\-_]*$/
	return nicknameRegular.test(nickname)
}
//判断密码是否一样
function isPasswordsRight(){
	
}

