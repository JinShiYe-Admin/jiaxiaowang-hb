mui.init({
	swipBack:false,
});

	var clickCell = function (mId) {
		document.getElementById(mId).addEventListener('tap',function () {
		        mui.openWindow({
		        		url:('html/mine/'+mId+'.html'),
		        		id:mId,
		        		show:{
		        			aniShow:'slide-in-right'
		        		}
		        })
		})
	}
