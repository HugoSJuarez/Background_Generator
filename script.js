const inputColors = document.querySelectorAll(".color-input");
const colorFront = document.querySelectorAll(".color-front");

inputColors.forEach((input,i) => {
    input.addEventListener("change",(e)=>{
        let color = e.target.value;
        colorFront[i].style.backgroundColor=color;
    })
});

colorFront.forEach((color, i) =>{
    color.addEventListener("click", ()=>{
        inputColors[i].click();
    })
})