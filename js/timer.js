const tempo = document.getElementById('timer'); 
const botaoIniciar = document.getElementById('iniciarTimer'); 
const botaoParar = document.getElementById('pararTimer'); 

let contador = 25 * 60; //25min            // Tempo inicial /initial timer
let pararFuncao;
let ciclo = 0; 
let emPausa = false; //indica se está em pausa ou não / indicate if it is in pause or not

//função de iniciar o temporizador / function  to start the timer
function incTimer() {
    if (contador === 0) { 
        if (!emPausa) {
            if (ciclo % 2 === 0) { // Se o ciclo é par (trabalho)
                contador = 5 * 60; // Tempo de pausa curta em segundos
                console.log("Hora da pausa/alongamento");
                emPausa = true;
            } else { // Se o ciclo é ímpar (pausa) 
                contador = 25 * 60; // Tempo de trabalho em segundos
                console.log("Hora de foco");
                emPausa = false;
            }
            ciclo++;
            console.log('Ciclo n°' + ciclo);
        } else { // Se estiver em pausa
            if (ciclo === 7) { 
                contador = 15 * 60; // Tempo de pausa longa em segundos
                console.log("Hora do descanso");
                ciclo = 0;
                return;
            } else {
                contador = 25 * 60; // Tempo de trabalho em segundos
                console.log("Hora do trabalho");
            }
            emPausa = false;
            ciclo++;
            console.log('Ciclo n°' + ciclo);
        }
    }

    let minutos = Math.floor(contador / 60);
    let segundos = contador % 60;
    tempo.innerHTML = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    contador--;

    pararFuncao = setTimeout(incTimer, 1000); // Chama a função a cada segundo / call the function every second

    botaoIniciar.disabled = true; 
    botaoParar.disabled = false;
}

function stopTimer() {
    clearTimeout(pararFuncao);
    contador = 0;
    console.log("Contador encerrado");
    botaoIniciar.disabled = false;
    botaoParar.disabled = true;
    window.location.reload();
}
