//Track the list of destinations
var destiations = {};
var links = [];
var timer;

function resetDestinations(){
	destinations = {};
	if(timer){
		clearTimeout(timer);
	}
	timer = setTimeout(populateDestinations, 1000);
}

//Populates the list of destinations
function populateDestinations(){ 

	//Reset the timer
	timer = null;
	
	//Reset the list of destinations
	destinations = {
		prev: null,
		next: null,
		up: null,
		top: null
	};
	
	//Search through elements in document order
	links = [].concat(
		Array.prototype.slice.call(document.getElementsByTagName("LINK")),
		Array.prototype.slice.call(document.getElementsByTagName("A"))
	);
	
	//Determine the destinations of the rels we care about
	for(var i in links){
		if(!links[i].rel || !links[i].href) continue;
		for(var dest in destinations){
			if(links[i].rel.toLowerCase() == dest){
				destinations[dest] = links[i].href;
			}
		}
	}
	
	//Flip the links to now search bottom-up
	links = links.reverse();
	
	//Search for destinations based on link contents
	for(var dest in destinations){
	
		//Skip destinations that have already been matched
		if(destinations[dest]) continue;
	
		//Track an expression matching array
		var regexes = [];
	
		if(dest == "next"){
			regexes.push(/^next/i);
		}
		if(dest == "prev"){
			regexes.push(/^prev/i);
		}
		if(dest == "up"){
			regexes.push(/^up\b/i);
		}
		if(dest == "top"){
			regexes.push(/^home/i);
		}
	
		//Attempt to match links based on text (first match wins)
		(function(){
			for(var r in regexes){
				for(var i in links){
					if(links[i].href && links[i].innerText.replace(/[^a-z]/i, "").match(regexes[r])){
						destinations[dest] = links[i].href;
						return;
					}
				}
			}
		})();
	
	}

}
	
//Keyboard event handler
function keyListener(e){

	//Ignore anything with alt in it
	if(e.altKey) return;
	
	//Repopulate if we don't yet exist
	if(!destinations) populateDestinations();

	//Ctrl + Left
	if(e.ctrlKey && !e.shiftKey && e.keyCode == 37 && destinations.prev){
		window.location = destinations.prev;
	}

	//Ctrl + Right
	if(e.ctrlKey && !e.shiftKey && e.keyCode == 39 && destinations.next){
		window.location = destinations.next;
	}

	//Ctrl + Up
	if(e.ctrlKey && !e.shiftKey && e.keyCode == 38 && destinations.up){
		window.location = destinations.up;
	}

	//Ctrl + Shift + Up
	if(e.ctrlKey && e.shiftKey && e.keyCode == 38 && destinations.top){
		window.location = destinations.top;
	}

	//Space (when scrolled to the bottom of the window)
	if(!e.ctrlKey && !e.shiftKey && e.keyCode == 32 && e.srcElement == document.body && destinations.next){
		if(document.body.scrollHeight - document.body.scrollTop - document.documentElement.clientHeight <= 0){
			window.location = destinations.next;
		}
	}

	//Shift + Space (when scrolled to the top of the window)
	if(!e.ctrlKey && e.shiftKey && e.keyCode == 32 && e.srcElement == document.body && destinations.prev){
		if(!document.body.scrollTop) window.location = destinations.prev;
	}

}

//The key listening event should only be bound to the top window
if (window == top) {
	document.addEventListener('DOMSubtreeModified', resetDestinations);
	window.addEventListener('keydown', keyListener, false);
}

//Initial population
populateDestinations();