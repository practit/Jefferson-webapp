function Usuarios(){
  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form className="loginForm">
        <label for="Usuario">Usuario: </label>
        <input id="Usuario" type="text"/>
        <label for="Contrasenia">Contraseña: </label>
        <input id="Contrasenia" type="password" />
        <br />
        <input type="submit" className="formBtn" />
      </form>
    </div>
  )
}

export default Usuarios