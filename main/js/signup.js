function validateName() {
    var n_err = document.getElementById('_name_err');
    var _name = document.getElementById('name').value;
    if (_name.length == 0) {
        n_err.textContent = 'Name is required!';
        return false;
    }
    if (!_name.match(/^[A-Za-z]*\s{1}[A-Za-z\s]+$/)) {
        n_err.textContent = '*Enter your full name!';
        return false;
    }
    n_err.innerHTML = '<i class="fa fa-check-circle"></i>';
    return true;
}

function validateEmail() {
    var e_err = document.getElementById('_email_err');
    var _email = document.getElementById('email').value;
    if (_email.length == 0) {
        e_err.innerHTML = 'Email ID is required!';
        return false;
    }
    if (!_email.match(/^[\sA-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z\s]{2,}$/)) {
        e_err.innerHTML = '*Enter your valid email ID!';
        return false;
    }
    e_err.innerHTML = '<i class="fa fa-check-circle"></i>';
    return true;
}

function validatePassword() {
    var p_err = document.getElementById('_password_err');
    var _password = document.getElementById('password').value;
    if (_password.length == 0) {
        p_err.innerHTML = 'Password is required!';
        return false;
    }
    if (!_password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).{6,}$/)) {
        p_err.innerHTML = '*6 chars required : atleast 1 Upper, 1 Lower, 1Digit, 1 Special!';
        return false;
    }
    p_err.innerHTML = '<i class="fa fa-check-circle"></i>';
    return true;
}

function validateEmail1() {
    var e_err1 = document.getElementById('_email_err1');
    var _email1 = document.getElementById('email1').value;
    if (_email1.length == 0) {
        e_err1.innerHTML = 'Email ID is required!';
        return false;
    }
    if (!_email1.match(/^[\sA-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z\s]{2,}$/)) {
        e_err1.innerHTML = '*Enter your valid email ID!';
        return false;
    }
    e_err1.innerHTML = '<i class="fa fa-check-circle"></i>';
    return true;
}

function validatePassword1() {
    var p_err1 = document.getElementById('_password_err1');
    var _password1 = document.getElementById('password1').value;
    if (_password1.length == 0) {
        p_err1.innerHTML = 'Password is required!';
        return false;
    }
    if (!_password1.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).{6,}$/)) {
        p_err1.innerHTML = '*6 chars required : atleast 1 Upper, 1 Lower, 1Digit, 1 Special!';
        return false;
    }
    p_err1.innerHTML = '<i class="fa fa-check-circle"></i>';
    return true;
}

const animationContainer = document.getElementById('lottieSignup');
const animationData = '../resourses/signup.json'; // Path to your downloaded JSON file
const anim = bodymovin.loadAnimation({
    container: animationContainer,
    renderer: 'svg', // Choose the renderer (svg, canvas, html)
    loop: true, // Set to true for looping
    autoplay: true, // Set to true for auto-play
    path: animationData,
});
const animationContainer1 = document.getElementById('lottieSignin');
const animationData1 = '../resourses/signin.json'; // Path to your downloaded JSON file
const anim1 = bodymovin.loadAnimation({
    container: animationContainer1,
    renderer: 'svg', // Choose the renderer (svg, canvas, html)
    loop: true, // Set to true for looping
    autoplay: true, // Set to true for auto-play
    path: animationData1,
});
const animationContainer2 = document.getElementById('lottieCross');
const animationData2 = '../resourses/lottieCross.json'; // Path to your downloaded JSON file
const anim2 = bodymovin.loadAnimation({
    container: animationContainer2,
    renderer: 'svg', // Choose the renderer (svg, canvas, html)
    loop: false, // Set to true for looping
    autoplay: true, // Set to true for auto-play
    path: animationData2,
});

const animationContainer3 = document.getElementById('lottieTick');
const animationData3 = '../resourses/lottie3.json'; // Path to your downloaded JSON file
const anim3 = bodymovin.loadAnimation({
    container: animationContainer3,
    renderer: 'svg', // Choose the renderer (svg, canvas, html)
    loop: false, // Set to true for looping
    autoplay: true, // Set to true for auto-play
    path: animationData3,
});

setTimeout(() => {
    document.getElementById("alert").style.display = "none";
}, 3000);



  
document.getElementById('signup_form').classList.add('onload1');  // For first time loading of page only
document.getElementById('lottieSignup').classList.add('onload2');

function switch_over1() {
    document.getElementById('signup_body').classList.toggle('hide');
    document.getElementById('signin_body').classList.toggle('hide');
    setTimeout(function () {
        document.getElementById('signin_form').classList.add('animate1');
        document.getElementById('lottieSignin').classList.add('animate2');
    }, 0);
    document.getElementById('signin_form').classList.remove('animate1');
    document.getElementById('lottieSignin').classList.remove('animate2');

    document.getElementById('signup_form').classList.remove('onload1');
    document.getElementById('lottieSignup').classList.remove('onload2');
}
function switch_over2() {
    document.getElementById('signup_body').classList.toggle('hide');
    document.getElementById('signin_body').classList.toggle('hide');
    setTimeout(function () {
        document.getElementById('signup_form').classList.add('animate2');
        document.getElementById('lottieSignup').classList.add('animate1');
    }, 0);
    document.getElementById('signup_form').classList.remove('animate2');
    document.getElementById('lottieSignup').classList.remove('animate1');
}



