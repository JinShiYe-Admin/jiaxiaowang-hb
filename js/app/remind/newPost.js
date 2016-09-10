mui.init({
	swipBack: false
})
mui.plusReady(
	function() {
		var subcategory = document.getElementById("subcategory");

		document.getElementById("category").addEventListener('tap', function() {
			console.log(789);
			mui.openWindow({
				id: "category",
				url: 'category.html'
			});

		})
		window.addEventListener('pageflowrefresh', function(e) {
			console.log(9);
			if(typeof(e.detail.data) !== 'undefined') {
				subcategory.innerText = e.detail.data
			}
			if(typeof(e.detail.subject) !== 'undefined') {
				subcategory.innerText = e.detail.subject
			}

		})
	}
)