function Calcula()
{
    var num1 = prompt("Digite o numero 1");
    var num2 = prompt("Digite o numero 2");

    num1 = parseInt(num1);
    num2 = parseInt(num2);

    alert(`Soma dos dois: ${num1+num2}
    Subtração do primeiro pelo segundo: ${num1-num2}
    Produto dos dois: ${num1*num2}
    Divisão do primeiro pelo segundo: ${num1/num2}
    Resto da divisão do primeiro pelo segundo: ${num1%num2}`);
}