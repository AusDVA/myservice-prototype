jQuery(document).ready(function($){
	// open the panel
	$('.panel-btn').on('click', function(event){
		event.preventDefault();
		$('.panel').addClass('is-visible');
		$("#email").focus();
	});
	// close the panel
	$('.panel').on('click', function(event){
		if( $(event.target).is('.panel') || $(event.target).is('.panel-close') ) { 
			$('.panel').removeClass('is-visible');
			event.preventDefault();
		}
	});
});