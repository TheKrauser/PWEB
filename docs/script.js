document.addEventListener('DOMContentLoaded', () =>
{
    const colunas = document.querySelectorAll(".a-fazer, .em-andamento, .concluido");
    const cartoes = document.querySelectorAll(".cartao");

    const botoesAdicionarCartao = document.querySelectorAll('.quadrado-adicionar');
    const popupAdicionar = document.querySelector('.popup-adicionar');
    const popupVisualizar = document.querySelector('.popup-visualizar');

    const botaoAdicionarTarefa = document.querySelector('.adicionarTarefa');
    const botaoFecharAdicionar = document.querySelector('.fecharPopup');

    const botaoEditarTarefa = document.querySelector(".editarTarefa");
    const botaoFecharVisualizar = document.querySelector(".fecharVisualizarPopup");
    const botaoDeletarTarefa = document.querySelector(".deletarTarefa");

    carregarDoLocalStorage();
    verificarCartoesExpirados();
    
    setInterval(verificarCartoesExpirados, 30000);

    cartoes.forEach(cartao =>
    {
        cartao.addEventListener('dragstart', dragStart);
        cartao.addEventListener('dragend', dragEnd);
        cartao.addEventListener('click', () =>
        {
            popupVisualizar.style.display = 'flex';

            let titulo = popupVisualizar.querySelector(".titulo");
            let descricao = popupVisualizar.querySelector(".descricao");
            let prazo = popupVisualizar.querySelector(".prazo");
            let responsavel = popupVisualizar.querySelector(".resposavel");
            let prioridade = popupVisualizar.querySelector(".prioridade");

            titulo.value = cartao.querySelector(".nome").textContent;
            descricao.value = cartao.querySelector(".descricao").textContent;
            prazo.value = cartao.querySelector(".data").textContent;
            responsavel.value = cartao.querySelector(".responsavel").textContent;
            prioridade.value = cartao.querySelector(".prioridade").textContent;
        });
    });

    colunas.forEach(coluna =>
    {
        coluna.addEventListener('dragover', dragOver);
        coluna.addEventListener('dragenter', dragEnter);
        coluna.addEventListener('dragleave', dragLeave);
        coluna.addEventListener('drop', drop);
    });

    botaoAdicionarTarefa.addEventListener("click", adicionarTarefa);
    botaoFecharAdicionar.addEventListener("click", fecharPopupAdicionar);

    botaoEditarTarefa.addEventListener("click", editarTarefa);
    botaoFecharVisualizar.addEventListener("click", fecharPopupVisualizar);
    botaoDeletarTarefa.addEventListener("click", deletarTarefa);

    let colunaSelecionada = null;
    let cartaoSelecionado = null;
    let cartaoArrastado = null;

    botoesAdicionarCartao.forEach(botao =>
    {
        botao.addEventListener('click', () =>
        {
            popupAdicionar.style.display = 'flex';
            colunaSelecionada = botao.parentElement;
        });
    });

    function adicionarTarefa()
    {
        const titulo = document.querySelector('.popup-adicionar .titulo').value;
        const descricao = document.querySelector('.popup-adicionar .descricao').value;
        const prazo = document.querySelector('.popup-adicionar .prazo').value;
        const responsavel = document.querySelector('.popup-adicionar .responsavel').value;
        const prioridade = document.querySelector(".popup-adicionar .prioridade").value;

        if (titulo && descricao && prazo && responsavel && prioridade)
        {
            const novoCartao = document.createElement('div');
            novoCartao.classList.add('cartao');
            novoCartao.draggable = true;
            novoCartao.innerHTML = `
            <div class="cartao-conteudo">
                <p class="nome">${ titulo }</p>
                <p class="descricao">${ descricao }</p>
                <div class="data-responsavel">
                    <p class="data">${ prazo }</p>
                    <div class="prioridade-conteudo">
                        <p class="prioridade">${ prioridade }</p>

                    </div>
                        <p class="responsavel">${ responsavel }</p>
                    </div>
                </div>
            `;

            atualizarCorPrioridade(novoCartao);
            colunaSelecionada.appendChild(novoCartao);
            adicionarEventos(novoCartao);
            popupAdicionar.style.display = 'none';
            limparFormulario();
            verificarCartoesExpirados();
        }
        else
        {
            alert('Por favor, preencha todos os campos!');
        }
    }

    function verificarCartoesExpirados()
    {
        const cartoes = document.querySelectorAll(".cartao");
        const hoje = new Date();

        cartoes.forEach(cartao =>
        {
            const dataPrazo = cartao.querySelector('.data').textContent;
            if (dataPrazo)
            {
                const dataValidade = new Date(dataPrazo);

                if (dataValidade < hoje)
                {
                    cartao.classList.add('cartao-expirado');
                } else
                {
                    cartao.classList.remove('cartao-expirado');
                }
            }
        });
    }

    function fecharPopupAdicionar()
    {
        popupAdicionar.style.display = 'none';
        limparFormulario();
    }

    function fecharPopupVisualizar()
    {
        popupVisualizar.style.display = "none";
    }

    function dragStart()
    {
        cartaoArrastado = this;
    }

    function dragEnd()
    {
        cartaoArrastado = null;
    }

    function dragOver(e)
    {
        e.preventDefault();
    }

    function dragEnter(e)
    {
        e.preventDefault();
        this.style.backgroundColor = '#cfd8dc'; // Highlight effect
    }

    function dragLeave()
    {
        this.style.backgroundColor = ''; // Remove highlight effect
    }

    function drop()
    {
        this.style.backgroundColor = '';

        const listaCartoes = this.querySelector(".lista-cartoes");

        if (cartaoArrastado)
        {
            listaCartoes.appendChild(cartaoArrastado);

            if (this.className === "concluido")
            {
                cartaoArrastado.classList.add("cartao-concluido");
            }
            else
            {
                cartaoArrastado.classList.remove("cartao-concluido");
            }

            cartaoArrastado = null;
        }

        salvarNoLocalStorage();
    }

    function limparFormulario()
    {
        document.querySelector('.popup-adicionar .titulo').value = '';
        document.querySelector('.popup-adicionar .descricao').value = '';
        document.querySelector('.popup-adicionar .prazo').value = '';
        document.querySelector('.popup-adicionar .responsavel').value = '';
        document.querySelector('.popup-adicionar .prioridade').value = '';
    }

    function adicionarEventos(cartao)
    {
        cartao.addEventListener('dragstart', dragStart);
        cartao.addEventListener('dragend', dragEnd);
        cartao.addEventListener('click', () =>
        {
            popupVisualizar.style.display = 'flex';
            cartaoSelecionado = cartao;

            let titulo = popupVisualizar.querySelector(".titulo");
            let descricao = popupVisualizar.querySelector(".descricao");
            let prazo = popupVisualizar.querySelector(".prazo");
            let responsavel = popupVisualizar.querySelector(".responsavel");
            let prioridade = popupVisualizar.querySelector(".prioridade");

            const data = cartao.querySelector(".data").textContent;
            let dataFormatada = new Date(data);

            titulo.value = cartao.querySelector(".nome").textContent;
            descricao.value = cartao.querySelector(".descricao").textContent;
            prazo.valueAsDate = dataFormatada;
            responsavel.value = cartao.querySelector(".responsavel").textContent;
            prioridade.value = cartao.querySelector(".prioridade").textContent;
        });
    }

    function atualizarCorPrioridade(card)
    {
        let prioridade = card.querySelector(".prioridade-conteudo");
        let valor = card.querySelector(".prioridade").textContent;

        switch (valor)
        {
            case "ALTA":
                prioridade.style.outline = "rgb(255,0,0) solid 3px";
                prioridade.style.backgroundColor = "rgb(220,40,0, 1)";
                break;

            case "MEDIA":
                prioridade.style.outline = "rgb(200, 100, 0) solid 3px";
                prioridade.style.backgroundColor = "rgb(255,166,0, 1)";
                break;

            case "BAIXA":
                prioridade.style.outline = "rgb(0, 100, 14) solid 3px";
                prioridade.style.backgroundColor = "rgb(30,255,0, 1)";
                break;
        }
    }

    function editarTarefa()
    {
        let titulo = popupVisualizar.querySelector(".titulo").value;
        let descricao = popupVisualizar.querySelector(".descricao").value;
        let prazo = popupVisualizar.querySelector(".prazo").value;
        let responsavel = popupVisualizar.querySelector(".responsavel").value;
        let prioridade = popupVisualizar.querySelector(".prioridade").value;

        if (titulo && descricao && prazo && responsavel && prioridade)
        {
            cartaoSelecionado.querySelector(".nome").textContent = titulo;
            cartaoSelecionado.querySelector(".descricao").textContent = descricao;
            cartaoSelecionado.querySelector(".data").textContent = prazo;
            cartaoSelecionado.querySelector(".responsavel").textContent = responsavel;
            cartaoSelecionado.querySelector(".prioridade").textContent = prioridade;

            atualizarCorPrioridade(cartaoSelecionado);
            cartaoSelecionado = null;
            popupVisualizar.style.display = 'none';
        }
        else
        {
            alert("Por favor, preencha todos os campos!");
        }

        verificarCartoesExpirados();
    }

    function deletarTarefa()
    {
        cartaoSelecionado.remove();
        cartaoSelecionado = null;
        fecharPopupVisualizar();
    }

    function salvarNoLocalStorage()
    {
        const cardsData = [];

        colunas.forEach(column =>
        {
            const columnClass = column.className;
            const cards = column.querySelectorAll('.cartao');

            cards.forEach(card =>
            {
                const cardData = {
                    columnClass: columnClass,
                    title: card.querySelector('.nome').textContent,
                    description: card.querySelector('.descricao')?.textContent || "",
                    deadline: card.querySelector('.data')?.textContent || "",
                    priority: card.querySelector('.prioridade')?.textContent || "",
                    responsible: card.querySelector('.responsavel')?.textContent || ""
                };
                cardsData.push(cardData);
            });
        });

        localStorage.setItem('kanbanCards', JSON.stringify(cardsData));
    }

    function carregarDoLocalStorage()
    {
        const savedCards = JSON.parse(localStorage.getItem('kanbanCards')) || [];

        savedCards.forEach(cardData =>
        {
            const coluna = document.querySelector("." + cardData.columnClass);
            if (coluna)
            {
                const cartao = document.createElement('div');
                cartao.classList.add('cartao');
                cartao.draggable = true;
                cartao.innerHTML = `
                    <div class="cartao-conteudo">
                        <p class="nome">${ cardData.title }</p>
                        <p class="descricao">${ cardData.description }</p>
                        <div class="data-responsavel">
                            <p class="data">${ cardData.deadline }</p>
                            <div class="prioridade-conteudo">
                                <p class="prioridade">${ cardData.priority }</p>
                            </div>
                            <p class="responsavel">${ cardData.responsible }</p>
                        </div>
                    </div>
                `;

                coluna.querySelector('.lista-cartoes').appendChild(cartao);
                
                if (coluna.className === "concluido")
                {
                    cartao.classList.add("cartao-concluido");
                }

                adicionarEventos(cartao);
                atualizarCorPrioridade(cartao);
            }
        });
    }

    window.onbeforeunload = function ()
    {
        salvarNoLocalStorage();
    };
});
