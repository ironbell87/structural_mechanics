var sd_arr = ["2013113370","2012113077","2012113158","2012113142","2013113084","2011113158","2013113121","2015112884","2015112843","2012113101","2009113108","2011113198","2013113109","2013113077","2014113022","2012113153","2013113039","2012113095","2013113119","2013113079","2012113112","2012113072","2012113122","2013113098","2013113042","2013113075","2013113101","2013113082"];
var id_arr = ["HFqcC","M^jf!","NqpbR","Vs_sA","WFvvk","W$e#u","W}[sc","XtT?@","YH[Xn","Y~Jjx","?qZOY","]DRmy","^WXig","^XoC~","!_~eZ","!tTsJ","aJAvA","cBmcz","cK~Qr","d_xvy","hA}K#","iKiwd","kqjiJ","%$zkY","mGvkp","mJ?Rr","wbzf}","xatf$","admin"];
var pw_arr = ["e4b1cec63d16", "c53d2fd81a66", "06d6afcf88e8", "f2a6f9460ab3", "a2116658d876", "087c55dc81c9", "a4aa1a453356", "e895a8fcc144", "3233f5dcb9b5", "409d5bcb7528", "895b7463fc49", "7ebdabe8cf34", "67cb1f0d6e7f", "a566682f8df2", "3f84d0cbb6bb", "1279b29fcc55", "5d0c1c8b3750", "110e1b6c6237", "2e3a00b7cbec", "1df7ad1e5924", "391b76ef2a95", "40239ef79031", "6d251af1e679", "55051fed04d4", "f485e8e2c2c6", "ad147a1f0d34", "704e20c0e8f5", "e6e4c0de9471", "master"];
//, "c0975c4f904a", "a36617be04be", "a19055cf4691", "e065f1138f37", "3c709376ffb6", "f24cc4569590", "d7c838b999a2", "2463c7d7e175", "3f81f31751e1", "7f5a52c54b64", "083f1267fe1c", "07aa59e00ea0", "b055b2c793f8", "b6bdf48327ba", "0ad44a6c9009", "9a2cc4d4c21d", "b954b59bbc59", "61be21c53b0c", "e46fab61bdd3", "8ee73f1a644c", "c6c12fe33e20", "00e68a51860d", "0e537089f4e9", "1146839a3677", "807b58b176f4", "02029278f611", "23d263f8ea04", "49a58e3247ac", "cd232313f963", "73a1533dc6ac", "7ae81156ac7d", "9abe0858d5bd", "5e5db7df2738", "8f00ecc9626c", "46ff01b36ffb", "f89e3ecd90a7", "fda5e9429a92", "0d6b7a99b221", "950f6e252e01", "d16f11e6de6b", "a8a504fdf20c", "ccae7d465b7d", "ba61bf75d3b6", "8f3e1d6c927b", "4e8f2ddafbdb", "5aad8c9548f2", "88d2fbc3ba65", "e58193109164", "5f1d78d49879", "36a7564344b9", "a9ba231b7e95", "30d620657f0f", "b664c8c430ab", "ae3870009560", "acb51d2f71ed", "884bb6a2e0c6", "e91bb6ca74b2", "45c570e49abc", "5d3427e3eb6c", "78ae683d3448", "f589014ef11e", "f685fea278c8", "e143f0596abe", "dcf50bd2411f", "18b99777409b", "d8e86d09acfd", "c54011a64cd4", "7853b7935703", "db8bb99d83e9", "251f6c0475d5", "c47b621045ad", "4765151ebb68"];
var sc_arr = ["90", "30"];
var exam_name = "중간고사";
var average = "24.5";
var login_date = "2016-09-13T11:00:00";
var score_date = "2016-10-04T09:00:00";

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

    inform_login();
});

function inform_login()
{
    var tgt_date = Date.parse(login_date.replace(/\r?\n|\r/g, "")); // remove new line character; 2016.09.07 am 9:00
    var cur_date = new Date($.now());

    // before the login date, update to inform mode
    if (cur_date < tgt_date)
    {
        $("#h3_login").text("로그인 정보");
        $("#inp_pw").prop("disabled", true);
        $("#inp_id").attr("placeholder", "학번");
        $("#submit_login").val("정보 알려주기");
    }

    // when click submit button
    $('#submit_login').click(function ()
    {
        if (cur_date < tgt_date) { inform_pw(); }
        else { login(); }
        return false;
    });
}

function inform_pw()
{
    if ($(document).find("title").text() == "Score") return false;

    var sd = $("#inp_id").val();

    for (var i = 0; i < sd_arr.length; i++)
    {
        if (sd == sd_arr[i]) // in case of success
        {
            $("#inp_id").val(id_arr[i]);
            $("#inp_pw").val(pw_arr[i]);
            $("#inp_id").prop("disabled", true);
            $("#inp_pw").prop("type", "text");
            $("#submit_login").hide();
            $("#span_un_pw").text("위의 아이디와 키워드를 꼭 기억하세요!");
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
                sessionStorage.login_id = id; // store id at sesseion storage
                window.location.href = "main.html";
            }
            else
            {
                var tgt_date = Date.parse(score_date.replace(/\r?\n|\r/g, "")); // remove new line character; 2016.09.07 am 9:00
                var cur_date = new Date($.now());

                // before the score date, update to inform mode
                if (cur_date < tgt_date)
                {
                    $("#span_un_pw").text("확인할 점수가 없습니다!");
                    $("#inp_id").val("");
                    $("#inp_pw").val("");
                }
                else
                {
                    show_score(id, i);
                }
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
    $("#li_id").text("아이디 : " + p_id);
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

