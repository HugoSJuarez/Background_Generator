const body = document.querySelector("body");
const inputColors = document.querySelectorAll(".color-input");
const colorFront = document.querySelectorAll(".color-front");
const colorPercent = document.querySelectorAll(".color-percent-select");
const selectGradient = document.querySelector("#type-gradient");
const inputDegree = document.querySelector("#deg");

const listColors = [];
const listPercentColors = [];
let typeGradient = selectGradient.value;
let degrees = Number(inputDegree.value);


inputColors.forEach((input,i) => {
    colorFront[i].style.backgroundColor = input.value;
    input.addEventListener("input",(e)=>{
        let color = e.target.value;
        colorFront[i].style.backgroundColor=color;
        listColors[i]=color;
        addGradientBackground();
    });
});

colorFront.forEach((color, i) =>{
    listColors.push(color.style.backgroundColor);
    console.log(listColors);
    color.addEventListener("click", ()=>{
        inputColors[i].click();
    });
});

colorPercent.forEach((percent,k)=>{
    listPercentColors.push(percent.value);
    percent.addEventListener("input",(e)=>{
        let percentValue = ( Math.floor( Number(e.target.value)) || 0 );
        percentValue = (percentValue>100) ? 100 : (percentValue <0) ? 0 : percentValue;
        e.target.value = percentValue;
        listPercentColors[k]=percentValue;
        addGradientBackground();
    });
});

selectGradient.addEventListener("change",()=>{
    typeGradient=selectGradient.value;
    addGradientBackground();
});

inputDegree.addEventListener("input",()=>{
    degrees=( Math.floor( Number(inputDegree.value) % 360) || 0 );
    inputDegree.value=degrees;
    addGradientBackground();
});



addGradientBackground();


function addGradientBackground(){
    let styleBg = typeGradient;
    styleBg += (typeGradient!=="radial-gradient") ? "("+degrees+"deg, " : "(";
    listColors.forEach((color,j) =>{
        styleBg += color + " "+ listPercentColors[j] + "%";
        if( j !== (listColors.length-1)){
            styleBg += ", ";
        }
    });
    styleBg += ")";
    body.style.backgroundImage = styleBg;
}


