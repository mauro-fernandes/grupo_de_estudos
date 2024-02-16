import React from 'react'


type Props = { value: (value: string) => void }

const RemoveAllCompleted = (props: Props) => {
  const value = props.value
  const remove = () => {
    console.log("mandei excluir as completas!")
    value("Completed")
    
  }

  return (
    <div>
       <button className="remove" onClick={remove} >Excluir tarefas completas</button>
    </div>
  )
}

export default RemoveAllCompleted