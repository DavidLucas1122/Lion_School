'use strict'

const container_inicio = document.getElementById('inicio')
const container_cursos = document.getElementById('curso')
const container_aluno = document.getElementById('aluno')

const container_alunos = document.getElementById('alunos')

const titulo_curso = document.getElementById('title')

const buttons_cursos = document.getElementById('buttons_cursos')


async function pegarCursos() {
    const url = `https://lion-school-phbo.onrender.com/cursos`
    const response = await fetch(url)
    const dados = await response.json()

    return dados
}

async function mostrarCursos () {
    const cursos = await pegarCursos()

    
    cursos.forEach(curso => {
        const button = document.createElement('button')

        button.textContent = curso.sigla

        buttons_cursos.appendChild(button)

        button.addEventListener('click', function () {
            mostrarAlunos(curso.id)
            titulo_curso.textContent = curso.nome
            container_inicio.style.display = 'none'
            container_cursos.style.display = 'flex'
        })
    })
}

async function pegarAlunos(cursoId) {
    const url = `https://lion-school-phbo.onrender.com/alunos?curso_id=${cursoId}`
    const response = await fetch(url)
    const dados = await response.json()

    return dados
}

async function mostrarAlunos(cursoId) {
    container_alunos.replaceChildren()
    const alunos = await pegarAlunos(cursoId)

    console.log(alunos)

    alunos.forEach(aluno => {
        const div = document.createElement('div')
        div.classList.add('aluno')

        const img = document.createElement('img')
        img.src = aluno.foto

        const p = document.createElement('p')
        p.textContent = aluno.nome.toUpperCase()

        div.append(img, p)
        container_alunos.append(div)

        div.addEventListener('click', function() {
            mostrarInfosAluno(aluno.id)
            container_cursos.style.display = 'none'
            container_aluno.style.display = 'flex'
        })
    })
}

async function buscarInfosAluno(alunoId) {
    const url = `https://lion-school-phbo.onrender.com//alunos/${alunoId}`
    const response = await fetch(url)
    const dados = await response.json()

    return dados
}

function mostrarInfosAluno (idAluno){
    
}


mostrarCursos()