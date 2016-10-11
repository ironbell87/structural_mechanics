var target_date = ["2016-09-13T02:00:00", "2016-09-20T02:00:00", "2016-09-27T02:00:00", "2016-09-27T02:00:00", "2016-09-27T02:00:00",
                   "2016-09-28T07:00:00", "2016-10-11T02:00:00", "2016-10-18T02:00:00", "2016-10-18T02:00:00", "2016-10-18T02:00:00",
                   "2016-11-01T02:00:00", "2016-11-08T02:00:00", "2016-12-06T02:00:00", "2016-12-20T02:00:00"];
//because of time difference by +09:00, 11:00 => 02:00
//var target_date = ["2015-09-13T011:00:00", "2015-09-20T11:00:00", "2015-09-27T11:00:00", "2015-10-04T11:00:00", "2015-10-11T11:00:00",
//                   "2015-10-18T11:00:00", "2015-10-25T11:00:00", "2015-11-01T11:00:00", "2015-11-08T11:00:00", "2015-11-15T11:00:00",
//                   "2015-11-22T11:00:00", "2015-11-29T11:00:00", "2015-12-06T11:00:00", "2015-12-20T11:00:00"];

$(document).ready(function ()
{
    show_main_body();

    $('#submit_keyword').click(function ()
    {
        var m_show_hide = $('#main_view').css('display');
        if (m_show_hide == 'none') // if main_view is not shown
        {
            $("#span_keyword").text("며칠만 기다리세요!"); // "Wait a few days!"
        }
        else // m_show_hide == 'block' // if main_view is shown
        {
            var m_show_hide = $('#re_view_quiz').css('display');
            if (m_show_hide == 'none') // if re_view is not shown
            {
                $('#re_view_quiz').show();
                //$("#to_next").text("학습 결과");
                $("#submit_keyword").val("복습 퀴즈 결과");
            }
            else 
            {
                if ($("#submit_keyword").val() == "메인으로 가기")
                {
                    location.href = "../main.html";
                    return false;
                }

                // get score
                var total_num = $(".span_quiz").length;
                var exact_num = get_num_exac_quiz();
                var score = exact_num / total_num * 100;

                // get string
                var respond = "퀴즈 점수는 " + score.toFixed(1) + "점으로 ";
                if (score >= 60)
                {
                    respond = respond + "기준(60.0/100.0) 이상입니다.<br />축하합니다! 이번주 학습을 완료했습니다."
                    if (score == 100)
                    {
                        $("#submit_keyword").val("메인으로 가기");
                    }
                }
                else
                {
                    respond = respond + "기준(60.0/100.0) 이하입니다.<br />아쉽지만, 학습을 다시하고 퀴즈를 다시 푸세요.";
                }
                $("#span_keyword").html(respond);
                //$("#to_next").text(respond);
            }
        }
        return false;
    });

    //$('#submit_keyword').click(function ()
    //{
    //    // get answer
	//	var ans_kw = kw_arr[0];
	//	var title = $(document).find("title").text();
	//	switch (title)
	//	{
	//	    case "Force, moment, and couple":
	//	        break; // i = 0;
	//	    case "Composition and decomposition":
	//	        ans_kw = kw_arr[1]; break;
	//	    case "Equalibrium":
	//	        ans_kw = kw_arr[2]; break;
	//	    case "Support and support reaction":
	//	        ans_kw = kw_arr[3]; break;
	//	    case "Computation of support reaction":
	//	        ans_kw = kw_arr[4]; break;
	//	    case "Computation of support reaction of Gerber beam":
	//	        ans_kw = kw_arr[5]; break;
	//	    case "Joint and joint reaction":
	//	        ans_kw = kw_arr[6]; break;
	//	    case "Member forces":
	//	        ans_kw = kw_arr[7]; break;
	//	    case "Member force diagram":
	//	        ans_kw = kw_arr[8]; break;
	//	    case "Member forces of a beam":
	//	        ans_kw = kw_arr[9]; break;
	//	    case "Member forces of a frame":
	//	        ans_kw = kw_arr[10]; break;
	//	    case "Member forces of a truss":
	//	        ans_kw = kw_arr[11]; break;
	//	    case "Member forces of a cabel and arch":
	//	        ans_kw = kw_arr[12]; break;
	//	    default:
	//	        break;
	//	}

    //    // get input keyword
	//	var inp_kw = $('#inp_kw').val();

    //    // comparison
	//	if (inp_kw == "") // in case of no input
	//	{
	//	    $('#inp_kw').focus();
	//	    $('#span_keyword').text("Enter!");
	//	    return false;
	//	}
	//	//if (inp_kw == ans_kw) { // in case of exact keyword
	//	//    var m_show_hide = $('#main_view').css('display')
	//	//    if (m_show_hide == 'none') {
	//	//        $('#pre_view').hide();
	//	//        $('#main_view').show();
	//	//    }
	//	//    else // m_show_hide == 'block'
	//	//    {
	//	//        $('#main_view').hide();
	//	//        $('#re_view').show();
	//	//        $('#form_proceed').hide();
	//	//    }
	//	//    $('#inp_kw').val("");
	//	//    $('#span_keyword').text(""); // set for next stage
	//	//    return false; // if true is returned to the form, the page will be refreshed or reloaded
	//	//}
	//	//else { // in case of wrong keyword
	//	//    $('#inp_kw').val("");
	//	//    $('#inp_kw').focus();
	//	//    $('#span_keyword').text("Try again!");
	//	//    return false;
	//	//}
	//	if (inp_kw == ans_kw) // in case of exact keyword
	//	{
	//	    $('#main_view').show();
	//	    $('#re_view').show();
	//	    $('#span_keyword').text(""); // set for next stage
	//	    $('#form_proceed').hide();
	//	}
	//	else // in case of wrong keyword
	//	{
	//	    $('#inp_kw').focus();
	//	    $('#span_keyword').text("Try again!");
	//	}
	//	$('#inp_kw').val("");
	//	return false; // if true is returned to the form, the page will be refreshed or reloaded
    //});
});

function show_main_body()
{
    // for admin, always show everything
    // get login id from sesseionStorage
    if (typeof (Storage) != "undefined") {
        if (sessionStorage.login_id == "admin") {
            $('#main_view').show();
            $('#re_view').hide();
            $('#span_keyword').text(""); // set for next stage

            //$("#to_next").text("학습 결과");
            $("#submit_keyword").val("복습 퀴즈 풀이");
            return;
        }
    }

    // set date
    var tgt_date = Date.parse(target_date[get_row_idx()]);
    var cur_date = new Date($.now());

    // after the target date, show main_view
    if (cur_date >= tgt_date)
    {
        $('#main_view').show();
        $('#re_view').hide();
        $('#span_keyword').text(""); // set for next stage

        //$("#to_next").text("학습 결과");
        $("#submit_keyword").val("복습 퀴즈 풀이");
    }
}

function get_num_exac_quiz()
{
    var exact_num = 0;
    $(".span_quiz").each(function () {
        // ele = this;
        if ($(this).text() == "Good job!")
        {
            exact_num = exact_num + 1;
        }
    });
    return exact_num;
}

// validation of input values
function IsNumeric(e,v)
{
    // get prev input + current input
    var keyCode = e.which ? e.which : e.keyCode;
    var curInput = v + String.fromCharCode(keyCode);

    // preclude +/-/./+./-. for validation
    switch (curInput)
    {
        case "+": case "-": case ".": case "+.": case "-.":
            return true;
        default:
            break;
    }

    // check if it is Not a Number
    if (isNaN(curInput)) return false;
}
