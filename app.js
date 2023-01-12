const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelectorAll('.main-content');

const typedTextMainSpan = document.querySelector(".typed-text");
const typedTextPreSpan = document.querySelector(".typed-text-prefix");
const typedTextPerSpan = document.querySelector(".typed-text-period");
let typedTextCurSpan=typedTextPreSpan;
const cursorSpan = document.querySelector(".cursor");

const textArray = ["A Software Dev.", "An Engineer.", "A Game Dev.", "A Web Dev."];
const typingDelay = 200;
const erasingDelay = 100;
const loadDelay = 1500;
const newWordDelay = 1100;
const eraseCurWordDelay = 2000;
    
let textArrayIndex = 0;
let charIndex = 0;
let spaceIndex = 0;

function type()
{
    
    if(textArray[textArrayIndex].charAt(charIndex) == ' '  && typedTextCurSpan != typedTextMainSpan) 
    {
        typedTextCurSpan = typedTextMainSpan;
        typedTextCurSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-2);
        spaceIndex = charIndex;
    }
    
    if(charIndex < textArray[textArrayIndex].length){
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextCurSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    }
    else{
        cursorSpan.classList.remove("typing");
        setTimeout(erase, eraseCurWordDelay);
    }
}

function erase(){

    if(spaceIndex == charIndex) typedTextCurSpan = typedTextPreSpan;

    if(charIndex > 0){
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        if(typedTextCurSpan == typedTextMainSpan) typedTextCurSpan.textContent = textArray[textArrayIndex].substring(spaceIndex, charIndex-1);
        else typedTextCurSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    }
    else{
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if(textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, newWordDelay);
    }
}

function Submit(){
    document.getElementById("GFG").submit();
}

function PageTransitions(){
    //Button click active class
    for(let i=0; i < sectBtn.length; i++){
        sectBtn[i].addEventListener('click', function() {
            let currentBtn = document.querySelectorAll('.active-btn');
            currentBtn[0].className = currentBtn[0].className.replace('active-btn', '');
            this.className += ' active-btn';
        })
    } 

    //Sections Active class
    allSections[0].addEventListener('click', (e) =>{
        const id = e.target.dataset.id;
        if(id) {
            //Remove selected from the other btns
            sectBtns.forEach((btn) => {
                btn.classList.remove('active');
            })
            e.target.classList.add('active');

            //Hide other sections
            sections.forEach((section) => {
                section.classList.remove('active');
            })

            const element = document.getElementById(id);
            element.classList.add('active');
        }
    })

    //Toggle theme
    const themeBtn = document.querySelector('.theme-btn');
    themeBtn.addEventListener('click', () => {
        let element = document.body;
        element.classList.toggle('light-mode');
    })
}

PageTransitions();

document.addEventListener("DOMContentLoaded", function() {
    if(textArray.length) setTimeout(type, loadDelay);
}); 
