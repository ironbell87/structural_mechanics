// size of specimen
var normal_x_len = 50, normal_y_len = 50, normal_z_len = 300;
var shear_x_len = 50, shear_y_len = 50, shear_z_len = 70;

window.onload = function()
{
	// axial force
	var axial_submit = document.getElementById('axial_submit');
	axial_submit.addEventListener('click', function() { get_axial_values(); }); // this form of calling is for passing parameter in function inside

	// shear force
	var shear_submit = document.getElementById('shear_submit');
	shear_submit.addEventListener('click', function() { get_shear_values(); }); // this form of calling is for passing parameter in function inside

	// bending moment
	var moment_submit = document.getElementById('moment_submit');
	moment_submit.addEventListener('click', function() { get_moment_values(); }); // this form of calling is for passing parameter in function inside
}

function get_axial_values()
{
  var area = normal_x_len * normal_y_len;
  var force = document.getElementById('axial_average_force').value;
	var delta_len = get_average("axial");
	var stress = force / area;
	var strain = delta_len / normal_z_len;
	var modulus = stress / strain;
	document.getElementById('axial_sigma').value = stress;
	document.getElementById('axial_epsilon').value = strain;
	document.getElementById('axial_modulus').value = modulus;
}

function get_shear_values()
{
  var force = document.getElementById('shear_average_force').value;
	var delta_len = get_average("shear");
	var b = shear_x_len;
	var I_x = b * Math.pow(shear_y_len,3) / 12;
	var G = b * (shear_y_len/2) * (shear_y_len/4);
	var stress = force * G / (b * I_x);
	var strain = delta_len / shear_z_len;
	var modulus = stress / strain;
	document.getElementById('shear_tau').value = stress;
	document.getElementById('shear_gamma').value = strain;
	document.getElementById('shear_modulus').value = modulus;
}

function get_moment_values()
{
	if (document.getElementById('axial_modulus').value == "")
	{
		alert("No input in axial force and stress !!"); return;
	}
	var len_cnt = get_average("moment_cnt");
	var len_top = get_average("moment_top");
	var delta_len = len_top - len_cnt;
	var strain = delta_len / len_cnt;
	var y_top = normal_y_len / 2;
	var radius_curvature = -y_top / strain;
	var curvature = 1 / radius_curvature;
	var I_x = normal_x_len * Math.pow(normal_y_len,3) / 12;
	var modulus = document.getElementById('axial_modulus').value;
	var moment = modulus * I_x * strain / y_top;
	var stress = moment * y_top / I_x;
	document.getElementById('moment_epsilop').value = strain;
	document.getElementById('radius_curvature').value = radius_curvature;
	document.getElementById('curvature').value = curvature;
	document.getElementById('moment').value = moment;
	document.getElementById('bending_sigma').value = stress;
}

// get average of measured values
function get_average(tgtStr)
{
  var t1 = parseFloat(document.getElementById(tgtStr + "_1st").value);
  var t2 = parseFloat(document.getElementById(tgtStr + "_2nd").value);
  var t3 = parseFloat(document.getElementById(tgtStr + "_3rd").value);
  var t4 = parseFloat(document.getElementById(tgtStr + "_4th").value);
  var t5 = parseFloat(document.getElementById(tgtStr + "_5th").value);
  var t6 = parseFloat(document.getElementById(tgtStr + "_6th").value);
	var avg_val = (t1 + t2 + t3 + t4 + t5 + t6)/6;
	document.getElementById(tgtStr + "_average_length").value = avg_val;
	return avg_val;
}

/*var specialKeys = new Array();
specialKeys.push(8); //Backspace
specialKeys.push(190); //Period
function IsNumeric(e)
{
	var keyCode = e.which ? e.which : e.keyCode
	var ret = !(keyCode != 46 && keyCode > 31 && (keyCode < 48 || keyCode > 57))
  return ret;
}*/

////// validation of input values
////// very, very short implementation
////function IsNumeric(e,v)
////{
////    var keyCode = e.which ? e.which : e.keyCode
////    if (isNaN(v + String.fromCharCode(keyCode))) return false;
////}

//// validation of input values
//function IsNumeric(e, v, option) {
//    var keyCode = e.which ? e.which : e.keyCode
//    num = v + String.fromCharCode(keyCode);

//    // 좌우 trim(공백제거)을 해준다.
//    num = String(num).replace(/^\s+|\s+$/g, "");

//    if (typeof option == "undefined" || option == "1") {
//        // 모든 10진수 (부호 선택, 자릿수구분기호 선택, 소수점 선택)
//        var regex = /^[+\-]?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
//    } else if (option == "2") {
//        // 부호 미사용, 자릿수구분기호 선택, 소수점 선택
//        var regex = /^(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
//    } else if (option == "3") {
//        // 부호 미사용, 자릿수구분기호 미사용, 소수점 선택
//        var regex = /^[0-9]+(\.[0-9]+)?$/g;
//    } else {
//        // only 숫자만(부호 미사용, 자릿수구분기호 미사용, 소수점 미사용)
//        var regex = /^[0-9]$/g;
//    }

//    if (regex.test(num)) {
//        num = num.replace(/,/g, "");
//        return isNaN(num) ? false : true;
//    } else { return false; }
//}