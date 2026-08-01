import React from 'react'
import { Link } from "react-router-dom";
import { Spinner } from 'reactstrap';


const ErrorPage = () => {
  return (
    //  <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden px-4 sm:px-6 relative">

    //   {/* Grid Background */}
    //   <div className="absolute inset-0 opacity-10 pointer-events-none">
    //     <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-size-[40px_40px] sm:bg-size-[60px_60px]" />
    //   </div>

    //   {/* Glow */}
    //   <div className="absolute w-62.5 h-62.5 sm:w-100 sm:h-100 md:w-125 md:h-125 bg-blue-600/60 blur-[100px] md:blur-[140px] rounded-full animate-pulse pointer-events-none" />

    //   <div className="relative z-50 text-center w-full max-w-6xl pointer-events-auto">

    //     {/* Animated SVG */}
    //     <div className="flex justify-center items-center mb-6 sm:mb-10">

    //       <svg
    //         viewBox="0 0 520 220"
    //         fill="none"
    //         xmlns="http://www.w3.org/2000/svg"
    //         className="w-full max-w-70 sm:max-w-105 md:max-w-130 h-auto pointer-events-none"
    //       >

    //         {/* Left 4 */}
    //         <path
    //           d="M80 30V120H20"
    //           stroke="#00f"
    //           strokeWidth="18"
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //         />

    //         {/* 0 Ring */}
    //         <circle
    //           cx="260"
    //           cy="110"
    //           r="65"
    //           stroke="#ffffff"
    //           strokeWidth="18"
    //           strokeDasharray="420"
    //           strokeDashoffset="420"
    //         >
    //           <animate
    //             attributeName="stroke-dashoffset"
    //             values="420;0"
    //             dur="2s"
    //             fill="freeze"
    //           />
    //         </circle>

    //         {/* Rotating Inner Circle */}
    //         <circle
    //           cx="260"
    //           cy="110"
    //           r="30"
    //           stroke="#02f"
    //           strokeWidth="6"
    //           strokeDasharray="20 10"
    //         >
    //           <animateTransform
    //             attributeName="transform"
    //             type="rotate"
    //             from="0 260 110"
    //             to="360 260 110"
    //             dur="6s"
    //             repeatCount="indefinite"
    //           />
    //         </circle>

    //         {/* Right 4 */}
    //         <path
    //           d="M500 30V120H440"
    //           stroke="#00f"
    //           strokeWidth="18"
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //         />

    //         {/* Bottom Speed Line */}
    //         <line
    //           x1="100"
    //           y1="190"
    //           x2="420"
    //           y2="190"
    //           stroke="#ffffff"
    //           strokeWidth="3"
    //           strokeDasharray="15 15"
    //         >
    //           <animate
    //             attributeName="stroke-dashoffset"
    //             from="100"
    //             to="0"
    //             dur="1s"
    //             repeatCount="indefinite"
    //           />
    //         </line>
    //       </svg>

    //     </div>

    //     {/* Heading */}
    //     <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black tracking-[4px] sm:tracking-[8px] md:tracking-[12px] uppercase leading-none">
    //       404 Error
    //     </h1>
        

    //     {/* Buttons */}
    //     <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 sm:mt-10">

    //       <Link
    //         to="/"
    //         className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded uppercase tracking-[3px] hover:scale-105 transition-all duration-300 text-sm sm:text-base inline-flex items-center justify-center"
    //       >
    //         Back Home
    //       </Link>


    //     </div>

    //   </div>
    // </div>

    <Spinner/>
  )
}

export default ErrorPage