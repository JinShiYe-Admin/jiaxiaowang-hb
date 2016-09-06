mui.init({
	swipeBack: false
});
mui.plusReady(function() {
	var table = document.body.querySelector('.mui-table-view');
	for(var i = 0;i <6; i++) {
		for(var j = 0; j <6; j++) {
			var li = document.createElement('li');
			li.className = 'mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3';
			li.innerHTML = '<img class="mui-media-object mui-pull-left" src="../../images/qq.png"><div class="mui-media-body">' + (i + 1) + '年级' + (j + 1) + '班 </div>';
			table.appendChild(li);
		}
	}
});