/**
 * 我的班级
 */
//声明成员对象
function Member(id, name, nickname, subject, type) {
	this.ID = id; //id
	this.Name = name; //姓名
	this.NickName = nickname; //昵称
	this.Subject = subject; //科目
	this.Type = type; //职务
}

var teachers = new Array();
teachers.push(new Member(0, '郑成枝', '住进时光里', '语文', '教导主任'));
teachers.push(new Member(1, '杨福林', '十年温如初', '数学', '班主任'));
teachers.push(new Member(2, '贾小龙', '今非昔比', '英语', '老师'));
teachers.push(new Member(3, '康根', '花香洇染', '文综', '老师'));
teachers.push(new Member(4, '康永清', '阳光下的少年', '理综', '老师'));

var students = new Array();
students.push(new Member(0, '马祥', '日久见人心', '', '班长'));
students.push(new Member(1, '石利军', '青春的爱恋 ', '', '副班长'));
students.push(new Member(2, '杨万富', '女王(Queen)ゆ性', '', '学习委员'));
students.push(new Member(3, '辛文斌', '爱情有保质期', '', '生活委员'));
students.push(new Member(4, '石建军', '煙消雲散只為成全* ', '', '语文科代表'));
students.push(new Member(5, '王二兵', '酌酒一杯赐你饮下', '', '数学课代表'));
students.push(new Member(6, '石正厚', '有妳，很幸福 ', '', '英语课代表'));
students.push(new Member(7, '韩凤英', '樱花树下、那纯美一笑 ', '', '文综课代表'));
students.push(new Member(8, '王二锁', '哇！原来你也是人', '', '理综课代表'));
students.push(new Member(9, '王志宏', '穿越古代', '', ''));
students.push(new Member(10, '刘耀清', '骄傲到自负', '', ''));
students.push(new Member(11, '杜茂仁', '这年头、寂寞 ', '', ''));
students.push(new Member(12, '刘海欢', '时光凉透初时模样', '', ''));
students.push(new Member(13, '康桃花', '这年头、寂寞', '', ''));
students.push(new Member(14, '戴双宝', '乱的很有节奏', '', ''));

mui.init({
	gestureConfig: {
		longtap: true //开启长按监听
	},
	pullRefresh: {
		container: "#refreshContainer", //通过id找到下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等

		//		up: {
		//			contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
		//			contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
		//			callback: pullupRefresh
		//		},
		down: {
			contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
			contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
			contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
			callback: pulldownRefresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		}
	}
});

var index = 0; //当前显示的列表

mui.plusReady((function() {
	showMember(teachers, students); //显示成员列表

	//监听切换列表
	var mslider = document.getElementById('slider');
	mslider.addEventListener('slide', function(e) {
		if(e.detail.slideNumber === 0) { //帖子列表
			index = 0;
		} else if(e.detail.slideNumber === 1) { //作业列表
			index = 1;
		} else if(e.detail.slideNumber === 2) { //相册列表
			index = 2;
		} else if(e.detail.slideNumber === 3) { //成员列表
			index = 3;
		}

	});

	//成员老师列表长按监听
	mui("#scroll4").on('longtap', '.mui-table-view-cell', function() {
		//获取长按的item
		var value = this.getAttribute("value");
		console.log(value);
		var ul4 = document.getElementById("scroll4");
		var btnArray = [{
			title: "科目"
		}, {
			title: "职务"
		}, {
			title: "删除"
		}];
		plus.nativeUI.actionSheet({
			title: "选择修改的选项",
			cancel: "取消",
			buttons: btnArray
		}, function(e) {
			var index = e.index;
			var text = "";
			switch(index) {
				case 0:
					text += "取消";
					break;
				case 1:
					text += "科目";
					changeTeacherSubject(value); //修改老师科目
					break;
				case 2:
					text += "职务";
					changeTeacherType(value); //修改老师职务
					break;
				case 3:
					text += "删除";
					var btnArray2 = ['否', '是'];
					mui.confirm('确认删除？', '提示', btnArray2, function(e) {
						if(e.index == 1) {
							ul4.removeChild(document.getElementById('teacher' + value));
							teachers.splice(value, 1) //删除
							mui.toast('删除成功');
						} else {
							//info.innerText = 'MUI没有得到你的认可，继续加油'
						}
					})
					break;
			}
			console.log("你刚点击了：" + text);
		});
	})

	//成员列表学生长按监听
	mui("#scroll42").on('longtap', '.mui-table-view-cell', function() {
		//获取data
		var value = this.getAttribute("value");
		console.log(value);
		var ul42 = document.getElementById("scroll42");
		var btnArray = [{
			title: "职务"
		}, {
			title: "删除"
		}];
		plus.nativeUI.actionSheet({
			title: "选择修改的选项",
			cancel: "取消",
			buttons: btnArray
		}, function(e) {
			var index = e.index;
			var text = "";
			switch(index) {
				case 0:
					text += "取消";
					break;
				case 1:
					text += "职务";
					changeStudentType(value); //修改学生职务
					break;
				case 2:
					text += "删除";
					var btnArray2 = ['否', '是'];
					mui.confirm('确认删除？', '提示', btnArray2, function(e) {
						if(e.index == 1) {
							ul42.removeChild(document.getElementById('student' + value));
							students.splice(value, 1) //删除
							mui.toast('删除成功');
						} else {
							//info.innerText = 'MUI没有得到你的认可，继续加油'
						}
					})
					break;
			}
			console.log("你刚点击了：" + text);
		});
	})

	//点击成员列表头像
	mui("#item4mobile").on('tap', '.oa-contact-avatar', function() {
		mui.openWindow({
			url: 'personalspace.html',
		})
	});
}));
//四个列表的下拉刷新次数
var num1 = 0,
	num2 = 0,
	num3 = 0;
/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	switch(index) {
		case 0:
			break;
		case 1:
			break;
		case 2:
			break;
		case 3:
			showMember(teachers, students);
			break;
		default:
			break;
	}
	//	var table = changeindex(); //获取id
	//	table.innerHTML = '';
	//	for(var i = 0; i < 5; i++) {
	//		//创建一个li元素
	//		var li = document.createElement('li');
	//		switch(index) {
	//			case 0:
	//				//改变这个li元素的class属性
	//				li.className = 'mui-table-view-cell mui-media';
	//				num1 = num1 + 1;
	//				var htmlRefresh = '<a><img class="mui-media-object mui-pull-left" src="../../images/logo.png"><div class="mui-media-body"><span><div class="mui-ellipsis"><font color="red">荐&nbsp;</font><font color="green">&nbsp;精&nbsp;</font><font color="orange">&nbsp;顶&nbsp;</font>' + '<font color="red">新&nbsp;' + num1 + '</font>' + '<font>&nbsp;一二三四五六七八九十一二三四五六七八九十</font></div></span><p><span><div class="mui-ellipsis"><font>小熊猫</font><font color="blue">V&nbsp;</font><font>09月06日&nbsp;阅100&nbsp;回100</font></div></span></p></div></a>';
	//				break;
	//			case 1:
	//				//改变这个li元素的class属性
	//				li.className = 'mui-table-view-cell';
	//				num2 = num2 + 1;
	//				var htmlRefresh = '第二个选项卡子项-' + '<font color="red">新&nbsp;' + num2 + '</font>';
	//				break;
	//			case 2:
	//				//改变这个li元素的class属性
	//				li.className = 'mui-card mui-table-view-cell';
	//				num3 = num3 + 1;
	//				var htmlRefresh = '<a><div style="position: relative; width: 30%;" class="mui-media-body mui-pull-left"><img src="../../images/shuijiao.jpg" /><p class="focus-text">555张</p></div><div class="mui-media-body" style="padding-left: 20px;">一年级上学期' + '<font color="red">新&nbsp;' + num3 + '</font>' + '</div><div class="mui-media-body" style="padding-left: 20px;"><span style=" position:absolute;bottom:0px;text-align: left;"><p>李宽<font color="blue">V</font></p><p>09月05日&nbsp;100阅&nbsp;100回</p></span></div></a>';
	//				break;
	//			case 3:
	//				//改变这个li元素的class属性
	//				li.className = 'mui-table-view-cell';
	//				num4 = num4 + 1;
	//				var htmlRefresh = '<a><div class="oa-contact-cell mui-table"><div class="oa-contact-avatar mui-table-cell"><img src="../../images/logo.png"></div><div class="oa-contact-content" style="padding-left: 20px;"><div><span> <font size="4">' + teachers[i].Name + '</font><font color="orange">V</font><font>[' + teachers[i].Subject + ']</font><font color="blue">' + teachers[i].Type + '</font>' + '<font color="red">新&nbsp;' + num4 + '</font>' + '</span></div><p class="oa-contact-email mui-h6">' + teachers[i].NickName + '</p></div><div class="mui-table-cell" style="width: 50px;"><img src="../../images/qq.png" /></div></div></a>';
	//				break;
	//			default:
	//				break;
	//
	//		}
	//		//改变这个li元素的html
	//		li.innerHTML = htmlRefresh;
	//		//将li作为table的子节点添加到table中
	//		table.appendChild(li);
	//	}
	//注意，加载完新数据后，必须执行如下代码，注意：若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
	mui('#refreshContainer').pullRefresh().endPulldownToRefresh();

}
//四个列表的上拉次数
var more1 = 0,
	more2 = 0,
	more3 = 0,
	more4 = 0;
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {

	var table = changeindex();
	for(var i = 0; i < 5; i++) {
		//创建一个li元素
		var li = document.createElement('li');
		switch(index) {
			case 0:
				//改变这个li元素的class属性
				li.className = 'mui-table-view-cell mui-media';
				more1 = more1 + 1;
				var htmlmore = '<a><img class="mui-media-object mui-pull-left" src="../../images/logo.png"><div class="mui-media-body"><span><div class="mui-ellipsis"><font color="red">荐&nbsp;</font><font color="green">&nbsp;精&nbsp;</font><font color="orange">&nbsp;顶&nbsp;</font>' + '<font color="red">更多&nbsp;' + more1 + '</font>' + '<font>&nbsp;一二三四五六七八九十一二三四五六七八九十</font></div></span><p><span><div class="mui-ellipsis"><font>小熊猫</font><font color="blue">V&nbsp;</font><font>09月06日&nbsp;阅100&nbsp;回100</font></div></span></p></div></a>';
				break;
			case 1:
				//改变这个li元素的class属性
				li.className = 'mui-table-view-cell';
				more2 = more2 + 1;
				var htmlmore = '第二个选项卡子项-' + '<font color="red">更多&nbsp;' + more2 + '</font>';
				break;
			case 2:
				//改变这个li元素的class属性
				li.className = 'mui-card mui-table-view-cell';
				more3 = more3 + 1;
				var htmlmore = '<a><div style="position: relative; width: 30%;" class="mui-media-body mui-pull-left"><img src="../../images/shuijiao.jpg" /><p class="focus-text">555张</p></div><div class="mui-media-body" style="padding-left: 20px;">一年级上学期' + '<font color="red">更多&nbsp;' + more3 + '</font>' + '</div><div class="mui-media-body" style="padding-left: 20px;"><span style=" position:absolute;bottom:0px;text-align: left;"><p>李宽<font color="blue">V</font></p><p>09月05日&nbsp;100阅&nbsp;100回</p></span></div></a>';
				break;
			case 3:
				//改变这个li元素的class属性
				li.className = 'mui-table-view-cell';
				more4 = more4 + 1;
				var htmlmore = '<a><div class="oa-contact-cell mui-table"><div class="oa-contact-avatar mui-table-cell"><img src="../../images/logo.png"></div><div class="oa-contact-content" style="padding-left: 20px;"><div><span> <font size="4">庞欢</font><font color="orange">V</font><font>[语文]</font>' + '<font color="red">更多&nbsp;' + more4 + '</font>' + '</span></div><p class="oa-contact-email mui-h6">夏天的西瓜</p></div><div class="mui-table-cell" style="width: 50px;"><img src="../../images/qq.png" /></div></div></a>';
				break;
			default:
				break;
		}
		//改变这个li元素的html
		li.innerHTML = htmlmore;
		//将li作为table的子节点添加到table中
		table.appendChild(li);
	}

	//注意：
	//1、加载完新数据后，必须执行如下代码，true表示没有更多数据了：
	//2、若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
	//this.endPullupToRefresh(true|false);
	this.endPullupToRefresh();
}
/**
 * 根据当前显示的列表返回该列表的id
 */
function changeindex() {
	var indexId;
	switch(index) {
		case 0:
			indexId = document.getElementById("scroll1");
			break;
		case 1:
			indexId = document.getElementById("scroll2");
			break;
		case 2:
			indexId = document.getElementById("scroll3");
			break;
		case 3:
			indexId = document.getElementById("scroll4");
			break;
		default:
			break;

	}
	return indexId;
}

var num_teacher = 0,
	num_student = 0;
/**
 * 显示成员列表
 * @param {Object} teachers 老师数组
 * @param {Object} students 学生数组
 */
function showMember(teachers, students) {
	var mTechers = new Array();
	mTechers = teachers;
	var mStudents = new Array();
	mStudents = students;
	var member_teacher = document.getElementById("scroll4"); //班主任列表
	var member_student = document.getElementById("scroll42"); //学生列表
	var member_sum = document.getElementById("numberOfMembers"); //教师和学生总数
	member_sum.innerText = mTechers.length + '位教师 ' + mStudents.length + '位学生';
	//显示班主任列表
	member_teacher.innerHTML = '';
	for(var i = 0; i < teachers.length; i++) {
		num_teacher = num_teacher + 1;
		//创建一个li元素
		var li = document.createElement('li');
		//改变这个li元素的class属性
		li.className = 'mui-table-view-cell';
		var htmlteacher = '<a><div class="oa-contact-cell mui-table"><div class="oa-contact-avatar mui-table-cell"><img src="../../images/logo.png"></div><div class="oa-contact-content" style="padding-left: 20px;"><div><span> <font size="4">' + mTechers[i].Name + '</font><font color="orange">V</font><font>[' + mTechers[i].Subject + ']</font><font color="blue">' + mTechers[i].Type + '</font>' + '<font color="red">新&nbsp;' + num_teacher + '</font>' + '</span></div><p class="oa-contact-email mui-h6">' + mTechers[i].NickName + '</p></div><div class="mui-table-cell" style="width: 50px;"><img src="../../images/qq.png" /></div></div></a>';
		//改变这个li元素的html
		li.innerHTML = htmlteacher;
		//设置id
		li.id = 'teacher' + mTechers[i].ID;
		//设置value
		li.value = mTechers[i].ID;
		//将li作为table的子节点添加到table中
		member_teacher.appendChild(li);
	}
	//显示学生列表
	member_student.innerHTML = '';
	for(var i = 0; i < mStudents.length; i++) {
		num_student = num_student + 1;
		//创建一个li元素
		var li = document.createElement('li');
		//改变这个li元素的class属性
		li.className = 'mui-table-view-cell';
		var htmlstudent = '<a><div class="oa-contact-cell mui-table"><div class="oa-contact-avatar mui-table-cell"><img src="../../images/logo.png"></div><div class="oa-contact-content" style="padding-left: 20px;"><div><span> <font size="4">' + mStudents[i].Name + '</font><font color="blue">V</font><font color="green">' + mStudents[i].Type + '</font>' + '<font color="red">新&nbsp;' + num_student + '</font>' + '</span></div><p class="oa-contact-email mui-h6">' + mStudents[i].NickName + '</p></div><div class="mui-table-cell" style="width: 50px;"><img src="../../images/qq.png" /></div></div></a>';
		//改变这个li元素的html
		li.innerHTML = htmlstudent;
		//设置id
		li.id = 'student' + mStudents[i].ID;
		//设置value
		li.value = mStudents[i].ID;
		//将li作为table的子节点添加到table中
		member_student.appendChild(li);
	}
}

/**
 * 修改老师的科目
 * @param {Object} value 被选中的老师
 */
function changeTeacherSubject(value) {
	var changeValue = value;
	var btnArray = [{
		title: "语文"
	}, {
		title: "数学"
	}, {
		title: "英语"
	}, {
		title: "文综"
	}, {
		title: "理综"
	}, {
		title: "无"
	}];
	plus.nativeUI.actionSheet({
		title: "选择科目",
		cancel: "取消",
		buttons: btnArray
	}, function(e) {
		var index = e.index;
		var text = "";
		switch(index) {
			case 0:
				text += "";
				break;
			case 1:
				text += "语文";
				break;
			case 2:
				text += "数学";
				break;
			case 3:
				text += "英语";
				break;
			case 4:
				text += "文综";
				break;
			case 5:
				text += "理综";
				break;
			case 6:
				text += "";
				break;
		}
		console.log("你刚点击了：" + text);
		teachers[changeValue].Subject = text;
		mui.toast('修改成功');
	});
}
/**
 * 修改老师的职务
 * @param {Object} value
 */
function changeTeacherType(value) {
	var changeValue = value;
	var btnArray = [{
		title: "校长"
	}, {
		title: "教导主任"
	}, {
		title: "班主任"
	}, {
		title: "老师"
	}];
	plus.nativeUI.actionSheet({
		title: "选择职务",
		cancel: "取消",
		buttons: btnArray
	}, function(e) {
		var index = e.index;
		var text = "";
		switch(index) {
			case 0:
				text += "";
				break;
			case 1:
				text += "校长";
				break;
			case 2:
				text += "教导主任";
				break;
			case 3:
				text += "班主任";
				break;
			case 4:
				text += "老师";
				break;
		}
		console.log("你刚点击了：" + text);
		teachers[changeValue].Type = text;
		mui.toast('修改成功');
	});
}

/**
 * 修改学生的职务
 * @param {Object} value
 */
function changeStudentType(value) {
	var changeValue = value;
	var btnArray = [{
		title: "班长"
	}, {
		title: "副班长"
	}, {
		title: "学习委员"
	}, {
		title: "生活委员"
	}, {
		title: "语文科代表"
	}, {
		title: "数学科代表"
	}, {
		title: "英语科代表"
	}, {
		title: "文综科代表"
	}, {
		title: "理综科代表"
	}, {
		title: "无"
	}];
	plus.nativeUI.actionSheet({
		title: "选择职务",
		cancel: "取消",
		buttons: btnArray
	}, function(e) {
		var index = e.index;
		var text = "";
		switch(index) {
			case 0:
				text += "";
				break;
			case 1:
				text += "班长";
				break;
			case 2:
				text += "副班长";
				break;
			case 3:
				text += "学习委员";
				break;
			case 4:
				text += "生活委员";
				break;
			case 5:
				text += "语文科代表";
				break;
			case 6:
				text += "数学科代表";
				break;
			case 7:
				text += "英语科代表";
				break;
			case 8:
				text += "文综科代表";
				break;
			case 9:
				text += "理综科代表";
				break;
			case 10:
				text += "";
				break;
		}
		console.log("你刚点击了：" + text);
		students[changeValue].Type = text;
		mui.toast('修改成功');
	});
}