// Note: Like all Javascript password scripts, this is hopelessly insecure as the user can see 
//the valid usernames/passwords and the redirect url simply with View Source.  
// And the user can obtain another three tries simply by refreshing the page.  
//So do not use for anything serious!

var id_arr = ["123", "456"];  // as many as you like - no comma after final entry
var pw_arr = ["eud", "6dt"];  // the corresponding passwords;
var sc_arr = ["90", "30"];
var exam_name = "중간고사";
var average = "24.5";
var start_date = "2015-08-07T09:00:00";

$(document).ready(function ()
{
    //// AJAX to get file from server
    //var xhttp = new XMLHttpRequest();
    //xhttp.onreadystatechange = function () {
    //    if (xhttp.readyState == 4 && xhttp.status == 200) {
    //        alert("success");
    //        inform_login(xhttp.responseText);
    //    }
    //};
    //alert("fail");
    //xhttp.open("GET", "flag_time.tim", true);
    //xhttp.send();

    inform_login(start_date);
});

function inform_login(p_time_string)
{
    //var flg_date = new Date("2016-08-07T09:00:00"); // 2016.08.07 am 9:00
    var flg_date = Date.parse(p_time_string.replace(/\r?\n|\r/g, "")); // remove new line character
    var cur_date = new Date($.now());

    // before the flag date, update to inform mode
    if (cur_date < flg_date)
    {
        $("#h3_login").text("로그인 정보");
        $("#inp_pw").prop("disabled", true);
        $("#submit_login").val("정보 알려주기");
    }

    // when click submit button
    $('#submit_login').click(function ()
    {
        if (cur_date < flg_date) { inform_pw(); }
        else { login(); }
        return false;
    });
}

function inform_pw()
{
    if ($(document).find("title").text() == "Score") return false;

    var id = $("#inp_id").val();

    for (var i = 0; i < id_arr.length; i++)
    {
        if (id == id_arr[i]) // in case of success
        {
            $("#inp_pw").val(pw_arr[i]);
            $("#inp_pw").prop("type", "text");
            $("#submit_login").hide();
            $("#span_un_pw").text("위의 키워드를 꼭 기억하세요!");
            return false; // if true is returned to the form, the page will be refreshed or reloaded
                          // if nothing is returned to the form, in fact, true is returned
        }
    }

    // in case of fail
    $("#span_un_pw").text("다시 시도하세요!");
    $("#inp_id").val("");
    return false;
}

function login() {
    var id = $("#inp_id").val();
    var pw = $("#inp_pw").val();

    for (var i = 0; i < id_arr.length; i++)
    {
        if ((id == id_arr[i]) && (pw == pw_arr[i])) // in case of success
        {
            $("#inp_id").val("");
            $("#inp_pw").val("");
            //$("#form_login").attr('action', 'main.html');
            if ($(document).find("title").text() != "Score")
            {
                window.location.href = "main.html";
            }
            else
            {
                show_score(id, i);
            }
            return false; // if true is returned to the form, the page will be refreshed or reloaded
                          // if nothing is returned to the form, in fact, true is returned
        }
    }

    // in case of fail
    $("#span_un_pw").text("다시 시도하세요!");
    $("#inp_id").val("");
    $("#inp_pw").val("");
    return false;
}

function show_score(p_id, p_idx) {
    $("#li_st_id").text("학번 : " + p_id);
    $("#li_exam_name").text("시험 : " + exam_name);
    $("#li_score").text("점수 : " + sc_arr[p_idx]);
    $("#li_avg").text("평균 : " + average);
    $("#div_login").hide();
    $("#main_view").show();
}

//function inform_login(p_time_string) {
//    //var flg_date = new Date("2016-08-07T09:00:00"); // 2016.08.07 am 9:00
//    var flg_date = Date.parse(p_time_string.replace(/\r?\n|\r/g, "")); // remove new line character
//    var cur_date = new Date($.now());

//    $("#h3_login").text("Login - " + p_time_string);
//    if (cur_date < flg_date) {
//        $("#h3_login").text("Login information - (before " + p_time_string + ")");
//        $("#inp_pw").prop("disabled", true);
//        $("#submit_login").val("Let me know");
//    }

//    $('#submit_login').click(function () {
//        if (cur_date < flg_date) { inform_pw(); }
//        else { login(); }
//        return false;
//    });
//}

//function inform_pw() {
//    var id = $("#inp_id").val();

//    for (var i = 0; i < id_arr.length; i++) {
//        if (id == id_arr[i]) { // in case of success
//            $("#inp_pw").val(pw_arr[i]);
//            $("#inp_pw").prop("type", "text");
//            $("#submit_login").hide();
//            $("#span_un_pw").hide();
//            return false; // if true is returned to the form, the page will be refreshed or reloaded
//            // if nothing is returned to the form, in fact, true is returned
//        }
//    }

//    // in case of fail
//    $("#span_un_pw").text("Try again!");
//    $("#inp_id").val("");
//    return false;
//}

//function login() {
//    var id = $("#inp_id").val();
//    var pw = $("#inp_pw").val();

//    for (var i = 0; i < id_arr.length; i++) {
//        if ((id == id_arr[i]) && (pw == pw_arr[i])) { // in case of success
//            $("#inp_id").val("");
//            $("#inp_pw").val("");
//            $("#div_login").hide();
//            $("#main_view").show();

//            $("#li_st_id").text("student id : " + id);
//            $("#li_exam_name").text("exam : " + exam_name);
//            $("#li_score").text("score : " + sc_arr[i]);
//            $("#li_avg").text("average : " + average);

//            //$("#form_login").attr('action', 'main.html');
//            return false; // if true is returned to the form, the page will be refreshed or reloaded
//            // if nothing is returned to the form, in fact, true is returned
//        }
//    }

//    // in case of fail
//    $("#span_un_pw").text("Try again!");
//    $("#inp_id").val("");
//    $("#inp_pw").val("");
//    return false;
//}


/*var count = 2;
function login() {
	var un = document.myform.username.value;
	var pw = document.myform.password.value;
	var valid = false;
	var unArray = ["smsaku"];  // as many as you like - no comma after final entry
	var pwArray = ["1234567890"];  // the corresponding passwords;
	for (var i=0; i <unArray.length; i++) {
		if ((un == unArray[i]) && (pw == pwArray[i])) {
			valid = true;
			break;
		}
	}
	if (valid) {
		alert ("The given user name and password were matched!");
		//window.location = "..\structuralmechanics\experiment.html";
		//return false;
		document.myform.username.value = "";
		return true;
	}
	
	var t = " tries";
	if (count == 1) {t = " try"}
	
		if (count >= 1) {
		document.getElementById("span_un_pw").innerHTML = "Invalid username and/or password. You have " + count + t + " left.";
		//alert("Invalid username and/or password. You have " + count + t + " left.");
		document.myform.username.value = "";
		document.myform.password.value = "";
		setTimeout("document.myform.username.focus()", 25);
		setTimeout("document.myform.username.select()", 25);
		count --;
	}
	else {
		document.getElementById("span_un_pw").innerHTML = "Still incorrect! You have no more tries left!";
		//alert("Still incorrect! You have no more tries left!");
		document.myform.username.value = "No more tries allowed!";
		document.myform.password.value = "";
		document.myform.username.disabled = true;
		document.myform.password.disabled = true;
	}
	return false;
}*/

