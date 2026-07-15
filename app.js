// Основные данные
let kitchen = [];
let bar = [];
let wine = [];

const content = document.getElementById("content");

// Загрузка кухни
async function loadKitchen() {

    try {

        const kitchenResponse = await fetch("data/kitchen.json");
        const barResponse = await fetch("data/bar.json");
        const wineResponse = await fetch("data/wine.json");

        kitchen = await kitchenResponse.json();
        bar = await barResponse.json();
        wine = await wineResponse.json();

        updateStats();

    } catch (error) {

        console.error(error);

    }

}
// Запуск приложения
loadKitchen();

// Кнопки главного меню
document.getElementById("studyBtn").onclick = showStudy;
document.getElementById("quizBtn").onclick = showQuiz;
document.getElementById("examBtn").onclick = showExam;
document.getElementById("guestBtn").onclick = showGuest;
document.getElementById("statsBtn").onclick = showStats;
