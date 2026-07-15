function goHome(){

    content.innerHTML = "";

}

function toggleCard(){

    const front = document.getElementById("front");
    const back = document.getElementById("back");

    if(!front || !back) return;

    if(front.style.display === "none"){

        front.style.display = "block";
        back.style.display = "none";

    }else{

        front.style.display = "none";
        back.style.display = "block";

    }

}
