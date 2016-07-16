'use strict'
$(document).ready(function(){
	//load header and footer
	$( "header#header" ).load( "templates/header.html" );
	$( "footer#footer" ).load( "templates/footer.html" );
	$( ".modalPopupArea" ).load( "templates/playerpopup.html" );

	//function to read url params
	function GetURLParameter(sParam) {
	    var sPageURL = window.location.search.substring(1);
	    var sURLVariables = sPageURL.split('&');
	    for (var i = 0; i < sURLVariables.length; i++) 
	    {
	        var sParameterName = sURLVariables[i].split('=');
	        if (sParameterName[0] == sParam) 
	        {
	            return sParameterName[1];
	        }
	    }
	}
	// get the page's event
	var eventSelected = GetURLParameter('event');
	$('#wrap h2').text(eventSelected).css('text-transform','uppercase');
	//load data
	$.ajax({
		url: 'data/' + eventSelected + '_json.json', 
		type: 'GET',
		dataType: 'json'
	}).success(function(data) {
		var catCount = [];
		//create the events list
		$.each(data,function(i,data){
			for(var i = 0; i < data.category.length; i++){
				if(catCount.indexOf(data.category[i]) < 0){
					catCount.push(data.category[i]);
					$("<li class='clearfix eventInNav'><a class='eventName' href='javascript:void(0)'>" + data.category[i] + "</a><span class='arr-icon-black pull-right'></span></li>")
					.appendTo(".eventsNav");
				}
			}
		});
		//set first tab as active
		$(".eventsNav li:nth-child(1)").addClass("active");
		//initial tab load with first tab
		dynaPlayerLoad(catCount[0]);
		//when page resizes
		$( window ).resize(function() {
		  dynaPlayerLoad($('li.eventInNav.active .eventName').text());
		});
		
		//load details for each player
		function dynaPlayerLoad(currentCategory){
			//removing the display area of players
			$('.specific_event').remove();
			//emptying the heading
			$('.eventHeaderName h3').empty();
			if($(window).width() >= 768){
				//desktop view
				$('.eventHeaderName h3').text(currentCategory);
				$('<div class="specific_event"></div>').appendTo('.eventsDisp');
			} else {
				var index = catCount.indexOf(currentCategory);
				$('.eventsNav li').eq(index).append('<div class="specific_event"></div>');
			}
			// $(".specific_event").empty();
			$.each(data, function(i, data){
				for(var i=0; i < data.category.length; i++){
					if(data.category[i] == currentCategory){
						//player display template
						var playerDisplay = [
							"<div class='col-lg-5 col-md-5 col-sm-5 col-xs-5'>",
								"<div class='playerImage-wrap col-lg-5 col-md-5 col-sm-5'>",
									"<img class = 'playerImage' alt='" + data.name + "' src='assets/" + data.image + "' title='" + data.name + "'>",
								"</div>",
								"<div class='playerDetails col-lg-5 col-md-5 col-sm-5'>",
									"<p><a href='javascript:void(0);'>" +data.name+ "</a></p>",
									"<p>" +data.dob+ "</p>",
									"<p>" + data.place+ "</p>",
								"</div>",
							"</div>"
							].join('');
						//appending template to view
						$(playerDisplay)
						.appendTo(".specific_event");
					}
				}
			});
			// var newHeight = ($(document).height() - ($('header').outerHeight(true) + $('.mainDisplayArea h2').outerHeight(true) + $('footer').outerHeight(true)));
			// $('.eventsPageDisplayArea').css('min-height',newHeight);
			// $('.eventsDisp').css('min-height',newHeight);
		}
		$(document).on('click','.playerImage',function(e){
			$(this).parents('.playerImage-wrap').siblings('.playerDetails').children('p').children('a').trigger('click')
		});
		$(document).on('click','.playerDetails p a',function(e){
			$(".right-details, #exampleModalLabel").empty();	   	
		    $.each(data,function(i,data){
	      		if(data.name.toLowerCase() == e.target.innerHTML.toLowerCase()){
					$('#exampleModal').modal('show')
	      			$(".player-details img").attr("src", 'assets/' + data.image);
	      			//sakthi change
	      			if(data.fb != ""){
	      			$(".fb-profile a").attr({"href": data.fb,"target":"_BLANK"}).removeClass("link-disable");
	      			}
	      			else {
	      			$(".fb-profile a").attr("href","javascript:void(0)").addClass("link-disable");
	      			}
					if(data.twitter != ""){
					$(".twitter-profile a").attr({"href": data.twitter,"target":"_BLANK"}).removeClass("link-disable");
					}
					else{
					 $(".twitter-profile a").attr("href","javascript:void(0)").addClass("link-disable");
					 }
					if(data.wikilink != ""){
					$(".wiki-link a").attr({"href":data.wikilink,"target":"_BLANK"}).removeClass("link-disable");
					}
					else {
					$(".wiki-link a").attr("href","javascript:void(0)").addClass("link-disable");
					}
	      			$('#exampleModalLabel').html(data.name)
	      			$("<p>" + data.name + "</p>").appendTo(".player_name");
	      			$("<p>" + data.dob + "</p>").appendTo(".player_dob");
	      			$("<p>" + data.place + "</p>").appendTo(".player_place");
	      			for(var j=0;j<data.category.length; j++){
	      				$("<p>" + data.category[j] + "</p>").appendTo(".player_category");
	      			}
	      			for(var j=0;j<data.achievements.length; j++){
	      				$("<p>" + data.achievements[j] + "</p>").appendTo(".player_achievements");
	      			}
	      			$(".fb-profile img").attr("src","../../assets/images/facebook.png");
	      			$(".twitter-profile img").attr("src","../../assets/images/twitter.png");
	      			$(".wiki-link img").attr("src","../../assets/images/wiki.png");
	      			// $("<p><a href='" + data.wikiLink + "'>Wikipedia Link</a></p>").appendTo(".player_wiki");
	      			// $("<p><a href='" + data.fb + "'>Facebook Link</a></p>").appendTo(".player_fb");
	      			// $("<p><a href='" + data.twitter + "'>Twitter Link</a></p>").appendTo(".player_twitter");

	      			for(var j=0;j<data.stories.length; j++){
	      				$("<p><a target='_BLANK' href='" + data.stories[j].url + "'>"+ data.stories[j].title+"</a></p>").appendTo(".player_links");
	      			}
	      		}
	      	});
       	});
		//players load on event click
		$(document).on('click', '.eventsNav li',function(e){
			$('.eventsNav li').removeClass('active');
			$(this).addClass('active');			
			dynaPlayerLoad($(this).children("a").text());
		}); 
	}).error(function(error) {
		console.log("error in json");
	});
	/*Ajax call and rendering of Player info ends*/	
});
