document.querySelectorAll('[contenteditable]').forEach((item) => {
    item.addEventListener('paste', (e) => {
        //var item_address = e.target.id.split("-");
        //if (item_address[1] == 1) {
        e.preventDefault();
        var text_list = (e.originalEvent || e).clipboardData.getData('text');
        window.document.execCommand('insertText', false, text_list.trim());
        /*
        var text_list = (e.originalEvent || e).clipboardData.getData('text/plain');
        text_list = text_list.split(String.fromCharCode(13));
        for(i=0;i<text_list.length;i++){
            if(text_list[i]){
                window.document.execCommand('insertText', false, text_list[i]);
            }
        }
        */
        //}
    });
});

$(document).on('keydown', '.item_editable', function (e) {
    var item_address = $(this).attr('id').split('-');

    if (e.keyCode == '9') {
        //Tab key -> Enter key
        //if(item_address>1 || $("#"+(parseInt(item_address[0])+1)+"-"+item_address[1]).length){
        if (item_address[1] > 1 || $("#" + (parseInt(item_address[0]) + 1) + "-" + item_address[1]).length) {
            $(this).trigger(
                jQuery.Event('keypress', { keyCode: 13 })
            );
        }
    }

    //Get position of cursor in text
    var sel = document.getSelection();
    sel.modify("extend", "backward", "paragraphboundary");
    var pos = sel.toString().length;
    if (sel.anchorNode != undefined) sel.collapseToEnd();

    if (e.keyCode == '37' && pos == 0) {
        //Left arrow
        if (item_address[1] > 1) {
            $("#" + item_address[0] + "-" + (parseInt(item_address[1]) - 1)).focus();
        }
    }
    if (e.keyCode == '38') {
        //Up arrow
        if (item_address[0] > 1) {
            $("#" + (item_address[0] - 1) + "-" + item_address[1]).focus();
        }
    }
    if (e.keyCode == '39' && pos == $(this).html().length) {
        //Right arrow
        if (item_address[1] < 10) {
            //alert("#"+item_address[0]+"-"+(parseInt(item_address[1])+1));
            $("#" + item_address[0] + "-" + (parseInt(item_address[1]) + 1)).focus();
        }
    }
    if (e.keyCode == '40') {
        //Down arrow
        if ($("#" + (parseInt(item_address[0]) + 1) + "-" + item_address[1]).length) {
            $("#" + (parseInt(item_address[0]) + 1) + "-" + item_address[1]).focus();
        }
    }
});

$(document).on('keypress', '.item_editable', function (e) {
    var item_id = $(this).attr('ref');
    var item_class = $(this).attr('class');
    var item_address = $(this).attr('id').split('-');

    var item_fullname = $(".item" + item_id + "_fullname").html();
    var item_classname = $(".item" + item_id + "_classname").html();
    var item_score1a = $(".item" + item_id + "_score1a").html();
    var item_score1b = $(".item" + item_id + "_score1b").html();
    var item_score1c = $(".item" + item_id + "_score1c").html();
    var item_score1d = $(".item" + item_id + "_score1d").html();
    var item_score1e = $(".item" + item_id + "_score1e").html();
    var item_score1f = $(".item" + item_id + "_score1f").html();
    var item_score2 = $(".item" + item_id + "_score2").html();
    var item_score3 = $(".item" + item_id + "_score3").html();
    var item_score4 = $(".item" + item_id + "_score4").html();
    var item_score_legal = 1;
    var item_score_list = [];
    var item_score_count = 0;
    var item_score_sum = 0;

    if (e.keyCode == '13') {
        if (item_class == 'item_editable item' + item_id + '_fullname' || item_class == 'item_editable item' + item_id + '_classname') {
            if (item_fullname && item_class != 'item_editable item' + item_id + '_classname' && !$("#" + (parseInt(item_address[0]) + 1) + "-" + item_address[1]).length) {
                var newRowid = parseInt(item_address[0]) + 1;
                var newRow = "\
        <tr>\
            <td>"+ newRowid + "</td>\
            <td class='item_editable item"+ newRowid + "_fullname' contenteditable='true' id='" + newRowid + "-1' ref=" + newRowid + "></td>\
            <td class='item_editable item"+ newRowid + "_classname' contenteditable='true' id='" + newRowid + "-2' ref=" + newRowid + "></td>\
            <td class='item_editable item"+ newRowid + "_score1a' contenteditable='true' id='" + newRowid + "-3' ref=" + newRowid + "></td>\
            <td class='item_editable item"+ newRowid + "_score1b' contenteditable='true' id='" + newRowid + "-4' ref=" + newRowid + "></td>\
            <td class='item_editable item"+ newRowid + "_score1c' contenteditable='true' id='" + newRowid + "-5' ref=" + newRowid + "></td>\
            <td class='item_editable item"+ newRowid + "_score1d' contenteditable='true' id='" + newRowid + "-6' ref=" + newRowid + "></td>\
            <td class='item_editable item"+ newRowid + "_score1e' contenteditable='true' id='" + newRowid + "-7' ref=" + newRowid + "></td>\
            <td class='item_editable item"+ newRowid + "_score1f' contenteditable='true' id='" + newRowid + "-8' ref=" + newRowid + "></td>\
            <td class='item_editable item"+ newRowid + "_score2' contenteditable='true' id='" + newRowid + "-9' ref=" + newRowid + "></td>\
            <td class='item_editable item"+ newRowid + "_score3' contenteditable='true' id='" + newRowid + "-10' ref=" + newRowid + "></td>\
            <td class='item_editable item"+ newRowid + "_score4' ref=" + newRowid + "></td>\
        </tr>";
                $("#ScoreList").find('tbody').append(newRow);
                $("#" + newRowid + "-" + item_address[1]).focus();
            }
        }else{
            if (!isNaN(item_score1a) && item_score1a >= 0 && item_score1a <= 10) {
                item_score_list[0] = item_score1a;
            } else {
                alert('illegal!');
                item_score_legal = 0;
            }
            if (!isNaN(item_score1b) && item_score1b >= 0 && item_score1b <= 10) {
                item_score_list[1] = item_score1b;
            } else {
                alert('illegal!');
                item_score_legal = 0;
            }
            if (!isNaN(item_score1c) && item_score1c >= 0 && item_score1c <= 10) {
                item_score_list[2] = item_score1c;
            } else {
                alert('illegal!');
                item_score_legal = 0;
            }
            if (!isNaN(item_score1d) && item_score1d >= 0 && item_score1d <= 10) {
                item_score_list[3] = item_score1d;
            } else {
                alert('illegal!');
                item_score_legal = 0;
            }
            if (!isNaN(item_score1e) && item_score1e >= 0 && item_score1e <= 10) {
                item_score_list[4] = item_score1e;
            } else {
                alert('illegal!');
                item_score_legal = 0;
            }
            if (!isNaN(item_score1f) && item_score1f >= 0 && item_score1f <= 10) {
                item_score_list[5] = item_score1f;
            } else {
                alert('illegal!');
                item_score_legal = 0;
            }
            if (!isNaN(item_score2) && item_score2 >= 0 && item_score2 <= 10) {
                item_score_list[6] = item_score2;
                item_score_list[7] = item_score2;
            } else {
                alert('illegal!');
                item_score_legal = 0;
            }
            if (!isNaN(item_score3) && item_score3 >= 0 && item_score3 <= 10) {
                item_score_list[8] = item_score3;
                item_score_list[9] = item_score3;
                item_score_list[10] = item_score3;
            } else {
                alert('illegal!');
                item_score_legal = 0;
            }
            if (item_score_legal == 0) {
                item_score4 = "";
                $(".item" + item_id + "_score4").html(item_score4);
            }
            if (item_score3 && item_score_legal == 1) {
                item_score_count = item_score_list.length;
                for (i = 0; i < item_score_list.length; i++) {
                    if (item_score_list[i].length > 0) {
                        item_score_sum = item_score_sum + parseFloat(item_score_list[i]);
                    } else {
                        item_score_count--;
                    }
                }
                item_score4 = parseFloat(item_score_sum / item_score_count).toFixed(1);
                $(".item" + item_id + "_score4").html(item_score4);
            }
        }

        var lastSTT = $(".item_editable:last").attr("ref");
        var score_list_json = "[";
        var stt = 0;
        for (j = 1; j <= lastSTT; j++) {
            item_fullname = $(".item" + j + "_fullname").html();
            item_classname = $(".item" + j + "_classname").html();
            item_score1a = $(".item" + j + "_score1a").html();
            item_score1b = $(".item" + j + "_score1b").html();
            item_score1c = $(".item" + j + "_score1c").html();
            item_score1d = $(".item" + j + "_score1d").html();
            item_score1e = $(".item" + j + "_score1e").html();
            item_score1f = $(".item" + j + "_score1f").html();
            item_score2 = $(".item" + j + "_score2").html();
            item_score3 = $(".item" + j + "_score3").html();
            item_score4 = $(".item" + j + "_score4").html();
            if (item_fullname) {
                stt++;
                if (stt > 1) {
                    score_list_json = score_list_json + ",";
                }
                score_list_json = score_list_json + '{"stt": ' + stt + ', "fullname": "' + item_fullname + '", "classname": "' + item_classname + '", "score1a": "' + item_score1a + '", "score1b": "' + item_score1b + '", "score1c": "' + item_score1c + '", "score1d": "' + item_score1d + '", "score1e": "' + item_score1e + '", "score1f": "' + item_score1f + '", "score2": "' + item_score2 + '", "score3": "' + item_score3 + '", "score4": "' + item_score4 + '"}';
            }
        }
        score_list_json = score_list_json + "]";

        $.ajax({
            type: "POST",
            url: "http://localhost/lab/table/ajax_update.php",
            data: 'data=' + score_list_json,
            cache: false,
            success: function (html_post) {
                //alert(html_post);
            }
        });

        return false;
    }
});