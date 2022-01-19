let vardi =[["KALNS","KURPE","OZOLS","BUMBA","APLIS"],
            ["KAROTE","DATORS","PLAUKTS","ZAGLIS","PALAGS"],
            ["HANTELE","ATSPERE"],
            ["MONITORS","KAMIELIS","AISBERGS"],
            ["HAMELEONS","KROKODILS","PROCESORS"],
            ["LECAMAUKLA","KARTUPELIS"]];
let vards;
let laiks=30;
let dl=0;
let n;
let punkti=0;
let spele;

function sajaukt(vards){
    let burti=vards.split("");
    for(let i=0;i<vards.length;i++){
        let tmp=burti[i];
        let j=Math.floor(Math.random()*vards.length);
        burti[i]=burti[j];
        burti[j]=tmp;
    }
    return burti;
}
function irSalikts(){
    let pogas=document.getElementsByTagName("button");
    let objMas=[];
    for(let i=0;i<pogas.length;i++){
        let x=Number(pogas[i].style.left.slice(0,-2));
        let obj={"x":x,"b":pogas[i].innerHTML};
        objMas.push(obj);
    }
    objMas.sort(function(a,b){return a.x-b.x;});
    let atbilde="";
    for(let i=0;i<objMas.length;i++) atbilde+=objMas[i].b;
    if (atbilde===vards) {
        punkti=punkti+n*(60-laiks);
        for(let i=0;i<pogas.length;i++) pogas[i].setAttribute("class","buttons blink-bg");
        document.getElementById("punkti").innerHTML="punkti = "+punkti;
        setTimeout(function(){
            for(let i=0;i<pogas.length;i++){
                pogas[i].setAttribute("class","buttons");
                pogas[i].setAttribute("disabled","true");
            }
            jaunsVards();
        }, 1000);
    }
}
function paradit(burti){
    if(document.getElementById("laukums")!==null) document.getElementById("laukums").remove();
    let rinda=document.createElement("div");
    rinda.setAttribute("id","laukums");
    for(let i=0;i<burti.length;i++){
      let poga = document.createElement("button");
      poga.setAttribute("class","buttons");
      poga.style.left = 50+i*60 + "px";
      poga.innerHTML=burti[i];
      rinda.appendChild(poga);
      poga.onmousedown=function(event){

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
          }

          function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            poga.style.top = (poga.offsetTop - pos2) + "px";
            poga.style.left = (poga.offsetLeft - pos1) + "px";
          }

          function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
            irSalikts();
          }
          dragMouseDown(event);

      };
    }

    document.getElementById("spele").appendChild(rinda);
}

function skaitaLaiku(){
    laiks=laiks-dl;
    document.getElementById("laiks").innerHTML="laiks = "+laiks+" s";
    if(laiks===0)clearInterval(spele);
    if (laiks===0&& punkti>0){
        dl=0;
        let speletajs=prompt("Tu ieguvi "+punkti+" punktus! Ja vÄ“lies saglabÄt rezultÄtu, ievadi savu vÄrdu!");
        if(speletajs!=="" && speletajs!==null)rezultati(speletajs, punkti);
        punkti=0;
        document.getElementById("punkti").innerHTML="punkti = 0";
     }
 }

function jaunsVards(){
    let r=n-5;
    let k=Math.floor(Math.random()*vardi[n-5].length);
    vards=vardi[r][k];
    let burti=sajaukt(vards);
    paradit(burti);
}
function sakums(nn){
    n=nn;
    laiks=30;
    dl=1;
    document.getElementById("laiks").innerHTML="laiks = "+laiks+" s";
    document.getElementById("punkti").innerHTML="";
    if(n<5 || n>10) {
        alert("Der skaitÄ¼i no 5 lÄ«dz 10");
        return;
    }
    jaunsVards();
    spele=setInterval(skaitaLaiku,1000);
 }

window.onscroll = function() {
  let navbar = document.getElementById("navbar");
  let sticky = navbar.offsetTop;
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
};

function atvert(nid) {
    let x = document.getElementsByClassName("content");
    for (let i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(nid).style.display = "block";
    x = document.getElementsByTagName("a");
    for (let i = 0; i < x.length; i++) {
        x[i].classList.remove("active");
    }
    document.getElementById("a"+nid).classList.add("active");
    if(nid === "rezultati"){
      paradaRezultatus();
    }
    if(nid === "spele"){
       if(document.getElementById("laukums")!==null) document.getElementById("laukums").remove();
    }
}


