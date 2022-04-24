var isPalindrome = function(x) {
    let output = true;
    const stringX = x.toString();
    const mid = (stringX.length + 1)/2;
    for(let i = 0; i < mid; i++){
        if(stringX[i] !== stringX[mid+i]){
            output = false;
        }
    }
    return output;
};

isPalindrome(-121);