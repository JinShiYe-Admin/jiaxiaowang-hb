mui.init({
	swipeBack: false
});

mui.plusReady(function() {
mui(".mui-table-view").on('tap','.mui-table-view-cell',function(){
  //获取id
  var id = this.getAttribute("id");
  console.log("1");
  switch (id)
{
//case "up1":
//	mui.openWindow({
//  id:"newPost",
//  url:'html/remind/newPost.html'
//});
//break;
//case "up2":
//	mui.openWindow({
//  id:"newPost",
//  url:'html/remind/upImage.html'
//});
//break;
case "my_job":
console.log("2");
////把子页的路径写在数组里面
//var subpages = ['tab_home.html', 'tab_class.html', 'tab_application.html', 'tab_me.html'];
//	//显示目标选项卡
//	plus.webview.show(subpages[1]);
//	//隐藏当前选项卡
//	plus.webview.hide(subpages[0]);

  break;
case "campus_notice":
	mui.openWindow({
		id:'touPiao',
		url:'html/remind/campusNotice.html',
						show: {
								aniShow: 'pop-in'
							}
		});
  break;
case "class_post":
	mui.openWindow({
    id:"classPost",
    url:'html/remind/classPost.html'
  });
  break;
case "xiaoBo":
	mui.openWindow({
    id:"xiaoBo",
    url:'html/application/xiaoBo.html'
  });
  break;
case "sunshine_sports":
	mui.openWindow({
    id:"sunSports",
    url:'html/remind/sunSports.html'
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

