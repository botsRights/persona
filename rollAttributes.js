var attributeRolls = attributeRolls || (function() {
    'use strict';
    
    var version = '1.0',
    
        handleInput = function(msg){
            if ('api' === msg.type && msg.content.indexOf("!rollAttribute") !== -1){
				try{
				    let words = msg.content.split(' ');
				    let attribute, name, modifier, luckLevel;
				    
				    let index = words.indexOf("--attribute");
				    if (index !== -1){
				        attribute = words[index + 1)];
				    } else {
				        sendChat("ERROR", "call to roll attribute does not include attribute");
				        return;
				    }
				    
				    index = words.indexOf("--name");
				    if (index !==1){
				        name = words[index + 1];
				    } else {
				        sendChat("ERROR", "call to roll attribute does not include name");
				        return;
				    }
				    
				    index = words.indexOf("--modifier");
				    if (index !==1){
				        modifier = words[index + 1];
				    } else {
				        sendChat("ERROR", "call to roll attribute does not include modifier");
				        return;
				    }
				    
				    index = words.indexOf("--luck");
				    if (index !==1){
				        luck = words[index + 1];
				    } else {
				        sendChat("ERROR", "call to roll attribute does not include luck");
				        return;
				    }
				    
				    rollAttribute(attribute, name, modifier, luck);
				} catch (e){
				    sendChat("ERROR", "Error in rolling attribute: " + e.toString());
				}
            }
        },
        
        rollAttribute = function(attribute, name, modifier, luckLevel){
            // for each function, copy this function and swap myFunctionName for function name, and put any arguments in args.
            // then paste the body of your function into the body of this one.
			let firstRoll = randomInteger(6);
			let secondRoll = Number.MIN_SAFE_INTEGER;
			let thirdRoll = Number.MIN_SAFE_INTEGER;
			let shouldReroll = determineIfShouldReroll(luckLevel, firstRoll);
			let isCrit = determineIfCrit(luckLevel, firstRoll);
			if (shouldReroll){
				shouldReroll = false;
				secondRoll = randomInteger(6);
				isCrit = determineIfCrit(luckLevel, secondRoll);
				shouldReroll = determineIfShouldReroll(luckLevel, secondRoll);
			}
			if (shouldReroll && firstRoll != secondRoll){
				shouldReroll = false;
				thirdRoll = randomInteger(6);
				isCrit = determineIfCrit(luckLevel, thirdRoll);
			}
			sendChat(name, attribute +' roll: ' + firstRoll + "," + secondRoll + "," + thirdRoll + ":" + isCrit + " modifier:" + modifier);
        },
    
    
        registerEventHandlers = function() {
            on('chat:message', handleInput);
            // if you have any other on events, you can enter that here and create a function above, like handleInput, to intercept it.
        };
    
    return {
        RegisterEventHandlers: registerEventHandlers
    };
    
}());

on("ready",function(){
    'use strict';
    attributeRolls.RegisterEventHandlers();
});
