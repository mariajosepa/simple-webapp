import Button from "../components/Button";
import Input from "../components/TextInput";
import "../styles/Login.css";

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Autenticacion() {
  const navigate = useNavigate();  // Hook para navegación

  const handleLogin = (e) => {
    e.preventDefault();  // Evita que el formulario se envíe y recargue la página

    // Aquí podrías agregar la lógica para verificar las credenciales si fuera necesario

    // Redirige a la página de autenticación de código
    navigate('/monitoreo');  // Aquí cambias la ruta según necesites
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Iniciar Sesión</h1>
        <p>Inicia sesión para continuar</p>
        <form onSubmit={handleLogin}>
        <p>Le enviamos un código de verificación a su correo: quieropasarprocesos@example.com</p>
          <Input label='CÓDIGO' placeholder='123456'/>
          <Button label='Ingresar' type="submit"/>
        </form>
        <Link to="/recuperacion" className="forgot-password">
          ¿Olvidó su contraseña?
        </Link>
      </div>
    </div>
  );
}


export default Autenticacion;