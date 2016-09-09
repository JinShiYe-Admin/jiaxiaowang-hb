mui.init()

mui.plusReady(
	//加载下一步的监听事件
	function(){
		var settings = app.getSettings();
		var regNoBox=document.getElementById('reg_number')
		var regButton = document.getElementById('reg');
		var accountBox = document.getElementById('account');
		var passwordBox = document.getElementById('password');
		var passwordConfirmBox = document.getElementById('password_confirm');
		var emailBox = document.getElementById('email');
		var nicknameBox=document.getElementById('nickmame')
		
		regButton.addEventListener('tap',function(){
			var regInfo = {
							account: nicknameBox.value,
							password: passwordBox.value,
							email: emailBox.value
						};
			//注册码正确
			if(isRegisterNo(regNoBox.value)){
				//昵称符合规则
				if(nicknameIsLegal(nicknameBox.value)){
					if(nicknameIsNotRepeat()){
						//邮箱符合格式
						if(isEmail(emailBox.value)){
							//密码长度正确
							if(isPasswordLengthRight(passwordBox.value)){
								//两次输入的密码一致
								if(isPasswordsRight(passwordBox.value,passwordConfirmBox.value)){
									app.reg(regInfo, function(err) {
										if (err) {
											plus.nativeUI.toast(err);
											return;
										}
										plus.nativeUI.toast('注册成功');
										mui.openWindow({
											url: 'login.html',
											id: 'login',
											show: {
												aniShow: 'pop-in'
											}
										});
									});
									//两次输入的密码不一致
								}else{
									plus.nativeUI.toast('两次输入的密码不一致')
									return;
								}
							//密码长度不对
							}else{
								plus.nativeUI.toast('密码长度不对');
								return;
							}
						//邮箱不符合格式	
						}else{
							plus.nativeUI.toast('邮箱不正确');
							return;
						}
					//昵称重复
					}else{
						plus.nativeUI.toast('账号已注册');
						return;
					}
				//昵称不符合规则	
				}else{
					plus.nativeUI.toast('账号不符合规则');
					return;
				}
			//注册码不正确	
			}else{
				plus.nativeUI.toast('注册码不正确');
				return;
			}
		})
	}
)
//获取各输入框内容
function getInput(){
	
}

//判断是不是邮箱
function isEmail(email){
	//邮箱的正则表达式
	var emailRegular=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; 
	return emailRegular.test(email);
}
//判断注册码正确与否
function isRegisterNo(no){
	return true;
}
//判断昵称是否重复
function nicknameIsNotRepeat(nickname){
	return true
}
//判断昵称是否合法
function nicknameIsLegal(nickname){
	if(nickname.length>=5&&nickname.length<=10){
		//中英文开头，中文、字母、数字、下划线组合
		var nicknameRegular = /^[\u4e00-\u9fa5a-zA-Z]+[\u4e00-\u9fa5a-zA-Z0-9\-_]*$/
		return nicknameRegular.test(nickname)
	}else{
		return false
	}
	
}
//判断密码是否一样
function isPasswordsRight(password,passwordConfirm){

	return password==passwordConfirm;
}
//判断密码长度
function isPasswordLengthRight(password){
	return password.length>=6&&password.length<=15
}


