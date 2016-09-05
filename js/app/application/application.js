mui.init({
	swipBack:false,
});
mui.plusReady(
	var jumpTo =function(mId){
		document.getElementById(mId).addEventListener('tap',function(){
					mui.openWindow({
						id:mId,
						url:('html/application/'+mId+'.html'),
						show: {
								aniShow: 'pop-in'
							}
					});
				})
	};
)