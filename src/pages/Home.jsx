import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../component/core/HomePage/HighlightText';
import CTAButton from '../component/core/HomePage/Button';
import { Link } from 'react-router-dom';
import Banner from '../assets/Images/banner.mp4';
import CodeBlock from '../component/core/HomePage/CodeBlock';

import Timeline from '../component/core/HomePage/Timeline';
import LearningLanguageSection from '../component/core/HomePage/LearningLanguageSection';
import InstructorSection from '../component/core/HomePage/Instructor';
import Footer from '../component/common/Footer'
import ExploreMore from '../component/core/HomePage/ExploreMore';



const Home = () => {
  return (
    <div>
        {/*Section 1 */}
        <div className=' text-white flex flex-col  items-center  w-11/12 relative mx-auto  justify-between '  >
            <Link to={"/signup"} >
                <div className='mt-20 rounded-full bg-gray-900  border-4  border-gray-950'>
                    <div className='px-8 py-2.5 '>
                        <p className='flex flex-row items-center font-semibold  gap-2'>
                            Become an Instructor
                            <FaArrowRight />

                        </p>
                    </div>
                </div>
            </Link>

            <div className='flex flex-row mt-5 text-4xl gap-2.5 font-bold'>
                Empower Your Future With  <HighlightText text={"Coding Skills"}   />
                
            </div>

            <div className='text-center max-w-8/12 text-[16px]  text-[#c0c3cb]  mt-2.5 '>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, 
                including hands-on projects, quizzes, and personalized feedback from instructors.

            </div>

            <div className='flex flex-row gap-9 mt-8 '>
                <CTAButton active={true} linkto={"/signup"} >
                    Learn More
                </CTAButton>

                <CTAButton active={false} linkto={"/login"}  >
                    Book a Demo
                </CTAButton>
            </div>

            <div className="shadow-blue-300 w-[70%] my-13  overflow-hidden ">
                <video
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover  " 
                >
                    <source src={Banner} type="video/mp4" />
                </video>
            </div>

            {/*codeblock section1*/}
            <div >
                <CodeBlock
                    position={"lg:flex-row"}
                    heading={
                        <div className=' text-4xl font-semibold'>
                            <div  className=' text-4xl font-semibold flex flex-row gap-3'  >
                                 Unlock Your 
                                <HighlightText  text={"coding potential"} />
                            </div>
                           
                            with our online courses
                        </div>
                    }
                    subheading={"Our courses are designed and taught by industry experts who have years of experience and are passionate about sharing their knowledge with you."}
                    ctabtn1={
                        {
                            btnText:"try it yourself",                                                                                                                                                                                                                                                                                                
                            linkto:"/signup",
                            active:true,
                        }
                    }

                    ctabtn2={
                        {
                            btnText:"Learn more",
                            linkto:"/login",
                            active:"false"
                        }
                    }

                    codeblock={
                        `<!DOCTYPE html>\n<html>\n head><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`
                    }

                    codeColor={
                        "text-yellow-25"
                    }

                />



            </div>

            <div>
                <CodeBlock
                    position={"lg:flex-row-reverse "}
                    heading={
                        <div className=' text-4xl font-semibold'>
                           Start  <HighlightText  text={"coding in seconds"} />
                            
                        </div>
                    }
                    subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                    ctabtn1={
                        {
                            btnText:"Continue Lesson",                                                                                                                                                                                                                                                                                                
                            linkto:"/signup",
                            active:true,
                        }
                    }

                    ctabtn2={
                        {
                            btnText:"Learn more",
                            linkto:"/login",
                            active:"false"
                        }
                    }

                    codeblock={
                        `<!DOCTYPE html>\n<html>\n head><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`
                    }

                    codeColor={
                        "text-yellow-25"
                    }

                />
            </div>


            <ExploreMore  />

        </div>

        {/*Section  2*/}
        <div className='bg-[#F9F9F9] text-[#000814]  '  >
            <div className='homepage_bg  h-72  flex items-center justify-center'>
                <div className='flex flex-row gap-8 mt-24 '>
                    <div>
                        <CTAButton  active={true} linkto={"/signup"} >
                            <div className='flex flex-row gap-2 items-center '>
                                Explore Full Catalog
                                <FaArrowRight  />
                            </div>
                            
                        </CTAButton>
                        
                    </div>

                    <div>
                        <CTAButton active={false} linkto={"/signup"} >
                            Learn More
                        </CTAButton>
                    </div>
                </div>
            </div>

            <div className=' w-11/12 mx-auto   mt-14 '>
                <div className='flex flex-row justify-center items-center gap-20  '>
                    <div className='text-[36px]  ' >
                    Get the skills you need for a 
                    <HighlightText text={"job that is in demand"} />
                    </div>

                    <div className='flex flex-col  w-[50%]'>
                        <div>
                            The modern StudyNotion is the dictates its own terms. Today , to be a competitive specialist requires more than professional skills.
                        </div>

                        <div className='flex mt-8'>
                            <CTAButton active={true}  >
                                Lear More
                            </CTAButton>
                        </div>
                    </div>
                </div>
            </div>

            <Timeline/>

            <LearningLanguageSection/>
            

        </div>
        
        {/*Section 3 */}
        <div className=' mx-auto  flex-col items-center justify-between gap-8 text-white bg-[#161D29]
            '>

            <InstructorSection/>

        </div>

        {/*Section 4 */}
        <div >
            <Footer/>
        </div>





    </div>
  )
}

export default Home;