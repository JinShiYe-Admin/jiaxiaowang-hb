
mui.plusReady(
	
	function(){
		var supPage=plus.webview.getWebviewById("html/application/weiKe.html");
		var list = document.querySelector('.mui-table-view.mui-table-view-radio');
		
		list.addEventListener('selected',function(e){
			mui.fire(supPage,"pageRefresh",{
				id:e.detail.el.innerText
			} )
			mui.redirect('weiKe','html/application/weiKe.html');
		})

	}
	
)