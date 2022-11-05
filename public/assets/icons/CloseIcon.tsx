import React from 'react'

type Props = {
  width: number,
  height: number,
  color: string
}

const CloseIcon = (props: Props) => {
  return(
    <svg
      width = { props.width }
      height = { props.height }
      fill = { props.color }
      viewBox="0 0 24 24"
      tabIndex={-1}
    >
      <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>
  )
}

export default CloseIcon