$(document).ready(function(){$(".modalPopupArea").load("templates/playerpopup.html"),$("#countdown-clock").countdownClock({date:"2016-08-05"});var e,a=[];$.ajax({url:"data/data.json",type:"GET",dataType:"json"}).success(function(t){e=t,$.each(e,function(e,t){a.push(t.name)}),$(".search-field").autocomplete({source:a})}).error(function(e){console.log("error in json")}),$(".btn-primary").on("click",function(a){var t=$(".search-field").val().toLowerCase();$(".right-details, #exampleModalLabel").empty(),$(".search-field").val(""),$.each(e,function(e,a){if(a.name.toLowerCase()==t){$("#exampleModal").modal("show"),$(".player-details img").attr("src","assets/"+a.image),$("#exampleModalLabel").html(a.name),$("<p>"+a.name+"</p>").appendTo(".player_name"),$("<p>"+a.dob+"</p>").appendTo(".player_dob"),$("<p>"+a.place+"</p>").appendTo(".player_place");for(var r=0;r<a.category.length;r++)$("<p>"+a.category[r]+"</p>").appendTo(".player_category");for(var r=0;r<a.achievements.length;r++)$("<p>"+a.achievements[r]+"</p>").appendTo(".player_achievements");for(var r=0;r<a.stories.length;r++)$("<p><a target='_BLANK' href='"+a.stories[r].url+"'>"+a.stories[r].title+"</a></p>").appendTo(".player_links");""!=a.fb?$(".fb-profile a").attr({href:a.fb,target:"_BLANK"}).removeClass("link-disable"):$(".fb-profile a").attr("href","javascript:void(0)").addClass("link-disable"),""!=a.twitter?$(".twitter-profile a").attr({href:a.twitter,target:"_BLANK"}).removeClass("link-disable"):$(".twitter-profile a").attr("href","javascript:void(0)").addClass("link-disable"),""!=a.wikilink?$(".wiki-link a").attr({href:a.wikilink,target:"_BLANK"}).removeClass("link-disable"):$(".wiki-link a").attr("href","javascript:void(0)").addClass("link-disable")}})}),$(".search-field").on("keypress",function(e){13===e.keyCode&&$(".btn-primary").trigger("click")})});