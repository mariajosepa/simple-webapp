import Button from "../components/Button";
import Input from "../components/TextInput";
import "../styles/Login.css";

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Iniciar Sesión</h1>
        <p>Inicia sesión para continuar</p>
        <form>
          <Input label='CORREO' placeholder='quieropasarprocesos@example.com'/>
          <Input label='CONTRASEÑA' placeholder='*******'/>
          <button type="submit">Iniciar sesión</button>
        </form>
        <a href="/forgot-password" className="forgot-password">
          ¿Olvidó su contraseña?
        </a>
      </div>
    </div>
  );
}


export default Login;