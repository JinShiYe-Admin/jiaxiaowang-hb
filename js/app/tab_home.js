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
	mui.openWindow({
    url:'my_job.html'
  });
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

