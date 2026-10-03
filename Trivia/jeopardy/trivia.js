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
    category("February",[
    question(100, "This is her bus seat", "Rosa Parks", false),
    question(200, "A vocal civil rights leader preaching for African Americans to fight back against oppression", "Malcolm X", false),
    question(300, "This was the day that the 13th Amendment of the US Constitution was ratified", "Dec. 6 1865", true),
    question(400, "An escaped slave who taught himself how to read and write, and ended up becoming a massive figure in the abolitionist movement writing 3 books about his life", "Frederick Douglass", false),
    question(500, "The first Black student to attend an all white school in New Orleans, Louisiana", "Ruby Bridges", false),
]),
category("March", [
    question(100, "The notorious R.B.G spent her days on the supreme court and became one of the first women to lay in state at the Capitol", "Ruth Bader Ginsburg", false),
    question(200, "Broke countless aviation records and became one of the first female pilots to solo fly across the Atlantic", "Amelia Earhart", false),
    question(300, "Popularized during the 1940s, this icon help push women into the workforce","Rosie the Riveter", false),
    question(400, "'Keep your face to the sunshine and you cannot see a shadow' quoted from someone whose only sense was justice ", "Helen Keller", false),
    question(500, "With a baby on her back, while still a teenager, she pioneered across the unexplored American wilderness in the 1800s", "Sacagawea", false),
]),
category("May", [
    question(100, "The first Asian American to serve as the Vice President of the United States", "Kamala Harris", false),
    question(200, "This Doctor turned Actor hosts the Mask Singer", "Ken Jeong", false),
    question(300, "American born, this fighter brought chinese martial arts into western media", "Bruce Lee", false),
    question(400, "Doubted due to his race, this not-even bench warmer finally got his chance and dropped 38 on Kobe Bryant", "Jeremy Lin", true),
    question(500, "Flipping the script, this actor became one of the first Asian Americans to play a major non-stereotyped role on Star Trek: The Original Series", "George Takei", false),
]),
category("June", [
    question(100, "The singing king in Queen", "Freddie Mercury", false),
    question(200, "This American singer/songwriter took the United States by storm topping the US Billboard Hot 100 at #4 with 'Good Luck Babe'", "Chappell Roan", false),
    question(300, "Mathematician, Computer Scientist, War Hero: What can't this english puzzle solver do?", "Alan Turing", false),
    question(400, "Known for his unequaled diplomacy, this 19th century prussian leader is credited with the unification of Germany", "Frederick the Great", false),
    question(500, "The first acknowledged gay and female american to launch into space", "Sally Ride", false),
]),
category("Shitsville", [
    question(100, "What's the capital of Canada?", "Ottawa", false),
    question(200, "Known for doing black face and also served time as the leader of a minor power in the world", "Justin Trudeau", false),
    question(300, "This structure stood unrivaled as the tallest freestanding structure in the world for over 3 decades", "The CN Tower", false),
    question(400, "This great one once said 'you miss 100% of the shots you don't take", "Wayne Gretzky", false),
    question(500, "Voted as the Greatest Canadian, he and his cabinet brought forth North America's first single-payer universal health care program", "Tommy Douglas", false),
]),
category("Acapella", [
    question(100, "./audio/badguy.mp3", "Bad Guy - Billie Eillish", false, 'audio'),
    question(200, "./audio/brightside.mp3", "Mr. Brightside - The Killers", false, 'audio'),
    question(300, "./audio/imissyou.mp3", "I Miss You - Blink182", false, 'audio'),
    question(400, "./audio/stickseason.mp3", "Stick Season - Noah Kahan", false, 'audio'),
    question(500, "./audio/demons.mp3", "Demons - Imagine Dragons", false, 'audio'),
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
