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





let scrollContainer = document.querySelector('#menu_item');
let back_btn = document.getElementById('l_btn');
let next_btn = document.getElementById('r_btn');
var ff = 0;
var open_or_close_btn;
// if(screen.width==0){
//     i
// }
scrollContainer.addEventListener('wheel', function (e) {   // For scrollig the menu items horizontally
    e.preventDefault(); // prevent default scrolling
    // let deltaY = -Math.sign(e.deltaX);
    scrollContainer.scrollLeft += e.deltaY;
    scrollContainer.style.scrollBehavior = "auto";
});

next_btn.addEventListener('click', () => {   // For right arrow in menu bar
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.scrollLeft += 30;
})

let scrollingInterval;   // Long press of right arrow for faster scroll
function startScrolling() {
    scrollingInterval = setInterval(scrollContent, 10);
}
function stopScrolling() {
    clearInterval(scrollingInterval);
}
function scrollContent() {
    scrollContainer.style.scrollBehavior = "auto";
    if (scrollContainer.scrollLeft < scrollContainer.scrollWidth) {
        scrollContainer.scrollLeft += 5;
    }
}

back_btn.addEventListener('click', () => {   // For left arrow in menu bar
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.scrollLeft -= 30;
})

let scrollingInterval1;   // Long press of left arrow for faster scroll
function startScrolling1() {
    scrollingInterval1 = setInterval(scrollContent1, 10);
}
function stopScrolling1() {
    clearInterval(scrollingInterval1);
}
function scrollContent1() {
    scrollContainer.style.scrollBehavior = "auto";
    if (scrollContainer.scrollLeft < scrollContainer.scrollWidth) {
        scrollContainer.scrollLeft -= 5;
    }
}



var open_close = 0;
var f = 0;
var content_links = document.getElementsByClassName("content_link");
var contents = document.getElementsByClassName("content0");
var sides = document.getElementsByClassName("side0");
// var a_n = document.getElementsByClassName("a");
// var ab_n = document.getElementsByClassName("ab");
let searchbox = document.getElementById("search_tab").value;
searchbox = searchbox.toLowerCase();
let contentlink = document.getElementsByClassName("content_link");
let flag = 0;
function open_content(content_name) {   // For clicking the menu item in the top menu bar and opening the content

    for (i of content_links) {
        i.classList.remove("active_link");
    }
    for (i of contents) {
        i.classList.remove("active_content");
    }
    event.currentTarget.classList.add("active_link");
    for (let i = 0; i < contentlink.length; i++) {
        if (contentlink[i].classList.contains("active_link")) {
            flag = i;
            break;
        }
    }
    document.getElementById(content_name).classList.remove("add");
    document.getElementById(content_name).classList.add("active_content");
    for (let i = 0; i < contents.length; i++) {
        if (contents[i].classList.contains("active_content")) {
            f = i;
            break;
        }
    }
    // document.getElementById(content_name).scrollIntoView();

    if (ff == 1) {
        open_or_close_btn.classList.remove("openitem");
    }
}

function open_side_content(content_name) {   // For clicking the menu item in the top menu bar and opening the side content
    for (i of sides) {
        i.classList.remove("active_side");
    }
    document.getElementById(content_name).classList.remove("remove");
    document.getElementById(content_name).classList.add("active_side");

    for (let i = 0; i < sides.length; i++) {
        if (sides[i].classList.contains("active_side")) {
            open_close = i;
            break;
        }
    }
}

function open_sub_content(name, _name) {
    var _name1 = document.getElementsByClassName(_name);
    for (i of _name1) {
        i.style.color = "black";
    }
    document.getElementById(name).style.color = "blueviolet";
    document.getElementById(name).scrollIntoView();
}

function colorchange(id, id1) {
    var _id = document.getElementsByClassName(id1);
    for (i of _id) {
        i.style.color = "white";
    }
    document.getElementById(id).style.color = "rgb(195, 131, 255)";
}


let enter = 0;
let signal = 0;
let count;
function search() {   // For Searching in the Searchbar
    searchbox = document.getElementById("search_tab").value;
    searchbox = searchbox.toLowerCase();
    contentlink = document.getElementsByClassName("content_link");
    count = 0;
    for (let i = 0; i < contentlink.length; i++) {
        if (searchbox == "") {
            if (contentlink[i] == contentlink[flag]) {
                contentlink[i].classList.add("active_link");
                contentlink[i].scrollIntoView();
            }
            else {
                contentlink[i].classList.remove("active_link");
            }
        }
        else if (!contentlink[i].innerHTML.toLowerCase().includes(searchbox)) {
            contentlink[i].classList.remove("active_link");
            if (contentlink[i] == contentlink[flag]) {
                contentlink[i].scrollIntoView();
            }
        }
        else {
            contentlink[i].classList.add("active_link");
            contentlink[i].scrollIntoView();
            signal = i;
            count = count + 1;
        }
    }

}
var search_cross = 0;
var content0 = document.getElementsByClassName("content0");
var side0 = document.getElementsByClassName("side0");
const input = document.getElementById("search_tab");
input.addEventListener("keyup", (event) => {  // For Enter Key is pressed!
    if (event.key === "Enter" && count == 1) {
        search_cross = 1;
        for (let i = 0; i < content0.length; i++) {
            content0[i].classList.remove("active_content");
            if (i == signal) {
                content0[signal].classList.add("active_content");
            }
        }
        for (let i = 0; i < side0.length; i++) {
            side0[i].classList.remove("active_side");
            if (i == signal) {
                side0[signal].classList.add("active_side");
            }
        }
        for (let i = 0; i < contentlink.length; i++) {
            if (contentlink[i].classList.contains("active_link")) {
                flag = i;
                break;
            }
        }
        for (let i = 0; i < sides.length; i++) {
            if (sides[i].classList.contains("active_side")) {
                open_close = i;
                break;
            }
        }
        for (let i = 0; i < contents.length; i++) {
            if (contents[i].classList.contains("active_content")) {
                f = i;
                break;
            }
        }
    }
});



function op_or_cl() {
    open_or_close_btn = document.getElementById("open_or_close");
    open_or_close_btn.classList.toggle("openitem");
    if (open_or_close_btn.classList.contains("openitem")) {
        ff = 1;
    }
    contents[f].classList.toggle("add");
    sides[open_close].classList.toggle("remove");
}

function setWidth() {
    const sibling = document.getElementById('side');
    const element = document.getElementById('content');

    const siblingWidth = sibling.offsetWidth; // get the width of the sibling element
    element.style.width = `calc(100% - ${siblingWidth}px)`; // set the width of the element
}
setWidth();
// const observer = new ResizeObserver(() => {
//     const siblingWidth = sibling.offsetWidth;
//     element.style.width = `calc(100% - ${siblingWidth}px)`;
//   });

//   observer.observe(sibling);

const animationContainer = document.getElementById('dropdown_button1');
const animationData = '../resourses/user.json'; // Path to your downloaded JSON file
const anim = bodymovin.loadAnimation({
    container: animationContainer,
    renderer: 'svg', // Choose the renderer (svg, canvas, html)
    loop: true, // Set to true for looping
    autoplay: true, // Set to true for auto-play
    path: animationData,
});