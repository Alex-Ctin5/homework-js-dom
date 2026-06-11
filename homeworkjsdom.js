let elevi = []; 
let elevSelectatIndex = null;

const formElev = document.getElementById('form_elev');
const inputNumeElev = document.getElementById('nume_elev');
const tbodyElevi = document.querySelector('#tabel_elevi tbody');
const btnSortEleviAsc = document.getElementById('sort_elevi_asc');
const btnSortEleviDesc = document.getElementById('sort_elevi_desc');

const noteElevWrapper = document.getElementById('note_elev_wrapper');
const btnAscunde = document.getElementById('btn_ascunde');
const numeElevSelectatSpan = document.querySelector('#nume_elev_selectat span');
const formNota = document.getElementById('form_nota');
const inputValoareNota = document.getElementById('valoare_nota');
const tbodyNote = document.querySelector('#tabel_note tbody');
const btnSortNoteAsc = document.getElementById('sort_note_asc');
const btnSortNoteDesc = document.getElementById('sort_note_desc');

function calculeazaMedie(note) {
    if (note.length === 0) return '-';
    const suma = note.reduce((acc, nota) => acc + nota, 0);
    return (suma / note.length).toFixed(1);
}

function afiseazaElevi() {
    tbodyElevi.innerHTML = '';
    
    elevi.forEach((elev, index) => {
        const tr = document.createElement('tr');
        
        const tdNume = document.createElement('td');
        tdNume.textContent = elev.nume;
        
        const tdMedie = document.createElement('td');
        tdMedie.textContent = calculeazaMedie(elev.note);
        
        const tdActiuni = document.createElement('td');
        const btnVeziNotele = document.createElement('button');
        btnVeziNotele.textContent = 'Vezi / Adauga note';
        btnVeziNotele.className = 'btn-tabel';
        btnVeziNotele.addEventListener('click', () => deschideNoteElev(index));
        tdActiuni.appendChild(btnVeziNotele);
        
        const tdSterge = document.createElement('td');
        const btnStergeElev = document.createElement('button');
        btnStergeElev.textContent = 'X';
        btnStergeElev.className = 'btn-delete';
        btnStergeElev.addEventListener('click', () => stergeElev(index));
        tdSterge.appendChild(btnStergeElev);
        
        tr.appendChild(tdNume);
        tr.appendChild(tdMedie);
        tr.appendChild(tdActiuni);
        tr.appendChild(tdSterge);
        tbodyElevi.appendChild(tr);
    });
}

function afiseazaNote() {
    tbodyNote.innerHTML = '';
    if (elevSelectatIndex === null) return;

    const note = elevi[elevSelectatIndex].note;
    note.forEach((nota, notaIndex) => {
        const tr = document.createElement('tr');
        
        const tdNota = document.createElement('td');
        tdNota.textContent = nota;
        
        const tdStergeNota = document.createElement('td');
        const btnSterge = document.createElement('button');
        btnSterge.textContent = 'X';
        btnSterge.className = 'btn-delete';
        btnSterge.addEventListener('click', () => stergeNota(notaIndex));
        
        tdStergeNota.appendChild(btnSterge);
        tr.appendChild(tdNota);
        tr.appendChild(tdStergeNota);
        tbodyNote.appendChild(tr);
    });
}

function deschideNoteElev(index) {
    elevSelectatIndex = index;
    numeElevSelectatSpan.textContent = elevi[index].nume;
    afiseazaNote();
    noteElevWrapper.style.display = 'flex';
}

function stergeElev(index) {
    if (elevSelectatIndex === index) {
        noteElevWrapper.style.display = 'none';
        elevSelectatIndex = null;
    }
    elevi.splice(index, 1);
    afiseazaElevi();
}

function stergeNota(notaIndex) {
    if (elevSelectatIndex === null) return;
    elevi[elevSelectatIndex].note.splice(notaIndex, 1);
    afiseazaNote();
    afiseazaElevi();
}

formElev.addEventListener('submit', (e) => {
    e.preventDefault();
    const nume = inputNumeElev.value.trim();
    if (nume) {
        elevi.push({ nume: nume, note: [] });
        inputNumeElev.value = '';
        afiseazaElevi();
    }
});

formNota.addEventListener('submit', (e) => {
    e.preventDefault();
    if (elevSelectatIndex === null) return;

    const nota = parseFloat(inputValoareNota.value);
    if (!isNaN(nota) && nota >= 1 && nota <= 10) {
        elevi[elevSelectatIndex].note.push(nota);
        inputValoareNota.value = '';
        afiseazaNote();
        afiseazaElevi();
    }
});

btnAscunde.addEventListener('click', () => {
    noteElevWrapper.style.display = 'none';
    elevSelectatIndex = null;
});

btnSortEleviAsc.addEventListener('click', () => {
    elevi.sort((a, b) => {
        const medA = a.note.length ? parseFloat(calculeazaMedie(a.note)) : 0;
        const medB = b.note.length ? parseFloat(calculeazaMedie(b.note)) : 0;
        return medA - medB;
    });
    afiseazaElevi();
});

btnSortEleviDesc.addEventListener('click', () => {
    elevi.sort((a, b) => {
        const medA = a.note.length ? parseFloat(calculeazaMedie(a.note)) : 0;
        const medB = b.note.length ? parseFloat(calculeazaMedie(b.note)) : 0;
        return medB - medA;
    });
    afiseazaElevi();
});

btnSortNoteAsc.addEventListener('click', () => {
    if (elevSelectatIndex !== null) {
        elevi[elevSelectatIndex].note.sort((a, b) => a - b);
        afiseazaNote();
    }
});

btnSortNoteDesc.addEventListener('click', () => {
    if (elevSelectatIndex !== null) {
        elevi[elevSelectatIndex].note.sort((a, b) => b - a);
        afiseazaNote();
    }
});