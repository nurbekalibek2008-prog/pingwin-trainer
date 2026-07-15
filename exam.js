let examQuestions = [];
let examIndex = 0;
let examCorrect = 0;
let examLives = 3;

function showExam(){

    examQuestions = [...kitchen]
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(20, kitchen.length));

    examIndex = 0;
    examCorrect = 0;
    examLives = 3;

    nextExamQuestion();

}

function nextExamQuestion(){

    if(examLives <= 0 || examIndex >= examQuestions.length){

        finishExam();

        return;

    }

    const food = examQuestions[examIndex];

    let ingredients = [];

    kitchen.forEach(f=>{

        f.ingredients.forEach(i=>{

            if(!ingredients.includes(i)){

                ingredients.push(i);

            }

        });

    });

    let answers = [food.ingredients[0]];

    while(answers.length < 4){

        const random = ingredients[Math.floor(Math.random()*ingredients.length)];

        if(
            !answers.includes(random)
            &&
            !food.ingredients.includes(random)
        ){

            answers.push(random);

        }

    }

    answers.sort(()=>Math.random()-0.5);

    let html = `

    <div class="card">

        <h2>🎓 Экзамен</h2>

        <p>Вопрос ${examIndex+1} / ${examQuestions.length}</p>

        <p>❤️ ${examLives}</p>

        <h3>Что входит в ${food.name}?</h3>

    `;

    answers.forEach(answer=>{

        html += `

        <button onclick="examAnswer('${answer}')">

            ${answer}

        </button>

        `;

    });

    html += `

        <button onclick="goHome()">

            ⬅ Назад

        </button>

    </div>

    `;

    content.innerHTML = html;

}

function examAnswer(answer){

    const food = examQuestions[examIndex];

    if(food.ingredients.includes(answer)){

        examCorrect++;

    }else{

        examLives--;

    }

    examIndex++;

    nextExamQuestion();

}

function finishExam(){

    const percent = Math.round(
        examCorrect / examQuestions.length * 100
    );

    if(percent >= 90){

        xp += 100;

        unlockAchievement(
            "exam_pass",
            "🎓 Экзамен сдан!"
        );

    }

    updateStats();

    saveGame();

    content.innerHTML = `

    <div class="card">

        <h2>🎓 Экзамен завершён</h2>

        <h1>${percent}%</h1>

        <p>

            ${examCorrect} из ${examQuestions.length}

        </p>

        <h3>

            ${percent>=90 ? "✅ Сдан" : "❌ Не сдан"}

        </h3>

        ${percent>=90 ? "<p>+100 XP</p>" : ""}

        <button onclick="goHome()">

            На главную

        </button>

    </div>

    `;

}