type MyFragmentProps = {
  divtype: string;
}

const MyFragment = ({divtype}: MyFragmentProps) => {
  return (
    <>
    <div className={divtype}>
      <h3>My Fragment</h3>
      <p>Primeiro</p>
      <p>Segundo</p>
      <p>Terceiro</p>
    </div>
      
    </>
  )
}

export default MyFragment;