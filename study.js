let currentMenu = [];

function showStudy() {

    content.innerHTML = `
    <div class="card">

        <h2>📚 Изучение</h2>

        <button onclick="showKitchen()">
            🍽 Кухня
        </button>

        <button onclick="showBar()">
            🥃 Бар
        </button>

        <button onclick="showWine()">
            🍷 Винная карта
        </button>

        <br>

        <button onclick="goHome()">
            ⬅ Назад
        </button>

    </div>
    `;

}

function showKitchen(){

    currentMenu = kitchen;

    showCategories();

}

function showBar(){

    currentMenu = bar;

    showCategories();

}

function showWine(){

    currentMenu = wine;

    showCategories();

}
function showCategories() {

    const categories = [...new Set(currentMenu.map(item => item.category))];

    let html = `
    <div class="card">

        <h2>Выберите категорию</h2>
    `;

    categories.forEach(category => {

        const count = currentMenu.filter(item => item.category === category).length;

        html += `
            <button onclick="showCategory('${category}')">
                ${category} (${count})
            </button>
        `;

    });

    html += `
        <br>

        <button onclick="showStudy()">
            ⬅ Назад
        </button>

    </div>
    `;

    content.innerHTML = html;

}

function showCategory(category){

    const foods = currentMenu.filter(item => item.category === category);

    let html = `
    <div class="card">

        <h2>${category}</h2>
    `;

    foods.forEach(food => {

        html += `
            <button onclick="showFood(${food.id})">
                ${food.name}
            </button>
        `;

    });

    html += `
        <br>

        <button onclick="showCategories()">
            ⬅ Назад
        </button>

    </div>
    `;

    content.innerHTML = html;

}
function showFood(id){

    const food = currentMenu.find(item => item.id === id);

    if(!food){

        alert("Блюдо не найдено");

        return;

    }

    const learned = learnedFoods.includes(food.id);

    content.innerHTML = `
    <div class="card">

        <div class="flashcard" onclick="toggleCard()">

            <div id="front">

                <h2>🍽 ${food.name}</h2>

                <p>👆 Нажми на карточку</p>

            </div>

            <div id="back" style="display:none;">

                <h2>${food.name}</h2>

                ${food.price ? `<h3>💰 ${food.price} ₸</h3>` : ""}

                ${food.alcoholPercent ? `<p>🍷 <b>Крепость:</b> ${food.alcoholPercent}</p>` : ""}

                ${food.weight ? `<p>⚖ ${food.weight}</p>` : ""}

                ${food.volume ? `<p>🥤 ${food.volume}</p>` : ""}

                ${food.cookingTime ? `<p>⏱ ${food.cookingTime} мин</p>` : ""}

                ${food.description ? `<p>${food.description}</p>` : ""}

                <hr>

                ${food.spicy !== undefined ? `<p>🌶 ${food.spicy ? "Острое" : "Не острое"}</p>` : ""}

                ${food.vegetarian !== undefined ? `<p>🥬 ${food.vegetarian ? "Вегетарианское" : "Не вегетарианское"}</p>` : ""}

                <h4>📋 Состав</h4>

                <ul>
                    ${(food.ingredients || []).map(i => `<li>${i}</li>`).join("")}
                </ul>

                <h4>⚠ Аллергены</h4>

                <ul>
                    ${(food.allergens || []).map(i => `<li>${i}</li>`).join("")}
                </ul>

                <h4>🥤 Рекомендуем</h4>

                <ul>
                    ${(food.recommendWith || []).map(i => `<li>${i}</li>`).join("")}
                </ul>

            </div>

        </div>

        ${
            learned
            ? `<button disabled>✅ Уже изучено</button>`
            : `<button onclick="learnFood(${food.id})">✅ Запомнил</button>`
        }

        <button onclick="showCategory('${food.category}')">

            ⬅ Назад

        </button>

    </div>
    `;

}
function learnFood(id){

    if(!learnedFoods.includes(id)){

        learnedFoods.push(id);

        xp += 20;

        if(learnedFoods.length===1){
            unlockAchievement("first_food","🥇 Первое блюдо");
        }

        updateStats();

        saveGame();

    }

    showFood(id);

}

function searchFood(){

    const text=document.getElementById("search").value.toLowerCase();

    const list=document.getElementById("studyList");

    if(text===""){

        showCategories();

        return;

    }

    let html="";

    currentMenu.forEach(food=>{

        if(food.name.toLowerCase().includes(text)){

            html+=`
                <button onclick="showFood(${food.id})">
                    ${food.name}
                </button>
            `;

        }

    });

    if(html===""){

        html="<p>❌ Ничего не найдено</p>";

    }

    list.innerHTML=html;

}

function toggleCard(){

    const front=document.getElementById("front");

    const back=document.getElementById("back");

    if(!front || !back) return;

    if(front.style.display==="none"){

        front.style.display="block";

        back.style.display="none";

    }else{

        front.style.display="none";

        back.style.display="block";

    }

}