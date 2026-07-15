// ---------- Данные ----------

let xp = Number(localStorage.getItem("xp")) || 0;

let streak = Number(localStorage.getItem("streak")) || 0;

let level = Number(localStorage.getItem("level")) || 1;

let learnedFoods =
JSON.parse(localStorage.getItem("learnedFoods")) || [];

let mistakes =
JSON.parse(localStorage.getItem("mistakes")) || [];

let achievements =
JSON.parse(localStorage.getItem("achievements")) || [];


// ---------- Сохранение ----------

function saveGame(){

    localStorage.setItem("xp", xp);

    localStorage.setItem("streak", streak);

    localStorage.setItem("level", level);

    localStorage.setItem(
        "learnedFoods",
        JSON.stringify(learnedFoods)
    );

    localStorage.setItem(
        "mistakes",
        JSON.stringify(mistakes)
    );

    localStorage.setItem(
        "achievements",
        JSON.stringify(achievements)
    );

}
 