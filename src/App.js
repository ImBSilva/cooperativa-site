import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Inicio from './components/Inicio.js';
import Servicos from './components/Servicos.js';
import MailUs from './components/MailUs.js';
import QuemSomos from './components/QuemSomos.js';
import Cooperados from './components/Cooperados.js';
import CustomNavbar from './components/CustomNavbar.js';
import Portifolio from './components/Portifolio.js';
import Footer from './components/Footer.js';
import './useTranslation.js';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <CustomNavbar />
        <main className="main-container">
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
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
