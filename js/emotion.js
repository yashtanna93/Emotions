/**
 * Created by Yash on 12/31/2015.
 */
var strippedEmotions = [];

function checkEmotions(youtubeID, imagenameobj, arrayindex) {
    var s = "https://web72.secure-secure.co.uk/yashtanna.tk/hacksc/" + youtubeID + "/" + imagenameobj + ".jpg";
    datasend = '{"url":"' + s + '"}';
    console.log(datasend);
    $.ajax({
        url: "https://api.projectoxford.ai/emotion/v1.0/recognize",
        beforeSend: function (xhrObj) {
            // Request headers
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "658ac0b020d24b5d8e99b3eabdc1219e");
        },
        async: false,
        type: "POST",
        // Request body
        data: datasend,

    }).done(function (data, youtubeID, index) {
        strippedEmotions[arrayindex] = data[0].scores;
        strippedEmotions[arrayindex].time = imagenameobj/10;
        console.log(strippedEmotions);
    }).fail(function () {
        console.log("Fail");
    });
}