import Navbar from './components/navbar';
import Repos from './screens/repos';
import { useState } from 'react';

function App() {

  const [search, setSearch] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
      <div className="App">
        <Navbar setIsSubmitted={setIsSubmitted} search={search} setSearch={setSearch} />
        <Repos setIsSubmitted={setIsSubmitted} isSubmitted={isSubmitted} username={search} />
      </div>
  );
}

export default App;
