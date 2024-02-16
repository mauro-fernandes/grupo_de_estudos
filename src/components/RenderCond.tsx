const RenderCond = ({x, y, className}: any) => {

  return (
    <div className={className}>
      <h3>Conditional Rendering</h3>
      {x >= 5 && <p>x é maior que 5!</p>}
      {x >= 5 ? <p>x é nº alto!</p> : <p>x é nº baixo!</p>}
      { <p>O valor de y é: {y}</p>}
    </div>
  );
};

export default RenderCond;