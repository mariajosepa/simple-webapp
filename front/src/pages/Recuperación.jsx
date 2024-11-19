import Button from "../components/Button";
import Input from "../components/TextInput";
import "../styles/Login.css";

import { useNavigate } from 'react-router-dom';

function Recuperacion() {
    const navigate = useNavigate();  // Hook para navegación

    const handleLogin = (e) => {
      e.preventDefault();  // Evita que el formulario se envíe y recargue la página
  
      // Aquí podrías agregar la lógica para verificar las credenciales si fuera necesario
  
      // Redirige a la página de autenticación de código
      navigate('/login');  // Aquí cambias la ruta según necesites
    };
    return (
    <div className="login-container">
      <div className="login-box" >
        <h1>Olvidé mi contraseña</h1>
        <p>Dijite su correo para reestablecerla</p>
        <form onSubmit={handleLogin}>
          <Input label='CORREO' placeholder='quieropasarprocesos@example.com'/>
          <Button label='Enviar' type="submit"/>
        </form>
      </div>
    </div>
  );
}


export default Recuperacion;