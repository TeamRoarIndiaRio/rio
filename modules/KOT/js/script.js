$( document ).ready(function(){
	//load header and footer
	$( "header#header" ).load( "../../templates/header.html" );
	$( "footer#footer" ).load( "../../templates/footer.html" );
	$(".kot-member").flip({
		"trigger": "hover"

	});
	// $(".member-pic").click(function(){
	// 	$(this).flip();
	// 	// $(this).find(".member-details").addClass("show");
	// }, function(){
	// 	$(this).flip(false);
	// 	// $(this).find(".member-details").removeClass("show");
	// });
})