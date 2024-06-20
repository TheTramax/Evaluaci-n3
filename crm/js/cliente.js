var g_id_cliente ="";


function agregarCliente(){

var id = document.getElementById("txt_id").value;
var dv = document.getElementById("txt_dv").value;
var nombres = document.getElementById("txt_nombres").value;
var apellidos = document.getElementById("txt_apellidos").value;
var email = document.getElementById("txt_email").value;
var celular = parseInt(document.getElementById("txt_celular").value);
  if (id === "") {
    mostrarAlertaDeDatos("Por favor, ingrese el id de cliente.", "alert-danger");
    return; 
  }
  if (dv === "") {
    mostrarAlertaDeDatos("Por favor, ingrese el dv de cliente.", "alert-danger");
    return; 
  }
  if (nombres === "") {
    mostrarAlertaDeDatos("Por favor, ingrese el nombre.", "alert-danger");
    return; 
  }
  if (apellidos === "") {
    mostrarAlertaDeDatos("Por favor, ingrese el apellido.", "alert-danger");
    return; 
  }
  if (email === "") {
    mostrarAlertaDeDatos("Por favor, ingrese el email.", "alert-danger");
    return; 
  }
  if (celular === "") {
    mostrarAlertaDeDatos("Por favor, ingrese el celular", "alert-danger");
    return; 
  }
//Encabezado de la solicitud
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var fechaHoraActual = obtenerFechaHora();

//Carga útil de datos
const raw = JSON.stringify({
  "id_cliente": id,
  "dv": dv,
  "nombres": nombres,
  "apellidos": apellidos,
  "email": email,
  "celular": celular,
  "fecha_registro": fechaHoraActual
});


//Opciones de solicitud
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

//Ejecutamos solicitud
fetch("http://144.126.210.74:8080/api/cliente", requestOptions)
  .then((response) => {
       if(response.status == 200){
        location.href ="listar.html";
        let alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-success";
        alertDiv.role = "alert";
        alertDiv.innerHTML = `
        Registro realizado correctamente.`; 
        document.body.prepend(alertDiv);
      }
      if(response.status == 400){
        
        let alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-danger";
        alertDiv.role = "alert";
        alertDiv.innerHTML = `
        No es posible registrar. `;
        document.body.prepend(alertDiv);
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function listarCliente(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_cliente').DataTable();
    } )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr){

  var fechaHoraFormateada = formatearFechaHora(element.fecha_registro);

  arr[index] = document.querySelector("#tbl_cliente tbody").innerHTML +=
`<tr>
<td>${element.id_cliente}</td>
<td>${element.dv}</td>
<td>${element.nombres}</td>
<td>${element.apellidos}</td>
<td>${element.email}</td>
<td>${element.celular}</td>
<td>${fechaHoraFormateada}</td>
<td>
<a href='actualizar.html?id=${element.id_cliente}' class='btn btn-warning'>Actualizar</a> 
<a href='eliminar.html?id=${element.id_cliente}' class='btn btn-danger'>Eliminar</a> 
</td>
</tr>`
}
function obtenerIdActualizar(){
  //obtener datos de la solicitud
  const queryString  = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;
  obtenerDatosActualizar(p_id_cliente);
}

function obtenerIdEliminar(){
  //obtener datos de la solicitud
  const queryString  = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;
  obtenerDatosEliminar(p_id_cliente); 
}
function obtenerDatosEliminar(p_id_cliente){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+p_id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function obtenerDatosActualizar(p_id_cliente){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+p_id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function completarEtiqueta(element,index,arr){
  var nombre_cliente = element.nombres;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar el cliente? <b>" + nombre_cliente + "</b>";

}
function completarFormulario(element,index,arr){
  var nombres = element.nombres;
  document.getElementById('txt_nombres').value = nombres;
  var apellidos = element.apellidos;
  document.getElementById('txt_apellidos').value = apellidos;
  var email = element.email;
  document.getElementById('txt_email').value = email;
  var celular = element.celular;
  document.getElementById('txt_celular').value = celular;
}

function actualizarCliente(){
  var nombres = document.getElementById("txt_nombres").value;
  var apellidos = document.getElementById("txt_apellidos").value;
  var email = document.getElementById("txt_email").value;
  var celular = document.getElementById("txt_celular").value;
  if (nombres === "") {
    mostrarAlertaDeDatos("Por favor, ingrese el nombre .", "alert-danger");
    return; 
  }
  if (apellidos === "") {
    mostrarAlertaDeDatos("Por favor, ingrese el apellido.", "alert-danger");
    return; 
  }
  if (email === "") {
    mostrarAlertaDeDatos("Por favor, ingrese el email.", "alert-danger");
    return; 
  }
  if (celular === "") {
    mostrarAlertaDeDatos("Por favor, ingrese el celular.", "alert-danger");
    return; 
  }
  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  //Carga útil de datos
  const raw = JSON.stringify({
    "nombres": nombres,
    "apellidos": apellidos,
    "email": email,
    "celular": celular,
  });
  
  //Opciones de solicitud
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  //Ejecutamos solicitud
  fetch("http://144.126.210.74:8080/api/cliente/"+ g_id_cliente, requestOptions)
    .then((response) => {
       if(response.status == 200){
        location.href ="listar.html";
        let alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-success";
        alertDiv.role = "alert";
        alertDiv.innerHTML = `
        Actualizado correctamente.`; 
        document.body.prepend(alertDiv);
      }
      if(response.status == 400){
        let alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-danger";
        alertDiv.role = "alert";
        alertDiv.innerHTML = `
        No es posible actualizar.`;
        document.body.prepend(alertDiv);
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  }
  function eliminarCliente(){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    //Opciones de solicitud
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
    
    //Ejecutamos solicitud
    fetch("http://144.126.210.74:8080/api/cliente/"+ g_id_cliente, requestOptions)
      .then((response) => {
        if(response.status == 200){
          location.href ="listar.html";
          let alertDiv = document.createElement("div");
          alertDiv.className = "alert alert-success";
          alertDiv.role = "alert";
          alertDiv.innerHTML = `
          Eliminado correctamente.`; 
          document.body.prepend(alertDiv);
        }
        if(response.status == 400){
          let alertDiv = document.createElement("div");
          alertDiv.className = "alert alert-danger";
          alertDiv.role = "alert";
          alertDiv.innerHTML = `
          No es posible eliminar. Registro está siendo utilizado.`;
          document.body.prepend(alertDiv);
        }
      })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    }

    function obtenerFechaHora(){
      var fechaHoraActual = new Date();
      var fechaHoraFormateada = fechaHoraActual.toLocaleString('es-ES',{
        hour12 :false,
        year :'numeric',
        month :'2-digit',
        day:'2-digit',
        hour : '2-digit',
        minute :'2-digit',
        second : '2-digit'
      }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');
      return fechaHoraFormateada;
    }
    function formatearFechaHora(fecha_registro){
      var fechaHoraActual = new Date(fecha_registro);
      var fechaHoraFormateada = fechaHoraActual.toLocaleString('es-ES',{
        hour12 :false,
        year :'numeric',
        month :'2-digit',
        day:'2-digit',
        hour : '2-digit',
        minute :'2-digit',
        second : '2-digit',
        timeZone:'UTC'
      }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');
      return fechaHoraFormateada;
    }

    function mostrarAlertaDeDatos(mensaje, clase) {
      const alertPlaceholder = document.getElementById('alertPlaceholder');
      const alertHTML = `
        <div class="alert ${clase} alert-dismissible fade show" role="alert">
          ${mensaje}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
      alertPlaceholder.innerHTML = alertHTML;
    }
