import React from 'react';
import HeroImg from '../../assets/img/planning-hero.png'
import Track from '../../assets/img/track.png'
import Collab from '../../assets/img/collab.png'
import Create from '../../assets/img/create.png'
import plan1 from '../../assets/img/plan1.png'
import plan2 from '../../assets/img/plan2.png'
import plan3 from '../../assets/img/plan3.png'
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col ">

            <main className="flex-grow px-3 md:px-28">
                <section className="flex flex-col md:flex-row items-center md:justify-between px-0 md:px-6">
                    <div className="w-full md:w-1/2 container mx-auto text-center text-purple-600">
                        <h2 className="text-5xl font-bold mb-4">Plan, Collaborate, Achieve</h2>
                        <p className="text-xl mb-8 mt-14 px-5">Create and manage your plans efficiently. Collaborate with others and achieve your goals.</p>
                        <Link to={'/auth/login'} className="bg-purple-200 text-purple-700 px-6 py-3 rounded font-bold hover:bg-purple-100">Get Started</Link>
                    </div>
                    <img src={HeroImg} alt="" className='w-full md:w-1/2' />
                </section>

                <section className="py-10" id="features">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-8 text-blue-950">Features</h2>
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full md:w-1/3 p-4">
                                <div className="bg-white p-6 rounded shadow-lg hover:shadow-xl transition-shadow">
                                    <img src={plan2} alt="Create Plans" className="w-full h-40 object-cover rounded mb-4" />
                                    <h3 className="text-2xl font-bold mb-4">Create Plans</h3>
                                    <p>Create detailed plans and outline your steps to success.</p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 p-4">
                                <div className="bg-white p-6 rounded shadow-lg hover:shadow-xl transition-shadow">
                                    <img src={plan1} alt="Collaborate" className="w-full h-40 object-cover rounded mb-4" />
                                    <h3 className="text-2xl font-bold mb-4">Collaborate</h3>
                                    <p>Invite others to join your plans and work together.</p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 p-4">
                                <div className="bg-white p-6 rounded shadow-lg hover:shadow-xl transition-shadow">
                                    <img src={plan3} alt="Track Progress" className="w-full h-40 object-cover rounded mb-4" />
                                    <h3 className="text-2xl font-bold mb-4">Track Progress</h3>
                                    <p>Mark tasks as completed and monitor your progress.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-100 py-4" id="how-it-works">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-8">How It Works</h2>
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full md:w-1/3 p-4">
                                <div className="p-6">
                                    <img src={Create} alt="Step 1" className="w-full h-40 object-contain rounded mb-4" />
                                    <h3 className="text-2xl font-bold mb-4">Step 1</h3>
                                    <p>Create an account and start creating your plans.</p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 p-4">
                                <div className="p-6">
                                    <img src={Collab} alt="Step 2" className="w-full h-40 object-contain rounded mb-4" />
                                    <h3 className="text-2xl font-bold mb-4">Step 2</h3>
                                    <p>Invite others to collaborate on your plans.</p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 p-4">
                                <div className="p-6">
                                    <img src={Track} alt="Step 3" className="w-full h-40 object-contain rounded mb-4" />
                                    <h3 className="text-2xl font-bold mb-4">Step 3</h3>
                                    <p>Track your progress and achieve your goals.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20" id="contact">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
                        <p>If you have any questions or need support, feel free to reach out.</p>
                        <a href="mailto:support@planit.com" className="text-blue-600 underline">support@planit.com</a>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-800 text-white p-4">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 PlanIt. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
