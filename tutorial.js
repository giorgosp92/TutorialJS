var tour = function(video_only) {
	/*
	the json config obj.
	name: the class given to the element where you want the tooltip to appear
	bgcolor: the background color of the tooltip
	color: the color of the tooltip text
	text: the text inside the tooltip
	time: if automatic tour, then this is the time in ms for this step
	position: the position of the tip. Possible values are
	TL	top left
	TR  top right
	BL  bottom left
	BR  bottom right
	LT  left top
	LB  left bottom
	RT  right top
	RB  right bottom
	T   top
	R   right
	B   bottom
	L   left
	*/
	console.log(video_only);
	var config;
	if (video_only){
		config = [
			{
				"name" 		: "overlay-background",
				"selectortp": "class",
				"ishidden"	: true,
				"bgcolor"	: "#fff",
				"color"		: "#333",
				"position"	: "L",
				"text"		: "All colors are customisable to your needs",
				"time" 		: 5000
			},
			{
				"name" 		: "topbanner",
				"selectortp": "id",
				"ishidden"	: false,
				"bgcolor"	: "#fff",
				"color"		: "#333",
				"position"	: "T",
				"text"		: "You can choose your own banner for sponsors or your branding",
				"time" 		: 5000
			},
			{
				"name" 		: "video",
				"selectortp": "id",
				"ishidden"	: false,
				"bgcolor"	: "#fff",
				"color"		: "#333",
				"position"	: "T",
				"text"		: "Video supports all resolutions and ratios (e.t.c widescreen)<br>It uses the HTML5 video technology for cross browser support",
				"time" 		: 5000
			},
			{
				"name" 		: "info-section",
				"selectortp": "id",
				"ishidden"	: false,
				"bgcolor"	: "#fff",
				"color"		: "#333",
				"position"	: "L",
				"text"		: "You can see all the information about the presentation, the speaker, and it's chapters and topics",
				"time" 		: 5000
			}
		];
	} else {
		config = [
			{
				"name" 		: "overlay-background",
				"selectortp": "class",
				"ishidden"	: true,
				"bgcolor"	: "#fff",
				"color"		: "#333",
				"position"	: "L",
				"text"		: "All colors are customisable for your needs",
				"time" 		: 5000
			},
			{
				"name" 		: "topbanner",
				"selectortp": "id",
				"ishidden"	: false,
				"bgcolor"	: "#fff",
				"color"		: "#333",
				"position"	: "T",
				"text"		: "You can choose your own banner for sponsors or your branding",
				"time" 		: 5000
			},
			{
				"name" 		: "video",
				"selectortp": "id",
				"ishidden"	: false,
				"bgcolor"	: "#fff",
				"color"		: "#333",
				"position"	: "T",
				"text"		: "Video supports all resolutions and ratios (e.t.c widescreen)<br>It uses the HTML5 video technology for cross browser support",
				"time" 		: 5000
			},
			{
				"name" 		: "slides",
				"selectortp": "id",
				"ishidden"	: false,
				"bgcolor"	: "#fff",
				"color"		: "#333",
				"position"	: "R",
				"text"		: "The user can clearly see the slides, and enlarge them.<br>The size is also adjustable",
				"time" 		: 5000
			},
			{
				"name" 		: "info-section",
				"selectortp": "id",
				"ishidden"	: false,
				"bgcolor"	: "#fff",
				"color"		: "#333",
				"position"	: "L",
				"text"		: "You can see all the information about the presentation, the speaker, and it's chapters and topics",
				"time" 		: 5000
			},
			{
				"name" 		: "owl-wrapper-outer",
				"selectortp": "class",
				"ishidden"	: false,
				"bgcolor"	: "#fff",
				"color"		: "#333",
				"position"	: "B",
				"text"		: "Carousel with slides. The user can browse through the slides and select a certain topic",
				"time" 		: 5000
			}
		];
	}
	//define if steps should change automatically
	var autoplay	= false;
	//timeout for the step
	var showtime;
	//current step of the tour
	var step		= 0;
	//total number of steps
	var total_steps	= config.length;

	//show the tour controls
	showControls();

	/*
	we can restart or stop the tour,
	and also navigate through the steps
	*/
	$('body').on('click', '#activatetour' ,startTour);
	$('body').on('click', '#canceltour' ,endTour);
	$('body').on('click', '#endtour' ,endTour);
	$('body').on('click', '#restarttour' ,restartTour);
	$('body').on('click', '#nextstep' ,nextStep);
	$('body').on('click', '#prevstep' ,prevStep);

	function startTour(){
		$('#activatetour').remove();
		$('#endtour,#restarttour').show();
		if(!autoplay && total_steps > 1)
			$('#nextstep').show();
		//showOverlay();
		nextStep();
	}

	function nextStep(){
		if(!autoplay){
			if(step > 0)
				$('#prevstep').show();
			else
				$('#prevstep').hide();
			if(step == total_steps-1)
				$('#nextstep').hide();
			else
				$('#nextstep').show();	
		}	
		if(step >= total_steps){
			//if last step then end tour
			endTour();
			return false;
		}
	++step;
	showHighlighter();
	}

	function prevStep(){
		if(!autoplay){
			if(step > 2)
				$('#prevstep').show();
			else
				$('#prevstep').hide();
			if(step == total_steps)
				$('#nextstep').show();
		}		
		if(step <= 1)
			return false;
		--step;
		showHighlighter();
	}

	function endTour(){
		step = 0;
		if(autoplay) clearTimeout(showtime);
		removeTooltip();
		hideControls();
		hideHighlighter();

	}

	function restartTour(){
		step = 0;
		if(autoplay) clearTimeout(showtime);
		nextStep();
	}

	function showHighlighter(){
	//remove current tooltip
	removeTooltip();
	//Elements that are hidden by default and have been displayed, should be changed to hidden again
	if (step > 1 && config[step-2].ishidden){
		if(config[step-2].selectortp == "id")
			$("#"+config[step-2].name).hide();
		else
			$("."+config[step-2].name).hide();
	}
	//go
	var step_config		= config[step-1];
	var type_of_element = step_config.selectortp;
	if (type_of_element == "id"){
		var $elem			= $('#' + step_config.name);
		var myelement 		= document.getElementById(step_config.name);
	}
	else {
		var $elem			= $('.' + step_config.name);
		var myelement 		= document.getElementsByClassName(step_config.name)[0];	
	}

	if(autoplay)
		showtime	= setTimeout(nextStep,step_config.time);
	//check if it is a hidden element
	if (step_config.ishidden)
		$elem.show();

	//highlight element z-index 2004
	element_highlighter(myelement);

	var bgcolor 		= step_config.bgcolor;
	var color	 		= step_config.color;

	var $tooltip		= $('<div>',{
		id			: 'tour_tooltip',
		class 	: 'tooltiptutorial',
		html		: '<p>'+step_config.text+'</p><span class="tooltiptutorial_arrow"></span>'
	}).css({
		'display'			: 'none',
		'background-color'	: bgcolor,
		'color'				: color
	});

	//position the tooltip correctly:

	//the css properties the tooltip should have
	var properties		= {};

	var tip_position 	= step_config.position;

	//append the tooltip but hide it
	$('BODY').prepend($tooltip);

	//get some info of the element
	var e_w				= $elem.outerWidth();
	var e_h				= $elem.outerHeight();
	var e_l				= $elem.offset().left;
	var e_t				= $elem.offset().top;


	switch(tip_position){
		case 'TL'	:
		properties = {
			'left'	: e_l,
			'top'	: e_t + e_h + 'px'
		};
		$tooltip.find('span.tooltiptutorial_arrow').addClass('tooltiptutorial_arrow_TL');
		break;
		case 'TR'	:
		properties = {
			'left'	: e_l + e_w - $tooltip.width() + 'px',
			'top'	: e_t + e_h + 'px'
		};
		$tooltip.find('span.tooltiptutorial_arrow').addClass('tooltiptutorial_arrow_TR');
		break;
		case 'BL'	:
		properties = {
			'left'	: e_l + 'px',
			'top'	: e_t - $tooltip.height() + 'px'
		};
		$tooltip.find('span.tooltiptutorial_arrow').addClass('tooltiptutorial_arrow_BL');
		break;
		case 'BR'	:
		properties = {
			'left'	: e_l + e_w - $tooltip.width() + 'px',
			'top'	: e_t - $tooltip.height() + 'px'
		};
		$tooltip.find('span.tooltiptutorial_arrow').addClass('tooltiptutorial_arrow_BR');
		break;
		case 'LT'	:
		properties = {
			'left'	: e_l + e_w + 'px',
			'top'	: e_t + 'px'
		};
		$tooltip.find('span.tooltiptutorial_arrow').addClass('tooltiptutorial_arrow_LT');
		break;
		case 'LB'	:
		properties = {
			'left'	: e_l + e_w + 'px',
			'top'	: e_t + e_h - $tooltip.height() + 'px'
		};
		$tooltip.find('span.tooltiptutorial_arrow').addClass('tooltiptutorial_arrow_LB');
		break;
		case 'RT'	:
		properties = {
			'left'	: e_l - $tooltip.width() + 'px',
			'top'	: e_t + 'px'
		};
		$tooltip.find('span.tooltiptutorial_arrow').addClass('tooltiptutorial_arrow_RT');
		break;
		case 'RB'	:
		properties = {
			'left'	: e_l - $tooltip.width() + 'px',
			'top'	: e_t + e_h - $tooltip.height() + 'px'
		};
		$tooltip.find('span.tooltiptutorial_arrow').addClass('tooltiptutorial_arrow_RB');
		break;
		case 'T'	:
		properties = {
			'left'	: e_l + e_w/2 - $tooltip.width()/2 + 'px',
			'top'	: e_t + e_h + 'px'
		};
		$tooltip.find('span.tooltiptutorial_arrow').addClass('tooltiptutorial_arrow_T');
		break;
		case 'R'	:
		properties = {
			'left'	: e_l - $tooltip.width() + 'px',
			'top'	: e_t + e_h/2 - $tooltip.height()/2 + 'px'
		};
		$tooltip.find('span.tooltiptutorial_arrow').addClass('tooltiptutorial_arrow_R');
		break;
		case 'B'	:
		properties = {
			'left'	: e_l + e_w/2 - $tooltip.width()/2 + 'px',
			'top'	: e_t - $tooltip.height() + 'px'
		};
		$tooltip.find('span.tooltiptutorial_arrow').addClass('tooltiptutorial_arrow_B');
		break;
		case 'L'	:
		properties = {
			'left'	: e_l + e_w  + 'px',
			'top'	: e_t + e_h/2 - $tooltip.height()/2 + 'px'
		};
		$tooltip.find('span.tooltiptutorial_arrow').addClass('tooltiptutorial_arrow_L');
		break;
	}


	/*
	if the element is not in the viewport
	we scroll to it before displaying the tooltip
	*/
	var w_t	= $(window).scrollTop();
	var w_b = $(window).scrollTop() + $(window).height();
	//get the boundaries of the element + tooltip
	var b_t = parseFloat(properties.top,10);

	if(e_t < b_t)
		b_t = e_t;

	var b_b = parseFloat(properties.top,10) + $tooltip.height();
	if((e_t + e_h) > b_b)
		b_b = e_t + e_h;


	if((b_t < w_t || b_t > w_b) || (b_b < w_t || b_b > w_b)){
		$('html, body').stop()
		.animate({scrollTop: b_t}, 500, 'easeInOutExpo', function(){
	//need to reset the timeout because of the animation delay
	if(autoplay){
		clearTimeout(showtime);
		showtime = setTimeout(nextStep,step_config.time);
	}
	//show the new tooltip
	$tooltip.css(properties).show();
	});
	}
	else
	//show the new tooltip
	$tooltip.css(properties).show();
	}

	function removeTooltip(){
		$('#tour_tooltip').remove();
	}

	function showControls(){
	/*
	we can restart or stop the tour,
	and also navigate through the steps
	*/
	var $tourcontrols  = '<div id="tourcontrols" class="tourcontrols">';
	$tourcontrols += '<p>Click the button below to begin our Features Presentation</p>';
	$tourcontrols += '<span class="btn btn-info" id="activatetour">Begin Presentation</span>';
	if(!autoplay){
		$tourcontrols += '<div class="nav"><span class="btn btn-info" id="prevstep" style="display:none;">< Previous</span>';
		$tourcontrols += '<span class="btn btn-info" id="nextstep" style="display:none;">Next ></span></div>';
	}
	$tourcontrols += '<a id="restarttour" style="display:none;">Restart the tour</span>';
	$tourcontrols += '<a id="endtour" style="display:none;">End the tour</a>';
	$tourcontrols += '<span class="close" id="canceltour"></span>';
	$tourcontrols += '</div>';

	$('BODY').prepend($tourcontrols);
	$('#tourcontrols').animate({'right':'30px'},500);
	}

	function hideControls(){
		$('#tourcontrols').remove();
	}

	function showOverlay(){
		var $overlay	= '<div id="tour_overlay" class="overlay"></div>';
		$('BODY').prepend($overlay);
	}

	function hideOverlay(){
		$('#tour_overlay').remove();
	}


}
function element_highlighter (element) {
    //var element = document.getElementById("video");
    var rect = element.getBoundingClientRect();
    
    $(".overlay-element-top").css('position', 'absolute');
    $(".overlay-element-left").css('position', 'absolute');
    $(".overlay-element-right").css('position', 'absolute');
    $(".overlay-element-bottom").css('position', 'absolute');

    $(".overlay-element-top").css("background", "rgba(0, 0, 0, 0.75)");
    $(".overlay-element-left").css("background", "rgba(0, 0, 0, 0.75)");
    $(".overlay-element-right").css("background", "rgba(0, 0, 0, 0.75)");
    $(".overlay-element-bottom").css("background", "rgba(0, 0, 0, 0.75)");

    $(".overlay-element-top").css("width", "100%");
    $(".overlay-element-top").css("height", rect.top);

    $(".overlay-element-left").css("width", rect.left);
    $(".overlay-element-left").css("height", rect.height);
    $(".overlay-element-left").css("top", rect.top);
    
    $(".overlay-element-right").css("width", $(window).width() - rect.left - rect.width);
    $(".overlay-element-right").css("height", rect.height);
    $(".overlay-element-right").css("right", "0px");
    $(".overlay-element-right").css("top", rect.top);
    
    $(".overlay-element-bottom").css("width", "100%");
    $(".overlay-element-bottom").css("height", $(window).height() - rect.top - rect.height);
    $(".overlay-element-bottom").css("top", rect.top+rect.height);
    
    $(".overlay-element-top").show();
    $(".overlay-element-left").show();
    $(".overlay-element-right").show();
    $(".overlay-element-bottom").show();
}

function hideHighlighter() {
	$(".overlay-element-top").hide();
    $(".overlay-element-left").hide();
    $(".overlay-element-right").hide();
    $(".overlay-element-bottom").hide();
}