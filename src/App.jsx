import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Child from './assets/components/Child'

if (!localStorage.getItem("cart")){
  localStorage.setItem("cart", JSON.stringify([]))
}

const App = () => {
    return (
    <div>
      <Child/>
    </div>
  );
};

export default App;

