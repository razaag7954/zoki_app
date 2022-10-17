/* eslint-disable */

import React, {useState} from 'react';
import TopNavBar from './components/topNavBar';
import MainTopMenu from './components/mainTopMenu';
import MainCaraousal from './components/mainCarousal';
import AboutUs from './components/aboutUs';
import Packages from './components/packages';
import Adventure from './components/adventure'
import PerfectTrip from './components/perfectTrip';
import BookingQuickForm from './components/bookingQuickForm';
import Testmonials from './components/testmonials';
import ContactForm from './components/contactForm';
import Footer from './components/footer';

import './index.css'
import Hotel from "../../assets/img/pexels-pixabay-38238.jpg";
import Character from  "../../assets/img/character.jpg";
import Flight_Hotel from  "../../assets/img/hotel+flight.jpg";
import Flight from  "../../assets/img/pexels-thierry-fillieul-1046493.jpg";
import {HeroSection} from "./utils/constant";
function LandingPage() {
    const [image, setImage] = useState(Flight);
    const setBackgroundImage = (tabName) => {
        setImage((prev)=>{
            switch (tabName){
                case HeroSection.FLIGHT:{
                   prev = Flight
                    break;
                }
                case HeroSection.HOTEL:{
                    prev = Hotel
                    break;
                }
                case HeroSection.FLIGHT_HOTEL:{
                    prev = Flight_Hotel
                    break;
                }
                case HeroSection.CHARACTER:{
                    prev = Character
                    break;
                }
            }
            return prev;
        })

    }

    return (
        <>
            <section className={"position-relative responsive-nav"}>
                <TopNavBar />
                <MainTopMenu />
            </section>

            <section>
                <MainCaraousal image={image}>
                    <BookingQuickForm setImage={setBackgroundImage}/>
                </MainCaraousal>
            </section>

            <section>
                <AboutUs />
            </section>

            <section>
                <Packages />
            </section>

            {/*<section>*/}
            {/*    <Adventure />*/}
            {/*</section>*/}

            <section>
                <PerfectTrip />
            </section>

            <section>
                <Testmonials />
            </section>

            <section>
                <ContactForm />
            </section>

            <section>
                <Footer />
            </section>

        </>
    );
};
export default LandingPage;
