//                          THIS FILE CONTAINS MISCELENEOUS FUNCTIONALITIES
//                                      Author : Ameeduddin


/*******************************************************
 Function to RETURN FIRST LETTER OF EACH WORD CAPITAL
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   :truck id
 *********************************************************/

function capitalize(str){
    
    var strArr = str.split(" ");
    var newArr = [];
    
    for(var i = 0 ; i < strArr.length ; i++ ){
        
        var FirstLetter = strArr[i].charAt(0).toUpperCase();
        var restOfWord = strArr[i].slice(1);
        
        newArr[i] = FirstLetter + restOfWord;
        
    }
    
    return newArr.join(' ');
    
}