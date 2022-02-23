let $keysArr = $('.key');
let $cursor = $('#yellow-block');
$cursor.css("left", "20px");

let j = 0;
let c = 0;
let start = 0;
let setTimer = false;
let mistake = 0;
let currentSentence = "";
let currentChar = "";

const $gameEnd = $("<div class='row col-lg-12' id='flex'>Would you like to restart?:</div>");
let $yesBtn = $("<button id='yesButton'>YES</button>");
$yesBtn.click(function () {
    j = 0;
    c = 0;
    start = 0;
    setTimer = false;
    mistake = 0;
    currentSentence = "";
    currentChar = "";

    $('#feedback').children('span').removeClass('glyphicon-ok');
    $('#sentence').empty();
    $('#sentence').append("<p>" + sentences[0] + "</p>");
    $('#target-letter').empty();
    $('#target-letter').append(sentences[0][0]);
    $gameEnd.hide();
})

let $noBtn = $("<button id='noButton'>NO</button>");
$noBtn.click(function () {
    $gameEnd.hide();
})

$gameEnd.append($yesBtn);
$gameEnd.append($noBtn);
$('#prompt-container').append($gameEnd);
$gameEnd.hide();

let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
$('#sentence').append("<p>" + sentences[0] + "</p>");
$('#target-letter').append(sentences[0][0]);

$('#feedback').append("<span class='glyphicon'></span>");

$('body').keydown(function (e) {
    if (e.shiftKey === true) {
        $('#keyboard-lower-container').css("display", "none");
        $('#keyboard-upper-container').css("display", "block");
    }
})

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

$('body').keypress(function (e) {
    if (setTimer === false) {
        start = Date.now();
        setTimer = true;
    }

    if (e.shiftKey === true) {
        $('#keyboard-lower-container').css("display", "none");
        $('#keyboard-upper-container').css("display", "block");
    }

    let $currentKey = $("#" + e.charCode);
    $($currentKey).css("background-color", "lightcyan");

    if ($currentKey.text() === $('#target-letter').text()) {
        if ($('#feedback').children('span').hasClass('glyphicon-remove') === true) {
            $('#feedback').children('span').removeClass('glyphicon-remove');
        }
        $('#feedback').children('span').addClass('glyphicon-ok');

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

        console.log(currentSentence);
        $('#target-letter').empty();
        $('#target-letter').append(currentChar);

        let $cursorHere = parseFloat($('#yellow-block').css('left'));
        $('#yellow-block').css('left', ($cursorHere + 17.4) + 'px');

        if (currentSentence === sentences[j]) {
            if (typeof sentences[j + 1] === 'undefined') {
                $('#yellow-block').css('left', '20px');
                let finish = Date.now() - start;
                let score = Math.floor(54 / ((finish / 1000) - 2) * mistake);
                $('#target-letter').empty();
                $('#target-letter').append(score + " wpm");
                $($gameEnd).show();
                return;
            }

            j++;
            $('#sentence').empty();
            $('#sentence').append("<p>" + sentences[j] + "</p>");
            currentSentence = "";
            $('#feedback').children('span').removeClass('glyphicon-ok');

            c = 0;
            currentChar = sentences[j][0];
            $('#target-letter').empty();
            $('#target-letter').append(currentChar);

            $('#yellow-block').css('left', '20px');
        }
    } else {
        if ($('#feedback').children('span').hasClass('glyphicon-ok') === true) {
            $('#feedback').children('span').removeClass('glyphicon-ok');
        }
        $('#feedback').children('span').addClass('glyphicon-remove');
        mistake++;
    }
})