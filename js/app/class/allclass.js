mui.init({
	swipeBack: false,
	pullRefresh: {
		container: "#allclass", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
		down: {
			contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
			contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
			contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
			callback: pulldownRefresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		}
	}
});
mui.plusReady(function() {
	var table = document.body.querySelector('.mui-table-view');
	for(var i = 0; i < 6; i++) {
		for(var j = 0; j < 6; j++) {
			var li = document.createElement('li');
			li.className = 'mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3';
			li.innerHTML = '<img class="mui-media-object mui-pull-left" src="../../images/qq.png"><div class="mui-media-body">' + (i + 1) + '年级' + (j + 1) + '班 </div>';
			table.appendChild(li);
		}
	}
	document.getElementById("finishedschool").addEventListener('tap',function(e){

	});
});
//刷新数
var num = 0;
/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	setTimeout(function() {
		//下拉刷新
		var table = document.body.querySelector('.mui-table-view');
		table.innerHTML = '';
		for(var i = 0; i < 5; i++) {
			for(var j = 0; j < 6; j++) {
				num = num + 1;
				var htmlRefresh = '<img class="mui-media-object mui-pull-left" src="../../images/qq.png"><div class="mui-media-body">' + (i + 1) + '年级' + (j + 1) + '班 ' + '新' + num + '</div>';
				var li = document.createElement('li');
				li.className = 'mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3';
				li.innerHTML = htmlRefresh;
				//下拉刷新，新纪录插到最前面；
				table.appendChild(li);
			}
		}
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
	}, 500);
}