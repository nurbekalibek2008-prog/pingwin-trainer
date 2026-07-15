function unlockAchievement(id, title){

    if(achievements.includes(id)) return;

    achievements.push(id);

    saveGame();

    showAchievement(title);

}

function showAchievement(title){

    const popup = document.createElement("div");

    popup.className = "achievement-popup";

    popup.innerHTML = `
        <h3>🏆 Новое достижение</h3>
        <p>${title}</p>
    `;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add("show");
    }, 100);

    setTimeout(() => {

        popup.classList.remove("show");

        setTimeout(() => {
            popup.remove();
        }, 500);

    }, 3000);

}
