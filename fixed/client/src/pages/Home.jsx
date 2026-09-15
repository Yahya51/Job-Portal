import React from "react";
import Navbar from '../components/Navbar'
import Hero from "../components/Hero"
import TrustedBy from "../components/TrustedBy"
import JobListing from "../components/JobListing";
import AppDownload from "../components/AppDownload";
import Footer from "../components/Footer";

const Home = () => (
    <div className="min-h-screen bg-[#f5f2ed]">
        <div className="hero-bg">
            <Navbar dark={true} />
            <Hero />
        </div>
        <TrustedBy />
        <JobListing />
        <AppDownload />
        <Footer />
    </div>
)

export default Home;
