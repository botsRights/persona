var rollToAttackBasic = rollToAttackBasic || (function() {
    'use strict';
    
    var version = '1.0',
    
        handleInput = function(msg){
            if ('api' === msg.type && msg.content.indexOf("!rollToAttackBasic") !== -1){
				try{
				    let words = msg.content.split(' ');
				    let weaponName, name, damageType, luck, weaponBonus;
                    let agility = Number.MIN_SAFE_INTEGER;
				    let index = words.indexOf("--weaponName");
				    if (index !== -1){
				        weaponName = words[index + 1];
				    } else {
				        sendChat("ERROR", "call to roll to hit does not include weapon name");
				        return;
				    }
				    
				    
				    index = words.indexOf("--damageType");
				    if (index !==-1){
				        damageType = words[index + 1];
				    } else {
				        sendChat("ERROR", "call to roll to hit does not include damage type");
				        return;
				    }
				    
				    index = words.indexOf("--luck");
				    if (index !==-1){
				        luck = words[index + 1];
				    } else {
				        sendChat("ERROR", "call to roll to hit does not include luck");
				        return;
				    }
				    
				    index = words.indexOf("--weaponBonus");
				    if (index !==-1){
				        weaponBonus = words[index + 1];
				    } else {
				        sendChat("ERROR", "call to roll to hit does not include weapon bonus");
				        return;
				    }
				    
				    index = words.indexOf("--name");
				    if (index !==-1){
				        name = words[index + 1];
				    } else {
				        sendChat("ERROR", "call to roll to hit does not include name");
				        return;
				    }
				    
				    index = words.indexOf("--agility");
				    if (damageType.toLowerCase() === "gun" && index !==-1){
				        agility= words[index+1];
				    } else if (damageType.toLowerCase() === "gun" && index === -1){
				        sendChat("ERROR", "call to roll to hit has gun as a damage type and does not include agility")
				    }
				    
				    /*index = words.indexOf("--name");
				    if (index !==1){
				        name = words[index + 1];
				    } else {
				        sendChat("ERROR", "call to roll to hit does not include name");
				        return;
				    }*/
				    
				    rollAttribute(weaponName, name, damageType, luck, weaponBonus);
				} catch (e){
				    sendChat("ERROR", "Error in rolling to hit: " + e.toString());
				}
            }
        },
        
        rollAttribute = function(weaponName, name, damageType, luckLevel, weaponBonus){
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
			sendChat(name, weaponName +' roll: ' + firstRoll + "," + secondRoll + "," + thirdRoll + ":" + isCrit + " luck:" + luckLevel + " damage type:" + damageType + " weaponBonus: " + weaponBonus);
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
    rollToAttackBasic.RegisterEventHandlers();
});

