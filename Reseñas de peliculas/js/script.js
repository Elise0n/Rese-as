let formulario = document.getElementById('reviewForm');
let peliInput = document.getElementById('pelicula');
let scoreInput = document.getElementById('puntuacion');
let commentInput = document.getElementById('comentario');
let reviewsContainer = document.getElementById('reviewsContainer');
let mensajeContainer = document.getElementById('mensajeContainer');

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();
    if (validarFormulario()) {
        mostrarResena();
        limpiarFormulario();
        mostrarMensaje('Reseña agregada con éxito.', 'success');
    }
});

function validarFormulario() {
    let valido = true;

    if (peliInput.value.trim() === '') {
        setErrorFor(peliInput, 'El campo Película es obligatorio.');
        valido = false;
    } else {
        setExitoFor(peliInput);
    }

    if (scoreInput.value === '') {
        setErrorFor(scoreInput, 'Selecciona una puntuación.');
        valido = false;
    } else {
        setExitoFor(scoreInput);
    }

    const commentValue = commentInput.value.trim();
    if (commentValue.length > 0 && (commentValue.length < 10 || commentValue.length > 200)) {
        setErrorFor(commentInput, 'El comentario debe tener entre 10 y 200 caracteres.');
        valido = false;
    } else {
        setExitoFor(commentInput);
    }

    return valido;
}

function setErrorFor(input, mensaje) {
    const errorSpan = input.nextElementSibling;
    errorSpan.innerText = mensaje;
    input.classList.add('error');
}

function setExitoFor(input) {
    const errorSpan = input.nextElementSibling;
    errorSpan.innerText = '';
    input.classList.remove('error');
}

function mostrarResena() {
    const resena = document.createElement('div');
    resena.classList.add('resena');
    resena.innerHTML = `
        <h2>Película: ${peliInput.value}</h2>
        <p>Puntuación: ${scoreInput.value}</p>
        <p>Comentario: ${commentInput.value || 'Sin comentario'}</p>
    `;
    reviewsContainer.appendChild(resena);
}

function limpiarFormulario() {
    formulario.reset();
}

function mostrarMensaje(mensaje, tipo) {
    const mensajeElemento = document.createElement('div');
    mensajeElemento.classList.add('mensaje');
    mensajeElemento.classList.add(tipo);
    mensajeElemento.innerText = mensaje;
    mensajeContainer.appendChild(mensajeElemento);
    setTimeout(() => {
        mensajeElemento.remove(); // Eliminar el mensaje después de unos segundos
    }, 3000);
}
