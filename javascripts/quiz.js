var g_tolerance = 1.0e-2;
var test_ans_arr = [
    [9800, 5, 12, 6], // force
    [13, -6, 126.869, 2], // composition
    [-2, -6], // eq.
    [60, 9], // load
    [3, 6], // support
    [], // reaction
    [], // reaction for gerber
    [3, 3, 2, 5], // joint
    ["절점", "휨모멘트", 2], // member force
    ["휨모멘트", 3, 5, 2], // diagram
    [], // beam
    [], // frame
    [1], // truss
    ["인장력", "압축력"] // cable & arch
];  // as many as you like - no comma after final entry
var quiz_ans_arr = [
    [96.04, 102.04, -9, -22, -3, -3.5, -3.5, -3, -7.35, -3.4], // force
    [4.1231, -74.0362, 1.6216, 4.6900, -23.8728, -4.5950, 3, 0, 3, 0], // composition
    [-1, -5, -2.55, 3.5, -7, 1.6666, 1.3333, 1, 2, 7], // eq.
    [14, 2, 28, 4.5, 2, 9, 4.5, 4, 18, 294], // load
    [3, 7, 1, 2, 1, 2, 1, 3, 1, 2], // support
    [3, 6, 2.5, 2.5, 3.75, 1.25, -3, 3, 4.2426, -3], // reaction
    [-2, 2, 2, 4, -3, 0, -0.5, 2.5, -5, -1], // reaction for gerber
    [4, 4, 2, 5, "이동단", 1, "고정절점", 3, -3, -3], // joint
    ["-", "+", "-", "+", "+", "+", "-", "-", "+", "+"], // member force
    [2, 2, 0, 1, 2, 1, 2, 1, 0, 1], // diagram
    [3, -7.5, 3, -10, 4, -4, 5.3333, -7.1111, 15.34, 24.9275], // beam
    [2, 2, 1, 1, 4, 12, 7, 7, 12.25, 0.5], // frame
    [5, 5, 20, -25, 15, -5, -14.1421, 1, -3, 0], // truss
    [8, 8.9443, 8.2462, 8.9443, -3.5355, 3.5355, -7.0711, 5, 5, 10] // cable & arch
];

$(document).ready(function ()
{
    $(".li_test").click(function () {
        // get the test element
        var test = $(this).parent().children().eq(1);
        var m_show_hide = test.css('display');

        // show or hide the element
        if (m_show_hide == 'none') { test.show(); } // hide -> show
        else { test.hide(); } // show -> hide
        return false;
    });

    $(".submit_test_quiz").click(function ()
    {
        // get id of the submit button
        var cur_id = $(this).attr('id');

        // determine test / quiz
        var j_arr = cur_id.split("_");
        var ans_type = j_arr[1];

        // get the index of column
        var j_idx = j_arr[j_arr.length - 1];
        //j_idx = j_idx.replace("th", "");

        // get the row of the array => [9800, 12, 0]; // get the index of row
        var title = $(document).find("title").text();
        switch (title)
        {
            case "Force, moment, and couple":
                var cur_idx = 0; break;
            case "Composition and decomposition":
                var cur_idx = 1; break;
            case "Equalibrium":
                var cur_idx = 2; break;
            case "Loads":
                var cur_idx = 3; break;
            case "Support and support reaction":
                var cur_idx = 4; break;
            case "Computation of support reaction":
                var cur_idx = 5; break;
            case "Computation of support reaction of Gerber beam":
                var cur_idx = 6; break;
            case "Joint and joint reaction":
                var cur_idx = 7; break;
            case "Member forces":
                var cur_idx = 8; break;
            case "Member force diagram":
                var cur_idx = 9; break;
            case "Member forces of a beam":
                var cur_idx = 10; break;
            case "Member forces of a frame":
                var cur_idx = 11; break;
            case "Member forces of a truss":
                var cur_idx = 12; break;
            case "Member forces of a cabel and arch":
                var cur_idx = 13; break;
            default:
                var cur_idx = 0; break;
        }
        if (ans_type == "test") { cur_arr = test_ans_arr[cur_idx]; }
        else { cur_arr = quiz_ans_arr[cur_idx]; }

        // comparison
        treat_answer(cur_arr, j_idx, ans_type);
    });
});

function treat_answer(cur_arr, j_idx, p_type) // p_type = "test" / "quiz"
{
    // get id of the corresponding elements
    p_type = p_type + "_";
    var inp_quiz = "#inp_" + p_type + j_idx;
    var span_quiz = "#span_" + p_type + j_idx;

    // get values
    var m_ans = cur_arr[j_idx - 1]; // exanser answer
    var m_inp = $(inp_quiz).val();  // input answer

    // in case of no input
    if (m_inp == "")
    {
        $(inp_quiz).focus();
        $(span_quiz).text("Enter answer!");
        return false;
    }

    // comparison
    //  in case of exact answer
    if (comparison_value(inp_quiz, m_ans, m_inp)) {
        $(inp_quiz).val(m_ans);
        $(inp_quiz).prop("disabled", true);
        $(span_quiz).text("Good job!");
        if (p_type == "test_")
        {
            $("#test_" + j_idx).parent().children().eq(0).text("Simple test - solved");
        }
        return true;
    }
    else // in case of wrong answer
    {
        $(inp_quiz).val("");
        $(inp_quiz).focus();
        $(span_quiz).text("Wrong answer! Try again!");
        return false;
    }
}

function comparison_value (inp_id, ex_ans, in_ans)
{
    var evnt_attr = $(inp_id).attr('onkeypress');
    if (typeof evnt_attr != "undefined") { // in case of number
    //if ($(inp_id).attr('onkeypress').includes("IsNumeric")) { // in case of number
        if (Math.abs(ex_ans - in_ans) < g_tolerance) { return true; }
        else { return false; }
    }
    else // in case of text
    {
        if (ex_ans == in_ans) { return true; }
        else { return false; }
    }
}