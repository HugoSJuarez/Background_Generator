const body = document.querySelector("body");
const inputColors = document.querySelectorAll(".color-input");
const colorFront = document.querySelectorAll(".color-front");
const colorPercent = document.querySelectorAll(".color-percent-select");
const selectGradient = document.querySelector("#type-gradient");
const inputDegree = document.querySelector("#deg");
const allColors = document.querySelector("#colors");
const buttonAdd = document.querySelector("#add-color");

const listColors = [];
const listPercentColors = [];
let typeGradient = selectGradient.value;
let degrees = Number(inputDegree.value);

const wheelLimit = 4;
let numberWheels;

// Gradient Generator

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

// Add more colors

buttonAdd.addEventListener("click", ()=>{
    numberWheels=listColors.length + 1;
    if (numberWheels <= wheelLimit) {
        createColorWheel(numberWheels);
        if(numberWheels === wheelLimit) {
            buttonAdd.style.display = "none";
        }
    }
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

function createColorWheel(numberAdded){
    // Create a color selection element
    let colorSelection =  document.createElement("div");
    colorSelection.classList.add("color-selection");

    let deleteBtn = document.createElement("div");
    deleteBtn.classList.add("btn-delete");

    let btnLogo = document.createElement("i");
    btnLogo.classList.add("fa-solid", "fa-trash");
    deleteBtn.appendChild(btnLogo);
    colorSelection.appendChild(deleteBtn);

    let colorFront = document.createElement("span");
    colorFront.setAttribute("id", ( "color-front"+ numberAdded ) );
    colorFront.classList.add("color-front");
    

    let inputColor = document.createElement("input");
    inputColor.classList.add("color-input");
    inputColor.setAttribute("type","color");
    inputColor.setAttribute("name",( "color" + numberAdded ));
    inputColor.setAttribute("value", "#ffffff" );
    colorFront.style.backgroundColor=inputColor.value;
    
    inputColor.addEventListener("input", (e)=>{
        let color = e.target.value;
        colorFront.style.backgroundColor = color;
        listColors[numberAdded-1]=color;
        addGradientBackground();
    });
    listColors.push(colorFront.style.backgroundColor);
    colorFront.addEventListener("click", ()=>{
        inputColor.click();
    });
    
    colorSelection.appendChild(inputColor);
    colorSelection.appendChild(colorFront);

    let colorPercent = document.createElement("span");
    colorPercent.classList.add("color-percent");

    let inputPercent = document.createElement("input");
    inputPercent.classList.add("color-percent-select");
    inputPercent.setAttribute("type", "text");
    inputPercent.setAttribute("value","100");
    inputPercent.setAttribute("name", ( "color" + numberAdded + "-percent" ) );
    colorPercent.appendChild(inputPercent);

    let percentLogo = document.createElement("i");
    percentLogo.classList.add("fa-solid", "fa-percent", "percentage");
    colorPercent.appendChild(percentLogo);

    listPercentColors.push(inputPercent.value);
    inputPercent.addEventListener("input",(e)=>{
        let percentValue = ( Math.floor( Number(e.target.value)) || 0 );
        percentValue = (percentValue>100) ? 100 : (percentValue <0) ? 0 : percentValue;
        e.target.value = percentValue;
        listPercentColors[numberAdded-1]=percentValue.toString();
        addGradientBackground();
    });    

    colorSelection.appendChild(colorPercent);

    allColors.appendChild(colorSelection);
    addGradientBackground();
}