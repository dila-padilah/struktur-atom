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
        question:"Elektron valensi berperan penting dalam menentukan...",
        options:[
            "Sifat fisik unsur",
            "Sifat kimia unsur",
            "Nomor massa unsur",
            "Jumlah neutron"
        ],
        answer:1,
        explanation:"Elektron valensi menentukan bagaimana suatu unsur bereaksi, sehingga menentukan sifat kimianya."
    },
    {
        question:"Unsur klorin (Cl) dengan konfigurasi 2,8,7 cenderung...",
        options:[
            "Melepas 1 elektron",
            "Menerima 1 elektron",
            "Tidak bereaksi",
            "Melepas 7 elektron"
        ],
        answer:1,
        explanation:"Klorin memiliki 7 elektron valensi sehingga cenderung menerima 1 elektron untuk mencapai kestabilan."
    },
    {
        question:"Pasangan unsur berikut yang kemungkinan besar dapat membentuk ikatan ion adalah...",
        options:[
            "Na dan Cl",
            "O dan Cl",
            "N dan O",
            "Cl dan F"
        ],
        answer:0,
        explanation:"Na (logam) cenderung melepas elektron dan Cl (nonlogam) menerima elektron, sehingga membentuk ikatan ion."
    },
    {
        question:"Salah satu sifat fisik unsur nonlogam adalah...",
        options:[
            "Menghantarkan listrik dengan baik",
            "Bersifat konduktor",
            "Tidak menghantarkan listrik",
            "Selalu berwujud padat"
        ],
        answer:2,
        explanation:"Nonlogam umumnya tidak memiliki elektron bebas sehingga tidak dapat menghantarkan listrik."
    },
    {
        question:"Perbedaan sifat antara logam dan nonlogam disebabkan oleh...",
        options:[
            "Jumlah neutron",
            "Struktur inti atom",
            "Perbedaan jumlah dan susunan elektron",
            "Nomor massa"
        ],
        answer:2,
        explanation:"Sifat logam dan nonlogam ditentukan oleh jumlah serta susunan elektron, terutama elektron valensi."
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



document.addEventListener("contextmenu", e => e.preventDefault());

document.onkeydown = function(e) {
  if (e.keyCode == 123) return false; // F12
  if (e.ctrlKey && e.shiftKey && e.keyCode == 73) return false; // Ctrl+Shift+I
  if (e.ctrlKey && e.keyCode == 85) return false; // Ctrl+U
};