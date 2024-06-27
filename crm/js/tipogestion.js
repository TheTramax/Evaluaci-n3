var g_id_tipo_gestion ="";

//Función para agregar tipo de gestión
function agregarTipoGestion(){
//Obtenemos el tipo de gestión que ingresa el usuario
var nombre_tipo_gestion = document.getElementById("txt_nombre").value;
  // Validar si nombre_tipo_gestion está vacío
  if (nombre_tipo_gestion === "") {
    mostrarAlertaDeDatos("Por favor, ingrese el nombre de tipo de gestión.", "alert-danger");
    return; // Detener la ejecución si los datos no son válidos
  }
//Encabezado de la solicitud
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var fechaHoraActual = obtenerFechaHora();

//Carga útil de datos
const raw = JSON.stringify({
  "nombre_tipo_gestion": nombre_tipo_gestion,
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
fetch("http://144.126.210.74:8080/api/tipo_gestion/", requestOptions)
  .then((response) => {
    if(response.status == 200){
    setTimeout(() => {
    location.href ="listar.html";
    }, 2000);
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
function listarTipoGestion(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_tipo_gestion').DataTable();
    } )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr){

  var fechaHoraFormateada = formatearFechaHora(element.fecha_registro);

  arr[index] = document.querySelector("#tbl_tipo_gestion tbody").innerHTML +=
`<tr>
<td>${element.id_tipo_gestion}</td>
<td>${element.nombre_tipo_gestion}</td>
<td>${fechaHoraFormateada}</td>
<td>
<a href='actualizar.html?id=${element.id_tipo_gestion}' class='btn btn-warning'>Actualizar</a> 
<a href='eliminar.html?id=${element.id_tipo_gestion}' class='btn btn-danger'>Eliminar</a> 
</td>
</tr>`
}
function obtenerIdActualizar(){
  //obtener datos de la solicitud
  const queryString  = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_tipo_gestion = parametros.get('id');
  g_id_tipo_gestion = p_id_tipo_gestion;
  obtenerDatosActualizar(p_id_tipo_gestion);

}
function obtenerIdEliminar(){
  //obtener datos de la solicitud
  const queryString  = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_tipo_gestion = parametros.get('id');
  g_id_tipo_gestion = p_id_tipo_gestion;
  obtenerDatosEliminar(p_id_tipo_gestion);

}
function obtenerDatosEliminar(p_id_tipo_gestion){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion/"+p_id_tipo_gestion, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function obtenerDatosActualizar(p_id_tipo_gestion){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion/"+p_id_tipo_gestion, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function completarEtiqueta(element,index,arr){
  var nombre_tipo_gestion = element.nombre_tipo_gestion;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar el tipo de gestión? <b>" + nombre_tipo_gestion + "</b>";


}
function completarFormulario(element,index,arr){
  var nombre_tipo_gestion = element.nombre_tipo_gestion;
  document.getElementById('txt_nombre').value = nombre_tipo_gestion;

}

function actualizarTipoGestion(){
  var nombre_tipo_gestion = document.getElementById("txt_nombre").value;
  if (nombre_tipo_gestion === "") {
    mostrarAlertaDeDatos("Por favor, ingrese el nombre de tipo de gestión.", "alert-danger");
    return; // Detener la ejecución si los datos no son válidos
  }
  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  //Carga útil de datos
  const raw = JSON.stringify({
    "nombre_tipo_gestion": nombre_tipo_gestion
  });
  
  //Opciones de solicitud
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  //Ejecutamos solicitud
  fetch("http://144.126.210.74:8080/api/tipo_gestion/"+ g_id_tipo_gestion, requestOptions)
  .then((response) => {
    if(response.status == 200){
      setTimeout(() => {
      location.href ="listar.html";
      }, 2000);
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
  function eliminarTipoGestion(){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    //Opciones de solicitud
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
    
    //Ejecutamos solicitud
    fetch("http://144.126.210.74:8080/api/tipo_gestion/"+ g_id_tipo_gestion, requestOptions)
      .then((response) => {
        //Cambiar por elementos de bootstrap
        if(response.status == 200){
          setTimeout(() => {
          location.href ="listar.html";
          }, 2000);
          let alertDiv = document.createElement("div");
          alertDiv.className = "alert alert-success";
          alertDiv.role = "alert";
          alertDiv.innerHTML = `
          Eliminado correctamente.`; 
          document.body.prepend(alertDiv);
        }
        if(response.status == 400){
          //alert("No es posible eliminar. Registro está siendo utilizado.");
          let alertDiv = document.createElement("div");
          alertDiv.className = "alert alert-danger";
          alertDiv.role = "alert";
          alertDiv.innerHTML = `
          No es posible eliminar. Registro está siendo utilizado.`;

          // Agregar el elemento de alerta al DOM
          document.body.prepend(alertDiv); // Puedes cambiar la ubicación según tus necesidades
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
