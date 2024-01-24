import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/AboutPage/Quote";

import FoundingStory from "../assets/Images/FoundingStory.png";
import CodeweaversStats from "../components/core/AboutPage/CodeweaversStats";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactForm from "../components/core/ContactPage/ContactForm";
import Footer from "../components/Common/Footer";

const About = () => {
  return (
    <div>
      <section className="bg-richblack-700">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
            Driving Innovation in Online Education for a
            <HighlightText text={"Brighter Future"} />
            <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>

          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <img src={BannerImage1} alt="" />
            <img src={BannerImage2} alt="" />
            <img src={BannerImage3} alt="" />
          </div>
        </div>
      </section>

      <section className="border-b border-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="h-[100px]"></div>
          <Quote />
        </div>
      </section>

      <section>
        <div className="bg-richblack-900">
          <div className="w-11/12 mx-auto max-w-maxContent flex flex-col justify-between mt-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="flex flex-col gap-10 lg:w-[50%] my-10">
                <h1 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]">
                  Our Founding Story
                </h1>
                <p className="font-medium text-richblack-300 lg:w-[95%]">
                  Our e-learning platform was born out of a shared vision and
                  passion for transforming education. It all began with a group
                  of educators, technologists, and lifelong learners who
                  recognized the need for accessible, flexible, and high-quality
                  learning opportunities in a rapidly evolving digital world.
                </p>

                <p className="font-medium text-richblack-300 lg:w-[95%]">
                  As experienced educators ourselves, we witnessed firsthand the
                  limitations and challenges of traditional education systems.
                  We believed that education should not be confined to the walls
                  of a classroom or restricted by geographical boundaries. We
                  envisioned a platform that could bridge these gaps and empower
                  individuals from all walks of life to unlock their full
                  potential.
                </p>
              </div>

              <div>
                <img
                  src={FoundingStory}
                  alt=""
                  className="shadow-[0_0_20px_0] shadow-[#FC6767]"
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between lg:gap-10 mb-20">
              <div className="flex flex-col gap-5 lg:gap-10 lg:w-[40%] mt-10 lg:mt-0">
                <h1 className=" text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#FF512F] to-[#F09819]">
                  Our Vision
                </h1>
                <p className="font-medium text-richblack-300 lg:w-[95%]">
                  With this vision in mind, we set out on a journey to create an
                  e-learning platform that would revolutionize the way people
                  learn. Our team of dedicated experts worked tirelessly to
                  develop a robust and intuitive platform that combines
                  cutting-edge technology with engaging content, fostering a
                  dynamic and interactive learning experience.
                </p>
              </div>

              <div className="flex flex-col gap-5 lg:gap-10 lg:w-[40%] mt-10 lg:mt-0">
                <h1 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">
                  Our Mission
                </h1>
                <p className="font-medium text-richblack-300 lg:w-[95%]">
                  Our mission goes beyond just delivering courses online. We
                  wanted to create a vibrant community of learners, where
                  individuals can connect, collaborate, and learn from one
                  another. We believe that knowledge thrives in an environment
                  of sharing and dialogue, and we foster this spirit of
                  collaboration through forums, live sessions, and networking
                  opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* section - 4  */}
      <div className="bg-richblack-700">
        <CodeweaversStats/>
      </div>

      {/* section - 5  */}
      <div className='bg-richblack-900' >
        <div className="w-11/12 mx-auto mt-20 flex flex-col justify-between gap-10 text-white">
          <LearningGrid/>
        </div>
      </div>

      {/* section - 6  */}
      <div className="bg-richblack-900">
        <div className='w-11/12 mt-20 mx-auto flex flex-col justify-between text-white'>
          <h2 className=' text-4xl font-semibold text-center text-richblack-5'>Get in touch</h2>
          <p className=' text-richblack-300 text-center mt-3'>We'd love to here for you, Please fill out this form.</p>
          <div className="mx-auto mt-12">
            <ContactForm/>
          </div>
        </div>
      </div>

      {/* Review section  */}
      <div className='bg-richblack-900'>
        <div className='w-11/12 mt-5 mx-auto flex flex-col justify-between text-white' >
          <div className="mt-8">
            <h2 className='text-center text-3xl md:text-4xl font-semibold mt-8' >
              Review From Other Learners
            </h2>
          </div>
        </div>
      </div>


      <div>
        <Footer/>
      </div>
    
    </div>
  );
};

export default About;
