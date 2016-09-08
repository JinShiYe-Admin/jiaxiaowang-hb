
mui.plusReady(
		var supPage=plus.webview.currentWebview().opener();
		var all_grade=document.getElementById("all_grade");
		var one=document.getElementById("one");
		var two=document.getElementById("two");
		var three=document.getElementById("three");
		var four=document.getElementById("four");
		var five=document.getElementById("five");
		var six=document.getElementById("six");
	function(){
		
		all_grade.addEventListener('tap',function(){
			freshWeiKe("全部年级")
		})
		one.addEventListener('tap',function(){
			freshWeiKe("一年级")
		})
		two.addEventListener("tap",function(){
			freshWeiKe("二年级")
		})
		three.addEventListener('tap',function(){
			freshWeiKe("三年级")
		})
		four.addEventListener('tap',function(){
			freshWeiKe("四年级")
		})
		five.addEventListener('tap',function(){
			freshWeiKe("五年级")
		})
		six.addEventListener('tap',function(){
			freshWeiKe("六年级")
		})
		function freshWeiKe(fag){
		mui.fire(supPage,"pageRefresh",{
			id:fag
		});
		mui.redirect('weiKe','weiKe.html')

	}
	}
	
)