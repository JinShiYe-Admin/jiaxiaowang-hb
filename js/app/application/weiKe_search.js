/**
 * @author an
 * @description 搜索界面实现逻辑
 */
mui.plusReady(
	function(){
		//搜索按钮
		var btn_search=document.getElementById('weiKe_search');
		//搜索按钮加载监听
		btn_search.addEventListener('tap',function(){
			addSearchList();
			
		})
	}
)
/**
 * 加载搜索列表
 */
function addSearchList() {	
		//获取加载对象
		var table = document.body.querySelector('.mui-table-view');
		//移除已有元素
		while(table.hasChildNodes()){
			table.removeChild(table.firstChild)
		}
		var cells = document.body.querySelectorAll('.mui-table-view-cell');
		for (var i = 0, len = randomNumber(1,10); i < len; i++) {
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
//产生随机数
function randomNumber(start, end){
    return Math.floor(Math.random() * (end - start) + start);
}