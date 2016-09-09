mui.plusReady(
	function(){
		var btn_search=document.getElementById('weiKe_search');
		btn_search.addEventListener('tap',function(){
			addSearchList();
			
		})
	}
)
function addSearchList() {				
		var table = document.body.querySelector('.mui-table-view');
		var cells = document.body.querySelectorAll('.mui-table-view-cell');
		for (var i = cells.length, len = i + 3; i < len; i++) {
			var li = document.createElement('li');
			li.className = 'mui-table-view-cell mui-media';
			li.innerHTML = '<a href="javascript:;">\
					            <img class="mui-media-object mui-pull-left" src="../../images/cbd.jpg" >\
					            <div class="mui-media-body">\
					                CBD\
					                <p class="mui-ellipsis">烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>\
					            </div> \
				            </a> \
				           <p>人名</p>';
				//新纪录插到最前面；
				table.insertBefore(li, table.firstChild);
		}	
}