const equation = function(player_value, star_requirement, equation_type) {
    let eq = {value: null}
    switch(equation_type) {
        case 'lessThan': { eq.value = (player_value < star_requirement )? true : false;  break; }
        case 'lessEqualThan': { eq.value = (player_value <= star_requirement )? true : false; break; }
        case 'equal': { eq.value = (player_value === star_requirement )? true : false; break; }
        case 'moreEqualThan': { eq.value = (player_value >= star_requirement)? true : false; break; }
        case 'moreThan': { eq.value = (player_value > star_requirement)? true : false; break; }  
        default: {eq.value = false} 
    }

    return eq.value;
}

export {equation};