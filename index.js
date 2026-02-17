"use strict";

const container_inicio = document.getElementById("inicio");
const container_cursos = document.getElementById("curso");
const container_aluno = document.getElementById("aluno");

const container_alunos = document.getElementById("alunos");

const titulo_curso = document.getElementById("title");

const buttons_cursos = document.getElementById("buttons_cursos");
const button_close = document.getElementById("button_close");
const span_close = document.getElementById("span_close");

function fecharJanela() {
  window.close();
}

function voltarInicio() {
  span_close.textContent = "Sair";
  container_inicio.style.display = "flex";
  container_cursos.style.display = "none";
  container_aluno.style.display = "none";

  button_close.removeEventListener("click", voltarInicio);
  button_close.addEventListener("click", fecharJanela);
}

function voltarCursos() {
  container_cursos.style.display = "flex";
  container_aluno.style.display = "none";

  button_close.removeEventListener("click", voltarCursos);
  button_close.addEventListener("click", voltarInicio);
}

button_close.addEventListener("click", fecharJanela);

async function pegarCursos() {
  const url = `https://lion-school-phbo.onrender.com/cursos`;
  const response = await fetch(url);
  const dados = await response.json();

  return dados;
}

async function mostrarCursos() {
  const cursos = await pegarCursos();

  cursos.forEach((curso) => {
    const button = document.createElement("button");

    button.textContent = curso.sigla;

    buttons_cursos.appendChild(button);

    button.addEventListener("click", function () {
      mostrarAlunos(curso.id);

      span_close.textContent = "Voltar";
      button_close.removeEventListener("click", fecharJanela);
      button_close.addEventListener("click", voltarInicio);

      titulo_curso.textContent = curso.nome;
      container_inicio.style.display = "none";
      container_cursos.style.display = "flex";
    });
  });
}

async function pegarAlunos(cursoId) {
  const url = `https://lion-school-phbo.onrender.com/alunos?curso_id=${cursoId}`;
  const response = await fetch(url);
  const dados = await response.json();

  return dados;
}

async function mostrarAlunos(cursoId) {
  container_alunos.replaceChildren();
  const alunos = await pegarAlunos(cursoId);

  alunos.forEach((aluno) => {
    const div = document.createElement("div");
    div.classList.add("aluno");

    const img = document.createElement("img");
    img.src = aluno.foto;

    const p = document.createElement("p");
    p.textContent = aluno.nome.toUpperCase();

    div.append(img, p);
    container_alunos.append(div);

    div.addEventListener("click", function () {
      mostrarInfosAluno(aluno.id);

      button_close.removeEventListener("click", voltarInicio);
      button_close.addEventListener("click", voltarCursos);

      container_cursos.style.display = "none";
      container_aluno.style.display = "flex";
    });
  });
}

async function buscarInfosAluno(alunoId) {
  const url = `https://lion-school-phbo.onrender.com/alunos/${alunoId}`;
  const response = await fetch(url);
  const dados = await response.json();

  return dados;
}

async function mostrarInfosAluno(idAluno) {
  container_aluno.replaceChildren();

  const infosAluno = await buscarInfosAluno(idAluno);

  const alunoInfos = document.createElement("div");
  alunoInfos.classList.add("aluno_infos");

  const fotoAluno = document.createElement("img");
  fotoAluno.src = infosAluno.foto;

  const nome = document.createElement("h2");
  nome.textContent = infosAluno.nome.toUpperCase();

  alunoInfos.append(fotoAluno, nome);

  const divDesempenho = document.createElement("div");
  divDesempenho.classList.add("aluno_stats");

  infosAluno.desempenho.forEach((status) => {
    const coluna = document.createElement("div");
    coluna.classList.add("stat");

    const categoria = document.createElement("p");
    categoria.textContent = status.categoria;

    const barra = document.createElement("div");
    barra.classList.add("barra");

    const valor = document.createElement("div");
    valor.classList.add("valor");
    valor.style.height = `${status.valor * 3}px`;

    const numero = document.createElement("p");
    numero.textContent = status.valor;

    if (status.valor <= 30) {
      valor.style.backgroundColor = "#C11010";
      numero.style.color = "#C11010";
    } else if (status.valor < 51) {
      valor.style.backgroundColor = "#E5B657";
      numero.style.color = "#E5B657";
    } else {
      valor.style.backgroundColor = "#3347B0";
      numero.style.color = "#3347B0";
    }

    barra.append(numero, valor, categoria);
    coluna.append(barra);
    divDesempenho.append(coluna);
  });

  container_aluno.append(alunoInfos, divDesempenho);
}

mostrarCursos();
