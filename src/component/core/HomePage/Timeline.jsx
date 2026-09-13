import React from 'react'
import timeLine from '../../../assets/Images/TimelineImage.png';
import image1 from '../../../assets/TimeLineLogo/Logo1.svg';
import image2 from '../../../assets/TimeLineLogo/Logo2.svg';
import image3 from '../../../assets/TimeLineLogo/Logo3.svg'; 
import image4 from '../../../assets/TimeLineLogo/Logo4.svg';

const Timeline = () => {
  return (
    <div className='flex flex-row  w-11/12 mx-auto justify-center items-center  gap-16 mt-20'>
                    <div className='flex flex-col gap-10'>
                        <div className='flex flex-row gap-7 '>
                            <div className='w-12 h-12 bg-white '>
                                <img src={image1} alt='photo' />
                            </div>
    
                            <div className='flex flex-col '>
                                <div>
                                    Leadership
                                </div>
    
                                <div>
                                    Fully commited to the success company  
                                </div>
                            </div>
                        </div>
    
                        <div className='flex flex-row gap-7'>
                            <div className='w-12 h-12 bg-white '>
                                <img src={image2} alt='photo' />
                            </div>
                            <div className='flex flex-col '>
                                <div>
                                    Leadership
                                </div>
    
                                <div>
                                    Fully commited to the success company  
                                </div>
                            </div>
                        </div>
    
                        <div className='flex flex-row gap-7'>
                            <div className='w-12 h-12 bg-white '>
                                <img src={image3} alt='photo' />
                            </div>
    
                            <div className='flex flex-col '>
                                <div>
                                    Leadership
                                </div>
    
                                <div>
                                    Fully commited to the success company  
                                </div>
                            </div>
                        </div>
    
                        <div className='flex flex-row gap-7'>
                            <div className='w-12 h-12 bg-white '>
                                <img src={image4} alt='photo' />
                            </div>
    
                            <div className='flex flex-col '>
                                <div>
                                    Leadership
                                </div>
    
                                <div>
                                    Fully commited to the success company  
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div className='relative z-10 w-170 '>
                        <img src={timeLine} className='w-160'/>
                        <div className='absolute -bottom-10 left-30 z-20 w-100 h-24 bg-[#014A32] flex flex-row  items-center '>
                            <div className='flex flex-row  border-r-2 border-[#05a77b]  px-5 gap-5 '>
                                <div className='text-3xl text-white'>
                                    10
                                </div>
                                <div className='text-[#05a77b]'>
                                    YEARS OF EXPERINECES
                                </div> 
                                
                            </div>
    
                            <div className='flex flex-row  border-l-2 border-[#05a77b] gap-5  px-5  '>
                                <div className='text-3xl text-white'>
                                    250
                                </div>
                                
                                <div className='text-[#05a77b]'>
                                    TYPE OF COURSES
                                </div>
                                   
                                
                            </div>
                        </div>
                    </div>
                </div>
  )
}

export default Timeline;