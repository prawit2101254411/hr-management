"use client"
import React from "react";
//These are Third party packages for smooth slideshow
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { ArrowLeftIcon,ArrowRightIcon } from '@heroicons/react/24/solid'

const Slideshow = () => {
	//Array of Images
	const images = [
		"image/image1.jpg",
		"image/image5.jpg",
		"image/image6.jpg",
	];

	//These are custom properties for zoom effect while slide-show
	const zoomInProperties = {
		scale: 1,
		duration: 5000,
		transitionDuration: 300,
		infinite: true,
		prevArrow: (
			<div className="ml-10 top-40 md:top-72">
				<ArrowLeftIcon className="h-8 w-8 text-white cursor-pointer" />
			</div>
		),
		nextArrow: (
				<div className="mr-10 top-40 md:top-72">
				   <ArrowRightIcon className="h-8 w-8 text-white cursor-pointer" />
			    </div>
		),
	};
	return (
		<div className=" w-full h-full ">
			<Zoom {...zoomInProperties}>
				{images.map((each, index) => (
					<div key={index} className="flex justify-center md:items-center items-start w-screen h-screen ">
						<img
							className="w-screen filter brightness-50"
							src={each}
						/>
                        <h1 className="absolute md:top-40 top-24 inset-x-1/4 text-center z-10 md:text-7xl  text-7xl bold font-semibold text-white">WelCome</h1>
                        <p className="absolute md:top-60 top-40 inset-x-1/4 text-center z-10 md:text-2xl text-md bold text-white mt-3">Member management system To make it easier to manage human resources that has a lot of information Both convenient and fast</p>
					     <button className=" absolute mt-20 px-3 py-3 font-semibold text-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br text-white shadow-md shadow-gray-400 hover:shadow-sm hover:mt-24 rounded-xl z-10">เกี่ยวกับเรา</button>
					</div>
				))}
			</Zoom>
		</div>
	);
};

export default Slideshow;