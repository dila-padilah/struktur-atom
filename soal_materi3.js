<<<<<<< HEAD
const popup1 = document.getElementById("popup1");
const popup1Content = document.getElementById("popup1Content");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".media").forEach(item => {
  item.addEventListener("click", function () {

    popup1.style.display = "block";
    popup1Content.innerHTML = "";

    if (this.tagName === "IMG") {
      let img = document.createElement("img");
      img.src = this.src;
      popup1Content.appendChild(img);
    }

    if (this.tagName === "VIDEO") {
      let video = document.createElement("video");
      video.src = this.querySelector("source").src;
      video.controls = true;
      video.autoplay = true;
      popup1Content.appendChild(video);
    }
  });
});

closeBtn.onclick = function () {
  popup1.style.display = "none";
  popup1Content.innerHTML = "";
};

// Klik luar modal = tutup
window.onclick = function (e) {
  if (e.target == popup1) {
    popup1.style.display = "none";
    popup1Content.innerHTML = "";
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



/* Latihan Materi 1 */
// LATIHAN MATERI 1
const passingGrade = 60;

const quizData = [

    {
        question:"Notasi unsur zᴬX menyatakan bahwa...",
        options:[
            "Lambang unsur, nomor massa, dan jumlah molekul",
            "Lambang unsur, nomor atom (Z), dan nomor massa (A)",
            "Jumlah proton, elektron, dan neutron saja",
            "Lambang unsur dan jumlah senyawa"
        ],
        answer:1,
        explanation:"Notasi unsur terdiri dari lambang unsur (X), nomor atom (Z), dan nomor massa (A)."
    },
    {
        question:"Perhatikan notasi ¹⁶₈O²⁻. Jumlah elektron pada ion tersebut adalah...",
        options:["6","8","10","16"],
        answer:2,
        explanation:"Elektron = nomor atom – muatan = 8 – (-2) = 10, karena muatan negatif berarti mendapat elektron."
    },
    {
        question:"Pada atom netral, jumlah elektron dapat ditentukan dengan rumus...",
        options:[
            "Nomor massa – nomor atom",
            "Nomor atom – muatan",
            "Nomor massa + nomor atom",
            "Nomor atom × muatan"
        ],
        answer:1,
        explanation:"Jumlah elektron = nomor atom – muatan. Untuk atom netral, muatan = 0 sehingga elektron = nomor atom."
    },
    {
        question:"Jumlah neutron suatu unsur dapat dihitung dengan cara...",
        options:[
            "Nomor atom + nomor massa",
            "Nomor massa – nomor atom",
            "Nomor atom – muatan",
            "Nomor massa × nomor atom"
        ],
        answer:1,
        explanation:"Jumlah neutron diperoleh dari nomor massa dikurangi nomor atom."
    },
    {
        question:"Perhatikan notasi ⁴⁰₂₀Ca. Jumlah proton dan elektron berturut-turut adalah...",
        options:[
            "20 dan 20",
            "20 dan 40",
            "40 dan 20",
            "40 dan 40"
        ],
        answer:0,
        explanation:"Proton = nomor atom = 20, elektron = nomor atom (karena netral) = 20."
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


//LATIHAN
/* popup */

const btnLatihan = document.getElementById("btnLatihan")
const popup = document.getElementById("popup")
const close = document.getElementById("close")
const semuaOpsi = document.querySelectorAll(".opsi").length;
btnLatihan.onclick=()=> popup.style.display="flex"
close.onclick=()=> popup.style.display="none"

/* Cek semua opsi */
function cekSemuaTerpakai(){
    let jumlahDipakai = document.querySelectorAll(".dropzone .opsi").length;
    if(jumlahDipakai === semuaOpsi){
        document.getElementById("selesai").style.display="block";
    }
}

/* drag */
let dragged = null;
document.querySelectorAll(".opsi").forEach(item=>{
    item.addEventListener("pointerdown",()=>{
        dragged = item;
        item.classList.add("dragging");
    });
});

document.addEventListener("pointermove",e=>{
    if(!dragged) return;
    document.querySelectorAll(".dropzone").forEach(zone=>{
        let rect = zone.getBoundingClientRect();
        if(
          e.clientX > rect.left &&
          e.clientX < rect.right &&
          e.clientY > rect.top &&
          e.clientY < rect.bottom
        ){
            zone.classList.add("dropzone-hover");
        }else{
            zone.classList.remove("dropzone-hover");
        }
    });
});

document.addEventListener("pointerup",e=>{
    if(!dragged) return;
    dragged.classList.remove("dragging");
    document.querySelectorAll(".dropzone").forEach(zone=>{
        zone.classList.remove("dropzone-hover");
        let rect = zone.getBoundingClientRect();
        if(
          e.clientX > rect.left &&
          e.clientX < rect.right &&
          e.clientY > rect.top &&
          e.clientY < rect.bottom
        ){
            zone.appendChild(dragged);
            cekSemuaTerpakai();
        }
    });
    dragged=null;
});

/* hitung skor */
document.getElementById("selesai").onclick=function(){
    let benar=0
    let total=0
    document.querySelectorAll(".dropzone").forEach(zone=>{
            let kunci=zone.dataset.jawaban.split(" ")
            let jawaban=zone.querySelectorAll(".opsi")
            jawaban.forEach(j=>{
                total++
                if(kunci.includes(j.dataset.id)){
                    benar++
                    j.classList.add("benar")
                }else{
                    j.classList.add("salah")
            }
            })
        })
        let skor=Math.round((benar/total)*100)
        setTimeout(()=>{
            document.getElementById("halamanSoal").style.display="none"
            document.getElementById("halamanSkor").style.display="block"
            document.getElementById("nilai").innerText = skor
    },1000)
}

document.getElementById("pembahasan").onclick = function () {

    document.getElementById("halamanSkor").style.display = "none"
    document.getElementById("halamanPembahasan").style.display = "block"

    let container = document.getElementById("pembahasanContainer")
    container.innerHTML = ""

    document.querySelectorAll(".dropzone").forEach(zone => {

        let soal = zone.parentElement.querySelector("p").innerText
        let kunci = zone.dataset.jawaban.split(" ")

        let html = `
        <div class="soal">
        <p>${soal}</p>
        <div class="dropzone">`

        kunci.forEach(idJawaban => {

            let opsi = document.querySelector(`.opsi[data-id="${idJawaban}"]`)

            // 🔥 PERBAIKAN DI SINI
            let teks = opsi ? opsi.innerHTML : idJawaban

            html += `<div class="opsi benar">${teks}</div>`

        })

        html += `</div></div>`

        container.innerHTML += html

    })

}


document.addEventListener("contextmenu", e => e.preventDefault());

document.onkeydown = function(e) {
  if (e.keyCode == 123) return false; // F12
  if (e.ctrlKey && e.shiftKey && e.keyCode == 73) return false; // Ctrl+Shift+I
  if (e.ctrlKey && e.keyCode == 85) return false; // Ctrl+U
=======
const popup1 = document.getElementById("popup1");
const popup1Content = document.getElementById("popup1Content");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".media").forEach(item => {
  item.addEventListener("click", function () {

    popup1.style.display = "block";
    popup1Content.innerHTML = "";

    if (this.tagName === "IMG") {
      let img = document.createElement("img");
      img.src = this.src;
      popup1Content.appendChild(img);
    }

    if (this.tagName === "VIDEO") {
      let video = document.createElement("video");
      video.src = this.querySelector("source").src;
      video.controls = true;
      video.autoplay = true;
      popup1Content.appendChild(video);
    }
  });
});

closeBtn.onclick = function () {
  popup1.style.display = "none";
  popup1Content.innerHTML = "";
};

// Klik luar modal = tutup
window.onclick = function (e) {
  if (e.target == popup1) {
    popup1.style.display = "none";
    popup1Content.innerHTML = "";
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



/* Latihan Materi 1 */
// LATIHAN MATERI 1
const passingGrade = 60;

const quizData = [

    {
        question:"Notasi unsur zᴬX menyatakan bahwa...",
        options:[
            "Lambang unsur, nomor massa, dan jumlah molekul",
            "Lambang unsur, nomor atom (Z), dan nomor massa (A)",
            "Jumlah proton, elektron, dan neutron saja",
            "Lambang unsur dan jumlah senyawa"
        ],
        answer:1,
        explanation:"Notasi unsur terdiri dari lambang unsur (X), nomor atom (Z), dan nomor massa (A)."
    },
    {
        question:"Perhatikan notasi ¹⁶₈O²⁻. Jumlah elektron pada ion tersebut adalah...",
        options:["6","8","10","16"],
        answer:2,
        explanation:"Elektron = nomor atom – muatan = 8 – (-2) = 10, karena muatan negatif berarti mendapat elektron."
    },
    {
        question:"Pada atom netral, jumlah elektron dapat ditentukan dengan rumus...",
        options:[
            "Nomor massa – nomor atom",
            "Nomor atom – muatan",
            "Nomor massa + nomor atom",
            "Nomor atom × muatan"
        ],
        answer:1,
        explanation:"Jumlah elektron = nomor atom – muatan. Untuk atom netral, muatan = 0 sehingga elektron = nomor atom."
    },
    {
        question:"Jumlah neutron suatu unsur dapat dihitung dengan cara...",
        options:[
            "Nomor atom + nomor massa",
            "Nomor massa – nomor atom",
            "Nomor atom – muatan",
            "Nomor massa × nomor atom"
        ],
        answer:1,
        explanation:"Jumlah neutron diperoleh dari nomor massa dikurangi nomor atom."
    },
    {
        question:"Perhatikan notasi ⁴⁰₂₀Ca. Jumlah proton dan elektron berturut-turut adalah...",
        options:[
            "20 dan 20",
            "20 dan 40",
            "40 dan 20",
            "40 dan 40"
        ],
        answer:0,
        explanation:"Proton = nomor atom = 20, elektron = nomor atom (karena netral) = 20."
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


//LATIHAN
/* popup */

const btnLatihan = document.getElementById("btnLatihan")
const popup = document.getElementById("popup")
const close = document.getElementById("close")
const semuaOpsi = document.querySelectorAll(".opsi").length;
btnLatihan.onclick=()=> popup.style.display="flex"
close.onclick=()=> popup.style.display="none"

/* Cek semua opsi */
function cekSemuaTerpakai(){
    let jumlahDipakai = document.querySelectorAll(".dropzone .opsi").length;
    if(jumlahDipakai === semuaOpsi){
        document.getElementById("selesai").style.display="block";
    }
}

/* drag */
let dragged = null;
document.querySelectorAll(".opsi").forEach(item=>{
    item.addEventListener("pointerdown",()=>{
        dragged = item;
        item.classList.add("dragging");
    });
});

document.addEventListener("pointermove",e=>{
    if(!dragged) return;
    document.querySelectorAll(".dropzone").forEach(zone=>{
        let rect = zone.getBoundingClientRect();
        if(
          e.clientX > rect.left &&
          e.clientX < rect.right &&
          e.clientY > rect.top &&
          e.clientY < rect.bottom
        ){
            zone.classList.add("dropzone-hover");
        }else{
            zone.classList.remove("dropzone-hover");
        }
    });
});

document.addEventListener("pointerup",e=>{
    if(!dragged) return;
    dragged.classList.remove("dragging");
    document.querySelectorAll(".dropzone").forEach(zone=>{
        zone.classList.remove("dropzone-hover");
        let rect = zone.getBoundingClientRect();
        if(
          e.clientX > rect.left &&
          e.clientX < rect.right &&
          e.clientY > rect.top &&
          e.clientY < rect.bottom
        ){
            zone.appendChild(dragged);
            cekSemuaTerpakai();
        }
    });
    dragged=null;
});

/* hitung skor */
document.getElementById("selesai").onclick=function(){
    let benar=0
    let total=0
    document.querySelectorAll(".dropzone").forEach(zone=>{
            let kunci=zone.dataset.jawaban.split(" ")
            let jawaban=zone.querySelectorAll(".opsi")
            jawaban.forEach(j=>{
                total++
                if(kunci.includes(j.dataset.id)){
                    benar++
                    j.classList.add("benar")
                }else{
                    j.classList.add("salah")
            }
            })
        })
        let skor=Math.round((benar/total)*100)
        setTimeout(()=>{
            document.getElementById("halamanSoal").style.display="none"
            document.getElementById("halamanSkor").style.display="block"
            document.getElementById("nilai").innerText = skor
    },1000)
}

document.getElementById("pembahasan").onclick = function () {

    document.getElementById("halamanSkor").style.display = "none"
    document.getElementById("halamanPembahasan").style.display = "block"

    let container = document.getElementById("pembahasanContainer")
    container.innerHTML = ""

    document.querySelectorAll(".dropzone").forEach(zone => {

        let soal = zone.parentElement.querySelector("p").innerText
        let kunci = zone.dataset.jawaban.split(" ")

        let html = `
        <div class="soal">
        <p>${soal}</p>
        <div class="dropzone">`

        kunci.forEach(idJawaban => {

            let opsi = document.querySelector(`.opsi[data-id="${idJawaban}"]`)

            // 🔥 PERBAIKAN DI SINI
            let teks = opsi ? opsi.innerHTML : idJawaban

            html += `<div class="opsi benar">${teks}</div>`

        })

        html += `</div></div>`

        container.innerHTML += html

    })

}


document.addEventListener("contextmenu", e => e.preventDefault());

document.onkeydown = function(e) {
  if (e.keyCode == 123) return false; // F12
  if (e.ctrlKey && e.shiftKey && e.keyCode == 73) return false; // Ctrl+Shift+I
  if (e.ctrlKey && e.keyCode == 85) return false; // Ctrl+U
>>>>>>> d366866b6d246d9d7e1079085a0cf87cfa57992f
};