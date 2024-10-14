function IMC()
{
    var altura = prompt("Qual a sua altura?");
    var peso = prompt("Qual o seu peso?")

    imc = peso / (Math.pow(altura, 2));

    var classific = ""
    var grau = 0

    if (imc < 18.5)
    {
        classific = "MAGREZA"
        grau = 0
    }
    else if (imc >= 18.5 && imc <= 24.9)
    {
        classific = "NORMAL"
        grau = 0
    }
    else if (imc >= 25 && imc <= 29.9)
    {
        classific = "SOBREPESO"
        grau = 1
    }
    else if (imc >= 30 && imc <= 39.9)
    {
        classific = "OBESIDADE"
        grau = 2
    }
    else
    {
        classific = "OBESIDADE GRAVE"
        grau = 3
    }

    alert(`CLASSIFICAÇÃO:\n${classific}\n\nOBESIDADE GRAU ${grau}`)
}