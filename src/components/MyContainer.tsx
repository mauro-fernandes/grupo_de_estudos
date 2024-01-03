import React from 'react'

type MyContainerProps = {
  children: React.ReactNode
}

const MyContainer = ({children} : MyContainerProps) => {
  return (
    <div className='my-container'>{children}</div>
  )
}

export default MyContainer