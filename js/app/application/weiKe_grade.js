/**
 * @author an
 * @description 年级选择实现的逻辑
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
	/**
	 * 选择年级 实现的逻辑
	 */
	function(){
		//获取上级页面
		var supPage=plus.webview.currentWebview().opener();
		var list = document.querySelector('#list');
		//加载监听
		list.addEventListener('selected',function(e){
			console.log("当前选中的为："+e.detail.el.innerText+supPage.getURL());
			//向上级页面传送数据
			mui.fire(supPage,'pageRefresh',{
				data:e.detail.el.innerText
			} ); 
			//返回上级页面
			mui.back()
		})

	}
	
)