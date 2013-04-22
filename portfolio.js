var lookup = [];
var icons = document.getElementById("icons");
var pad = 28;
var sections = document.getElementById('mySlides').children;


Reveal.initialize({
	controls: true,
	progress: false,
	history: true,
	center: true,
  overview: false,
	theme: 'simpler',
	transition: 'linear',
	loop: 'true',
	transitionSpeed: 'fast',
	rollingLinks: false,
	
	// Optional libraries used to extend on reveal.js
	dependencies: [
		{ src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
		{ src: 'plugin/markdown/showdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
		{ src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
		{ src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
		{ src: 'plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
		{ src: 'plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
	 ]
});


Reveal.addEventListener( 'slidechanged', function( event ) {
  slideTo(event.indexh, event.indexv);
});

 
Reveal.addEventListener( 'ready', function( event ) {
  slideTo(event.indexh, event.indexv);
});


var lastIcon;
var lastPageButton;

function slideTo(x, y) {

  if (lastIcon) {
    lastIcon.className = "icon";
  }
  if (lastPageButton) {
    lastPageButton.className = "";
  }
  var icon = lookup[x];
  icon.className = "color";
  lastIcon = icon;       
  var pageButton = document.getElementById("page_" + x + "_" + y);
  pageButton.className = "selected";
  lastPageButton = pageButton;
  var newX = pad - icon.offsetLeft;
  icons.style.left = newX + "px";
}


window.addEventListener('DOMContentLoaded', function() {
    
    for (var copy = 0; copy < 2; copy++) {
        for (var i = 0; i < sections.length; i++) {
            
            var section = sections[i];
            if (section.tagName != "SECTION") continue;
            
            var div = document.createElement("div");
            div.className = "container";
            var a = document.createElement("a");
            a.className = "icon";
            a.href = "/#/" + section.id;
            var img = document.createElement("img");
            img.src = "img/" + section.id + "_icon.jpg";
            a.appendChild(img);
            div.appendChild(a);
            var pagesDiv = document.createElement("div");
            pagesDiv.className = "pages";
            div.appendChild(pagesDiv);
            var infoDiv = document.createElement("div");
            infoDiv.innerHTML += section.getAttribute("display");
            infoDiv.innerHTML += "<b>" + section.getAttribute("year") + "</b";

            pagesDiv.appendChild(infoDiv);
            var subpages = section.children;
            for (var s = 0; s < subpages.length; s++) {
                var subA = document.createElement("a");
                subA.className = "pageNumber";
                subA.id = "page_" + i + "_" + s;
                subA.href = "/#/" + i + "/" + s;
                subA.innerHTML = (s + 1);
                pagesDiv.appendChild(subA);
            }
            
            icons.appendChild(div);
            
            if (!lookup[i]) lookup[i] = div;
        }
    }
});

   