function navButtonActive(button) {
    var buttons = document.getElementsByClassName("nav-button");
    
    for (var i = 0; i < buttons.length; i++) {
        if(buttons[i].classList.contains("nav-button-active")) {
            buttons[i].classList.remove("nav-button-active");
        }
    }
    button.classList.add("nav-button-active");

    var element = document.getElementById("header");
    if(!element.classList.contains("header-background")) {
        element.classList.add("header-background");
    }
}

function removeHeaderBackground() {
    var element = document.getElementById("header");
    if(element.classList.contains("header-background")) {
        element.classList.remove("header-background");
    }
}

$(function(){
    $.getJSON("hometour.json", function( data ) {
		generateHomeTour(data);
	});

    function generateHomeTour(data){
		var list = $('#content #tour .row3');
		var theTemplateScript = $("#content #tour .row3 #list-tour").html();
		var theTemplate = Handlebars.compile (theTemplateScript);
		list.append (theTemplate(data));
		list.find('.col').on('click', function (e) {
			e.preventDefault();
			var tourIndex = $(this).data('index');
			window.location.hash = '#hometour/' + tourIndex;
		})
	}

    $.getJSON("homefavorite.json", function( data ) {
		generateHomeFavorite(data);
	});
    
    function generateHomeFavorite(data){
		var list = $('#content #favorite .row3');
		var theTemplateScript = $("#content #favorite .row3 #list-favorite").html();
		var theTemplate = Handlebars.compile (theTemplateScript);
		list.append (theTemplate(data));
		list.find('.col').on('click', function (e) {
			e.preventDefault();
			var tourIndex = $(this).data('index');
			window.location.hash = '#homefavorite/' + tourIndex;
		})
	}
})
