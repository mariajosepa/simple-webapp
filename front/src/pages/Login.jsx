import Button from "../components/Button";
import Input from "../components/TextInput";
import "../styles/Login.css";


function Login() {
  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <p>Inicia sesión para continuar</p>
      <Input label="Correo" />
      <Input label="Contraseña" />
      <Button label="Login" />
      <p>¿Olvidó su contraseña?</p>
    </div>
  );
}


export default Login;