import React from 'react'
import { Link } from 'react-router-dom'


const CTAButton = ({children , linkto , active}) => {
  return (
    <Link to={linkto} >
        <div className={`text-center text-[12px] px-6 py-3 rounded-md font-bold ]
]
        ${active ? " bg-[#FFD60A] text-black " : " bg-[#161D29] text-white"}
            hover:scale-95 transition-all duration-200  `}>
            {children}  
        </div>
    </Link>  
  )
}

export default CTAButton ;