mui.init({
	swipBack:false,
});

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
