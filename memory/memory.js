const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartButton = document.querySelector("#restartButton");
let options = ["1","1","2","2","3","3","4","4","5","5","6","6","7","7","8","8","9","9","10","10","11","11","12","12","13","13","14","14","15","15","16","16"];
let running = false;
let click = 0;
let guess1 = "";
let guess2 = "";
initGame();
function initGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartButton.addEventListener("click", restart);
    statusText.textContent = `Clicks: ${click}`;
    randomize(options);
    running = true;
}
function randomize(l) {
    let h = l.length;
    for (let i = 0; i < h**4; i++) {
        for (let j = 0; j < h; j++) {
            let k = Math.floor(Math.random()*h);
            [l[j], l[k]]=[l[k],l[j]];
        }
    }
}
function nothing(one, two) {
    //window.alert("nothing");
    cells[one].textContent = "";
    cells[two].textContent = "";
    running = true;
}
function cellClicked(){
    if (running && this.textContent == "") {
        const cellIndex = this.getAttribute("cellIndex");
        this.textContent = options[cellIndex];
        if (guess1 == "") {
            //window.alert("Guess1");
            guess1 = cellIndex;
        }
        else {
            guess2  = cellIndex;
            //window.alert(`${cells[guess1].textContent} and ${cells[guess2].textContent}`);
            //window.alert("Guess2");                                     
            if (cells[guess1].textContent != cells[guess2].textContent) {
                //window.alert("Fail");
                running = false;
                setTimeout(nothing, 1200, guess1, guess2);
                //window.alert("after");
            }
            //window.alert("test");
            guess1 = "";
            guess2 = "";
        }
        click = click + 1;
        statusText.textContent = `Clicks: ${click}`;
        over();
    }
}
function over() {
    let over = true;
    for (let m = 0; m < cells.length; m++) {
        if (cells[m].textContent == ""){
            over = false;
            break;
        }
    }
    if (over) {
        running = false; 
        statusText.textContent = `Done! Clicks: ${click}`;
    }
}
function restart() {
    cells.forEach(cell => cell.textContent = "");
    randomize(options);
    click = 0;
    statusText.textContent = `Clicks: ${click}`;
    running = true;
    guess1 = "";
    guess2 = "";
}