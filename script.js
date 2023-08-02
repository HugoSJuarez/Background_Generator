const body = document.querySelector("body");
const inputColors = document.querySelectorAll(".color-input");
const colorFront = document.querySelectorAll(".color-front");
const colorPercent = document.querySelectorAll(".color-percent-select");

const selectGradient = document.querySelector("#type-gradient");

const listColors = ["#4776E6", "#8E54E9"];
const listPercentColors = [0, 100];
let typeGradient = selectGradient.value;

addGradientBackground();

colorFront.forEach((color, i) =>{
    color.addEventListener("click", ()=>{
        inputColors[i].click();
    });
});

inputColors.forEach((input,i) => {
    input.addEventListener("input",(e)=>{
        let color = e.target.value;
        colorFront[i].style.backgroundColor=color;
        listColors[i]=color;
        addGradientBackground();
    });
});

selectGradient.addEventListener("change",()=>{
    typeGradient=selectGradient.value;
    addGradientBackground();
});

colorPercent.forEach((percent,k)=>{
    percent.addEventListener("input",(e)=>{
        let percentValue = ( Math.floor( Number(e.target.value)) || 0 );
        percentValue = (percentValue>100) ? 100 : (percentValue <0) ? 0 : percentValue;
        e.target.value = percentValue;
        listPercentColors[k]=percentValue;
        addGradientBackground();
    });
});

function addGradientBackground(){
    let styleBg = typeGradient;
    styleBg += (typeGradient!=="radial-gradient") ? "(90deg ," : "(";
    listColors.forEach((color,j) =>{
        styleBg += color + " "+ listPercentColors[j] + "%";
        if( j !== (listColors.length-1)){
            styleBg += ", ";
        }
    });
    styleBg += ")";
    console.log(styleBg);
    body.style.backgroundImage = styleBg;
}


