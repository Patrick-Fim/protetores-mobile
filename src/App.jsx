import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { compass, leaf, megaphone, person, trophy } from 'ionicons/icons';
import { Navigate, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { AmigosProvider } from './context/AmigosContext';
import NotificadorConquistas from './components/NotificadorConquistas';
import ChatFlutuante from './components/ChatFlutuante';

import Home from './pages/Home';
import Missoes from './pages/Missoes';
import Missao from './pages/Missao';
import Denuncia from './pages/Denuncia';
import Ranking from './pages/Ranking';
import Time from './pages/Time';
import Amigos from './pages/Amigos';
import Perfil from './pages/Perfil';
import Login from './pages/Login';
import Componentes from './pages/Componentes';
import Estilo from './pages/Estilo';

import './styles/globals.css';

setupIonicReact();

const App = () => (
  <IonApp>
    <AuthProvider>
      <AmigosProvider>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/" element={<Home />} />
              <Route path="/missoes" element={<Missoes />} />
              <Route path="/missao" element={<Missao />} />
              <Route path="/denuncia" element={<Denuncia />} />
              <Route path="/ranking" element={<Ranking />} />
              <Route path="/time" element={<Time />} />
              <Route path="/amigos" element={<Amigos />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/login" element={<Login />} />
              <Route path="/componentes" element={<Componentes />} />
              <Route path="/estilo" element={<Estilo />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="inicio" href="/">
                <IonIcon aria-hidden="true" icon={compass} />
                <IonLabel>Início</IonLabel>
              </IonTabButton>
              <IonTabButton tab="missoes" href="/missoes">
                <IonIcon aria-hidden="true" icon={leaf} />
                <IonLabel>Missões</IonLabel>
              </IonTabButton>
              <IonTabButton tab="denuncia" href="/denuncia">
                <IonIcon aria-hidden="true" icon={megaphone} />
                <IonLabel>Denunciar</IonLabel>
              </IonTabButton>
              <IonTabButton tab="ranking" href="/ranking">
                <IonIcon aria-hidden="true" icon={trophy} />
                <IonLabel>Ranking</IonLabel>
              </IonTabButton>
              <IonTabButton tab="perfil" href="/perfil">
                <IonIcon aria-hidden="true" icon={person} />
                <IonLabel>Perfil</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>

          <NotificadorConquistas />
          <ChatFlutuante />
        </IonReactRouter>
      </AmigosProvider>
    </AuthProvider>
  </IonApp>
);

export default App;