$( document ).ready(function(){
	$( ".modalPopupArea" ).load( "templates/playerpopup.html" );
	$('#countdown-clock').countdownClock({date: '2016-08-05'});
	var data;
	var suggestion_array=[];
    	$.ajax({
		url: 'data/data.json', 
		type: 'GET',
		dataType: 'json'
	}).success(function(data1) {
		//data = JSON.parse(data);
		data=data1;
      	$.each(data,function(i, data){
      		suggestion_array.push(data.name);
      	});
      	$( ".search-field" ).autocomplete({
      		source: suggestion_array
    	});

    }).error(function(error) {
        console.log("error in json");
    });
    /*Ajax call and rendering of Player info starts*/
	$('.btn-primary').on('click',function(e){
		var  search_field = $('.search-field').val().toLowerCase();
		$(".right-details, #exampleModalLabel").empty();
		$('.search-field').val("");
		      	$.each(data,function(i,data){
		      		if(data.name.toLowerCase() == search_field){
						$('#exampleModal').modal('show')
		      			$(".player-details img").attr("src", "assets/" + data.image);
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
		      			for(var j=0;j<data.stories.length; j++){
		      				$("<p><a target='_BLANK' href='" + data.stories[j].url + "'>"+ data.stories[j].title+"</a></p>").appendTo(".player_links");
		      			}
		      			if(data.fb != ""){
		      			$(".fb-profile a").attr({"href":data.fb,"target":"_BLANK"}).removeClass("link-disable");
		      			}
		      			else{
		      			 $(".fb-profile a").attr("href","javascript:void(0)").addClass("link-disable");
		      			 }
	      				if(data.twitter != ""){
	      				$(".twitter-profile a").attr({"href":data.twitter,"target":"_BLANK"}).removeClass("link-disable");
	      				}
	      				else {
	      				$(".twitter-profile a").attr("href","javascript:void(0)").addClass("link-disable");
	      				}
	      				if(data.wikilink != ""){
	      				$(".wiki-link a").attr({"href":data.wikilink,"target":"_BLANK"}).removeClass("link-disable");  
	      				}
	      				else{
	      				 $(".wiki-link a").attr("href","javascript:void(0)").addClass("link-disable");
	      				 }
		      		}

		      	});

       	});

	/*Ajax call and rendering of Player info ends*/
	$('.search-field').on('keypress',function(e){
	 	if (e.keyCode === 13) {
	 		$('.btn-primary').trigger('click')
	 	}
	});
})
