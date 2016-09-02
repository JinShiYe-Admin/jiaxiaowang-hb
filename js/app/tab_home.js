mui.init({});
var gallery = mui('.mui-slider');
gallery.slider({
	interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
});
mui.plusReady(function() {
	mui(".mui-grid-9").on('tap', 'li', function() {
		var id = this.getAttribute('id');
		console.log("id:" + id);
		var color = document.getElementById(id).style.backgroundColor;
		console.log("color:" + color);
		if(color != 'yellow' ) {
			document.getElementById(id).style.backgroundColor = 'yellow';
		} else {
			document.getElementById(id).style.backgroundColor = '';
		}

	})
});
