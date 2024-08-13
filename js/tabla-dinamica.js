"use strict"
// Cargamos el dom llamando a la funcion de cargarDatos() para que la tabla siempre permanezca cargada
document.addEventListener('DOMContentLoaded', function() {
    cargarDatos();
});

// Definimos variables
let formProveedores = document.querySelector('#form-agregar-proveedor').addEventListener('submit', agregarProveedor);
let url_proveedores = 'https://6673297c6ca902ae11b35124.mockapi.io/api/v1/proveedores';
document.getElementById('btn_agregar-proveedor').addEventListener('click', mostrarFormAgregar);

// ---------------------------------------------------------------------------------------------------------------//
//Funcion para mostrar el formulario para "Agregar Proveedor"
function mostrarFormAgregar() {

    console.log('Mostrando formulario de agregar proveedor');

    document.getElementById('form-agregar-proveedor').style.display = 'block';
    document.getElementById('form-editar-proveedor').style.display = 'none';
}



// ---------------------------------------------------------------------------------------------------------------//
// Función para cargar datos desde la API

function cargarDatos() {
    fetch(url_proveedores)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.error('Error al agregar el proveedor');
            }
        })
        .then(data => {
            actualizarTabla(data);
        })
        .catch(error => {
            console.error('Error de red:', error);
        });
}

// ---------------------------------------------------------------------------------------------------------------//
// Función para agregar un proveedor

function agregarProveedor(event) {
    event.preventDefault();
    const formProveedores = new FormData(event.target);
    const nuevoProveedor = {
        nombre: formProveedores.get('nombreProveedor'),
        telefono: formProveedores.get('telefonoProveedor'),
        email: formProveedores.get('emailProveedor'),
        empresa: formProveedores.get('empresaProveedor'),
        ciudad: formProveedores.get('ciudadProveedor'),
    };

    fetch(url_proveedores, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProveedor),
    })
        .then(response => {
            if (response.ok) {
                cargarDatos();

                console.log('Proveedor agregado correctamente');

                document.getElementById('form-agregar-proveedor').style.display = 'none';
            } else {
                console.error('Error al agregar el proveedor');
            }
        })
        .catch(error => {
            console.error('Error de red:', error);
        });
}

// ---------------------------------------------------------------------------------------------------------------//
// Función para actualizar la tabla con los datos
function actualizarTabla(proveedores) {

    const tableBody = document.getElementById('dataProveedores');

    tableBody.innerHTML = ''; 

    proveedores.forEach(proveedor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${proveedor.id}</td>
            <td>${proveedor.nombre}</td>
            <td>${proveedor.telefono}</td>
            <td>${proveedor.email}</td>
            <td>${proveedor.empresa}</td>
            <td>${proveedor.ciudad}</td>
            <td>
            <button onclick="editarProveedor(${proveedor.id})">EDITAR</button>
            <button onclick="borrarProveedor(${proveedor.id})">BORRAR</button>
            </td> 
        `;
    
        tableBody.appendChild(row);
    })
}

// ---------------------------------------------------------------------------------------------------------------//
// Funciones para los botones de "EDITAR" y "BORRAR" proveedores segun ID


function editarProveedor(id) {

    console.log('Editando proveedor con id:', id);

    fetch(`${url_proveedores}/${id}`)
        .then(response => response.json())
        .then(proveedor => {
            document.getElementById('nombreProveedor').value = proveedor.nombre;
            document.getElementById('telefonoProveedor').value = proveedor.telefono;
            document.getElementById('emailProveedor').value = proveedor.email;
            document.getElementById('empresaProveedor').value = proveedor.empresa;
            document.getElementById('ciudadProveedor').value = proveedor.ciudad;
            document.getElementById('form-editar-proveedor').style.display = 'block';
            document.getElementById('form-agregar-proveedor').style.display = 'none';
            document.getElementById('form-editar-proveedor').setAttribute('data-id', id);
        })
        .catch(error => {
            console.error('Error al obtener datos del proveedor:', error);
        });
}

// ---------------------------------------------------------------------------------------------------------------//

function guardarCambios() {
    const idProveedor = document.getElementById('form-editar-proveedor').getAttribute('data-id');

    console.log('Guardando cambios para el proveedor con id:', idProveedor);

    const nuevoNombre = document.getElementById('nombreProveedor').value;
    const nuevoTelefono = document.getElementById('telefonoProveedor').value;
    const nuevoEmail = document.getElementById('emailProveedor').value;
    const nuevaEmpresa = document.getElementById('empresaProveedor').value;
    const nuevaCiudad = document.getElementById('ciudadProveedor').value;

    const datosModificados = {
        nombre: nuevoNombre,
        telefono: nuevoTelefono,
        email: nuevoEmail,
        empresa: nuevaEmpresa,
        ciudad: nuevaCiudad
    };

    fetch(`${url_proveedores}/${idProveedor}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosModificados),
    })
        .then(response => {
            if (response.ok) {
                console.log('Proveedor actualizado correctamente');
                document.getElementById('form-editar-proveedor').style.display = 'none';
                cargarDatos();

            } else {
                console.error('Error al actualizar el proveedor');
            }
        })
        .catch(error => {
            console.error('Error de red', error);
        });
}

// ---------------------------------------------------------------------------------------------------------------//

function borrarProveedor(id) {
    console.log('Borrando proveedor con id:', id);
    fetch(`${url_proveedores}/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log('Proveedor borrado correctamente');
            cargarDatos();
        } else {
            console.error('Error al borrar el proveedor');
        }
    })
    .catch(error => {
        console.error('Error de red', error);
    });
}

// ---------------------------------------------------------------------------------------------------------------//
