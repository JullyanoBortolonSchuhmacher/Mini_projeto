let detalheExercicios = [];
let contadorExercicio = 0;
let contadorApi = 0;

function acessarApi() {
    // Definição de Url e Key da API
    const apiUrl = `https://api.api-ninjas.com/v1/exercises?type=stretching&offset=${contadorApi}`;
    // const keyApi = 'CaKSKVHbcXR7bQeWzqpuZw==XzQkOhOp6EttxCmU';

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
    if (detalheExercicios.length > contadorExercicio) {
        apiResponseElement.textContent = detalheExercicios[contadorExercicio].name;
        detalheExercicios[contadorExercicio].status = true;
        contadorExercicio += 1;
    } else {
        apiResponseElement.textContent = "Não há mais exercícios disponíveis.";
    }

    if (contadorExercicio === 10) {
        acessarApi();
        contadorApi += 10;
        contadorExercicio = 0;
    }
}

// Chamando a função para acessar a API quando o script é carregado
acessarApi();
