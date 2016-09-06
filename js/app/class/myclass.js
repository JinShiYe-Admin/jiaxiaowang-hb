mui.init({
	swipeBack: false
});

mui.plusReady((function() {
	mui('.mui-scroll-wrapper').scroll({
		indicators: true //是否显示滚动条
	});
	//第一个列表
	//有荐，精，顶图标
	var html1 = '<a><img class="mui-media-object mui-pull-left" src="../../images/logo.png"><div class="mui-media-body"><span><div class="mui-ellipsis"><font color="red">荐&nbsp;</font><font color="green">&nbsp;精&nbsp;</font><font color="orange">&nbsp;顶&nbsp;</font><font>&nbsp;一二三四五六七八九十一二三四五六七八九十</font></div></span><p><span><div class="mui-ellipsis"><font>莫尚霖</font><font color="blue">V&nbsp;</font><font>09月06日&nbsp;阅100&nbsp;回100</font></div></span></p></div></a>';
	//没有荐，精，顶图标
	var html12 = '<a><img class="mui-media-object mui-pull-left" src="../../images/logo.png"><div class="mui-media-body"><span><div class="mui-ellipsis"><font>&nbsp;一二三四五六七八九十一二三四五六七八九十</font></div></span><p><span><div class="mui-ellipsis"><font>莫尚霖</font><font color="blue">V&nbsp;</font><font>09月06日&nbsp;阅100&nbsp;回100</font></div></span></p></div></a>';

	//第二个列表
	var html2 = '';
	//第三个列表
	var html3 = '<a><div style="position: relative; width: 30%;" class="mui-media-body mui-pull-left"><img src="../../images/shuijiao.jpg" /><p class="focus-text">555张</p></div><div class="mui-media-body" style="padding-left:20px;">一年级上学期</div><div class="mui-media-body" style="padding-left: 20px;"><span style=" position:absolute;bottom:0px;text-align: left;"><p>李宽<font color="blue">V</font></p><p>09月05日&nbsp;100阅&nbsp;100回</p></span></div></a>';
	//第四个列表
	var html4 = '';
	var item1 = document.getElementById('scroll1');
	var item2 = document.getElementById('item2mobile');
	var item3 = document.getElementById('scroll3');
	var item4 = document.getElementById('item4mobile');

	//生成第一个列表的数据
	for(var i = 0; i < 5; i++) {
		var li = document.createElement('li');
		li.className = 'mui-table-view-cell mui-media';
		li.innerHTML = html1;
		item1.appendChild(li);
	}
	for(var i = 0; i < 5; i++) {
		var li2 = document.createElement('li');
		li2.className = 'mui-table-view-cell mui-media';
		li2.innerHTML = html12;
		item1.appendChild(li2);
	}

	//生成第三个列表的数据
	for(var i = 0; i < 10; i++) {
		var li = document.createElement('li');
		li.className = 'mui-card mui-table-view-cell ';
		li.innerHTML = html3;
		item3.appendChild(li);
	}
	//监听切换列表
	document.getElementById('slider').addEventListener('slide', function(e) {
		if(e.detail.slideNumber === 0) {
			console.log("0", "0");
		} else if(e.detail.slideNumber === 1) {
			console.log("1", "1");
		} else if(e.detail.slideNumber === 2) {
			console.log("2", "2");
		} else if(e.detail.slideNumber === 3) {
			console.log("3", "3");
		}
	});
}));