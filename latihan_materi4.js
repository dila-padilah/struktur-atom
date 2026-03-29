const popup = document.getElementById("popup");
const popupContent = document.getElementById("popupContent");
const closeBtn = document.querySelector(".close");
const popup1 = document.getElementById("popup1");
const popup1Content = document.getElementById("popup1Content");
const close1Btn = document.querySelector(".close1");

// Semua video di halaman
document.querySelectorAll(".video-item").forEach(videoItem => {
  videoItem.addEventListener("click", function () {

    popup1.style.display = "block";
    popup1Content.innerHTML = "";

    // Buat video baru di popup
    let video = document.createElement("video");

    // Ambil source dari video yang diklik
    let source = this.querySelector("source");
    video.src = source ? source.src : this.src;

    video.controls = true;
    video.autoplay = true;
    video.style.maxWidth = "100%";

    popup1Content.appendChild(video);
  });
});

// Tombol close
close1Btn.onclick = function () {
  popup1.style.display = "none";
  popup1Content.innerHTML = "";
};

// Klik luar popup
window.onclick = function (e) {
  if (e.target === popup1) {
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

let soalSekarang = 1
let passingGrade = 70
const svg = document.getElementById("lines")
const container = document.getElementById("exerciseArea")

const soalB = {
    unsur:["Fe","Cu","Zn","Ag","Cr"],
    gol:["IB","IIB","IIIB","IVB","VB","VIB","VIIB","VIIIB"],
    per:["4","5","6","7"]
}

let selectedUnsur = null

let data = {}
let dataA = {}
let dataB = {}

let kunciA = {
    C:{gol:"IVA",per:"2"},
    O:{gol:"VIA",per:"2"},
    N:{gol:"VA",per:"2"},
    F:{gol:"VIIA",per:"2"},
    Na:{gol:"IA",per:"3"}
}

let kunciB = {
    Fe:{gol:"VIIIB",per:"4"},
    Cu:{gol:"IB",per:"4"},
    Zn:{gol:"IIB",per:"4"},
    Ag:{gol:"IB",per:"5"},
    Cr:{gol:"VIB",per:"4"}
}

let skor = 0

document.getElementById("nextBtn").addEventListener("click", nextQuestion)
function openPopup(){
    document.getElementById("popup").style.display="flex"
}

function closePopup(){
    document.getElementById("popup").style.display="none"
}

initSoal()
function initSoal(){

    document.querySelectorAll("#halamanSoal .unsur").forEach(el=>{

        data[el.innerText] = {
            gol: null,
            per: null
        }

        el.onclick = () => {

            document.querySelectorAll(".unsur").forEach(u=>u.classList.remove("selected"))

            selectedUnsur = el
            el.classList.add("selected")

        }

    })

    document.querySelectorAll("#halamanSoal .target").forEach(target=>{

        target.onclick = ()=>{

            if(!selectedUnsur) return

            let unsur = selectedUnsur.innerText

            // HAPUS
            if(target.classList.contains("gol") && data[unsur].gol){
                svg.removeChild(data[unsur].gol.line)
                data[unsur].gol = null
                selectedUnsur.classList.remove("selected")
                selectedUnsur = null
                return
            }

            if(target.classList.contains("per") && data[unsur].per){
                svg.removeChild(data[unsur].per.line)
                data[unsur].per = null
                selectedUnsur.classList.remove("selected")
                selectedUnsur = null
                return
            }

            // BUAT
            let line = drawLine(selectedUnsur,target)

            if(target.classList.contains("gol")){
                data[unsur].gol = {
                    target: target.innerText,
                    line: line
                }
            }

            if(target.classList.contains("per")){
                data[unsur].per = {
                    target: target.innerText,
                    line: line
                }
            }

            selectedUnsur.classList.remove("selected")
            selectedUnsur = null

            checkFinish()

        }

    })

}
/* pilih unsur */

document.querySelectorAll("#halamanSoal .unsur").forEach(el=>{

    data[el.innerText] = {
        gol: null,
        per: null
    }

    el.addEventListener("click",()=>{

        document.querySelectorAll(".unsur").forEach(u=>u.classList.remove("selected"))

        selectedUnsur = el
        el.classList.add("selected")

    })

})

/* klik target */

document.querySelectorAll("#halamanSoal .target").forEach(target=>{

    target.addEventListener("click",()=>{

        if(!selectedUnsur) return

        let unsur = selectedUnsur.innerText

        /* =========================
        CEK: kalau sudah ada → HAPUS
        ========================= */
        if(target.classList.contains("gol") && data[unsur].gol){
            
            svg.removeChild(data[unsur].gol.line)
            data[unsur].gol = null

            selectedUnsur.classList.remove("selected")
            selectedUnsur = null
            return
        }

        if(target.classList.contains("per") && data[unsur].per){
            
            svg.removeChild(data[unsur].per.line)
            data[unsur].per = null

            selectedUnsur.classList.remove("selected")
            selectedUnsur = null
            return
        }

        /* =========================
        CEK: kalau belum ada → BUAT
        ========================= */
        if(target.classList.contains("gol") && data[unsur].gol) return
        if(target.classList.contains("per") && data[unsur].per) return

        let line = drawLine(selectedUnsur,target)

        /* simpan garis */
        if(target.classList.contains("gol")){
            data[unsur].gol = {
                target: target.innerText,
                line: line
            }
        }

        if(target.classList.contains("per")){
            data[unsur].per = {
                target: target.innerText,
                line: line
            }
        }

        selectedUnsur.classList.remove("selected")
        selectedUnsur = null

        checkFinish()

    })

})

/* gambar garis */

function drawLine(from,to){

    let rect1 = from.getBoundingClientRect()
    let rect2 = to.getBoundingClientRect()
    let parent = container.getBoundingClientRect()

    let x1,y1,x2,y2

    y1 = rect1.top + rect1.height/2 - parent.top
    y2 = rect2.top + rect2.height/2 - parent.top

    if(to.classList.contains("gol")){
        x1 = rect1.left - parent.left
        x2 = rect2.right - parent.left
    }

    if(to.classList.contains("per")){
        x1 = rect1.right - parent.left
        x2 = rect2.left - parent.left
    }

    let line = document.createElementNS("http://www.w3.org/2000/svg","line")

    line.setAttribute("x1",x1)
    line.setAttribute("y1",y1)
    line.setAttribute("x2",x2)
    line.setAttribute("y2",y2)

    /* style biar kelihatan */
    line.setAttribute("stroke","black")
    line.setAttribute("stroke-width","2")

    svg.appendChild(line)

    /* 🔥 penting */
    return line
}
/* cek selesai */
function checkFinish(){

    let totalUnsur = document.querySelectorAll("#halamanSoal .unsur").length
    let benar = 0

    for(let u in data){

        if(data[u].gol && data[u].per){
            benar++
        }

    }

    if(benar === totalUnsur){

        let tombol = document.getElementById("nextBtn")

        tombol.style.display = "inline-block"

        if(soalSekarang === 2){
            tombol.innerText = "Selesai"
        }else{
            tombol.innerText = "Berikutnya"
        }

    }

}

/* */


function nextQuestion(){

/* jika masih soal 1 → pindah ke soal 2 */
if(soalSekarang === 1){

    // ✅ simpan data soal A DI SINI (bukan di atas)
    dataA = JSON.parse(JSON.stringify(data))

    soalSekarang = 2

    document.getElementById("judulSoal").innerText = "Golongan B"

    

    svg.innerHTML = ""

    document.getElementById("nextBtn").style.display = "none"

    document.querySelectorAll("#halamanSoal .target").forEach(t=>{
        t.classList.remove("used")
    })

    data = {}
initSoal()
    const unsurBaru = ["Fe","Cu","Zn","Ag","Cr"]
    const golBaru = ["IB","IIB","IIIB","IVB","VB","VIB","VIIB","VIIIB"]    
    let unsurBox = document.querySelectorAll("#halamanSoal .unsur")
    let golBox = document.querySelectorAll(".gol")

    unsurBox.forEach((u,i)=>{
        u.innerText = unsurBaru[i]
        data[unsurBaru[i]] = {gol:null,per:null}
    })

    golBox.forEach((g,i)=>{
        if(golBaru[i]) g.innerText = golBaru[i]
    })

}

/* jika sudah soal 2 → tampilkan skor */
else if(soalSekarang === 2){

    // ✅ simpan data soal B
    dataB = JSON.parse(JSON.stringify(data))

    hitungSkor()
    showScore()

}

}

function hitungSkor(){

    skor = 0

    // SOAL A
    for(let u in kunciA){

        if(dataA[u]){

            // cek golongan
            if(dataA[u].gol?.target === kunciA[u].gol){
                skor++
            }

            // cek periode
            if(dataA[u].per?.target === kunciA[u].per){
                skor++
            }

        }

    }

    // SOAL B
    for(let u in kunciB){

        if(dataB[u]){

            // cek golongan
            if(dataB[u].gol?.target === kunciB[u].gol){
                skor++
            }

            // cek periode
            if(dataB[u].per?.target === kunciB[u].per){
                skor++
            }

        }

    }

}

function showScore(){

    let totalSoal = 20
    let nilai = Math.round((skor/totalSoal)*100)

    let pesan = ""
    let warna = ""

    if(nilai >= passingGrade){

        pesan = "🎉 Selamat! Kamu sudah memahami materi dengan sangat baik."
        warna = "#27ae60"

    }else{

        pesan = "💪 Jangan menyerah! Coba pelajari kembali materi dan ulangi latihan."
        warna = "#e67e22"

    }

    let box = document.querySelector(".popup-box")

    box.innerHTML = `

    <div class="score-container" style="text-align:center;
    padding:30px;">

    <h2>Hasil Latihan</h2>

    <div class="score-circle" style="width:150px;
    height:150px;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:40px;
    font-weight:bold;
    margin:20px auto;
    background:linear-gradient(135deg,#2f80ed,#56ccf2);
    color:white;
    box-shadow:0 10px 25px rgba(0,0,0,0.2);">${nilai}</div>

    <div class="score-text" style="font-size:18px;
    margin-top:10px;
    color:#444;">
    ${skor} dari 20 jawaban benar
    </div>

    <div class="score-message" style="color:${warna}; margin-top:15px;
    font-size:16px;
    font-weight:500;">
    ${pesan}
    </div>

    <button class="btn-pembahasan" id="btnPembahasan" onclick="showPembahasan()" style="margin-top:25px;
    padding:12px 25px;
    border:none;
    border-radius:8px;
    background:#2f80ed;
    color:white;
    font-size:16px;
    cursor:pointer;
    transition:0.3s;">
    Lihat Pembahasan
    </button>

    </div>

    `
}

function showPembahasan(){

    let box = document.querySelector(".popup-box")

    box.innerHTML = `

    <span class="close" onclick="closePopup()">✖</span>

    <div class="header-pembahasan">

    <h2>Pembahasan</h2>

    <button class="btn-gol" onclick="tampilBahasA()" style="margin-top:25px;
    padding:12px 25px;
    border:none;
    border-radius:8px;
    background:#2f80ed;
    color:white;
    font-size:16px;
    cursor:pointer;
    transition:0.3s;">Golongan A</button>
    <button class="btn-gol" onclick="tampilBahasB()" style="margin-top:25px;
    padding:12px 25px;
    border:none;
    border-radius:8px;
    background:#2f80ed;
    color:white;
    font-size:16px;
    cursor:pointer;
    transition:0.3s;">Golongan B</button>

    </div>

    <div id="areaPembahasan" style="position:relative"></div>


    `

}

function tampilBahasA(){

    let area = document.getElementById("areaPembahasan")

    area.innerHTML = `

    <div class="container">

    <div class="col">
    <h3>Golongan</h3>

    <div class="target gol">IA</div>
    <div class="target gol">IIA</div>
    <div class="target gol">IIIA</div>
    <div class="target gol">IVA</div>
    <div class="target gol">VA</div>
    <div class="target gol">VIA</div>
    <div class="target gol">VIIA</div>

    </div>

    <div class="col">

    <h3>Unsur</h3>

    <div class="unsur-box"><div class="unsur">C</div><div class="penjelasan"></div></div>
    <div class="unsur-box"><div class="unsur">O</div><div class="penjelasan"></div></div>
    <div class="unsur-box"><div class="unsur">N</div><div class="penjelasan"></div></div>
    <div class="unsur-box"><div class="unsur">F</div><div class="penjelasan"></div></div>
    <div class="unsur-box"><div class="unsur">Na</div><div class="penjelasan"></div></div>

    </div>

    <div class="col">

    <h3>Periode</h3>

    <div class="target per">1</div>
    <div class="target per">2</div>
    <div class="target per">3</div>
    <div class="target per">4</div>
    <div class="target per">5</div>
    <div class="target per">6</div>
    <div class="target per">7</div>

    </div>

    </div>

    <svg id="linesPembahasan"></svg>

    <div id="popupPenjelasan"></div>
    `

    gambarGaris(kunciA)
    aktifkanPenjelasan()

}

function tampilBahasB(){

    let area = document.getElementById("areaPembahasan")

    area.innerHTML = `

    <div class="container">

    <div class="col">
    <h3>Golongan</h3>

    <div class="target gol">IB</div>
    <div class="target gol">IIB</div>
    <div class="target gol">IIIB</div>
    <div class="target gol">IVB</div>
    <div class="target gol">VB</div>
    <div class="target gol">VIB</div>
    <div class="target gol">VIIB</div>
    <div class="target gol">VIIIB</div>

    </div>

    <div class="col">

    <h3>Unsur</h3>

    <div class="unsur-box"><div class="unsur">Fe</div><div class="penjelasan"></div></div>
    <div class="unsur-box"><div class="unsur">Cu</div><div class="penjelasan"></div></div>
    <div class="unsur-box"><div class="unsur">Zn</div><div class="penjelasan"></div></div>
    <div class="unsur-box"><div class="unsur">Ag</div><div class="penjelasan"></div></div>
    <div class="unsur-box"><div class="unsur">Cr</div><div class="penjelasan"></div></div>

    </div>

    <div class="col">

    <h3>Periode</h3>

    <div class="target per">1</div>
    <div class="target per">2</div>
    <div class="target per">3</div>
    <div class="target per">4</div>
    <div class="target per">5</div>
    <div class="target per">6</div>
    <div class="target per">7</div>

    </div>

    </div>

    <svg id="linesPembahasan"></svg>

    <div id="popupPenjelasan"></div>
    `

    gambarGaris(kunciB)
    aktifkanPenjelasan()

}

function bahasA(){

    let svg = document.getElementById("linesPembahasan")
    svg.innerHTML=""

    Object.keys(kunciA).forEach(u=>{
        drawLinePembahasan(u,kunciA[u].gol,kunciA[u].per)
    })

}

function bahasB(){

    let svg = document.getElementById("linesPembahasan")
    svg.innerHTML=""

    Object.keys(kunciB).forEach(u=>{
        drawLinePembahasan(u,kunciB[u].gol,kunciB[u].per)
    })

}


const style = document.createElement("style")

style.innerHTML = `

.btn-pembahasan:hover{
background:#1c60c7;
transform:scale(1.05);
}
.btn-bahas:hover{
background:#1c60c7;
transform:scale(1.05);
}

.btn-gol:hover{
background:#1c60c7;
transform:scale(1.05);
}

.unsur:hover{
background:#eef5ff;
cursor:pointer;
}

.btn-gol.selected{
background:#d6e6ff;
color: black;
border:2px solid #2f80ed;
}
`

document.head.appendChild(style)


function gambarGaris(kunci){

    let svg = document.getElementById("linesPembahasan")
    svg.innerHTML=""

    let container = document.querySelector("#areaPembahasan")
    let parent = container.getBoundingClientRect()

    Object.keys(kunci).forEach(u=>{

        let unsur = [...document.querySelectorAll(".unsur")].find(e=>e.innerText===u)
        let gol = [...document.querySelectorAll(".gol")].find(e=>e.innerText===kunci[u].gol)
        let per = [...document.querySelectorAll(".per")].find(e=>e.innerText===kunci[u].per)

        if(!unsur || !gol || !per) return

        let r1 = unsur.getBoundingClientRect()
        let r2 = gol.getBoundingClientRect()
        let r3 = per.getBoundingClientRect()

        buatLine(r1.left,r1.top+r1.height/2,r2.right,r2.top+r2.height/2,parent)
        buatLine(r1.right,r1.top+r1.height/2,r3.left,r3.top+r3.height/2,parent)

    })

}

function buatLine(x1,y1,x2,y2,parent){

    let svg = document.getElementById("linesPembahasan")

    let line = document.createElementNS("http://www.w3.org/2000/svg","line")

    line.setAttribute("x1",x1-parent.left)
    line.setAttribute("y1",y1-parent.top)
    line.setAttribute("x2",x2-parent.left)
    line.setAttribute("y2",y2-parent.top)

    line.setAttribute("stroke","#2f80ed")
    line.setAttribute("stroke-width","2")

    svg.appendChild(line)

}

/* Pembahasan */
let penjelasanUnsur = {

    C:"Karbon berada di golongan IVA periode 2",
    O:"Oksigen berada di golongan VIA periode 2",
    N:"Nitrogen berada di golongan VA periode 2",
    F:"Fluorin berada di golongan VIIA periode 2",
    Na:"Natrium berada di golongan IA periode 3",

    Fe:"Besi berada di golongan VIIIB periode 4",
    Cu:"Tembaga berada di golongan IB periode 4",
    Zn:"Seng berada di golongan IIB periode 4",
    Ag:"Perak berada di golongan IB periode 5",
    Cr:"Kromium berada di golongan VIB periode 4"

}

/* Gambar garis pembahasan */
function drawLinePembahasan(unsur,gol,per){

    let svg = document.getElementById("linesPembahasan")
    let container = document.querySelector(".popup-box")

    let unsurEl = [...document.querySelectorAll(".unsur")]
    .find(e=>e.innerText===unsur)

    let golEl = [...document.querySelectorAll(".gol")]
    .find(e=>e.innerText===gol)

    let perEl = [...document.querySelectorAll(".per")]
    .find(e=>e.innerText===per)

    if(!unsurEl || !golEl || !perEl) return

    let rect1 = unsurEl.getBoundingClientRect()
    let rect2 = golEl.getBoundingClientRect()
    let rect3 = perEl.getBoundingClientRect()

    let parent = container.getBoundingClientRect()

    let line1 = document.createElementNS("http://www.w3.org/2000/svg","line")

    line1.setAttribute("x1",rect1.left-parent.left)
    line1.setAttribute("y1",rect1.top+rect1.height/2-parent.top)
    line1.setAttribute("x2",rect2.right-parent.left)
    line1.setAttribute("y2",rect2.top+rect2.height/2-parent.top)

    line1.setAttribute("stroke","#2f80ed")
    line1.setAttribute("stroke-width","2")

    svg.appendChild(line1)

    let line2 = document.createElementNS("http://www.w3.org/2000/svg","line")

    line2.setAttribute("x1",rect1.right-parent.left)
    line2.setAttribute("y1",rect1.top+rect1.height/2-parent.top)
    line2.setAttribute("x2",rect3.left-parent.left)
    line2.setAttribute("y2",rect3.top+rect3.height/2-parent.top)

    line2.setAttribute("stroke","#e67e22")
    line2.setAttribute("stroke-width","2")

    svg.appendChild(line2)

}

function aktifkanPenjelasan(){

    const popup = document.getElementById("popupPenjelasan")

    document.querySelectorAll(".unsur").forEach(el=>{

        el.addEventListener("click",function(e){

            let unsur = this.innerText

            /* jika klik unsur yang sama → tutup popup */

            if(this.classList.contains("aktif")){
                popup.style.display="none"
                this.classList.remove("aktif")
                return
            }

            /* reset aktif */

            document.querySelectorAll(".unsur").forEach(u=>u.classList.remove("aktif"))

            this.classList.add("aktif")

            /* isi penjelasan */

            popup.innerText = penjelasanUnsur[unsur]

            /* posisi popup */

            let rect = this.getBoundingClientRect()
            let parent = document.querySelector(".popup-box").getBoundingClientRect()

            popup.style.left = rect.right - parent.left + 10 + "px"
            popup.style.top = rect.top - parent.top + -160 + "px"

            popup.style.display="block"

        })

    })

}


document.addEventListener("click",function(e){

    if(!e.target.classList.contains("unsur")){

        let popup = document.getElementById("popupPenjelasan")

        popup.style.display="none"

        document.querySelectorAll(".unsur").forEach(u=>u.classList.remove("aktif"))

    }

})

/* penjelasan */
document.querySelectorAll("#halamanPembahasan .unsur").forEach(el=>{

    el.addEventListener("click",function(){

        let unsur = this.innerText
        let box = this.parentElement.querySelector(".penjelasan")

        if(box.innerText===""){
            box.innerText = penjelasanUnsur[unsur]
        }else{
            box.innerText=""
        }

    })

})

document.getElementById("nextBtn").addEventListener("click", nextQuestion)
document.getElementById("btnGolA").addEventListener("click",bahasA)
document.getElementById("btnGolB").addEventListener("click",bahasB)
/* halaman skor */


document.addEventListener("contextmenu", e => e.preventDefault());

document.onkeydown = function(e) {
  if (e.keyCode == 123) return false; // F12
  if (e.ctrlKey && e.shiftKey && e.keyCode == 73) return false; // Ctrl+Shift+I
  if (e.ctrlKey && e.keyCode == 85) return false; // Ctrl+U
};
