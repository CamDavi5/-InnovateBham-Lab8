let $keysArr = $('.key');
let j = 0;
let c = 0;

//console.log($keysArr);
let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
$('#sentence').append("<p>" + sentences[0] + "</p>");
let currentSentence = "";
let currentChar = "";
$('#target-letter').append(sentences[0][0]);

$('body').keydown(function (e) {
    if (e.shiftKey === true) {
        $('#keyboard-lower-container').css("display", "none");
        $('#keyboard-upper-container').css("display", "block");
    }
})

$('body').keyup(function (e) {
    //console.log(e.key);
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
    //console.log(e.charCode);
    if (e.shiftKey === true) {
        $('#keyboard-lower-container').css("display", "none");
        $('#keyboard-upper-container').css("display", "block");
    }

    let $currentKey = $("#"+e.charCode);
    $($currentKey).css("background-color", "lightcyan");
    console.log($currentKey);

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
    if (currentSentence === sentences[j]) {
        j++;
        $('#sentence').append("<p>" + sentences[j] + "</p>");
        currentSentence = "";

        c = 0;
        currentChar = sentences[j][0];
        $('#target-letter').empty();
        $('#target-letter').append(currentChar);
    }
})