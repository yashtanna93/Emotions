/**
 * Created by RichardMin on 11/14/15.
 */


var fileTimeStamps = [];

canvas = document.getElementById('my_camera');


function takePicture() {
    var context = canvas.getContext('2d');
    canvas.width = 320;
    canvas.height = 240;
    context.drawImage(video,0,0,640,480);
    var data = canvas.toDataURL('image/jpg');
    return data;
}

function imageUpload(idobj, imagenameobj, imagedataobj) {
    console.log("idobj: "+ idobj);
    console.log("imagenameobj: " + imagenameobj);
    console.log("imagedata: " + imagedataobj);
    $.ajax({
        type: 'POST',
        url: 'https://web72.secure-secure.co.uk/yashtanna.tk/hacksc/image.php',
        data: {id: idobj, imagename: imagenameobj, imagedata: imagedataobj}
    }).done(function (data) {
        if(data == "uploaded") {
            var index = fileTimeStamps.push(imagenameobj);
        }
        else
        {
            console.log("failed!");
        }
    }).fail(function (data, index) {
    });
}