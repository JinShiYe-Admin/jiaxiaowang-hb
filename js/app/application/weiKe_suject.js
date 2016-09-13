/**
 * @author an
 * @description 科目选择实现的逻辑
 */
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
		//获取上级页面
		var supPage=plus.webview.currentWebview().opener();
		var list = document.querySelector('#list');
		//科目列表加载监听
		list.addEventListener('selected',function(e){
			console.log("当前选中的为："+e.detail.el.innerText+supPage.getURL());
			//向上级页面传递数据
			mui.fire(supPage,'pageRefresh',{
				subject:e.detail.el.innerText
			} ); 
			//返回上级界面
			mui.back()
		})

	}
	
)