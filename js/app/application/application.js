/**
 * @author an
 * @description 应用主界面实现的逻辑
 */
mui.init({
	swipBack:false,
});
	//根据Id 的页面跳转
	var jumpTo =function(mId){
		mui.plusReady(
			document.getElementById(mId).addEventListener('tap',function(){
					mui.openWindow({
						id:mId,
						url:('html/application/'+mId+'.html'),
						show: {
								aniShow: 'pop-in'
							}
					});
				})
		)
		
	};
