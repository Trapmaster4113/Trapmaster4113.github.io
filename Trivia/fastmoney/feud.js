var questions = [
    "What's the worst month: ",
    "What age were you when you first drove a car?",
    "What's the most popular video game?",
    "What's your favorite Olympic sport?",
    "What character do you play in Mario Kart?",
    "What's your go to breakfast?",
];
var teamInput = document.getElementById("teamNum");
const teamsButton = document.getElementById("enterTeams");
var teams;
teamsButton.addEventListener("click", () => {
    teams = teamInput.valueAsNumber;
});
var table = document.getElementById("answerBoard");
var answers = [];
function showAnswers() {
    let fr = document.createElement('tr');
    let th = document.createElement('th');
    fr.appendChild(th);
    for (let t = 1; t <= teams; t++) {
        let th = document.createElement('th');
        th.colSpan = 2;
        let hideButton = document.createElement('button');
        let hidden = false;
        hideButton.textContent = 'Hide Team ' + (t);
        hideButton.addEventListener('click', () => {
            const elements = document.querySelectorAll('.answer' + t);
            hidden = !hidden;
            elements.forEach(e=>e.style.display = hidden ? 'none' : '');
            hideButton.textContent = hidden ? 'Show Team ' + t : 'Hide Team ' + t;
        });
        th.appendChild(hideButton)
        fr.appendChild(th);
    }
    table.appendChild(fr);
    for (let i = 0; i < questions.length; i++) {
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            let p = document.createElement('p');
            p.textContent = questions[i];
            td.appendChild(p);
            tr.appendChild(td);
            for (let j = 1; j <= teams; j++) {
                let td1 = document.createElement('td');
                td1.classList.add('answer'+(j));
                let p = document.createElement('p');
                p.textContent = answers[(j-1)][i];
                td1.appendChild(p);
                tr.appendChild(td1);
                let td2 = document.createElement('td');
                td2.classList.add('team'+(j));
                let input2 = document.createElement('input');
                input2.type = 'number';
                td2.appendChild(input2);
                tr.appendChild(td2);
            }
            table.appendChild(tr);
    }
    let lr = document.createElement('tr');
    let ltd = document.createElement('td');
    let total = document.createElement('button');
    total.textContent = "Total";
    ltd.appendChild(total);
    lr.appendChild(ltd);
    total.addEventListener('click', () => {
        for (let i = 1; i <= teams; i++) {
            let column = document.querySelectorAll('.team'+i);
            let sum = 0;
            column.forEach(c => {
                const val = parseInt(c.querySelector('input').value);
                if (!isNaN(val)) sum+=val;
            });
            let td1 = document.createElement('td');
            let p1 = document.createElement('p');
            p1.textContent = 'Team ' + i;
            td1.appendChild(p1);
            lr.appendChild(td1);
            let td2 = document.createElement('td');
            let p2 = document.createElement('p');
            p2.textContent = sum;
            td2.appendChild(p2);
            lr.appendChild(td2);
        }
        this.disabled = true;
    }, {once: true});
    table.appendChild(lr);
}
var questionsTable = document.getElementById("questionBoard");
function removeTable() {
    questionsTable.removeChild(qs);
}
var qs;
var questionsCounter = 0;
var answer = [];
var lastInput = null;
function askQuestions() {
    console.log(questionsCounter);
    switch (questionsCounter) {
        case 6:
            questionsCounter = 0;
            let as = document.querySelectorAll('.answer');
            as.forEach(a => {answer.push(a.value)}
            );
            answers.push([...answer]);
            answer = [];
            removeTable();
            break;
        case 0: 
            qs = document.createElement('table');
            questionsTable.appendChild(qs);
        default:
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            let p = document.createElement('p');
            p.textContent = questions[questionsCounter];
            td1.appendChild(p);
            let td2 = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'text';
            input.classList.add('answer');
            td2.appendChild(input);
            lastInput = input;
            questionsCounter++;
            tr.appendChild(td1);
            tr.appendChild(td2);
            qs.appendChild(tr);
            break;
    }
}