var vards = "TIBHGU";
var pVards = "GITHUB";
var rezultatsIndex = 0;
var startsLaiks;
var izmantotiBurti = [];

function startSpele() {

    startsLaiks = Date.now();
    rezultatsIndex = 0;
    document.getElementById("rezultats").textContent = "";
    for (var i=0; i<6; i++) {
        document.getElementById("b"+i).classList.remove("izmantotsBurts");
        document.getElementById("b"+i).textContent = vards[i];
        document.getElementById("rb"+i).textContent = "";
    }

}

function izveleBurta(element) {

    if (!element.classList.contains("izmantotsBurts")) {        
        var elementTeksts = element.textContent;
        document.getElementById("rb"+rezultatsIndex).textContent = elementTeksts;
        izmantotiBurti[rezultatsIndex++] = element.getAttribute("id");
        element.classList.add("izmantotsBurts");

        if (rezultatsIndex == 6) {
            beigaSpele();
        }
    }

}

function notirit(rbIndex){
    console.log(rbIndex, rezultatsIndex, izmantotiBurti);
    if (rbIndex == rezultatsIndex - 1){
        document.getElementById("rb"+ -- rezultatsIndex).textContent = "";
        document.getElementById(izmantotiBurti[rezultatsIndex]).classList.remove("izmantotsBurts");
    }
}

function beigaSpele() {

    var iegVards = "";
    for (var i=0; i<6; i++) {
        iegVards += document.getElementById("rb"+i).textContent;
    }

    var rezultatsTeksts;
    if (pVards == iegVards) {
        var rezultatsLaiks = (Date.now() - startsLaiks) / 1000;
        rezultatsTeksts = "Uzminēji vārdu " + rezultatsLaiks + " sek.";
    } else {
        rezultatsTeksts = "Neuzminēji vārdu";
    }
    document.getElementById("rezultats").textContent = rezultatsTeksts;

}