import { useEffect, useState } from "react";

const Hooks = () => {
  
  const [contagem, setContagem] = useState(0);
  const [novaIdade, setNovaIdade] = useState(39);

  const countPlus1 = (contagem: number) => {
    setContagem(contagem + 1);
  };

  const changeNewAge = (novaIdade: number) => {
    setNovaIdade(novaIdade +1);
  }

  // useEffect(() => { 
  //   console.log("useEffect MyHooks contagem: ", contagem);
  // }, [ contagem ]);
  


  return (
    <div className="my-hooks">
      <h1>My Hooks</h1>
      <p>contagem: {contagem}</p>
      <button onClick={() => setContagem(contagem + 1)}>Clicou x {contagem}</button>
      <button onClick={() => countPlus1(contagem)}>Clicou x {contagem}</button>

      <p>Nova idade: {novaIdade}</p>
      {/* <button onClick={() => setNovaIdade(novaIdade+1)}>Mudar nova idade</button> */}
      <button onClick={() => changeNewAge(novaIdade)}>Mudar nova idade</button>
    </div>
  );
};

export default Hooks;

