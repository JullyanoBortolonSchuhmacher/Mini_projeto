let detalheExercicios = [];
let contadorExercicio = 0
let contadorApi = 

function acessarApi() {

    // Definição de Url e Key da API
    const apiUrl = `https://api.api-ninjas.com/v1/exercises?type=stretching&offset=${contadorApi}`;
    const keyApi = 'CaKSKVHbcXR7bQeWzqpuZw==XzQkOhOp6EttxCmU'

    // Setando configurações necessárias para acessar dados da Api
    const headers = {
        'X-Api-Key': keyApi,
        'Content-Type': 'application/json'
    }

    // Acessando API por meio do fetch()
    fetch(apiUrl, {
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then(data => {
            detalheExercicios = data.map(exercise => {
                return {
                    name: exercise.name,
                    difficulty: exercise.difficulty,
                    muscle: exercise.muscle,
                    instructions: exercise.instructions,
                    status: false
                }
            })
            console.log(detalheExercicios)
        })
        .catch(error => console.error('Erro;', error))
}
acessarApi()

function renderizarApi() {
    console.log(detalheExercicios[contadorExercicio])
    detalheExercicios[contadorExercicio].status = true
    contadorExercicio += 1

    if (contadorExercicio === 10) {
        acessarApi()
        contadorApi += 10
        contadorExercicio = 0
    }
}
