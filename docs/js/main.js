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
	// open help panel on unauth screen
	$('.panel-help').on('click', function(event){
		event.preventDefault();
		$('.panel-home-help').addClass('is-visible');
	});
	// close the help panel
	$('.panel-home-help').on('click', function(event){
		if( $(event.target).is('.panel-home-help') || $(event.target).is('.panel-close') ) { 
			$('.panel-home-help').removeClass('is-visible');
			event.preventDefault();
		}
	});
});