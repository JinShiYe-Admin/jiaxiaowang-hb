//初始化预加载详情页面
mui.init({
  preloadPages:[{
    id:'weiKe.html',
    url:'weiKe.html'           
  }
  ]
});
mui.plusReady(
	
	function(){
		var supPage=plus.webview.currentWebview().opener();
		var list = document.querySelector('#list');
		list.addEventListener('selected',function(e){
			console.log("当前选中的为："+e.detail.el.innerText+supPage.getURL());
			mui.fire(supPage,'pageRefresh',{
				data:e.detail.el.innerText
			} ); 
			mui.back()
		})

	}
	
)