import './App.css'
import { BottomBar } from './components/BottomBar';
import { NavBar } from './components/NavBar';
import StockScreener from './components/QueryCard';

const App: React.FC = () => {
  
  return (
    <div >
      <NavBar/>
      <StockScreener/>
    </div>
  );
};

export default App;
