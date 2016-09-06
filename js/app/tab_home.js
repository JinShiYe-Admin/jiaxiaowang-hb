mui.init({
	swipeBack: false
});

mui.plusReady(function() {
mui(".mui-table-view").on('tap','.mui-table-view-cell',function(){
  //获取id
  var id = this.getAttribute("id");
  switch (id)
{
case "my_job0":

//把子页的路径写在数组里面
var subpages = ['tab_home.html', 'tab_class.html', 'tab_application.html', 'tab_me.html'];
	//显示目标选项卡
	plus.webview.show(subpages[1]);
	//隐藏当前选项卡
	plus.webview.hide(subpages[0]);

  break;
case "my_job1":

	mui.openWindow({
    id:id,
    url:'campus_notice.html'
});
  break;
case "my_job2":
	mui.openWindow({
    id:id,
    url:'class_post.html'
  });
  break;
case "my_job3":
	mui.openWindow({
    id:id,
    url:'school_blog.html'
  });
  break;
case "my_job4":
	mui.openWindow({
    id:id,
    url:'sunshine_sports.html'
  });
  break;

}
  


})

	//点击左上角图标，打开帮助；
	document.getElementById('help').addEventListener('tap', function() {
		console.log("help");
		//打开登录页面
		mui.openWindow({
			url: 'help.html',
			id: 'help'
		});
	});
});

