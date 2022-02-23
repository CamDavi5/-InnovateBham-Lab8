let $keysArr = $('.key');
let $cursor = $('#yellow-block');
$cursor.css("left", "20px");

//All initialized variables which will be reused
let j = 0;
let c = 0;
let start = 0;
let setTimer = false;
let mistake = 0;
let currentSentence = "";
let currentChar = "";

const $gameEnd = $("<div class='row col-lg-12' id='flex'>Would you like to restart?:</div>");
//The Yes button resets all of the initial variables and fixes the visual elements
let $yesBtn = $("<button id='yesButton'>YES</button>");
$yesBtn.click(function () {
    j = 0;
    c = 0;
    start = 0;
    setTimer = false;
    mistake = 0;
    currentSentence = "";
    currentChar = "";

    $cursor.css("left", "20px");
    $('#feedback').children('span').removeClass('glyphicon-ok');
    $('#sentence').empty();
    $('#sentence').append("<p>" + sentences[0] + "</p>");
    $('#target-letter').empty();
    $('#target-letter').append(sentences[0][0]);
    $gameEnd.hide();
})
//The No button simply hides the gameEnd div
let $noBtn = $("<button id='noButton'>NO</button>");
$noBtn.click(function () {
    $gameEnd.hide();
})

$gameEnd.append($yesBtn);
$gameEnd.append($noBtn);
$('#prompt-container').append($gameEnd);
$gameEnd.hide();

//Set the initial sentence as well as the target letter
let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
$('#sentence').append("<p>" + sentences[0] + "</p>");
$('#target-letter').append(sentences[0][0]);

$('#feedback').append("<span class='glyphicon'></span>");

//Shift function was not properly working in keypress, included here
$('body').keydown(function (e) {
    if (e.shiftKey === true) {
        $('#keyboard-lower-container').css("display", "none");
        $('#keyboard-upper-container').css("display", "block");
    }
})

//Removes the color a key when left AND resets the color of all keys when Shift is left
$('body').keyup(function (e) {
    if (e.shiftKey === false) {
        for (i = 0; i < $keysArr.length; i++) {
            let $currentKey = $keysArr[i];
            $($currentKey).css("background-color", "");
        }
        $('#keyboard-upper-container').css("display", "none");
        $('#keyboard-lower-container').css("display", "block");
    }

    for (i = 0; i < $keysArr.length; i++) {
        if ($keysArr[i].textContent === e.key || $keysArr[i].textContent === "Space") {
            let $currentKey = $keysArr[i];
            $($currentKey).css("background-color", "");
        }
    }
})

//Main focus of the program, where most of the logic is handled
$('body').keypress(function (e) {
    //Timer starts once the first keypress is detected
    if (setTimer === false) {
        start = Date.now();
        setTimer = true;
    }

    let $currentKey = $("#" + e.charCode);
    $($currentKey).css("background-color", "lightcyan");

    //If the current key matches the target letter, continue and mark correct
    if ($currentKey.text() === $('#target-letter').text()) {
        if ($('#feedback').children('span').hasClass('glyphicon-remove') === true) {
            $('#feedback').children('span').removeClass('glyphicon-remove');
        }
        $('#feedback').children('span').addClass('glyphicon-ok');
        
        //Collection of if/else that checks for a Space or valid character
        if ($currentKey.text() === "Space") {
            currentSentence += " ";
        } else {
            currentSentence += $currentKey.text();
        }

        c++;
        if (sentences[j][c] === " ") {
            currentChar = "Space"
        } else {
            currentChar = sentences[j][c];
        }

        $('#target-letter').empty();
        $('#target-letter').append(currentChar);

        //Move cursor to the next letter
        let $cursorHere = parseFloat($cursor.css('left'));
        $cursor.css('left', ($cursorHere + 17.4) + 'px');

        //Once the sentence reaches the end, it will do one of two things 
        if (currentSentence === sentences[j]) {
            //By completing the final sentence the wpm will show and the option to restart will appear
            if (typeof sentences[j+1] === 'undefined') {
                let finishSec = (Date.now() - start) / 1000;
                let finishMin = finishSec/60;
                let score = Math.round(54 / finishMin - 2 * mistake);
                $('#target-letter').empty();
                $('#target-letter').append(score + " wpm");
                $($gameEnd).show();
                return;
            }

            //#sentence is updated with the next sentence
            j++;
            $('#sentence').empty();
            $('#sentence').append("<p>" + sentences[j] + "</p>");
            currentSentence = "";
            $('#feedback').children('span').removeClass('glyphicon-ok');

            //#target-letter is set to the first char of the next sentence
            c = 0;
            currentChar = sentences[j][0];
            $('#target-letter').empty();
            $('#target-letter').append(currentChar);

            $('#yellow-block').css('left', '20px');
        }
    //If the current key does NOT match the target letter, display a mistake and do not continue
    } else {
        if ($('#feedback').children('span').hasClass('glyphicon-ok') === true) {
            $('#feedback').children('span').removeClass('glyphicon-ok');
        }
        $('#feedback').children('span').addClass('glyphicon-remove');
        mistake++;
    }
})