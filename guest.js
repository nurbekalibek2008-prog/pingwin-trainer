const guests = [

    {
        text:"Посоветуйте острый суп",
        answer:"Том Ям"
    },

    {
        text:"Хочу что-нибудь легкое",
        answer:"Цезарь"
    },

    {
        text:"Что самое популярное?",
        answer:"Том Ям"
    }

];

function showGuest(){

    const guest =
    guests[Math.floor(Math.random()*guests.length)];

    let html=`

    <div class="card">

    <h2>👤 Гость</h2>

    <p style="font-size:20px;margin:20px 0;">

    "${guest.text}"

    </p>

    `;

    kitchen.forEach(food=>{

        html+=`

        <button
        onclick="checkGuest('${food.name}','${guest.answer}')">

        ${food.name}

        </button>

        `;

    });

    html+=`

    <button onclick="goHome()">

    ⬅ Назад

    </button>

    </div>

    `;

    content.innerHTML=html;

}
function checkGuest(answer,correct){

    if(answer===correct){

        xp+=20;

        updateStats();

        alert("✅ Отличный совет! +20 XP");

    }else{

        alert("❌ Лучше было предложить: "+correct);

    }

    showGuest();

}