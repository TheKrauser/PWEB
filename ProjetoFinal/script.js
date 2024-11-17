document.addEventListener('DOMContentLoaded', () =>
{
    const colunas = document.querySelectorAll(".a-fazer, .em-andamento, .concluido");
    const cartoes = document.querySelectorAll(".cartao");
    const addCardButtons = document.querySelectorAll('.quadrado-adicionar');
    const popup = document.querySelector('.popup-adicionar');
    const viewPopup = document.querySelector('.popup-visualizar');
    const closeButton = document.querySelector('.fecharPopup');
    const addTaskButton = document.querySelector('.adicionarTarefa');
    const editTaskButton = document.querySelector(".editarTarefa");
    const closeEditButton = document.querySelector(".fecharVisualizarPopup");
    const deleteTaskButton = document.querySelector(".deletarTarefa");

    loadCardsFromLocalStorage();
    verificarCartoesExpirados();
    setInterval(verificarCartoesExpirados, 30000);

    cartoes.forEach(cartao =>
    {
        cartao.addEventListener('dragstart', dragStart);
        cartao.addEventListener('dragend', dragEnd);
        cartao.addEventListener('click', () =>
        {
            viewPopup.style.display = 'flex';

            let title = viewPopup.querySelector(".titulo");
            let description = viewPopup.querySelector(".descricao");
            let deadline = viewPopup.querySelector(".prazo");
            let responsible = viewPopup.querySelector(".resposavel");
            let priority = viewPopup.querySelector(".prioridade");

            title.value = cartao.querySelector(".nome").textContent;
            description.value = cartao.querySelector(".descricao").textContent;
            deadline.value = cartao.querySelector(".data").textContent;
            responsible.value = cartao.querySelector(".responsavel").textContent;
            priority.value = cartao.querySelector(".prioridade").textContent;
        });
    });

    colunas.forEach(coluna =>
    {
        coluna.addEventListener('dragover', dragOver);
        coluna.addEventListener('dragenter', dragEnter);
        coluna.addEventListener('dragleave', dragLeave);
        coluna.addEventListener('drop', drop);
    });

    addTaskButton.addEventListener("click", addTask);
    editTaskButton.addEventListener("click", editTask);
    closeButton.addEventListener("click", close);
    closeEditButton.addEventListener("click", closeEdit);
    deleteTaskButton.addEventListener("click", deleteTask);

    let selectedColumn = null;

    addCardButtons.forEach(botao =>
    {
        botao.addEventListener('click', () =>
        {
            popup.style.display = 'flex';
            selectedColumn = botao.parentElement;
        });
    });

    function addTask()
    {
        const title = document.querySelector('.popup-adicionar .titulo').value;
        const description = document.querySelector('.popup-adicionar .descricao').value;
        const deadline = document.querySelector('.popup-adicionar .prazo').value;
        const responsible = document.querySelector('.popup-adicionar .responsavel').value;
        const priority = document.querySelector(".popup-adicionar .prioridade").value;

        if (title && description && deadline && responsible && priority)
        {
            const newCard = document.createElement('div');
            newCard.classList.add('cartao');
            newCard.draggable = true;
            newCard.innerHTML = `
            <div class="cartao-conteudo">
                <p class="nome">${ title }</p>
                <p class="descricao">${ description }</p>
                <div class="data-responsavel">
                    <p class="data">${ deadline }</p>
                    <div class="prioridade-conteudo">
                        <p class="prioridade">${ priority }</p>

                    </div>
                        <p class="responsavel">${ responsible }</p>
                    </div>
                </div>
            `;

            defineOutlineColor(newCard);
            selectedColumn.appendChild(newCard);
            addEvents(newCard);
            popup.style.display = 'none';
            clearAddForm();
            verificarCartoesExpirados();
        } else
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
            const dataDeadline = cartao.querySelector('.data').textContent;
            if (dataDeadline)
            {
                const dataValidade = new Date(dataDeadline);

                // Verifica se a data de validade já passou
                if (dataValidade < hoje)
                {
                    cartao.classList.add('cartao-expirado');
                } else
                {
                    cartao.classList.remove('cartao-expirado'); // Remove caso seja atualizado
                }
            }
        });
    }

    function close()
    {
        popup.style.display = 'none';
        clearAddForm();
    }

    function closeEdit()
    {
        viewPopup.style.display = "none";
    }

    let draggedCard = null;

    function dragStart()
    {
        draggedCard = this;
        //this.style.backgroundColor = "#ffffff";
    }

    function dragEnd()
    {
        draggedCard = null;
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

        const t = this.querySelector(".lista-cartoes");

        if (draggedCard)
        {
            t.appendChild(draggedCard);

            if (this.className === "concluido")
            {
                draggedCard.classList.add("cartao-concluido");
            }
            else
            {
                draggedCard.classList.remove("cartao-concluido");
            }

            draggedCard = null;
        }

        saveCardsToLocalStorage();
    }

    function clearAddForm()
    {
        document.querySelector('.popup-adicionar .titulo').value = '';
        document.querySelector('.popup-adicionar .descricao').value = '';
        document.querySelector('.popup-adicionar .prazo').value = '';
        document.querySelector('.popup-adicionar .responsavel').value = '';
        document.querySelector('.popup-adicionar .prioridade').value = '';
    }

    let selectedCard = null;

    function addEvents(card)
    {
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragend', dragEnd);
        card.addEventListener('click', () =>
        {
            viewPopup.style.display = 'flex';
            selectedCard = card;

            let title = viewPopup.querySelector(".titulo");
            let description = viewPopup.querySelector(".descricao");
            let deadline = viewPopup.querySelector(".prazo");
            let responsible = viewPopup.querySelector(".responsavel");
            let priority = viewPopup.querySelector(".prioridade");

            const date = card.querySelector(".data").textContent;
            let newDate = new Date(date);

            title.value = card.querySelector(".nome").textContent;
            description.value = card.querySelector(".descricao").textContent;
            deadline.valueAsDate = newDate;
            responsible.value = card.querySelector(".responsavel").textContent;
            priority.value = card.querySelector(".prioridade").textContent;
        });
    }

    function defineOutlineColor(card)
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

    function editTask()
    {
        let title = viewPopup.querySelector(".titulo").value;
        let description = viewPopup.querySelector(".descricao").value;
        let deadline = viewPopup.querySelector(".prazo").value;
        let responsible = viewPopup.querySelector(".responsavel").value;
        let priority = viewPopup.querySelector(".prioridade").value;

        if (title && description && deadline && responsible && priority)
        {
            selectedCard.querySelector(".nome").textContent = title;
            selectedCard.querySelector(".descricao").textContent = description;
            selectedCard.querySelector(".data").textContent = deadline;
            selectedCard.querySelector(".responsavel").textContent = responsible;
            selectedCard.querySelector(".prioridade").textContent = priority;

            defineOutlineColor(selectedCard);
            selectedCard = null;
            viewPopup.style.display = 'none';
        }
        else
        {
            alert("Por favor, preencha todos os campos!");
        }

        verificarCartoesExpirados();
    }

    function deleteTask()
    {
        selectedCard.remove();
        selectedCard = null;
        closeEdit();
    }

    function saveCardsToLocalStorage()
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

    function loadCardsFromLocalStorage()
    {
        const savedCards = JSON.parse(localStorage.getItem('kanbanCards')) || [];

        savedCards.forEach(cardData =>
        {
            const column = document.querySelector("." + cardData.columnClass);
            if (column)
            {
                const card = document.createElement('div');
                card.classList.add('cartao');
                card.draggable = true;
                card.innerHTML = `
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

                column.querySelector('.lista-cartoes').appendChild(card);
                if (column.className === "concluido")
                {
                    card.classList.add("cartao-concluido");
                }

                addEvents(card);
                defineOutlineColor(card);
            }
        });
    }

    window.onbeforeunload = function ()
    {
        saveCardsToLocalStorage();
    };
});
