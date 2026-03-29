const popup = document.getElementById("popup");
const popupContent = document.getElementById("popupContent");
const closeBtn = document.querySelector(".close");

// Semua video di halaman
document.querySelectorAll(".video-item").forEach(videoItem => {
  videoItem.addEventListener("click", function () {

    popup.style.display = "block";
    popupContent.innerHTML = "";

    // Buat video baru di popup
    let video = document.createElement("video");

    // Ambil source dari video yang diklik
    let source = this.querySelector("source");
    video.src = source ? source.src : this.src;

    video.controls = true;
    video.autoplay = true;
    video.style.maxWidth = "100%";

    popupContent.appendChild(video);
  });
});

// Tombol close
closeBtn.onclick = function () {
  popup.style.display = "none";
  popupContent.innerHTML = "";
};

// Klik luar popup
window.onclick = function (e) {
  if (e.target === popup) {
    popup.style.display = "none";
    popupContent.innerHTML = "";
  }
};


const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("nav-menu");
    
    toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
    });

    const btn = document.getElementById("tocBtn");
    const menu1 = document.getElementById("tocMenu");

    btn.addEventListener("click", function(){

    if(menu1.style.display === "block"){
    menu1.style.display = "none";
    }else{
    menu1.style.display = "block";
    }

    });


// LATIHAN MATERI 1
const passingGrade = 60;

const quizData = [

  {
    question:"Atom adalah...",
    options:["Unit terbesar dari suatu unsur","Unit terkecil dari unsur yang masih memiliki sifat unsur tersebut","Gabungan beberapa molekul","Partikel yang dapat dibagi terus-menerus"],
    answer:1,
    explanation:"Atom merupakan unit terkecil dari suatu unsur yang masih memiliki sifat unsur tersebut."
  },
  {
    question:"Siapakah tokoh yang pertama kali memperkenalkan konsep atom?",
    options:["Isaac Newton","Albert Einstein","Demokritus","Niels Bohr"],
    answer:2,
    explanation:"Konsep atom pertama kali diperkenalkan oleh Demokritus, seorang filosof Yunani."
  },
  {
    question:"Menurut Demokritus, atom adalah...",
    options:["Bagian terbesar dari benda","Bagian yang masih dapat dibagi","Bagian terkecil yang tidak dapat dibagi lagi","Gabungan dari molekul"],
    answer:2,
    explanation:"Demokritus menyatakan bahwa atom adalah bagian terkecil dari suatu benda yang tidak dapat dibagi lagi."
  },
  {
    question:"Pada molekul CH4, jumlah atom hidrogen adalah...",
    options:["1","2","3","4"],
    answer:3,
    explanation:"CH4 memiliki 4 atom hidrogen karena terdapat angka 4 pada H."
  },
  {
    question:"Pada molekul NaCl, jumlah jenis unsur yang terdapat di dalamnya adalah...",
    options:["1","2","3","4"],
    answer:1,
    explanation:"NaCl terdiri dari 2 unsur yaitu Natrium (Na) dan Klor (Cl)."
  }

];

let currentQuestion=0;
let answers=[];

const modal=document.getElementById("quizModal");

document.getElementById("startQuiz").onclick=()=>{

  modal.classList.remove("hidden");
  loadQuestion();

};

function loadQuestion(){

  document.getElementById("nextBtn").disabled=true;

  const q=quizData[currentQuestion];

  document.getElementById("question").innerHTML=
  "<b>Soal "+(currentQuestion+1)+"</b><br><br>"+q.question;

  let optionsHTML="";

  q.options.forEach((opt,i)=>{

    optionsHTML+=`
    <div class="option" onclick="selectOption(${i})">
    <input type="radio" name="opt">
    ${opt}
    </div>
    `;

  });

  document.getElementById("options").innerHTML=optionsHTML;

  if(currentQuestion==quizData.length-1){

    document.getElementById("nextBtn").classList.add("hidden");
    document.getElementById("finishBtn").classList.remove("hidden");

  }

}

function selectOption(i){

  answers[currentQuestion]=i;

  document.getElementById("nextBtn").disabled=false;

  let options=document.querySelectorAll(".option");

  options.forEach(o=>o.classList.remove("selected"));

  options[i].classList.add("selected");

}
document.getElementById("nextBtn").onclick=()=>{

  currentQuestion++;
  loadQuestion();

};

document.getElementById("finishBtn").onclick=()=>{

  showScore();

};

function showScore(){

  document.getElementById("quizPage").classList.add("hidden");
  document.getElementById("scorePage").classList.remove("hidden");

  let correct=0;

  answers.forEach((a,i)=>{
    if(a===quizData[i].answer) correct++;
  });

  let score=Math.round(correct/quizData.length*100);

  let scoreText=document.getElementById("scoreText");
  let message=document.getElementById("scoreMessage");

  scoreText.innerText="Skor: "+score;

  if(score>=passingGrade){

    scoreText.classList.add("pass");
    message.innerText="Selamat! Kamu memahami materi 🎉";

  }else{

    scoreText.classList.add("fail");
    message.innerText="Tetap semangat belajar 💪";

  }

}

document.getElementById("reviewBtn").onclick=()=>{

  document.getElementById("scorePage").classList.add("hidden");
  document.getElementById("reviewPage").classList.remove("hidden");

  let grid=document.getElementById("numberGrid");

  quizData.forEach((q,i)=>{

    let box=document.createElement("div");

    box.innerText=i+1;
    box.classList.add("numberBox");

    if(answers[i]===q.answer){
      box.classList.add("correct");
    }else{
      box.classList.add("wrong");
    }

    box.onclick=()=>{

      let boxes=document.querySelectorAll(".numberBox");

      boxes.forEach(b=>{
        b.classList.remove("active");
      });

      box.classList.add("active");

      document.getElementById("explanationBox").innerHTML=
      "<b>Soal "+(i+1)+"</b><br>"+q.question+
      "<br><br><b>Pembahasan:</b><br>"+q.explanation;

    };

    grid.appendChild(box);

  });

};

document.getElementById("closeModal").onclick=()=>{

  modal.classList.add("hidden");

};


/* LATIHAN */
// LATIHAN MATERI 1
const passingGrade1 = 60;

const quizData1 = [
  {
    question:"Partikel penyusun atom terdiri dari...",
    options:["Proton, neutron, dan elektron","Atom, molekul, dan ion","Elektron, ion, dan senyawa","Proton, elektron, dan molekul"],
    answer:0,
    explanation:"Atom tersusun atas tiga partikel utama yaitu proton, neutron, dan elektron."
  },
  {
    question:"Partikel yang bermuatan negatif dan mengelilingi inti atom adalah...",
    options:["Proton","Neutron","Elektron","Inti atom"],
    answer:2,
    explanation:"Elektron adalah partikel bermuatan negatif yang bergerak mengelilingi inti atom."
  },
  {
    question:"Siapakah penemu elektron melalui percobaan sinar katoda?",
    options:["James Chadwick","J.J Thomson","Eugene Goldstein","Robert Milikan"],
    answer:1,
    explanation:"Elektron ditemukan oleh J.J Thomson melalui percobaan sinar katoda."
  },
  {
    question:"Partikel yang berada di dalam inti atom dan tidak memiliki muatan adalah...",
    options:["Elektron","Proton","Neutron","Ion"],
    answer:2,
    explanation:"Neutron berada di inti atom dan tidak memiliki muatan (netral)."
  },
  {
    question:"Partikel yang memiliki muatan +1 dan massa sekitar 1 sma adalah...",
    options:["Elektron","Neutron","Proton","Ion"],
    answer:2,
    explanation:"Proton memiliki muatan positif (+1) dan massa sekitar 1 sma."
  }
];

let currentQuestion1 = 0;
let answers1 = [];

const modal1 = document.getElementById("quizModal1");

document.getElementById("startQuiz1").onclick = () => {
    modal1.classList.remove("hidden");
    loadQuestion1();
};

function loadQuestion1(){

  document.getElementById("nextBtn1").disabled = true;

  const q = quizData1[currentQuestion1];

  document.getElementById("question1").innerHTML =
  "<b>Soal "+(currentQuestion1+1)+"</b><br><br>"+q.question;

  let optionsHTML = "";

  q.options.forEach((opt,i)=>{
    optionsHTML += `
    <div class="option" onclick="selectOption1(${i})">
    <input type="radio" name="opt1">
    ${opt}
    </div>
    `;
  });

  document.getElementById("options1").innerHTML = optionsHTML;

  if(currentQuestion1 == quizData1.length-1){
    document.getElementById("nextBtn1").classList.add("hidden");
    document.getElementById("finishBtn1").classList.remove("hidden");
  }

}

function selectOption1(i){

  answers1[currentQuestion1] = i;

  document.getElementById("nextBtn1").disabled = false;

  let options = document.querySelectorAll("#options1 .option");

  options.forEach(o=>o.classList.remove("selected"));

  options[i].classList.add("selected");

}

document.getElementById("nextBtn1").onclick = () => {
  currentQuestion1++;
  loadQuestion1();
};

document.getElementById("finishBtn1").onclick = () => {
  showScore1();
};

function showScore1(){

  document.getElementById("quizPage1").classList.add("hidden");
  document.getElementById("scorePage1").classList.remove("hidden");

  let correct = 0;

  answers1.forEach((a,i)=>{
    if(a === quizData1[i].answer) correct++;
  });

  let score = Math.round(correct / quizData1.length * 100);

  let scoreText = document.getElementById("scoreText1");
  let message = document.getElementById("scoreMessage1");

  scoreText.innerText = "Skor: " + score;

  if(score >= passingGrade1){
    scoreText.classList.add("pass");
    message.innerText = "Selamat! Kamu memahami materi 🎉";
  }else{
    scoreText.classList.add("fail");
    message.innerText = "Tetap semangat belajar 💪";
  }

}

document.getElementById("reviewBtn1").onclick = () => {

  document.getElementById("scorePage1").classList.add("hidden");
  document.getElementById("reviewPage1").classList.remove("hidden");

  let grid = document.getElementById("numberGrid1");
  grid.innerHTML = ""; // penting biar tidak dobel

  quizData1.forEach((q,i)=>{

    let box = document.createElement("div");

    box.innerText = i+1;
    box.classList.add("numberBox");

    if(answers1[i] === q.answer){
      box.classList.add("correct");
    }else{
      box.classList.add("wrong");
    }

    box.onclick = ()=>{

      let boxes = document.querySelectorAll("#numberGrid1 .numberBox");

      boxes.forEach(b=>b.classList.remove("active"));

      box.classList.add("active");

      document.getElementById("explanationBox1").innerHTML =
      "<b>Soal "+(i+1)+"</b><br>"+q.question+
      "<br><br><b>Pembahasan:</b><br>"+q.explanation;

    };

    grid.appendChild(box);

  });

};

document.getElementById("closeModal1").onclick = () => {
  modal1.classList.add("hidden");
};

document.addEventListener("contextmenu", e => e.preventDefault());

document.onkeydown = function(e) {
  if (e.keyCode == 123) return false; // F12
  if (e.ctrlKey && e.shiftKey && e.keyCode == 73) return false; // Ctrl+Shift+I
  if (e.ctrlKey && e.keyCode == 85) return false; // Ctrl+U
};
