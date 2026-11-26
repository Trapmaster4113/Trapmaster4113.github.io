question = function(points, q, a, dailyDouble, extra="none") {
    let self = {
        category:category,
        points:points,
        q:q,
        a:a,
        dailyDouble:dailyDouble,
        extra:extra
    };
    return self;
}
category = function(name, qs) {
    let self = {
        name:name,
        qs:qs,
    };
    return self;
}
var lastQuestion = 0;
var questions = [
    category("Christmas",[
    question(100, "In the 19th century, a popular folktale came about where misbehaving kids would get this rock in lieu of presents", "Coal", false),
    question(200, "This high hanging plant makes people fall in love", "Mistletoe", false),
    question(300, "How many reindeer are mentioned in the Rudolph song?", "9", false),
    question(400, "Officially recognized by this Nordic Country, Santa Claus lives in this country", "Finland", false),
    question(500, "How old is Santa Claus?", "1750ish", false),
]),
    category("Earth Day",[
    question(100, "This is the longest river in the world", "The Nile River", false),
    question(200, "Seen in the Arctic Sky, this natural wonder dazzles spectators with northern lights", "Aurora Borealis", false),
    question(300, "Down under, this sea forest is actively getting destroyed by climate change", "Great Barrier Reef", false),
    question(400, "After Mount Everest, this is the next tallest mountain", "K2", false),
    question(500, "This politician is credited for founding Earth Day", "Gaylord Nelson", false),
]),
    category("Halloween",[
    question(100, "This movie depicts a skeleton trying to reinvigorate joy for his favorite holiday by stealing ideas from another", "Nightmare before Christmas", false),
    question(200, "This candy was made to feed troops during WW2, but has also become a household name and a rapper’s tag", "M&Ms", false),
    question(300, "Stingy Jack is folklore originating in Ireland, who has this as his head", "Jack o Lantern", false),
    question(400, "This is the most popular Halloween candy in America", "Reeses", false),
    question(500, 'During the movie E.T., the alien is lured out using this candy', "Reese’s Pieces", false),
]),
    category("Thanksgiving",[
    question(100, "Nothing is more American than this Holiday and its classic American dessert", "Apple Pie", false),
    question(200, "This berry is used to make red sauce eaten with Turkey", "Cranberry", false),
    question(300, "This is the boat the pilgrims rode on", "Mayflower", false),
    question(400, "This technique uses oil or butter spooned onto a turkey to make the skin crispy", "Basting", false),
    question(500, "This is when Canadian Thanksgiving is celebrated", "2nd Monday of October", false),
]),
    category("Random Days",[
    question(100, "Celebrated on the 3rd Monday of January, it marks the end of winter vacation right before the start of the college spring semester", "MLK Jr. Day", false),
    question(200, "Widely known by nerds, this day is celebrated on March 14th", "Pie Day", false),
    question(300, "This Hispanic holiday is celebrated to honor the dead", "Cinco De Mayo", false),
    question(400, "This is when International Women's Day is", "March 8th", false),
    question(500, "This is when International Men's Day is", "November 19th", false),
]),
];
var gameBoard = document.getElementById("game-board");
var categories = document.getElementById("header");
var teamFooter = document.getElementById("teams");
const numCat = questions.length; 
gameBoard.style.gridTemplateColumns = `repeat(${numCat}, 1fr)`;
categories.style.gridTemplateColumns = `repeat(${numCat}, 1fr)`;
const ROYGBIV = [
    "#FF0000", // Red
    "#FF7F00", // Orange
    "#FFFF00", // Yellow
    "#00AA00", // Green
    "#0000FF", // Blue
    "#8B00FF",  // Violet
];
if (!(questions.length <= 0)) {
    for (let i of questions) {
        const p = document.createElement("p");
        p.textContent = i.name;
        p.className = "categoryCell";
        categories.appendChild(p);
    }
    for (let j = 0; j < questions[0].qs.length; j++) {
        for (let i = 0; i < questions.length; i++) {
            let q = questions[i].qs[j];
            const p = document.createElement("p");
            const btn = document.createElement("button");
            btn.textContent = q.points;
            btn.className = "cell";
            btn.addEventListener("click", function() {
                askQuestion(q, btn);
            }); 
            p.appendChild(btn);
            gameBoard.appendChild(p);
        }
    }
}
function askQuestion(question,btn) {
    lastQuestion = question.points;
    console.log(question.q);
    const popUp = document.createElement("dialog");
    popUp.className = "popup";
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    const buttonRow = document.createElement('div');
    switch (question.extra) {
        case "audio":
            const S = document.createElement("AUDIO");
            S.src = question.q;
            S.controls = true;
            S.volume = 0.5;
            popUp.appendChild(S);
            closeButton.addEventListener('click', () => {
                popUp.close();
                popUp.remove();
            });
            break;
        case "image":
            const I = document.createElement("img");
            I.src = question.q;
            I.style.maxWidth = "100%";
            I.style.maxHeight = "300px";
            popUp.appendChild(I);
            closeButton.addEventListener('click', () => {
                popUp.close();
                popUp.remove();
            });
            break;
        default:
            const Q = document.createElement("p");
            popUp.appendChild(Q);
            let index = 0;
            let paused = false;
            const text = question.q;
            const typingInterval = setInterval(() => {
                if (!paused && index < text.length) {
                    Q.textContent += text[index];
                    index++;
                }
                if (index >= text.length) {
                    clearInterval(typingInterval);
                    pauseButton.disabled = true; // disable pause when done
                }
            }, 50); // 50ms per character, lower = faster
            const pauseButton = document.createElement("button");
            pauseButton.textContent = "Pause";
            pauseButton.addEventListener("click", () => {
                paused = !paused;
                pauseButton.textContent = paused ? "Resume" : "Pause";
            });
            closeButton.addEventListener('click', () => {
                clearInterval(typingInterval);
                popUp.close();
                popUp.remove();
            });
            buttonRow.appendChild(pauseButton);
            break;
    }
    const A = document.createElement("p");
    A.textContent = question.a;
    A.style.display = "none"; 
    buttonRow.className = "popup-buttons";
    const showAnswer = document.createElement('button');
    showAnswer.textContent = 'Answer';
    showAnswer.addEventListener('click', () => {
        A.style.display = "flex";
        btn.disabled = true;
    })
    if (question.dailyDouble) {
        popUp.classList.add("daily-double");
    }
    popUp.appendChild(A);
    buttonRow.appendChild(showAnswer);
    buttonRow.appendChild(closeButton);
    popUp.appendChild(buttonRow);
    document.body.appendChild(popUp);
    popUp.showModal(); 
}
var teams = [];
function addTeam() {
    const color = ROYGBIV[teams.length % ROYGBIV.length];
    let points = 0;
    const teamBanner = document.createElement("div");
    teamBanner.className = "teamCell";
    teamBanner.style.backgroundColor = color;
    const team = document.createElement("p");
    team.textContent = "Team " + (teams.length + 1);
    const minus = document.createElement("button");
    minus.textContent = "-";
    minus.addEventListener("click", () => {
        points-=lastQuestion;
        teamPoints.value = points;
    });

    const teamPoints = document.createElement("input");
    teamPoints.type = "text";
    teamPoints.value = points;
    teamPoints.addEventListener("change", () => {
        const parsed = parseInt(teamPoints.value);
        if (!isNaN(parsed)) {
            points = parsed;
        } else {
            teamPoints.value = points;
        }
    });

    const plus = document.createElement("button");
    plus.textContent = "+";
    plus.addEventListener("click", () => {
        points+=lastQuestion;
        teamPoints.value = points;
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.addEventListener("click", () => {
        teamFooter.removeChild(teamBanner);
        teams.splice(teams.indexOf(teamBanner), 1);
    });

    teamBanner.appendChild(team);
    teamBanner.appendChild(minus);
    teamBanner.appendChild(teamPoints);
    teamBanner.appendChild(plus);
    teamBanner.appendChild(removeBtn);

    teams.push(teamBanner);
    teamFooter.appendChild(teamBanner);
}
function rules() {
    const rule = document.createElement("dialog");
    rule.className = "rule";
    const p = document.createElement("p");
    p.innerHTML = "Regular Jeopardy Rules:<br>"+
" - Most points win<br>"+
" - Wrong answers loses points<br>"+
" - Right answers wins points<br>"+
" - Team who buzzes first gets to answer<br>"+
" - Teams who buzz must answer within 5 seconds<br>"+
"Special Rules:<br>"+
" - The first person to get a question wrong will get to pick the next category unless someone after gets the question right<br>"+
" - Multiple Daily Doubles<br>"+
" - Teams may spend 50% of the points a question is worth to force an opponent to answer<br>"+
" - 1 Phone call per team<br>"+
" - Teams may answer a question multiple times if no other team wants to attempt<br>"
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
        rule.close();
        rule.remove();
    });
    rule.appendChild(p);
    rule.appendChild(closeButton);
    document.body.appendChild(rule);
    rule.showModal();
}
