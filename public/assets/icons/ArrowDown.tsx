import React from 'react'

type Props = {
    width: number,
    height: number,
    color: string,
    strokeWidth: number
}

const ArrowDown = (props: Props) => {
    return (
        <svg
            viewBox="0 0 24 24"
            strokeWidth={props.strokeWidth}
            fill='none'
            stroke={props.color}
            width = { props.width }
            height = { props.height }
            tabIndex={-2}
            className="outline-none"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    )
}

export default ArrowDown