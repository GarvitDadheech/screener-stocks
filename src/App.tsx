import './App.css'
import { NavBar } from './components/NavBar';
import StockScreener from './components/StockScreener';

const App: React.FC = () => {
  
  return (
    <div >
      <NavBar/>
      <StockScreener/>
    </div>
  );
};

export default App;
