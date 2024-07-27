let isclicked = false;  // Checks dropdown_button is clicked or not

let dropdown_button = document.getElementById('dropdown');  // For mouse over
let dropdown_menu = document.querySelector('#dropdown_menu');
dropdown_button.onmouseover = () => {
    dropdown_menu.style.display = 'flex';
    if (window.innerWidth < 900) {
        dropdown_menu.style.flexDirection = 'column';
    }
    else {
        dropdown_menu.style.flexDirection = 'row';
    }
}
dropdown_button.onmouseout = () => {
    if(isclicked === false){  // If the dropdown_button is not clicked then mouseout property is applied
        dropdown_menu.style.display = 'none';
    }
}
dropdown_button.onclick = () => {
    isclicked = true;  // Enable dropdown_button is clicked
    dropdown_menu.style.display = 'flex';
    if (window.innerWidth < 900) {
        dropdown_menu.style.flexDirection = 'column';
    }
    else {
        dropdown_menu.style.flexDirection = 'row';
    }
}
document.addEventListener('click', (event) => {  // For clicking outside
    if (!dropdown_button.contains(event.target) && !dropdown_menu.contains(event.target)) {
        isclicked = false;  // Disable dropdown_button clicked
        dropdown_menu.style.display = 'none';
    }
});

function very_bad() {
    document.getElementById('rate').value = "Very Bad";
    validateRatings();
}
function bad() {
    document.getElementById('rate').value = "Bad";
    validateRatings();
}
function donot_know() {
    document.getElementById('rate').value = "Don't Know";
    validateRatings();
}
function good() {
    document.getElementById('rate').value = "Good";
    validateRatings();
}
function very_good() {
    document.getElementById('rate').value = "Very Good";
    validateRatings();
}


// $('#comments').on('input', function () {
//     this.style.height = 'auto';
//     this.style.height =
//         (this.scrollHeight) + 'px';
// });



function validateName() {
    var n_err = document.getElementById('_name_err');
    var _name = document.getElementById('_name').value;
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
    var _email = document.getElementById('_email').value;
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

function validateAddress() {
    var a_err = document.getElementById('_address_err');
    var _address = document.getElementById('_address').value;
    var required = 15;
    var left = required - _address.length;
    if (left > 0) {
        a_err.innerHTML = "*" + left + " more character(s) required!";
        return false;
    }
    a_err.innerHTML = '<i class="fa fa-check-circle"></i>';
    return true;
}

function validateRatings() {
    var r_err = document.getElementById('rate_err');
    var rate = document.getElementById('rate').value;
    if (rate.length < 3) {
        r_err.innerHTML = "Please rate..";
        return false;
    }
    r_err.innerHTML = '<i class="fa fa-check-circle"></i>';
    return true;
}

var validForm = false;
function validateForm() {
    var s_err = document.getElementById('submit_err');
    if (validateName() === false || validateEmail() === false || validateAddress() === false || validateRatings() === false) {
        s_err.innerHTML = 'Please fill all the fields!';
        setTimeout(function () {
            s_err.style.display = 'none';
        }, 3000);
        validForm = false;
    }
    else {
        validForm = true;
        s_err.style.display = 'none';
    }
}

document.addEventListener('invalid', (function () {
    return function (e) {
        e.preventDefault();
    };
})(), true);

var params;
function submitEmail() {
    params = {
        name: document.getElementById("_name").value,
        email: document.getElementById("_email").value,
        address: document.getElementById("_address").value,
        ratings: document.getElementById("rate").value
    }
    var inputs = document.querySelectorAll(".inputs");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
            return false;
        }
    }
}
const link = document.getElementById('submit');

link.addEventListener('click', (event) => {
    event.preventDefault(); // Stop the default behavior (redirecting)
    if (validForm === true) {
        // console.log("clicked!");
        document.getElementById('alert').classList.add("show");

        window.scrollTo(0, 0);

        if (window.innerWidth < 900) {
            document.getElementById('alert').innerHTML = '<div style="height: 5vh; width: 53vw; border-radius: 20px; background: #242424; display: flex; align-items: center; justify-content: center; transition: 1s;"><p style="color: white; font-size: 0.7rem; padding-right: 8vw;"><span style="color: blueviolet">C</span>onfirm <span style="color: blueviolet">S</span>end <span style="color: blueviolet">?</span>?</p><div style="display: flex; flex-direction: row; padding-left: 8vw; justify-content: space-between;"><button id="yes" class="yes_no" onclick="proceed()"style="padding-right: 1vw">Yes</button><button id="no" class="yes_no" onclick="cancel()" style="padding-left: 1vw">No</button></div></div>';
        }
        else {
            document.getElementById('alert').innerHTML = '<div style="height: 5vh; width: 50vw; border-radius: 20px; background: #242424; display: flex; align-items: center; justify-content: center; transition: 1s;"><p style="color: white; font-size: 1.5rem; padding-right: 8vw;"><span style="color: blueviolet">C</span>onfirm <span style="color: blueviolet">S</span>end <span style="color: blueviolet">?</span>?</p><div style="display: flex; flex-direction: row; padding-left: 8vw; justify-content: space-between;"><button id="yes" class="yes_no" onclick="proceed()"style="padding-right: 1vw">Yes</button><button id="no" class="yes_no" onclick="cancel()" style="padding-left: 1vw">No</button></div></div>';
        }
    }
});

function cancel() {
    document.getElementById('alert').innerHTML = '';
}

function proceed() {
    setTimeout(() => {
        emailjs.send('service_e9mwljm', 'template_cdngbrq', params).then(
            (response) => {
                alert('SUCCESS!', response.status, response.text);
            },
            (error) => {
                alert('FAILED...', error);
            },
        );
        if (window.innerWidth < 900) {
            document.getElementById('alert').innerHTML = '<div style="height: 5vh; width: 53vw; border-radius: 20px; background: #242424; display: flex; align-items: center; justify-content: center;"><div id="lottieTick" style="height: 4vh; width: 4vh;"></div><p style="color: white; font-size: 0.7rem;"><span style="color: blueviolet">S</span>uccess <span style="color: blueviolet">!</span>! <span style="color: blueviolet">F</span>eedback <span style="color: blueviolet">R</span>eceived.</p></div>';
        }
        else {
            document.getElementById('alert').innerHTML = '<div style="height: 5vh; width: 50vw; border-radius: 20px; background: #242424; display: flex; align-items: center; justify-content: center;"><div id="lottieTick" style="height: 6.5vh; width: 6.5vh;"></div><p style="color: white; font-size: 1.5rem;"><span style="color: blueviolet">S</span>uccess <span style="color: blueviolet">!</span>! <span style="color: blueviolet">F</span>eedback <span style="color: blueviolet">R</span>eceived.</p></div>';
        }
        showLottieTick();

    }, 2000)
    // setTimeout(() => {
    //     window.location.href = '/load'; // Redirect manually if confirmed      
    // }, 4000)
    // if (confirmResult) {
    // }
}

const animationContainer = document.getElementById('lottieFeedback');
const animationData = '../resourses/lottie1.json'; // Path to your downloaded JSON file
const anim = bodymovin.loadAnimation({
    container: animationContainer,
    renderer: 'svg', // Choose the renderer (svg, canvas, html)
    loop: true, // Set to true for looping
    autoplay: true, // Set to true for auto-play
    path: animationData,
});
const animationContainer1 = document.getElementById('lottieArrow');
const animationData1 = '../resourses/lottie2.json'; // Path to your downloaded JSON file
const anim1 = bodymovin.loadAnimation({
    container: animationContainer1,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: animationData1,
});
function showLottieTick() {
    const animationContainer2 = document.getElementById('lottieTick');
    const animationData2 = '../resourses/lottie3.json'; // Path to your downloaded JSON file
    const anim2 = bodymovin.loadAnimation({
        container: animationContainer2,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: animationData2,
    });

}

const animationContainer3 = document.getElementById('veryBad');
const animationData3 = '../resourses/veryBadFace.json'; // Path to your downloaded JSON file
const anim3 = bodymovin.loadAnimation({
    container: animationContainer3,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: animationData3,
});

const animationContainer4 = document.getElementById('bad');
const animationData4 = '../resourses/badFace.json'; // Path to your downloaded JSON file
const anim4 = bodymovin.loadAnimation({
    container: animationContainer4,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: animationData4,
});

const animationContainer5 = document.getElementById('donotKnow');
const animationData5 = '../resourses/notKnowFace.json'; // Path to your downloaded JSON file
const anim5 = bodymovin.loadAnimation({
    container: animationContainer5,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: animationData5,
});

const animationContainer6 = document.getElementById('good');
const animationData6 = '../resourses/goodFace.json'; // Path to your downloaded JSON file
const anim6 = bodymovin.loadAnimation({
    container: animationContainer6,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: animationData6,
});

const animationContainer7 = document.getElementById('veryGood');
const animationData7 = '../resourses/veryGoodFace.json'; // Path to your downloaded JSON file
const anim7 = bodymovin.loadAnimation({
    container: animationContainer7,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: animationData7,
});
