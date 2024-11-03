document.addEventListener('DOMContentLoaded', () => {
    let h1 = document.getElementById("h1")
    let img = document.getElementById("img")
});

function mouseDown()
{
    h1.innerHTML = "Janela Quebrada";
    img.src = "janela_quebrada.png"
}

function mouseEnter()
{
    h1.innerHTML = "Janela Aberta"
    img.src = "janela_aberta.png"
}

function mouseLeave()
{
    h1.innerHTML = "Janela Fechada"
    img.src = "janela_fechada.png"
}

