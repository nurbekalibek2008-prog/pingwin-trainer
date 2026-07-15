let currentQuestion = null;

function shuffle(array){
    return array.sort(() => Math.random() - 0.5);
}

function randomItem(array){
    return array[Math.floor(Math.random() * array.length)];
}

function showQuiz(){

    if(kitchen.length === 0){

        alert("Меню еще загружается");

        return;

    }

    const food = randomItem(kitchen);

    let questions = [];

    // Цена
    questions.push({

        question:`💰 Сколько стоит "${food.name}"?`,

        correct:food.price + " ₸",

        answers:[
            food.price + " ₸",
            (food.price + 500) + " ₸",
            (food.price - 500) + " ₸",
            (food.price + 1000) + " ₸"
        ]

    });

    // Вес
    if(food.weight){

        questions.push({

            question:`⚖ Какой вес "${food.name}"?`,

            correct:food.weight,

            answers:[
                food.weight,
                "300 г",
                "500 г",
                "700 г"
            ]

        });

    }

    // Острота
    questions.push({

        question:`🌶 "${food.name}" острое?`,

        correct:food.spicy ? "Да" : "Нет",

        answers:["Да","Нет"]

    });

    // Популярность
    questions.push({

        question:`🔥 "${food.name}" — хит продаж?`,

        correct:food.popular ? "Да" : "Нет",

        answers:["Да","Нет"]

    });

    // Ингредиенты
    if(food.ingredients && food.ingredients.length){

        const ingredient = randomItem(food.ingredients);

        let answers = [ingredient];

        while(answers.length < 4){

            const randomFood = randomItem(kitchen);

            const randomIngredient = randomItem(randomFood.ingredients);

            if(
                !answers.includes(randomIngredient)
                &&
                !food.ingredients.includes(randomIngredient)
            ){

                answers.push(randomIngredient);

            }

        }

        questions.push({

            question:`📋 Что входит в состав "${food.name}"?`,

            correct:ingredient,

            answers

        });

    }    // Аллергены
    if(food.allergens && food.allergens.length){

        const allergen = randomItem(food.allergens);

        let answers = [allergen];

        const fake = [
            "Орехи",
            "Молоко",
            "Яйцо",
            "Соя",
            "Глютен",
            "Кунжут"
        ];

        while(answers.length < 4){

            const item = randomItem(fake);

            if(!answers.includes(item)){

                answers.push(item);

            }

        }

        questions.push({

            question:`⚠ Какой аллерген есть в "${food.name}"?`,

            correct:allergen,

            answers

        });

    }

    // Рекомендации
    if(food.recommendWith && food.recommendWith.length){

        const recommend = randomItem(food.recommendWith);

        let answers = [recommend];

        const fake = [
            "Кола",
            "Чай",
            "Картофель фри",
            "Эспрессо",
            "Минеральная вода",
            "Мороженое"
        ];

        while(answers.length < 4){

            const item = randomItem(fake);

            if(!answers.includes(item)){

                answers.push(item);

            }

        }

        questions.push({

            question:`🥤 Что рекомендуют к "${food.name}"?`,

            correct:recommend,

            answers

        });

    }

    // По описанию
    if(food.description){

        let answers = [food.name];

        while(answers.length < 4){

            const name = randomItem(kitchen).name;

            if(!answers.includes(name)){

                answers.push(name);

            }

        }

        questions.push({

            question:`📖 Какое блюдо подходит под описание?

"${food.description}"`,

            correct:food.name,

            answers

        });

    }

    // В каком блюде есть ингредиент
    if(food.ingredients && food.ingredients.length){

        const ingredient = randomItem(food.ingredients);

        let answers = [food.name];

        while(answers.length < 4){

            const name = randomItem(kitchen).name;

            if(!answers.includes(name)){

                answers.push(name);

            }

        }

        questions.push({

            question:`🥥 В каком блюде есть "${ingredient}"?`,

            correct:food.name,

            answers

        });

    }

    currentQuestion = randomItem(questions);

    currentQuestion.answers = shuffle(currentQuestion.answers);

    let html = `
    <div class="card">

        <h2>🎯 Викторина</h2>

        <h3>${currentQuestion.question}</h3>
    `;

    currentQuestion.answers.forEach(answer=>{

        html += `
            <button onclick="checkAnswer('${answer.replace(/'/g,"\\'")}')">
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

function checkAnswer(answer){

    if(answer === currentQuestion.correct){

        xp += 15;

        streak++;

        alert("✅ Правильно! +15 XP");

    }else{

        streak = 0;

        if(!mistakes.find(item => item.id === currentQuestion.food?.id)){

            if(currentQuestion.food){

                mistakes.push(currentQuestion.food);

            }

        }

        alert("❌ Правильный ответ: " + currentQuestion.correct);

    }

    updateStats();

    saveGame();

    setTimeout(showQuiz,300);

}
