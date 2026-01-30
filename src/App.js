import './App.css';
import { Container} from 'react-bootstrap';
import { BrowserRouter as Router,} from 'react-router-dom';
import Inicio from './components/Inicio.js';
import Servicos from './components/Servicos.js';
import MailUs from './components/MailUs.js';
import QuemSomos from './components/QuemSomos.js';
import Cooperados from './components/Cooperados.js';
import CustomNavbar from './components/CustomNavbar.js';
import Portifolio from './components/Portifolio.js';
import './useTranslation.js';

function App() {

  return (
    <Router>
      <div className="app-wrapper">
        <Container className="main-container">
          <CustomNavbar />
          <section id="inicio">
            <Inicio />
          </section>
          <section id="Servicos">
            <Servicos />
          </section>          
          <section id="Portifolio">
            <Portifolio />
          </section>
          <section id="Cooperados">
            <QuemSomos />
            <Cooperados />
          </section>
          <section id="MailUs">
            <MailUs />
          </section>

        </Container>
      </div>
    </Router>
  );
}

export default App;
