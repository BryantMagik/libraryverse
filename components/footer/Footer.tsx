import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="container footer_rows">
        <div className="footer_row lgcol">
          <div className="f_column col_start">
            LibraryVerse
          </div>
          <div className="f_column col_desc">
            Una plataforma para que los usuarios escriban y compartan sus historias con el mundo.
          </div>
        </div>
        <div className="footer_row">
          <div className="f_column col_start">Compañía</div>
          <div className="f_column">Sobre Nosotros</div>
          <div className="f_column">¿Cómo Funciona?</div>
          <div className="f_column">Curso Popular</div>
          <div className="f_column">Servicio</div>
        </div>
        <div className="footer_row">
          <div className="f_column col_start">Soporte</div>
          <div className="f_column">Preguntas Frecuentes</div>
          <div className="f_column">Centro de Ayuda</div>
          <div className="f_column">Carrera</div>
          <div className="f_column">Privacidad</div>
        </div>
        <div className="footer_row">
          <div className="f_column col_start">Información de Contacto</div>
          <div className="f_column">+34 693 294 939</div>
          <div className="f_column">brys@gmail.com</div>
          <div className="f_column">
            Madrid, España, 28026
          </div>
        </div>
      </div>
      <div className="lined"></div>
      <p className="end_text">LibraryVerse Todos los Derechos Reservados, 2024</p>
    </footer>
  );
}
