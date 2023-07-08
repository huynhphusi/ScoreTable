<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bảng điểm</title>
    <script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.13.5/css/jquery.dataTables.css">
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.js"></script>
    <link rel="stylesheet" href="style.css" type="text/css">
</head>
<body>
    <table id=ScoreList>
        <thead>
            <th>STT</th>
            <th>Họ và tên</th>
            <th>Lớp</th>
            <th>Điểm 1.1</th>
            <th>Điểm 1.2</th>
            <th>Điểm 1.3</th>
            <th>Điểm 1.4</th>
            <th>Điểm 1.5</th>
            <th>Điểm 1.6</th>
            <th>GHK 1</th>
            <th>CHK 1</th>
            <th>TB 1</th>
        </thead>
        <tbody>
        <?
        $json_data = file_get_contents("data.json");
        if(!$json_data){
            for($i=1;$i<=200;$i++){
                echo "
                <tr>
                    <td>".$i."</td>
                    <td class='item_editable item".$i."_fullname' contenteditable='true' id='".$i."-1' ref=".$i."></td>
                    <td class='item_editable item".$i."_classname' contenteditable='true' id='".$i."-2' ref=".$i."></td>
                    <td class='item_editable item".$i."_score1a' contenteditable='true' id='".$i."-3' ref=".$i."></td>
                    <td class='item_editable item".$i."_score1b' contenteditable='true' id='".$i."-4' ref=".$i."></td>
                    <td class='item_editable item".$i."_score1c' contenteditable='true' id='".$i."-5' ref=".$i."></td>
                    <td class='item_editable item".$i."_score1d' contenteditable='true' id='".$i."-6' ref=".$i."></td>
                    <td class='item_editable item".$i."_score1e' contenteditable='true' id='".$i."-7' ref=".$i."></td>
                    <td class='item_editable item".$i."_score1f' contenteditable='true' id='".$i."-8' ref=".$i."></td>
                    <td class='item_editable item".$i."_score2' contenteditable='true' id='".$i."-9' ref=".$i."></td>
                    <td class='item_editable item".$i."_score3' contenteditable='true' id='".$i."-10' ref=".$i."></td>
                    <td class='item_editable item".$i."_score4' ref=".$i."></td>
                </tr>";
            }
        }
        $student_list = json_decode($json_data,true);
        if(count($student_list)!=0){
            foreach($student_list as $student){
                echo "
        <tr>
            <td>".$student['stt']."</td>
            <td class='item_editable item".$student['stt']."_fullname' contenteditable='true' id='".$student['stt']."-1' ref=".$student['stt'].">".trim($student['fullname'])."</td>
            <td class='item_editable item".$student['stt']."_classname' contenteditable='true' id='".$student['stt']."-2' ref=".$student['stt'].">".$student['classname']."</td>
            <td class='item_editable item".$student['stt']."_score1a' contenteditable='true' id='".$student['stt']."-3' ref=".$student['stt'].">".$student['score1a']."</td>
            <td class='item_editable item".$student['stt']."_score1b' contenteditable='true' id='".$student['stt']."-4' ref=".$student['stt'].">".$student['score1b']."</td>
            <td class='item_editable item".$student['stt']."_score1c' contenteditable='true' id='".$student['stt']."-5' ref=".$student['stt'].">".$student['score1c']."</td>
            <td class='item_editable item".$student['stt']."_score1d' contenteditable='true' id='".$student['stt']."-6' ref=".$student['stt'].">".$student['score1d']."</td>
            <td class='item_editable item".$student['stt']."_score1e' contenteditable='true' id='".$student['stt']."-7' ref=".$student['stt'].">".$student['score1e']."</td>
            <td class='item_editable item".$student['stt']."_score1f' contenteditable='true' id='".$student['stt']."-8' ref=".$student['stt'].">".$student['score1f']."</td>
            <td class='item_editable item".$student['stt']."_score2' contenteditable='true' id='".$student['stt']."-9' ref=".$student['stt'].">".$student['score2']."</td>
            <td class='item_editable item".$student['stt']."_score3' contenteditable='true' id='".$student['stt']."-10' ref=".$student['stt'].">".$student['score3']."</td>
            <td class='item_editable item".$student['stt']."_score4' ref=".$student['stt'].">".$student['score4']."</td>
        </tr>";
            }
        }
        ?>
        </tbody>
    </table>

    <script language=javascript>
        $(document).ready( function () {
            $('#ScoreList').DataTable({
                paging: false
            });
        });
    </script>
    <script src="script.js"></script>
</body>
</html>