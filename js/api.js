let detalheExercicios = [];
let contadorExercicio = 0;
let contadorApi = 0;

function acessarApi() {
    // Definição de Url e Key da API
    const apiUrl = `https://api.api-ninjas.com/v1/exercises?type=stretching&offset=${contadorApi}`;
    const keyApi = ''; 

    if (keyApi == '' || keyApi == null){
        console.log('Insira uma chave de api')
    }
    // Setando configurações necessárias para acessar dados da Api
    const headers = {
        'X-Api-Key': keyApi,
        'Content-Type': 'application/json'
    };

    // Acessando API por meio do fetch()
    try {
        fetch(apiUrl, {
            method: 'GET',
            headers: headers
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao acessar a API');
                }
                return response.json();
            })
            .then(data => {
                detalheExercicios = data.map(exercise => {
                    return {
                        name: exercise.name,
                        difficulty: exercise.difficulty,
                        muscle: exercise.muscle,
                        instructions: exercise.instructions,
                        status: false
                    };
                });
                console.log(detalheExercicios);

                // Chamando a função para renderizar os exercícios após obter os dados da API
                renderizarApi();
            })
            .catch(error => console.error('Erro ao processar a resposta da API:', error));
    } catch (error) {
        console.error('Erro ao acessar a API:', error);
        // Executar ações alternativas ou mostrar mensagem de erro ao usuário
    }
}

function renderizarApi() {
    const apiResponseElement = document.getElementById('apiresp');
    const dificuldadeElement = document.getElementById('dificuldade');
    const instrucoesElement = document.getElementById('instrucoes');

    if (emPausa && detalheExercicios && detalheExercicios.length > 0) {
        let exercicioNaoRepetido = detalheExercicios.find(exercicio => !exercicio.status);

        if (exercicioNaoRepetido) {
            apiResponseElement.textContent = exercicioNaoRepetido.name;
            dificuldadeElement.textContent = `Dificuldade: ${exercicioNaoRepetido.difficulty}`;
            instrucoesElement.textContent = `Instruções: ${exercicioNaoRepetido.instructions}`;

            exercicioNaoRepetido.status = true;
        } else {
            detalheExercicios = []; // Reinicia a lista de exercícios se todos foram concluídos
        }
    } else {
        apiResponseElement.textContent = "Aguardando pausa para exibir o próximo exercício.";
    }
}

acessarApi();
