"use strict";$(document).ready(function(){function e(e){for(var a=window.location.search.substring(1),t=a.split("&"),i=0;i<t.length;i++){var r=t[i].split("=");if(r[0]==e)return r[1]}}$(document.body).height()<$(window).height()&&$("footer").addClass("fixed-footer"),$("header#header").load("https://cdn.rawgit.com/TeamRoarIndiaRio/rio/gh-pages/templates/header.html"),$("footer#footer").load("https://cdn.rawgit.com/TeamRoarIndiaRio/rio/gh-pages/templates/footer.html"),$(".modalPopupArea").load("https://cdn.rawgit.com/TeamRoarIndiaRio/rio/gh-pages/templates/playerpopup.html"),1==sessionStorage.getItem("events_count")&&($("<div class='overlay'><div class='loadpopup'>Click on any player to Read more!</div></div>").appendTo($(".dummy")),setTimeout(function(){$(".overlay").fadeOut(1e3)},1e3));var a=e("event");$("#wrap h2").text(a).css("text-transform","uppercase"),$.ajax({url:"https://cdn.rawgit.com/TeamRoarIndiaRio/rio/gh-pages/data/"+a+"_json.json",type:"GET",dataType:"json"}).success(function(e){function a(a){if($(".specific_event").remove(),$(".eventHeaderName h3").empty(),$(window).width()>=768)$(".eventHeaderName h3").text(a),$('<div class="specific_event"></div>').appendTo(".eventsDisp");else{var i=t.indexOf(a);$(".eventsNav li").eq(i).append('<div class="specific_event"></div>')}$.each(e,function(e,t){for(var e=0;e<t.category.length;e++)if(t.category[e]==a){var i=["<div class='col-lg-5 col-md-5 col-sm-5 col-xs-5'>","<div class='playerImage-wrap col-lg-5 col-md-5 col-sm-5'>","<img class = 'playerImage' alt='"+t.name+"' src='https://cdn.rawgit.com/TeamRoarIndiaRio/rio/gh-pages/assets/"+t.image+"' title='"+t.name+"'>","</div>","<div class='playerDetails col-lg-5 col-md-5 col-sm-5'>","<p><a href='javascript:void(0);'>"+t.name+"</a></p>","<p>"+t.dob+"</p>","<p>"+t.place+"</p>","</div>","</div>"].join("");$(i).appendTo(".specific_event")}})}var t=[];$.each(e,function(e,a){for(var e=0;e<a.category.length;e++)t.indexOf(a.category[e])<0&&(t.push(a.category[e]),$("<li class='clearfix eventInNav'><a class='eventName' href='javascript:void(0)'>"+a.category[e]+"</a><span class='arr-icon-black pull-right'></span></li>").appendTo(".eventsNav"))}),$(".eventsNav li:nth-child(1)").addClass("active"),a(t[0]),$(window).resize(function(){a($("li.eventInNav.active .eventName").text())}),$(document).on("click",".playerImage",function(e){$(this).parents(".playerImage-wrap").siblings(".playerDetails").children("p").children("a").trigger("click")}),$(document).on("click",".playerDetails p a",function(a){$(".right-details, #exampleModalLabel").empty(),$.each(e,function(e,t){if(t.name.toLowerCase()==a.target.innerHTML.toLowerCase()){$("#exampleModal").modal("show"),$(".player-details img").attr("src","https://cdn.rawgit.com/TeamRoarIndiaRio/rio/gh-pages/assets/"+t.image),""!=t.fb?$(".fb-profile a").attr({href:t.fb,target:"_BLANK"}).removeClass("link-disable"):$(".fb-profile a").attr("href","javascript:void(0)").addClass("link-disable"),""!=t.twitter?$(".twitter-profile a").attr({href:t.twitter,target:"_BLANK"}).removeClass("link-disable"):$(".twitter-profile a").attr("href","javascript:void(0)").addClass("link-disable"),""!=t.wikilink?$(".wiki-link a").attr({href:t.wikilink,target:"_BLANK"}).removeClass("link-disable"):$(".wiki-link a").attr("href","javascript:void(0)").addClass("link-disable"),$("#exampleModalLabel").html(t.name),$("<p>"+t.name+"</p>").appendTo(".player_name"),$("<p>"+t.dob+"</p>").appendTo(".player_dob"),$("<p>"+t.place+"</p>").appendTo(".player_place");for(var i=0;i<t.category.length;i++)$("<p>"+t.category[i]+"</p>").appendTo(".player_category");for(var i=0;i<t.achievements.length;i++)$("<p>"+t.achievements[i]+"</p>").appendTo(".player_achievements");$(".fb-profile img").attr("src","https://cdn.rawgit.com/TeamRoarIndiaRio/rio/gh-pages/assets/images/facebook.png"),$(".twitter-profile img").attr("src","https://cdn.rawgit.com/TeamRoarIndiaRio/rio/gh-pages/assets/images/twitter.png"),$(".wiki-link img").attr("src","https://cdn.rawgit.com/TeamRoarIndiaRio/rio/gh-pages/assets/images/wiki.png");for(var i=0;i<t.stories.length;i++)$("<p><a target='_BLANK' href='"+t.stories[i].url+"'>"+t.stories[i].title+"</a></p>").appendTo(".player_links")}})}),$(document).on("click",".eventsNav li",function(e){$(".eventsNav li").removeClass("active"),$(this).addClass("active"),a($(this).children("a").text())})}).error(function(e){console.log("error in json")})});