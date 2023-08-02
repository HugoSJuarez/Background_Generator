const body = document.querySelector("body");
const inputColors = document.querySelectorAll(".color-input");
const colorFront = document.querySelectorAll(".color-front");
const selectGradient = document.querySelector("#type-gradient");
let typeGradient = selectGradient.value;



const listColors = ["#00ff00", "#ff0000"];
addBackground();

function addBackground(){
    let styleBg = typeGradient + "(to right, ";
    listColors.forEach((c,j) =>{
        styleBg += c;
        if( j !== (listColors.length-1)){
            styleBg += ", ";
        }
    });
    styleBg += ")";
    body.style.backgroundImage = styleBg;
    console.log(styleBg)
    console.log(body.style.backgroundImage);
}

inputColors.forEach((input,i) => {
    input.addEventListener("input",(e)=>{
        let color = e.target.value;
        colorFront[i].style.backgroundColor=color;
        listColors[i]=color;
        
        addBackground();
    });
});

colorFront.forEach((color, i) =>{
    color.addEventListener("click", ()=>{
        inputColors[i].click();
    });
});