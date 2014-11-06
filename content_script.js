//Global variables
var destiations = {};
var targets = {};
var links = [];
var timer;

//Resets the timer and causes populateDestinations() to be called after a delay
function resetDestinations(){
	destinations = {};
	if(timer){
		clearTimeout(timer);
	}
	timer = setTimeout(populateDestinations, 50);
}

//Populates the list of destinations
function populateDestinations(){ 

	//Reset the timer
	if(timer){
		clearTimeout(timer);
	}
	timer = null;
	
	//Reset the list of destinations
	destinations = {
		prev: null,
		next: null,
		up: null,
		top: null
	};
	targets = {
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
				if(links[i].tagName == "A") targets[dest] = links[i];
			}
		}
	}
	
	//Flip the links to now search bottom-up
	links = links.reverse();
	
	//Search for destinations based on link contents
	for(var dest in destinations){
	
		//Skip destinations that have already been matched to an A-link
		if(destinations[dest] && targets[dest]) continue;
	
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
					if(links[i].href && links[i].innerText.replace(/[^a-z]/i, "").trim().match(regexes[r])){
						destinations[dest] = links[i].href;
						targets[dest] = links[i];
						return;
					}
				}
			}
		})();
	
	}

}
	
//Keyboard event handler
function keyListener(e){

	//Assume windows settings by default
	var cmdKey = e.ctrlKey;
	var ignoreKey = e.altKey;
	
	//Detect the shortcut sequence based on OS
	if(navigator.platform.match(/^Mac/)){
		cmdKey = e.altKey;
		ignoreKey = e.ctrlKey;
	}
	
	//Ignore anything with ignored key in it
	if(e.ignoreKey) return;
	
	//Repopulate if we don't yet exist
	if(!destinations) populateDestinations();
	
	var action = null;

	//Key + Left
	if(cmdKey && !e.shiftKey && e.keyCode == 37 && destinations.prev){
		action = "prev";
	}

	//Key + Right
	if(cmdKey && !e.shiftKey && e.keyCode == 39 && destinations.next){
		action = "next";
	}

	//Key + Up
	if(cmdKey && !e.shiftKey && e.keyCode == 38 && destinations.up){
		action = "up";
	}

	//Key + Shift + Up
	if(cmdKey && e.shiftKey && e.keyCode == 38 && destinations.top){
		action = "top";
	}

	//Space (when scrolled to the bottom of the window)
	if(!cmdKey && !e.shiftKey && e.keyCode == 32 && e.srcElement == document.body && destinations.next){
		if(document.body.scrollHeight - document.body.scrollTop - document.body.clientHeight <= 1){
			action = "next";
		}
	}

	//Shift + Space (when scrolled to the top of the window)
	if(!cmdKey && e.shiftKey && e.keyCode == 32 && e.srcElement == document.body && destinations.prev){
		if(!document.body.scrollTop) action = "prev";
	}
	
	if(!action || e.srcElement.tagName == "INPUT" || e.srcElement.tagName == "TEXTAREA") return;
	
	//Navigate or click the link
	if(targets[action]){
		targets[action].click();
	}else{
		window.location = destinations[action];
	}

}

//The key listening event should only be bound to the top window
if (window == top) {
	document.addEventListener('DOMSubtreeModified', resetDestinations);
	window.addEventListener('keydown', keyListener, false);
}

//Initial population
resetDestinations();
