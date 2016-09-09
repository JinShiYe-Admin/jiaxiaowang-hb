/**
 * 我的班级
 */
mui.init({
	pullRefresh: {
		container: "#content", //通过id找到下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
		up: {
			contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
			contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
			callback: pullupRefresh
		},
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
	//监听切换列表
	var mslider = document.getElementById('slider');
	mslider.addEventListener('slide', function(e) {
		if(e.detail.slideNumber === 0) {//帖子列表
			index = 0;
		} else if(e.detail.slideNumber === 1) {//作业列表
			index = 1;
		} else if(e.detail.slideNumber === 2) {//相册列表
			index = 2;
		} else if(e.detail.slideNumber === 3) {//成员列表
			index = 3;
		}

	});

	//	//第一个列表
	//	//有荐，精，顶图标
	//	var html1 = '<a><img class="mui-media-object mui-pull-left" src="../../images/logo.png"><div class="mui-media-body"><span><div class="mui-ellipsis"><font color="red">荐&nbsp;</font><font color="green">&nbsp;精&nbsp;</font><font color="orange">&nbsp;顶&nbsp;</font><font>&nbsp;一二三四五六七八九十一二三四五六七八九十</font></div></span><p><span><div class="mui-ellipsis"><font>小熊猫</font><font color="blue">V&nbsp;</font><font>09月06日&nbsp;阅100&nbsp;回100</font></div></span></p></div></a>';
	//	//没有荐，精，顶图标
	//	var html12 = '<a><img class="mui-media-object mui-pull-left" src="../../images/logo.png"><div class="mui-media-body"><span><div class="mui-ellipsis"><font>&nbsp;一二三四五六七八九十一二三四五六七八九十</font></div></span><p><span><div class="mui-ellipsis"><font>小熊猫</font><font color="blue">V&nbsp;</font><font>09月06日&nbsp;阅100&nbsp;回100</font></div></span></p></div></a>';
	//
	//	//第二个列表
	//	var html2 = '';
	//
	//	//第三个列表
	//	var html3 = '<a><div style="position: relative; width: 30%;" class="mui-media-body mui-pull-left"><img src="../../images/shuijiao.jpg" /><p class="focus-text">555张</p></div><div class="mui-media-body" style="padding-left:20px;">一年级上学期</div><div class="mui-media-body" style="padding-left: 20px;"><span style=" position:absolute;bottom:0px;text-align: left;"><p>李宽<font color="blue">V</font></p><p>09月05日&nbsp;100阅&nbsp;100回</p></span></div></a>';
	//
	//	//第四个列表
	//	//老师列表
	//	var html4 = '<a><div class="oa-contact-cell mui-table"><div class="oa-contact-avatar mui-table-cell"><img src="../../images/logo.png"></div><div class="oa-contact-content" style="padding-left: 20px;"><div><span> <font size="4">庞欢</font><font color="orange">V</font><font>[语文]</font></span></div><p class="oa-contact-email mui-h6">夏天的西瓜</p></div><div class="mui-table-cell" style="width: 50px;"><img src="../../images/qq.png" /></div></div></a>';
	//	//学生列表
	//	var html42 = '<a><div class="oa-contact-cell mui-table"><div class="oa-contact-avatar mui-table-cell"><img src="../../images/logo.png"></div><div class="oa-contact-content" style="padding-left: 20px;"><div><span> <font size="4">佘翼林</font><font color="blue">V</font></span></div><p class="oa-contact-email mui-h6">舍得</p></div><div class="mui-table-cell" style="width: 50px;"><img src="../../images/qq.png" /></div></div></a>';
	//
	//	var item1 = document.getElementById('scroll1');
	//	var item2 = document.getElementById('item2mobile');
	//	var item3 = document.getElementById('scroll3');
	//	var item4 = document.getElementById('scroll4');
	//	var item42 = document.getElementById('scroll42');
	//
	//	//生成第一个列表的数据
	//	for(var i = 0; i < 5; i++) {
	//		var li = document.createElement('li');
	//		li.className = 'mui-table-view-cell mui-media';
	//		li.innerHTML = html1;
	//		item1.appendChild(li);
	//	}
	//	for(var i = 0; i < 5; i++) {
	//		var li2 = document.createElement('li');
	//		li2.className = 'mui-table-view-cell mui-media';
	//		li2.innerHTML = html12;
	//		item1.appendChild(li2);
	//	}
	//
	//	//生成第三个列表的数据
	//	for(var i = 0; i < 10; i++) {
	//		var li = document.createElement('li');
	//		li.className = 'mui-card mui-table-view-cell ';
	//		li.innerHTML = html3;
	//		item3.appendChild(li);
	//	}
	//
	//	//生成第四个列表的数据
	//
	//	for(var i = 0; i < 10; i++) {
	//		var li = document.createElement('li');
	//		li.className = 'mui-card mui-table-view-cell ';
	//		li.innerHTML = html4;
	//		item4.appendChild(li);
	//	}
	//	for(var i = 0; i < 10; i++) {
	//		var li = document.createElement('li');
	//		li.className = 'mui-card mui-table-view-cell ';
	//		li.innerHTML = html42;
	//		item42.appendChild(li);
	//	}

}));
//四个列表的下拉刷新次数
var num1 = 0,
	num2 = 0,
	num3 = 0,
	num4 = 0;
/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {

	var table = changeindex();//获取id
	table.innerHTML = '';
	for(var i = 0; i < 5; i++) {
		//创建一个li元素
		var li = document.createElement('li');
		switch(index) {
			case 0:
				//改变这个li元素的class属性
				li.className = 'mui-table-view-cell mui-media';
				num1 = num1 + 1;
				var htmlRefresh = '<a><img class="mui-media-object mui-pull-left" src="../../images/logo.png"><div class="mui-media-body"><span><div class="mui-ellipsis"><font color="red">荐&nbsp;</font><font color="green">&nbsp;精&nbsp;</font><font color="orange">&nbsp;顶&nbsp;</font>' + '<font color="red">新&nbsp;' + num1 + '</font>' + '<font>&nbsp;一二三四五六七八九十一二三四五六七八九十</font></div></span><p><span><div class="mui-ellipsis"><font>小熊猫</font><font color="blue">V&nbsp;</font><font>09月06日&nbsp;阅100&nbsp;回100</font></div></span></p></div></a>';
				break;
			case 1:
				//改变这个li元素的class属性
				li.className = 'mui-table-view-cell';
				num2 = num2 + 1;
				var htmlRefresh = '第二个选项卡子项-' + '<font color="red">新&nbsp;' + num2 + '</font>';
				break;
			case 2:
				//改变这个li元素的class属性
				li.className = 'mui-card mui-table-view-cell';
				num3 = num3 + 1;
				var htmlRefresh = '<a><div style="position: relative; width: 30%;" class="mui-media-body mui-pull-left"><img src="../../images/shuijiao.jpg" /><p class="focus-text">555张</p></div><div class="mui-media-body" style="padding-left: 20px;">一年级上学期' + '<font color="red">新&nbsp;' + num3 + '</font>' + '</div><div class="mui-media-body" style="padding-left: 20px;"><span style=" position:absolute;bottom:0px;text-align: left;"><p>李宽<font color="blue">V</font></p><p>09月05日&nbsp;100阅&nbsp;100回</p></span></div></a>';
				break;
			case 3:
				//改变这个li元素的class属性
				li.className = 'mui-table-view-cell';
				num4 = num4 + 1;
				var htmlRefresh = '<a><div class="oa-contact-cell mui-table"><div class="oa-contact-avatar mui-table-cell"><img src="../../images/logo.png"></div><div class="oa-contact-content" style="padding-left: 20px;"><div><span> <font size="4">庞欢</font><font color="orange">V</font><font>[语文]</font>' + '<font color="red">新&nbsp;' + num4 + '</font>' + '</span></div><p class="oa-contact-email mui-h6">夏天的西瓜</p></div><div class="mui-table-cell" style="width: 50px;"><img src="../../images/qq.png" /></div></div></a>';
				break;
			default:
				break;

		}
		//改变这个li元素的html
		li.innerHTML = htmlRefresh;
		//将li作为table的子节点添加到table中
		table.appendChild(li);
	}
	//注意，加载完新数据后，必须执行如下代码，注意：若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
	mui('#content').pullRefresh().endPulldownToRefresh();

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