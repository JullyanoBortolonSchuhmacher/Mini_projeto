const tempo = document.getElementById('timer'); 
const tempoheader = document.getElementById('minitimer')
const botaoIniciar = document.getElementById('iniciarTimer'); 
const botaoParar = document.getElementById('pararTimer'); 
const botaoPausar = document.getElementById('pausarTimer');
const botaoApi = document.getElementById('proximo'); // botao da api
botaoApi.disabled = true;
botaoApi.classList.add('desabilitado')

let contador = 25 * 60; //25min / 1500          //Tempo inicial
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
            alert("Hora da pausa")
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

function stopTimer() {
    clearTimeout(pararFuncao);
    contador = 0;
    console.log("Contador encerrado");
    botaoIniciar.disabled = false;
    botaoParar.disabled = true;
    window.location.reload();
}

function mostrarExercicios() {
    const exerciciosElement = document.querySelector('.exercicios');

    if (contador === 0) { // Verifica se o temporizador está parado
        const exercicio = detalheExercicios.find(exercicio => !exercicio.status);

        if (exercicio) {
            const exercicioHTML = document.createElement('div');
            exercicioHTML.innerHTML = `
                <h3>${exercicio.name}</h3>
                <p>${exercicio.instructions}</p>
                <hr>
            `;
            exerciciosElement.appendChild(exercicioHTML);

            exercicio.status = true; // Marca o exercício como exibido
        } else {
            const mensagemConclusao = document.createElement('p');
            mensagemConclusao.textContent = "Todos os exercícios foram concluídos. Parabéns!";
            exerciciosElement.appendChild(mensagemConclusao);
        }
    }
}

function pausar() {
    if (!emPausa) {
        clearTimeout(pararFuncao); // Pausa o temporizador
        console.log("Timer pausado");
        botaoPausar.querySelector('span').innerText = "play_arrow";
        // atualizarEstadoBotaoApi(); // Atualiza o estado do botãoApi
        botaoParar.disabled = false;
        botaoParar.classList.add('desabilitado');
        mostrarExercicios();
    } else {
        pausarFuncao = setTimeout(incTimer, 1000); // Continua o temporizador
        botaoPausar.querySelector('span').innerText = "pause";
        console.log("Timer continuado");
        botaoParar.classList.remove('desabilitado');
        botaoParar.disabled = true;
        // atualizarEstadoBotaoApi(); // Atualiza o estado do botãoApi
    }
    emPausa = !emPausa; // Inverte o estado de 
    if (emPausa == true){
        botaoApi.disabled = false;
        botaoApi.classList.remove('desabilitado')
    } else {
        botaoApi.disabled = true;
        botaoApi.classList.add('desabilitado')

    }
}

botaoApi.addEventListener('click', function() {
    if (emPausa){
        renderizarApi();
    } else {
        console.log("O temporizador não está em pausa. Aguarde a pausa para exibir o próximo exercício.")
    }
});

// Após marcar o alongamento como concluído
exercicio.status = true; // Marca o exercício como concluído
localStorage.setItem('ultimaPagina', window.location.href); // Salva a última página visitada
localStorage.setItem('indiceAlongamento', detalheExercicios.indexOf(exercicio)); // Salva o índice do alongamento

let count = localStorage.getItem('count') || 0; // Recupera o contador de alongamentos concluídos do localStorage
count++; // Incrementa o contador
localStorage.setItem('count', count); // Salva o novo valor do contador

if (count === 9) {
    // Realize a lógica para contar na página consultada na API
}

const exercicio = detalheExercicios.find(exercicio => !exercicio.status && detalheExercicios.indexOf(exercicio) !== localStorage.getItem('indiceAlongamento'));

if (exercicio) {
    // Exibir o exercício
} else {
    // Todos os exercícios foram concluídos
}