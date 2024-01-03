import { useEffect, useState } from "react";

const Hooks = () => {
  let idade = 39;

  const [novaIdade, setNovaIdade] = useState(39);

  const changeAge = () => {
    idade = idade + 1;
    console.log(idade);
  };

  const changeNewAge = (novaIdade: number) => {
    setNovaIdade(novaIdade + 1);
    console.log(novaIdade + 1);
  }

  useEffect(() => { 
    console.log("useEffect ativado");
  });
  


  return (
    <div>
      <h1>My Hooks</h1>
      <p>Idade: {idade}</p>
      <button onClick={changeAge}>Mudar idade</button>

      <p>Nova idade: {novaIdade}</p>
      {/* <button onClick={() => setNovaIdade(novaIdade+1)}>Mudar nova idade</button> */}
      <button onClick={() => changeNewAge(novaIdade)}>Mudar nova idade</button>
    </div>
  );
};

export default Hooks;

