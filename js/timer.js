const tempo = document.getElementById('timer')
const botaoIniciar = document.getElementById('iniciarTimer')
const botaoParar = document.getElementById('pararTimer')

let contador = 1;
let pararTimer;

//metodo pomodoro) {

function  incTimer() {
    console.log(contador)
    contador++
    pararFuncao = setInterval(() => {
        tempo.innerHTML = `${contador}s`
        console.log(contador);
        contador++;
        timer.style.transform = `rotate(${time * 36}deg)`;
    }, 1000); 

    botaoIniciar.disabled = true;
    botaoParar.disabled = false;
    
    //função para resetar o timer
    function resetarTempo(){
        clearInterval(pararFuncao);
        contador=1;
        tempo.innerHTML ="0s"
        botaoIniciar.disabled = false;
        botaoParar.disabled = true;
    }
    
}

function stopTimer(){
    clearInterval(pararFuncao);
    contador = 1;
    console.log("contador encerrado");
    botaoIniciar.disabled = false;
    botaoParar.disabled = true;
    resetarTempo()
}

