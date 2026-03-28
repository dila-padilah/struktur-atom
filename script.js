// Javascript untuk Evaluasi
let soalUjian=[]
let current=0
let jawaban=new Array(20).fill(null)
let ragu=new Array(20).fill(false)

/* MULAI */

function mulaiUjian(){
    let nama = document.getElementById("namaInput").value
    if(nama == ""){
        alert("Masukkan nama terlebih dahulu")
        return
    }
    localStorage.setItem("nama", nama)
    document.getElementById("startScreen").style.display = "none"
    acakSoal()
    buatGrid()
    tampilSoal()
    startTimer()
}

/* RANDOM SOAL */

function acakSoal(){
    soalUjian = []
    let sumber = [...bankSoal]
    for(let i=0;i<20;i++){
        let index = Math.floor(Math.random()*sumber.length)
        soalUjian.push(sumber[index])
        sumber.splice(index,1)
    }
}

/* TAMPIL SOAL */

function tampilSoal(){
    let data=soalUjian[current]
    document.getElementById("nomorSoal").innerText=current+1
    document.getElementById("soalText").innerHTML=data.soal
    let html=""
    data.opsi.forEach((ops,i)=>{
        let aktif = jawaban[current]==i ? "aktif":""
        html+=`<div class="opsi ${aktif}" onclick="pilih(${i})">${ops}</div>`
    })
    document.getElementById("opsiJawaban").innerHTML=html
    document.getElementById("raguBox").checked=ragu[current]
}

/* PILIH */

function pilih(i){
    jawaban[current]=i
    updateGrid()
    tampilSoal()
}

/* NAVIGASI */

function selanjutnya(){
    if(current<19){
        current++
        tampilSoal()
    }
}

function sebelumnya(){
    if(current>0){
        current--
        tampilSoal()
    }
}

/* GRID NOMOR */

function buatGrid(){
    let html=""
    for(let i=0;i<20;i++){
        html+=`<div class="nomor merah" id="n${i}" onclick="lompat(${i})">${i+1}</div>`
    }
    document.getElementById("gridNomor").innerHTML=html
}

/* LOMPAT */

function lompat(i){
    current=i
    tampilSoal()
}

/* RAGU */

function toggleRagu(){
    ragu[current]=document.getElementById("raguBox").checked
    updateGrid()
}

/* UPDATE GRID */

function updateGrid(){
    let jawab=0
    let rag=0
    for(let i=0;i<20;i++){
        let el=document.getElementById("n"+i)
        el.classList.remove("hijau","kuning","merah")
        if(jawaban[i]!=null){
            el.classList.add("hijau")
            jawab++
        }else{
            el.classList.add("merah")
        }
        if(ragu[i]){
            el.classList.remove("hijau")
            el.classList.add("kuning")
            rag++
        }
    }
    document.getElementById("dijawab").innerText=jawab
    document.getElementById("ragu").innerText=rag
    document.getElementById("kosong").innerText=20-jawab
}

/* SELESAI */

function selesai(){
    let benar = 0
    for(let i=0;i<20;i++){
        if(jawaban[i] == soalUjian[i].jawaban){
        benar++
        }
    }
    let skor = benar * 5
    localStorage.setItem("skor",skor)
    if(skor >= 75){
        let tanggal = new Date().toISOString()
        localStorage.setItem("tanggalLulus", tanggal)
        window.location = "sertifikat.html"
    }
    else{
        alert(
        "Skor Anda : "+skor+
        "\n\nBelum mencapai nilai kelulusan.\nTetap semangat belajar!"
        )
        window.location = "home.html"
    }
}

/* TIMER */

let waktu = 3600  // 1 jam
function startTimer(){
    let interval = setInterval(()=>{
        waktu--
        let jam = Math.floor(waktu/3600)
        let menit = Math.floor((waktu%3600)/60)
        let detik = waktu%60
        document.getElementById("timer").innerText =
        `${jam}:${menit}:${detik}`
        if(waktu == 300){
            alert("Waktu tersisa 5 menit!")
        }

        /* JIKA WAKTU HABIS */

        if(waktu <= 0){
            clearInterval(interval)
            selesai()
        }
    },1000)
}

/*Membuka Panel */
function togglePanel(){
    document.querySelector(".panel")
    .classList.toggle("active")
}

window.addEventListener("click",function(e){
    let panel=document.querySelector(".panel")
    let menu=document.querySelector(".menuMobile")
    if(!panel.contains(e.target) && !menu.contains(e.target)){
        panel.classList.remove("active")
    }
})



// ====== STATUS UJIAN ======
let sedangUjian = true;

// Saat halaman pertama kali dibuka
if (!sessionStorage.getItem("mulaiUjian")) {
    sessionStorage.setItem("mulaiUjian", "true");
} else {
    // Jika user pernah keluar → reset
    alert("Anda keluar dari evaluasi sebelumnya. Anda harus mengulang dari awal.");
    sessionStorage.clear();
    location.reload();
}

// ====== DETEKSI KELUAR / REFRESH ======
window.addEventListener("beforeunload", function (e) {
    if (sedangUjian) {
        e.preventDefault();
        e.returnValue = "Apakah Anda yakin ingin keluar?";
    }
});

// ====== DETEKSI PINDAH TAB ======
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        alert("Anda mencoba keluar dari halaman evaluasi! Ujian akan diulang. silahkan klik kotak kecil kemudian reload.");
        resetUjian();
    }
});

// ====== FUNGSI RESET ======
function resetUjian() {
    sessionStorage.clear();
    location.reload();
}

// ====== JIKA UJIAN SELESAI ======
function selesaiUjian() {
    sedangUjian = false;
    sessionStorage.setItem("selesai", "true");
}

// Disable klik kanan
document.addEventListener("contextmenu", e => e.preventDefault());

// Disable shortcut refresh
document.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.key === "r") {
        e.preventDefault();
    }
});

let keluar = false;

// Saat user mau keluar
window.addEventListener("beforeunload", function (e) {
    keluar = true;
    e.preventDefault();
    e.returnValue = ""; // wajib untuk trigger popup
});

// Deteksi saat user kembali ke halaman
window.addEventListener("pageshow", function (event) {
    if (keluar) {
        keluar = false;
        location.reload(); // langsung reload otomatis
    }
});

let isTryingToLeave = false;

// Saat user mau keluar
window.addEventListener("beforeunload", function (e) {
    isTryingToLeave = true;
    e.preventDefault();
    e.returnValue = "";
});

// Saat user kembali (klik cancel / stay)
window.addEventListener("focus", function () {
    if (isTryingToLeave) {
        isTryingToLeave = false;
        location.reload();
    }
});


const soalEl = document.getElementById("soal");
const opsiEl = document.getElementById("opsi");

soalEl.innerText = soalData.pertanyaan;

soalData.opsi.forEach(item => {
    let div = document.createElement("div");
    div.innerText = item;
    div.classList.add("opsi-item");
    opsiEl.appendChild(div);
});

const areaSoal = document.getElementById("soal");
const areaOpsi = document.getElementById("opsi");

[areaSoal, areaOpsi].forEach(area => {

    // Disable select
    area.style.userSelect = "none";

    // Blok copy
    area.addEventListener("copy", e => e.preventDefault());

    // Blok klik kanan
    area.addEventListener("contextmenu", e => e.preventDefault());

    // Blok drag
    area.addEventListener("dragstart", e => e.preventDefault());
});



document.addEventListener("keydown", function(e) {
    if (e.ctrlKey && ["c","a","x","u"].includes(e.key.toLowerCase())) {
        e.preventDefault();
    }

    if (e.key === "F12") {
        e.preventDefault();
    }
});


// encode base64
const data = "QXBhIG1vZGVsIGF0b20geWFuZyBkaXRlbXVrYW4gb2xlaCBUaG9tc29uPw==";

// decode saat ditampilkan
const pertanyaan = atob(data);

document.getElementById("soal").innerText = pertanyaan;


document.addEventListener("contextmenu", e => e.preventDefault());

document.onkeydown = function(e) {
  if (e.keyCode == 123) return false; // F12
  if (e.ctrlKey && e.shiftKey && e.keyCode == 73) return false; // Ctrl+Shift+I
  if (e.ctrlKey && e.keyCode == 85) return false; // Ctrl+U
};