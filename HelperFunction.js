//determineIfCrit(result, luckLevel)
//if luck level == 1 or 2 or 3 or 4
    //if roll == 6 return true
//if luck level == 5
    //if roll == 6 or 5 return true
//return false
function determineIfCrit(luckLevel, roll){
    if (luckLevel == 1 || luckLevel == 2 || luckLevel == 3 || luckLevel == 4){
        return roll == 6;
    }
    if (luckLevel == 5){
        return roll == 6 || roll == 5;
    }
    return false;
}

//determineIfShouldReroll
//if luck level == 2 or 3
    //if roll == 5 return true
//if luck level == 4
    //if roll == 4 or 5 return true
//if luck level == 5
    //if roll == 4 return true
//return false
function determineIfShouldReroll(luckLevel, roll) {
  if (luckLevel == 2 || luckLevel == 3){
      return roll == 5;
  }
  if (luckLevel == 4){
      return roll==4 || roll==5;
  }
  if (luckLevel == 5){
      return roll==4;
  }
  return false;
}