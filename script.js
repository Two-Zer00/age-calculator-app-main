const form = document.getElementsByTagName("form")[0];
const resultElement = document.getElementById("results")

form.addEventListener("submit", calcDiff);


form.year.max = moment().year();

function calcDiff(e) {
    let results = resultElement.querySelectorAll("span");
    e.preventDefault();
    const tempDate = `${form.year.value}-${form.month.value}-${form.day.value}`;
    if (moment(tempDate).isValid()) {
        form.classList.remove("invalid");
        const difference = moment.duration(moment(new Date()).diff(tempDate))
        let years = difference.years();
        let months = difference.months();
        let days = difference.days();
        animarContador(results[0], years);
        animarContador(results[1], months);
        animarContador(results[2], days);
    }
    else {
        form.classList.add("invalid");
        resultElement.querySelectorAll("span")[0].innerHTML = "--";
        resultElement.querySelectorAll("span")[1].innerHTML = "--";
        resultElement.querySelectorAll("span")[2].innerHTML = "--";
    }
}

function animarContador(element, nuevoValor) {
    const valorActual = parseInt(element.textContent) || 0;
    const diferencia = nuevoValor - valorActual;
    const duracion = Math.min(Math.abs(diferencia) * 30, 1500);

    let incremento;
    if (diferencia < 10) {
        incremento = Math.sign(diferencia);
    } else if (diferencia < 100) {
        incremento = Math.sign(diferencia) * 10;
    } else {
        incremento = Math.sign(diferencia) * Math.ceil(Math.abs(diferencia) / 100);
    }

    let valorAnimacion = valorActual;
    const intervalo = setInterval(() => {
        valorAnimacion += incremento;

        if ((incremento > 0 && valorAnimacion >= nuevoValor) || (incremento < 0 && valorAnimacion <= nuevoValor)) {
            valorAnimacion = nuevoValor;
            clearInterval(intervalo);
        }

        element.textContent = valorAnimacion.toLocaleString('es-ES', { minimumIntegerDigits: 2 });
    }, duracion / Math.abs(diferencia));
}
