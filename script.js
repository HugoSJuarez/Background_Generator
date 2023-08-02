const body = document.querySelector("body");
const inputColors = document.querySelectorAll(".color-input");
const colorFront = document.querySelectorAll(".color-front");
const selectGradient = document.querySelector("#type-gradient");

const listColors = ["#00ff00", "#ff0000"];
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
    console.log(typeGradient);
    addGradientBackground();
})

function addGradientBackground(){
    let styleBg = typeGradient + "(90deg , ";
    listColors.forEach((color,j) =>{
        styleBg += color;
        if( j !== (listColors.length-1)){
            styleBg += ", ";
        }
    });
    styleBg += ")";
    body.style.backgroundImage = styleBg;
}