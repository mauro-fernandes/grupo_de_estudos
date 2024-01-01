const RenderCond = ({x, y}: any) => {
  // const x = 10;

  return (
    <div>
      {x >= 5 && <p>x é maior que 5!</p>}
      {x >= 5 ? <p>x é nº alto!</p> : <p>x é nº baixo!</p>}
      { <p>O valor de y é: {y}</p>}
    </div>
  );
};

export default RenderCond;