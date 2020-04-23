Session.set("imageLimit", 9);
lastScrollTop = 0;
$(window).scroll(function(event){
	// check if we are near the bottom of the page
	if ($(window).scrollTop() + $(window).height() > $(document).height()-100){
		// Where are we on the page?
		var scrollTop = $(this).scrollTop();
		// test if we are going down
		if (scrollTop > lastScrollTop){
			// yes we scrolling down
			Session.set("imageLimit", Session.get("imageLimit") + 3);
		} //end of if (newScrollTop)
		lastScrollTop = scrollTop;
	}// end of if (height check)
});
