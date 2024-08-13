// FUNCION DEL BOTON "MENU" DESPLEGABLE //
// Esta parte hace que al achicarse la pantalla a un tamaño menor de 768 todo el contenido de la barra de navegación quedara almacenado dentro del boton "MENÚ" //


document.querySelector(".btn_menu").addEventListener("click", toggleMenu);

function toggleMenu(){
    document.querySelector(".navigation").classList.toggle("show");
}

// ---------------------------------------------------------------------------------------------------------------//

//           CAPTCHA            //
// Arreglo que contiene los valores disponibles para utilizar en el captcha //


var captchaCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    function generateCaptcha() {
        var captchaText = '';

        // Genera un captcha de longitud 6

        for (var i = 0; i < 6; i++) {
            var randomIndex = Math.floor(Math.random() * captchaCharacters.length);
            captchaText += captchaCharacters[randomIndex];
        }


        // Actualiza el texto del captcha en el HTML
        document.getElementById('captchaText').innerText = captchaText;
    }

// ---------------------------------------------------------------------------------------------------------------//

// windows.onload : Genera el captcha al inicializar la pagina.

window.onload = generateCaptcha;

// ---------------------------------------------------------------------------------------------------------------//
// Esta funcion valida el formulario mediante un if y gestiona los mensajes del captcha


function validateForm() {
    var captchaInput = document.getElementById('captchaInput').value;
    var captchaText = document.getElementById('captchaText').textContent;
    if (captchaInput !== captchaText) {
        document.getElementById('errorMessage').textContent = 'El CAPTCHA ingresado no es correcto. Por favor, inténtalo de nuevo.';

        // Muestra el mensaje de error //

        document.getElementById('errorMessage').style.display = 'block'; 

        // Oculta el mensaje de exito //
        document.getElementById('successMessage').style.display = 'none'; 
    } else {
        document.getElementById('successMessage').textContent = 'El CAPTCHA es correcto. ¡Formulario enviado con éxito!';

        // Muestra el mensaje de exito //

        document.getElementById('successMessage').style.display = 'block'; 

        // Oculta el mensaje de error //

        document.getElementById('errorMessage').style.display = 'none'; 
    }
    return false;
}

// ---------------------------------------------------------------------------------------------------------------//
// Evita que la pagina se recargue //

document.getElementById('submit-btn').addEventListener('click', function(event){
    event.preventDefault(); 

    //Ejecuta la funcion de validación

    validateForm(); 
});

