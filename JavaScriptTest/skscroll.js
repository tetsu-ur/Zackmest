$(function() {
	$(window).scroll(function(){
		var wh = $(window).height();
		var dh = $(document).height();
		var st = $(document).scrollTop();
	 
		if ( dh > wh ){
			$('body').css('backgroundPosition', '0% ' + ~~(-st/(dh-wh)*20000)/100 + '%');
		}
		
		if($(window).height()>600 && device=="pc"){
			under_aki=300;
			if((dh-wh-under_aki)<st){
				$('html,body').animate({ scrollTop: (dh-wh-under_aki)},0, 'linear');
			
			}
		}
	});
} );
