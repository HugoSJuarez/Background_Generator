const body = document.querySelector("body");
const inputColors = document.querySelectorAll(".color-input");
const colorFront = document.querySelectorAll(".color-front");
const colorPercent = document.querySelectorAll(".color-percent-select");
const selectGradient = document.querySelector("#type-gradient");
const inputDegree = document.querySelector("#deg");
const allColors = document.querySelector("#colors");
const buttonAdd = document.querySelector("#add-color");
const buttonDelete = document.querySelectorAll(".btn-delete");
const textGradient = document.querySelector("h3");


const listColors = [];
const listPercentColors = [];
let typeGradient = selectGradient.value;
let degrees = Number(inputDegree.value);

const wheelLimit = 4;
let numberWheels;

// Gradient Generator
inputColors.forEach((input,i) => {
    addInputColorEvent(input, colorFront[i], i)
});

colorFront.forEach((color, i) =>{
    addColorFrontEvent(color,inputColors[i]);
});

colorPercent.forEach((percent,k)=>{
    addPercentColorEvent(percent, k);
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

// Delete colors
buttonDelete.forEach((del, l) =>{
    deleteColorWheelEvent(del, l);
});

// Run gradient Background generator so the first two colorWheels design the background
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
    textGradient.textContent = styleBg;

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
    deleteColorWheelEvent(deleteBtn, numberAdded-1);
    colorSelection.appendChild(deleteBtn);

    let colorFront = document.createElement("span");
    colorFront.setAttribute("id", ( "color-front"+ numberAdded ) );
    colorFront.classList.add("color-front");
    

    let inputColor = document.createElement("input");
    inputColor.classList.add("color-input");
    inputColor.setAttribute("type","color");
    inputColor.setAttribute("name",( "color" + numberAdded ));
    inputColor.setAttribute("value", "#ffffff" );
    
    addInputColorEvent(inputColor, colorFront, numberAdded-1);
    addColorFrontEvent(colorFront,inputColor)
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

    addPercentColorEvent(inputPercent, numberAdded-1);
    colorSelection.appendChild(colorPercent);

    allColors.appendChild(colorSelection);
    addGradientBackground();
}

function addInputColorEvent(inputColor, colorFront, i){
    colorFront.style.backgroundColor = inputColor.value;
    inputColor.addEventListener("input",(e)=>{
        let color = e.target.value;
        colorFront.style.backgroundColor=color;
        listColors[i]=color;
        addGradientBackground();
    });
}

function deleteColorWheelEvent(del, l){
    del.addEventListener("click", ()=>{
        if (numberWheels>2){
            del.parentElement.remove();
            listColors.splice(l,1);
            listPercentColors.splice(l,1);
            numberWheels--;
            console.log(numberWheels);
            addGradientBackground();
        }
        if (numberWheels === (wheelLimit-1)){
            buttonAdd.style.display="flex";
        }
    });
}

function addPercentColorEvent(percent, k){
    listPercentColors.push(percent.value);
    percent.addEventListener("input",(e)=>{
        let percentValue = ( Math.floor( Number(e.target.value)) || 0 );
        percentValue = (percentValue>100) ? 100 : (percentValue <0) ? 0 : percentValue;
        e.target.value = percentValue;
        listPercentColors[k]=percentValue;
        addGradientBackground();
    });
}

function addColorFrontEvent(color,input){
    listColors.push(color.style.backgroundColor);
    color.addEventListener("click", ()=>{
        input.click();
    });
}