/**
 * 作者：莫尚霖
 * 时间：2016-9-13
 * 描述：显示已毕业班级
 */
mui.init();
mui.plusReady(function() {
	//通过id找到元素
	var table = document.getElementById("allclass");
	for(var i = 2030; i > 2007; i--) {
		for(var j = 0; j < 6; j++) {
			//创建一个li元素
			var li = document.createElement('li');
			//改变这个li元素的class属性
			li.className = 'mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3';
			//改变这个li元素的html
			li.innerHTML = '<img class="mui-media-object mui-pull-left" src="../../images/qq.png"><div class="mui-media-body">' + (i) + '级' + (j + 1) + '班 </div>';
			//将li作为table的子节点添加到table中
			table.appendChild(li);
		}
	}
});
