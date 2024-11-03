document.addEventListener('DOMContentLoaded', () => {
    let radio1 = document.getElementById("radio1");
    let radio2 = document.getElementById("radio2");
    let input = document.getElementById("Input");
});

function maiusculas()
{
    input.value = input.value.toUpperCase();
    radio2.checked = false;
}

function minusculas()
{
    input.value = input.value.toLowerCase();
    radio1.checked = false;
}