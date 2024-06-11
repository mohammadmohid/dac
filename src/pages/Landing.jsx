import { Link } from 'react-router-dom';
import { FlipWords } from "../components/ui/flip-words";
import { BackgroundBeams } from "../components/ui/background-beams";
import Logo from '../assets/Logo.svg';
import HeroImage from '../assets/hero-image.svg';
import Illustration1 from '../assets/illustration-1.svg';
import Illustration2 from '../assets/illustration-2.svg';

const Landing = () => {
  const words = ["meets", "connects", "reaches"];
  return (
    <div className="min-h-screen bg-base-200 flex flex-col justify-between">
      <header className="bg-slate-900 z-10 bg-opacity-15 backdrop-blur-sm shadow-md">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/"><img src={Logo} alt="DAC Logo" className="w-14 h-14" /></Link>
          <nav className="space-x-4">
            <Link to="/login" className="text-base-content hover:text-base-content/70">Sign In</Link>
            <Link to="/register" className="transition ease-in-out delay-50 inline-flex h-12 animate-shimmer hover:-translate-y-1 items-center justify-center rounded-md bg-[linear-gradient(110deg,#ca3ad2,45%,#f472b6,55%,#ca3ad2)] bg-[length:200%_100%] px-6 font-medium text-slate-950 focus:outline-none focus:ring-1 focus:ring-slate-200">Get Started</Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        <div className="z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center text-center py-16">
          <img src={HeroImage} className="relative z-10 h-auto max-w-full w-80 md:w-1/2 md:order-2 mb-8 md:mb-0" />
          <div className="flex flex-col items-center justify-center mx-auto md:w-1/2 md:order-1">
            <h2 className="text-4xl font-extrabold bg-gradient-to-b from-pink-500 to-purple-600 inline text-transparent bg-clip-text text-base-content sm:text-5xl md:text-6xl mb-4">
              Where Past<br/>
              <FlipWords  words={words}/>{' '}
              Future.
            </h2>
            <p className="text-xl text-base-content/70 mb-6">
              Connect with students, alumni, and faculty. Grow your network, share your journey, and explore opportunities.
            </p>
            <Link to="/register" className="transition ease-in-out delay-50 inline-flex h-12 animate-shimmer hover:-translate-y-1 items-center justify-center rounded-md bg-[linear-gradient(110deg,#ca3ad2,45%,#f472b6,55%,#ca3ad2)] bg-[length:200%_100%] px-6 text-xl font-medium text-slate-950 focus:outline-none focus:ring-1 focus:ring-slate-200">
            Get Started
            </Link>
          </div>
        </div>
            <BackgroundBeams /> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/login">
              <div className="card py-3 pb- bg-slate-900 shadow-pink-400 shadow-sm hover:border-pink-400 hover:border-2">
                <figure><img src={Illustration1} className="h-auto max-w-full mx-auto w-96 mb-4" /></figure>
                <div className="card-body">
                  <h3 className="card-title text-2xl font-bold bg-gradient-to-b from-primary to-secondary inline text-transparent bg-clip-text mb-2">Join Communities</h3>
                  <p className="text-base-content/70">
                    Engage with various communities, participate in discussions, and stay updated with the latest happenings.
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/login">
              <div className="card py-3 bg-slate-900 shadow-pink-400 shadow-sm hover:border-pink-400 hover:border-2">
                <figure><img src={Illustration2} className="h-auto max-w-full mx-auto w-96 mb-4" /></figure>
                <div className="card-body">
                  <h3 className="card-title text-2xl font-bold bg-gradient-to-b from-primary to-secondary inline text-transparent bg-clip-text mb-2">Discover Opportunities</h3>
                  <p className="text-base-content/70">
                    Find internships, job openings, and collaborations. Leverage your network to unlock new opportunities.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
      <footer className="bg-base-100 bg-opacity-70 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <p className="text-base-content/70">© 2024 Digital Alumni Connector. All rights reserved.</p>
          <nav className="space-x-4">
            <Link to="/terms" className="text-base-content hover:text-base-content/70">Terms of Service</Link>
            <Link to="/privacy" className="text-base-content hover:text-base-content/70">Privacy Policy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
