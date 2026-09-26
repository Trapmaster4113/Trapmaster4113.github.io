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
    category("Youtube Shorts",[
    question(100, "This medic was called a coward, but saved dozens of men at Hacksaw Ridge", "Desmond Doss", false),
    question(200, "This financial expert swapped his profile picture to Christian Bale, who plays him in The Big Short", "Michael Burry", false),
    question(300, "This nepo-hire prison guard tortured inmates at the Green Mile", "Percy Westmoreland", false),
    question(400, "Falsely convicted, this banker had to go to prison to become a crook", "Andy Dufresne", false),
    question(500, "This is Magic Johnson's real name:", "Earvin", false),
]),
    category("World Wonders",[
    question(100, "Statue of Liberty", "United States", false),
    question(200, "Chichen Itza", "Mexico", false),
    question(300, "Christ the Reedemer", "Brazil", false),
    question(400, "Machu Picchu", "Peru", false),
    question(500, "Petra", "Jordan", false),
]),
    category("Disney",[
    question(100, "Who does the Rock play in Moana", "Maoi", false),
    question(200, "Who is the main girl in Inside Out", "Riley Andersen", false),
    question(300, "The Madrigal Family song this madrigal to talk about their long lost boy", "We don't talk about Bruno", false),
    question(400, "Who is the main character in Big Hero 6?", "Hiro Hamada", false),
    question(500, 'Traitorous Hans originates from this Kingdom', "The Southern Isles", false),
]),
    category("Greek Mythology",[
    question(100, "Sail past the Styx, this guy rules the Underworld", "Hades", false),
    question(200, "Married to Aphrodite, he forges the weapons of the gods", "Hephaestus", false),
    question(300, "Born twins to Zeus, these gods portray the Sun and the Moon", "Apollo and Athena", false),
    question(400, "Party Time! This god knows how to have a good time", "Dionysus", false),
    question(500, "This is the goddess of Victory", "Nikke", false),
]),
    category("Math",[
    question(100, "16 * 16", "256", false),
    question(200, "3!!", "720", false),
    question(300, "How many feet are in a mile", "5280", false),
    question(400, "How many minutes are in a year", "525600", false),
    question(500, "This function is used by calculating the ratio of the opposite side over the adjacent side in a triangle", "placeholder", false),
]),
    category("Non-English Songs",[
    question(100, "./audio/Despacito.m4a", "Despacito - Lui Fonsi", false),
    question(200, "YourIdol.m4a", "Your Idol - Kpop Demon Hunters ", false),
    question(300, "DragosteaDinTei.m4a", "Dragostea Din Tei - Ozon", false),
    question(400, "King.m4a", "King - Kanaria", false),
    question(500, "BabaYetu.m4a", "Baba Yetu - Christopher Tin", false),
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
