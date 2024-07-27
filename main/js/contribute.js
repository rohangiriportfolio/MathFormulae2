// import { response } from "express";

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
    if (isclicked === false) {  // If the dropdown_button is not clicked then mouseout property is applied
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

var animationContainer = document.getElementById('lottieContribute');
const animationData = '../resourses/lottie6.json'; // Path to your downloaded JSON file
const anim = bodymovin.loadAnimation({
    container: animationContainer,
    renderer: 'svg',
    loop: true,
    autoplay: true,
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

$('#contribution').on('input', function () {
    this.style.height = 'auto';
    this.style.height =
        (this.scrollHeight) + 'px';
});


async function likes(event) {
    const element = event.target.closest('.contributionCard');
    const cardId = element.getAttribute('data-id');
    // console.log(cardId);
    fetch('/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId: cardId })
    }).then(response => response.json())
        .then(data => {
            const likesCountElement = element.querySelector('.likesCount');
            const currentLikesCount = parseInt(likesCountElement.textContent);
            if (JSON.parse(JSON.stringify(data)).message === 'true') {
                likesCountElement.innerText = currentLikesCount + 1;
                element.querySelector('.likesIcon').innerHTML = '<i class="fa fa-thumbs-up"></i>';
            }
            else {
                likesCountElement.innerText = currentLikesCount - 1;
                element.querySelector('.likesIcon').innerHTML = '<i class="fa fa-thumbs-o-up"></i>';
            }
            // console.log(JSON.parse(JSON.stringify(data)).message);
        })
}


async function disLikes(event) {
    const element = event.target.closest('.contributionCard');
    const cardId = element.getAttribute('data-id');
    // console.log(cardId);
    fetch('/disLikes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId: cardId })
    }).then(response => response.json())
        .then(data => {
            const likesCountElement = element.querySelector('.disLikesCount');
            const currentLikesCount = parseInt(likesCountElement.textContent);
            if (JSON.parse(JSON.stringify(data)).message === 'true') {
                likesCountElement.innerText = currentLikesCount + 1;
                element.querySelector('.disLikesIcon').innerHTML = '<i class="fa fa-thumbs-up" style="transform: rotate(180deg);"></i>';
            }
            else {
                likesCountElement.innerText = currentLikesCount - 1;
                element.querySelector('.disLikesIcon').innerHTML = '<i class="fa fa-thumbs-o-up" style="transform: rotate(180deg);"></i>';
            }
            // console.log(JSON.parse(JSON.stringify(data)).message);
        })
}

const link = document.getElementById('submit');

link.addEventListener('click', (event) => {
    document.getElementById('alert').classList.add("show");

    window.scrollTo(0, 0);

    if (window.innerWidth < 900) {
        document.getElementById('alert').innerHTML = '<div style="height: 5vh; width: 54vw; border-radius: 20px; background: #242424; display: flex; align-items: center; justify-content: center;"><div id="lottieTick" style="height: 4vh; width: 4vh;"></div><p style="color: white; font-size: 0.7rem;"><span style="color: blueviolet">S</span>uccess <span style="color: blueviolet">!</span>! <span style="color: blueviolet">C</span>ontribution <span style="color: blueviolet">A</span>dded.</p></div>';
    }
    else {
        document.getElementById('alert').innerHTML = '<div style="height: 5vh; width: 50vw; border-radius: 20px; background: #242424; display: flex; align-items: center; justify-content: center;"><div id="lottieTick" style="height: 6.5vh; width: 6.5vh;"></div><p style="color: white; font-size: 1.5rem;"><span style="color: blueviolet">S</span>uccess <span style="color: blueviolet">!</span>! <span style="color: blueviolet">C</span>ontribution <span style="color: blueviolet">A</span>dded.</p></div>';
    }
    showLottieTick();
    setTimeout(() => {
        document.getElementById('alert').innerHTML = '';
    }, 2000);
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