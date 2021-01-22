var rollDamageBasic = rollDamageBasic || (function() {
    'use strict';
    
    var version = '1.0',
    
        handleInput = function(msg){
            if ('api' === msg.type && msg.content.indexOf("!rollDamageBasic") !== -1){
				try{
				    let words = msg.content.split(' ');
				    let weaponName, name, damageType, damageDice, damageBonus, statusEffect, statusEffectType, statusEffectChance;
                    let strength = Number.MIN_SAFE_INTEGER;
				    let index = words.indexOf("--weaponName");
				    if (index !== -1){
				        weaponName = words[index + 1];
				    } else {
				        sendChat("ERROR", "call to damage does not include weapon name");
				        return;
				    }
				    
				    
				    index = words.indexOf("--damageType");
				    if (index !==-1){
				        damageType = words[index + 1];
				    } else {
				        sendChat("ERROR", "call to damage does not include damage type");
				        return;
				    }
				    
				    index = words.indexOf("--damageDice");
				    if (index !==-1){
				        damageDice = words[index + 1];
				    } else {
				        sendChat("ERROR", "call to roll damage does not include damageDice");
				        return;
				    }
				    
				    index = words.indexOf("--damageBonus");
				    if (index !==-1){
				        damageBonus = words[index + 1];
				    } else {
				        sendChat("ERROR", "call to roll damage does not include damage bonus");
				        return;
				    }
				    
				    index = words.indexOf("--name");
				    if (index !==-1){
				        name = words[index + 1];
				    } else {
				        sendChat("ERROR", "call to roll damage does not include name");
				        return;
				    }
				    
				    index = words.indexOf("--strength");
				    if (damageType.toLowerCase() === "melee" && index !==-1){
				        strength = words[index+1];
				    } else if (damageType.toLowerCase() === "melee" && index === -1){
				        sendChat("ERROR", "call to roll damage has melee as a damage type and does not include strength");
				        return;
				    }
				    
				    index = words.indexOf("--statusEffect");
				    if (index !==-1){
				        statusEffect = words[index + 1];
				    } else {
				        sendChat("ERROR", "call to roll damage does not whether or not it has a status effect");
				        return;
				    }
				    
				    index = words.indexOf("--statusEffectType");
				    if (index !==-1){
				        statusEffectType = words[index + 1];
				    } else if (index === -1 && statusEffect==="on"){
				        sendChat("ERROR", "call to roll damage includes a status effect but not the type");
				        return;
				    }
				    
				    index = words.indexOf("--statusEffectChance");
				    if (index !==-1){
				        statusEffectChance = words[index + 1];
				    } else if (index === -1 && statusEffect==="on"){
				        sendChat("ERROR", "call to roll damage includes a status effect but not the chance");
				        return;
				    }
				    
				    rollDamage(weaponName, name, damageType, damageDice, damageBonus, strength);
				} catch (e){
				    sendChat("ERROR", "Error in rolling damage: " + e.toString());
				}
            }
        },
        
        rollDamage = function(weaponName, name, damageType, damageDice, damageBonus, strength){
            // for each function, copy this function and swap myFunctionName for function name, and put any arguments in args.
            // then paste the body of your function into the body of this one.
            sendChat("MonicaDeleteThisYouDumbBitch", weaponName + " " + name + " " + damageType + " " + damageDice + " " + damageBonus + " " +  strength);
            let damageRolls = [];
            let total = 0;
            let i;
            for (i=0; i< damageDice; i++){
                sendChat("MonicaDeleteThisYouDumbBitch", "Roll #" + i);
                let roll = Number(randomInteger(6));
                damageRolls.push(roll);
                total += roll;
            }
            if (damageType.toLowerCase() === "melee"){
                total += Number(strength);
            }
            total += Number(damageBonus);
            let critOrWeakDamage = total * 2;
            let critAndWeakDamage = critOrWeakDamage * 2;
            sendChat(name, "Weapon Name: " + weaponName + " Damage Type: " + damageType + " Total Damage: " + total + " Damage if crit OR weakness: " + 
                critOrWeakDamage + " Damage if crit AND weakness: " + critAndWeakDamage);
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
    rollDamageBasic.RegisterEventHandlers();
});

