function entrarSistema() {
  document.getElementById("telaInicial").style.display = "none";
  document.getElementById("interfaceSistema").style.display = "flex";
  document.getElementById("manualSorter").style.display = "none";
  document.getElementById("relatoriosSorter").style.display = "none";
  gerarQuadros();
}

function mostrarManualSorter() {
  document.getElementById("telaInicial").style.display = "none";
  document.getElementById("interfaceSistema").style.display = "none";
  document.getElementById("manualSorter").style.display = "flex";
  document.getElementById("relatoriosSorter").style.display = "none";
}

function mostrarRelatoriosSorter() {
  document.getElementById("telaInicial").style.display = "none";
  document.getElementById("interfaceSistema").style.display = "none";
  document.getElementById("manualSorter").style.display = "none";
  document.getElementById("relatoriosSorter").style.display = "flex";
  carregarRelatorios();
}
function mostrarRelatoriosCD() {
  document.getElementById("telaInicial").style.display = "none";
  document.getElementById("interfaceSistema").style.display = "none";
  document.getElementById("manualSorter").style.display = "none";
  document.getElementById("relatoriosSorter").style.display = "none";
  document.getElementById("mostrarRelatoriosCD").style.display = "flex";
  carregarRelatorios(); 
}


function voltarInicio() {
  document.getElementById("telaInicial").style.display = "flex";
  document.getElementById("interfaceSistema").style.display = "none";
  document.getElementById("manualSorter").style.display = "none";
  document.getElementById("relatoriosSorter").style.display = "none";
  document.getElementById("mostrarRelatoriosCD").style.display = "none"
}

function gerarQuadros() {
  const painel = document.getElementById("painelQuadros");
  const lista = document.getElementById("listaQuadros");
  painel.innerHTML = '';
  lista.innerHTML = '';
  for (let i = 1; i <= 30; i++) {
    const quadro = document.createElement("div");
    quadro.className = "quadro";
    quadro.id = `quadro-${i}`;
    let disjuntoresHTML = '';
    for (let j = 1; j <= 20; j++) {
      const estado = Math.random() < 0.9 ? '' : ' alerta';
      disjuntoresHTML += `<div class='dijuntor${estado}'>Disjuntor ${j}</div>`;
    }
    quadro.innerHTML = `
  <h4>Quadro ${i}</h4>
  <button class="btn-excluir" onclick="excluirQuadro('quadro-${i}')">🗑️ Excluir</button>
  <button class="btn-editar" onclick="abrirFormularioEditarQuadro('quadro-${i}')">✏️ Editar</button>
  ${disjuntoresHTML}
`;
    painel.appendChild(quadro);

    const itemLista = document.createElement("div");
    itemLista.innerHTML = `<a href="#quadro-${i}" style="text-decoration: none; color: #1e293b;">Quadro ${i}</a>`;
    lista.appendChild(itemLista);
  }
}

function excluirQuadro(id) {  if (!confirm("Tem certeza que deseja excluir este quadro?")) return;
  const quadro = document.getElementById(id);
  if (quadro) quadro.remove();
  const lista = Array.from(document.getElementById("listaQuadros").children);
for (let item of lista) {
  if (item.textContent.includes(id.replace("quadro-", "Quadro "))) {
    item.remove();
    break;
  }
}
}

function filtrarQuadros() {
  const termo = document.getElementById("buscarQuadro").value.toLowerCase();
  const lista = document.getElementById("listaQuadros").children;
  for (let item of lista) {
    item.style.display = item.textContent.toLowerCase().includes(termo) ? "block" : "none";
  }
}

document.getElementById("formRelatorio").addEventListener("submit", function (e) {
  e.preventDefault();
  const data = document.getElementById("dataRelatorio").value;
  const trecho = document.getElementById("trechoRelatorio").value;
  const descricao = document.getElementById("descricaoRelatorio").value;
  const tecnico = document.getElementById("tecnicoRelatorio").value;

  const novo = { data, trecho, descricao, tecnico };
  let
})
function abrirFormularioCriarquadro() {
  document.getElementById("formCriarQuadro").style.display = "block";
  gerarCamposDisjuntores(); // gerar os campos ao abrir
}


function fecharFormularioCriarQuadro() {
  document.getElementById("formCriarQuadro").style.display = "none";
}

function criarQuadroManual() {
  const nome = document.getElementById("nomeNovoQuadro").value.trim();
  const qtd = parseInt(document.getElementById("qtdDisjuntores").value);
  if (!nome || qtd <= 0) return alert("Preencha os dados corretamente.");

  let disjuntoresHTML = '';
  for (let i = 1; i <= qtd; i++) {
    const nomeDisjuntor = document.getElementById(`disjuntorNome${i}`).value.trim() || `Disjuntor ${i}`;
    disjuntoresHTML += `<div class='dijuntor'>${nomeDisjuntor}</div>`;
  }

  const id = "quadro-" + Date.now();
  const painel = document.getElementById("painelQuadros");
  const lista = document.getElementById("listaQuadros");

  const quadro = document.createElement("div");
  quadro.className = "quadro";
  quadro.id = id;
  quadro.innerHTML = `
    <h4>${nome}</h4>
    <button class="btn-excluir" onclick="excluirQuadro('${id}')">🗑️ Excluir</button>
    ${disjuntoresHTML}
  `;
  painel.appendChild(quadro);

  const itemLista = document.createElement("div");
  itemLista.innerHTML = `<a href="#${id}" style="text-decoration: none; color: #1e293b;">${nome}</a>`;
  lista.appendChild(itemLista);

  fecharFormularioCriarQuadro();
}

function gerarCamposDisjuntores() {
  const qtd = parseInt(document.getElementById("qtdDisjuntores").value);
  const container = document.getElementById("camposDisjuntores");
  container.innerHTML = ""; // limpa antes

  for (let i = 1; i <= qtd; i++) {
    const campo = document.createElement("div");
    campo.innerHTML = `
      <label>Nome do Disjuntor ${i}:<br>
        <input type="text" id="disjuntorNome${i}" required>
      </label><br><br>
    `;
    container.appendChild(campo);
  }
}
function abrirFormularioEditarQuadro(id) {
  const quadro = document.getElementById(id);
  if (!quadro) return alert("Quadro não encontrado.");

  document.getElementById("formEditarQuadro").style.display = "block";

  // Pega o nome do quadro (h4)
  const nome = quadro.querySelector("h4").textContent;
  document.getElementById("nomeQuadroEditar").value = nome;

  // Guarda o id do quadro que está sendo editado
  document.getElementById("idQuadroEditar").value = id;

  // Conta quantos disjuntores existem no quadro
  const disjuntores = quadro.querySelectorAll(".dijuntor");
  document.getElementById("qtdDisjuntoresEditar").value = disjuntores.length;

  // Gera os campos para os disjuntores preenchidos
  gerarCamposDisjuntoresEditar();

  // Preenche os nomes dos disjuntores nos inputs
  disjuntores.forEach((disjuntor, i) => {
    const input = document.getElementById(`disjuntorNomeEditar${i + 1}`);
    if (input) input.value = disjuntor.textContent;
  });
}

function gerarCamposDisjuntoresEditar() {
  const qtd = parseInt(document.getElementById("qtdDisjuntoresEditar").value);
  const container = document.getElementById("camposDisjuntoresEditar");
  container.innerHTML = "";

  for (let i = 1; i <= qtd; i++) {
    const campo = document.createElement("div");
    campo.innerHTML = `
      <label>Nome do Disjuntor ${i}:<br>
        <input type="text" id="disjuntorNomeEditar${i}" required>
      </label><br><br>
    `;
    container.appendChild(campo);
  }
}

function fecharFormularioEditarQuadro() {
  document.getElementById("formEditarQuadro").style.display = "none";
}

function salvarEdicaoQuadro() {
  const id = document.getElementById("idQuadroEditar").value;
  const nome = document.getElementById("nomeQuadroEditar").value.trim();
  const qtd = parseInt(document.getElementById("qtdDisjuntoresEditar").value);
  if (!nome || qtd <= 0) return alert("Preencha os dados corretamente.");

  const quadro = document.getElementById(id);
  if (!quadro) return alert("Quadro não encontrado.");

  // Monta o HTML dos disjuntores com os nomes editados
  let disjuntoresHTML = "";
  for (let i = 1; i <= qtd; i++) {
    const nomeDisjuntor = document.getElementById(`disjuntorNomeEditar${i}`).value.trim() || `Disjuntor ${i}`;
    disjuntoresHTML += `<div class='dijuntor'>${nomeDisjuntor}</div>`;
  }

  // Atualiza o conteúdo do quadro (mantém os botões excluir e editar)
  quadro.innerHTML = `
    <h4>${nome}</h4>
    <button class="btn-excluir" onclick="excluirQuadro('${id}')">🗑️ Excluir</button>
    <button class="btn-editar" onclick="abrirFormularioEditarQuadro('${id}')">✏️ Editar</button>
    ${disjuntoresHTML}
  `;

  fecharFormularioEditarQuadro();
}

