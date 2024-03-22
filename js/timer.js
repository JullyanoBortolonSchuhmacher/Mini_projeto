const tempo = document.getElementById('timer')
const botaoIniciar = document.getElementById('iniciarTimer')
const botaoParar = document.getElementById('pararTimer')

let contador = 25 * 60;
let pararTimer;

//metodo pomodoro) {

function  incTimer() {
    if (contador === 0) {
        console.log("hora da pausa");
        return;
    }

    console.log(contador)
    contador--;

    pararFuncao = setInterval(() => {
        let minutos = Math.floor(contador / 60);
        let segundos = contador % 60;
        tempo.innerHTML = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

        switch (contador) {
            case 20*60:
                console.log('passou 5 minutos')
            case 15*60:
                console.log('Passou 10 minutos')
            case 10*60:
                console.log('Passou 15 minutos')
            case 5*60:
                console.log('Passou 20 minutos')
            case 0:
                console.log('terminou o timer')
            }
        contador--;
    }, 1000); //1000 = 1s

    botaoIniciar.disabled = true;
    botaoParar.disabled = false;

}

function stopTimer(){
    clearInterval(pararFuncao);
    contador = 0;
    console.log("contador encerrado");
    botaoIniciar.disabled = false;
    botaoParar.disabled = true;
    window.location.reload()
}

