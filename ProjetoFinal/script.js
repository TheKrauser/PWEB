document.addEventListener('DOMContentLoaded', () =>
{

    const colunas = document.querySelectorAll(".a-fazer, .em-andamento, .concluido");
    const cartoes = document.querySelectorAll(".cartao");
    const addCardButtons = document.querySelectorAll('.quadrado');
    const popup = document.querySelector('.popup');
    const viewPopup = document.querySelector('.view-popup');
    const closeButton = document.querySelector('.closeButton');
    const addTaskButton = document.querySelector('.addTaskButton');
    const editTaskButton = document.querySelector(".editTaskButton");
    const closeEditButton = document.querySelector(".closeEditButton");
    const deleteTaskButton = document.querySelector(".deleteTaskButton");

    loadCardsFromLocalStorage();
    verificarCartoesExpirados();
    setInterval(verificarCartoesExpirados, 60000); // Verifica a cada 60 segundos

    cartoes.forEach(cartao =>
    {
        cartao.addEventListener('dragstart', dragStart);
        cartao.addEventListener('dragend', dragEnd);
        cartao.addEventListener('click', () =>
        {
            viewPopup.style.display = 'flex';

            let title = viewPopup.querySelector(".title");
            let description = viewPopup.querySelector(".description");
            let deadline = viewPopup.querySelector(".deadline");
            let responsible = viewPopup.querySelector(".responsible");
            let priority = viewPopup.querySelector(".priority");

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
        const title = document.querySelector('.title').value;
        const description = document.querySelector('.description').value;
        const deadline = document.querySelector('.deadline').value;
        const responsible = document.querySelector('.responsible').value;
        const priority = document.querySelector(".priority").value;

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
            addEvents(newCard); // Add drag events to the new card
            popup.style.display = 'none';
            clearForm();
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
                    cartao.classList.add('expirado');
                } else
                {
                    cartao.classList.remove('expirado'); // Remove caso seja atualizado
                }
            }
        });
    }

    function close()
    {
        popup.style.display = 'none';
        clearForm();
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

    function clearForm()
    {
        document.querySelector('.title').value = '';
        document.querySelector('.description').value = '';
        document.querySelector('.deadline').value = '';
        document.querySelector('.responsible').value = '';
        document.querySelector('.priority').value = '';
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

            let title = viewPopup.querySelector(".title");
            let description = viewPopup.querySelector(".description");
            let deadline = viewPopup.querySelector(".deadline");
            let responsible = viewPopup.querySelector(".responsible");
            let priority = viewPopup.querySelector(".priority");

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
                break;

            case "MEDIA":
                prioridade.style.outline = "rgb(255, 166, 0) solid 3px";
                break;

            case "BAIXA":
                prioridade.style.outline = "rgb(30, 255, 0) solid 3px";
                break;
        }
    }

    function editTask()
    {
        let title = viewPopup.querySelector(".title").value;
        let description = viewPopup.querySelector(".description").value;
        let deadline = viewPopup.querySelector(".deadline").value;
        let responsible = viewPopup.querySelector(".responsible").value;
        let priority = viewPopup.querySelector(".priority").value;

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
