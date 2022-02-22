let $keysArr = $('.key');
let j = 0;
let c = 0;

//console.log($keysArr);
let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
$('#sentence').append("<p>"+sentences[0]+"</p>");
let currentSentence = "";
let currentChar = "";
$('#target-letter').append(sentences[0][0]);

$('body').keydown(function(e) {
    if (e.shiftKey === true) {
        $('#keyboard-lower-container').css("display", "none");
        $('#keyboard-upper-container').css("display", "block");
    }
})

$('body').keyup(function(e) {
    //console.log(e.key);
    if (e.shiftKey === false) {
        for (i=0; i<$keysArr.length; i++) {
            let currentKey = $keysArr[i];
            $(currentKey).css("background-color", "");        
        }
        $('#keyboard-upper-container').css("display", "none");
        $('#keyboard-lower-container').css("display", "block");
    }

    for (i=0; i<$keysArr.length; i++) {
        if ($keysArr[i].textContent === e.key || $keysArr[i].textContent === "Space") {
            let currentKey = $keysArr[i];
            $(currentKey).css("background-color", "");

            
        }
    }
})

$('body').keypress(function(e) {
    console.log(e.charCode);
    if (e.shiftKey === true) {
        $('#keyboard-lower-container').css("display", "none");
        $('#keyboard-upper-container').css("display", "block");
    }
    
    for (i=0; i<$keysArr.length; i++) {
        if ($keysArr[i].id == e.charCode) {
            let currentKey = $keysArr[i];
            $(currentKey).css("background-color", "lightcyan");
            
            if (currentKey.textContent === "Space") {
                currentSentence += " ";
            } else {
                currentSentence += currentKey.textContent;
            }
            
            c++;
            if (sentences[j][c] === " ") {
                currentChar = "Space"
            } else { 
                currentChar = sentences[j][c];
            }

            console.log(currentSentence);
            $('#target-letter').empty();
            $('#target-letter').append(currentChar);
            if (currentSentence === sentences[j]) {
                j++;
                $('#sentence').append("<p>"+sentences[j]+"</p>");
                currentSentence = "";

                c = 0;
                currentChar = sentences[j][0];
                $('#target-letter').empty();
                $('#target-letter').append(currentChar);
            }
            /*Ideas for "sentences" step
            1) Add sentences array, append to div, and create currentSentence = ""
            2) Here in the keyup, append the current char to currentSentence
            3) Have an if statement check if the currentSentence equals sentences[j]
            4) When true, increment j and append the new senetence to the div. Set currentSentence back to "".
            */
        }
    }
})