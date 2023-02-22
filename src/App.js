import { Link } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Link to='/'>Home</Link>
      <Link to='/headphones'>headphones</Link>
      <Link to='/speakers'>speakers</Link>
      <Link to='/earphones'>earphones</Link>
      <Link to='/checkout'>checkout</Link>
    </div>
  );
}

export default App;
