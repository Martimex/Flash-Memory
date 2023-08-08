export const checkForLevelModifiers = (othersObj, levelVariables, modifier_name) => {
    // Check if this level uses any Variable based modifiers for the level
    if(othersObj) {
        // othersObject is not equal NULL
        if(othersObj.enableStaticVariables) {
            // otherObject contains required property "enableStaticVariables", which is also set to TRUE
            if(levelVariables) {
                // Level variables are not equal NULL
                if(levelVariables.STATIC) {
                    // Everything is set up correctly - check of a given property is used inside STATIC object
                    if(levelVariables.STATIC.hasOwnProperty(modifier_name)) {
                        // Requested property exists - we can apply modifiers !
                        return true;
                    }
                    // The property might not exist in STATIC OBJECT. Most likely there's other one included in there
                    return false;
                }
                throw new Error(`ERROR: Enabled static variables, but not provided the STATIC keyname to a levelVariables object. Either include the STATIC keyname with some key modifiers or disable static variables directly from othersObj property.`);
            }
            else if(levelVariables === null) {
                throw new Error(`ERROR: Enabled static variables, but it seems like levelVariables are not in use for this level. Try to add at least one property to the STATIC keyname or remove "enableStaticVariables" declaration from othersObj property.`);
            }
        }
    }
    else if(!othersObj && levelVariables) {
        if(levelVariables.STATIC) {
            throw new Error(`ERROR: LevelVariables object contains STATIC keyname, but otherObj is either empty or a special property "enableStaticVariables" within is missing`)
        }
    }
    return false;
}

export const applyLevelModifier = (modifier_name, levelVariables) => {
    switch(modifier_name) {
        case 'EXTRATURNS_MODIFIER' : { return levelVariables.STATIC[modifier_name] }
        case 'DOESMATCH_MODIFIER' : { return levelVariables.STATIC[modifier_name] }
        default: { throw new Error(`Modifier ${modifier_name} was not found inside levelVariables property.`)}
    }
}