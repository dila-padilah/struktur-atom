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

            // cari elemen opsi berdasarkan data-id
            let opsi = document.querySelector(`.opsi[data-id="${idJawaban}"]`)

            let teks = opsi ? opsi.innerText : idJawaban

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
};