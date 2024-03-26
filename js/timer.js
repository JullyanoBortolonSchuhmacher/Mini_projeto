const tempo = document.getElementById('timer'); 
const tempoheader = document.getElementById('minitimer')
const botaoIniciar = document.getElementById('iniciarTimer'); 
const botaoParar = document.getElementById('pararTimer'); 
const botaoPausar = document.getElementById('pausarTimer');

let contador = 25 * 60; //25min            // Tempo inicial /initial timer
let pausarFuncao; 
let ciclo = 0; 
let emPausa = false; //indica se está em pausa ou não 

//função de iniciar o temporizador
function incTimer() {
    if (contador === 0) { 
        if (!emPausa) {
            if (ciclo % 2 === 0) { // Se o ciclo é par (25minfoco - 5minpausa)
                contador = 5 * 60; // Tempo de pausa curta em segundos
                console.log("Hora da pausa/alongamento");
                emPausa = true;
            } else { // Se o ciclo é ímpar (pausa) 
                contador = 25 * 60; // Tempo de foco em segundos
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
                contador = 25 * 60; // Tempo de foco em segundos
                console.log("Hora de foco");
            }
            emPausa = false;
            ciclo++;
            console.log('Ciclo n°' + ciclo);
        }
    }
    botaoIniciar.style.display = 'none';
    
    let minutos = Math.floor(contador / 60);
    let segundos = contador % 60;
    tempo.innerHTML = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    tempoheader.innerHTML = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    
    contador--;
    
    pararFuncao = setTimeout(incTimer, 1000); // Chama a função a cada segundo 
    
    botaoIniciar.disabled = true; 
    botaoParar.disabled = false;
}


function pausar() {
    if (!emPausa) {
        clearTimeout(pararFuncao); // Pausa o temporizador
        
        console.log("Timer pausado");
        botaoParar.disabled = true; 
        botaoParar.classList.add('desabilitado')
        botaoPausar.querySelector('span').innerText = "play_arrow";
    } else {
        pausarFuncao = setTimeout(incTimer, 1000); // Continua o temporizador 
        botaoPausar.querySelector('span').innerText = "pause";
        console.log("Timer continuado");
        botaoParar.disabled = false; 
        botaoParar.classList.remove('desabilitado')
    }
    emPausa = !emPausa; // Inverte o estado de pausa 
};

function stopTimer() {
    clearTimeout(pararFuncao);
    contador = 0;
    console.log("Contador encerrado");
    botaoIniciar.disabled = false;
    botaoParar.disabled = true;
    window.location.reload();
}
