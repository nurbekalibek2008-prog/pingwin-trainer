function updateStats(){

    level = Math.floor(xp / 100) + 1;

    document.getElementById("xp").innerText = xp;
    document.getElementById("streak").innerText = streak;
    document.getElementById("level").innerText = level;

    document.getElementById("progressFill").style.width =
        (xp % 100) + "%";

    const percent = kitchen.length
        ? Math.round((learnedFoods.length / kitchen.length) * 100)
        : 0;

    document.getElementById("progressText").innerText =
        `${percent}% меню изучено`;

    if(xp >= 100){
        unlockAchievement("xp100","⭐ Первая сотня XP");
    }

    saveGame();

}

function showStats(){

    const totalPercent = kitchen.length
        ? Math.round((learnedFoods.length / kitchen.length) * 100)
        : 0;

    let html = `
    <div class="card">

        <h2>📊 Статистика</h2>

        <h3>⭐ XP: ${xp}</h3>
        <h3>🔥 Серия: ${streak}</h3>
        <h3>🏆 Уровень: ${level}</h3>

        <hr><br>

        <h3>📚 Прогресс по категориям</h3>
    `;

    const categories = [...new Set(kitchen.map(food => food.category))];

    categories.forEach(category => {

        const foods = kitchen.filter(food => food.category === category);

        const learned = foods.filter(food =>
            learnedFoods.includes(food.id)
        ).length;

        const percent = Math.round((learned / foods.length) * 100);

        html += `
            <p><b>${category}</b> — ${percent}% (${learned}/${foods.length})</p>

            <div class="progress">
                <div style="
                    width:${percent}%;
                    height:100%;
                    background:#22c55e;
                "></div>
            </div>
        `;

    });

    html += `

        <hr><br>

        <h3>📚 Общий прогресс</h3>

        <h2>${totalPercent}%</h2>

        <p>${learnedFoods.length} из ${kitchen.length} блюд изучено</p>

        <hr><br>

        <h3>🏆 Достижения</h3>
    `;

    const allAchievements = [
        {id:"first_food",title:"🥇 Первое блюдо"},
        {id:"xp100",title:"⭐ Первая сотня XP"},
        {id:"streak10",title:"🔥 Серия 10"},
        {id:"exam_pass",title:"🎓 Экзамен сдан"}
    ];

    allAchievements.forEach(a=>{

        html += `
            <p>
                ${achievements.includes(a.id) ? "✅" : "⬜"} ${a.title}
            </p>
        `;

    });

    html += `

        <br>

        <button onclick="goHome()">

            ⬅ Назад

        </button>

    </div>
    `;

    content.innerHTML = html;

}