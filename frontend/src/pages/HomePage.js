import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Heart, Users, Search, Navigation2, Snowflake } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import Snowfall from '../components/Snowfall';
import VolunteerModal from '../components/VolunteerModal';
import DonationSection from '../components/DonationSection';
import { toast } from 'sonner';

const HomePage = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [showVolunteer, setShowVolunteer] = useState(false);

  const handleSearch = () => {
    if (!location.trim()) {
      toast.error('Please enter a location');
      return;
    }
    navigate(`/search?location=${encodeURIComponent(location)}`);
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        navigate(
          `/search?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
        );
      },
      (error) => {
        setIsLocating(false);
        toast.error('Unable to retrieve your location');
        console.error(error);
      }
    );
  };

  return (
    <div className="min-h-screen bg-midnight">
      <Snowfall />
      
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1610059011191-0413064bf307?crop=entropy&cs=srgb&fm=jpg&q=85)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-midnight/80 to-midnight/95" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12 text-center">
          <div className="flex items-center justify-center mb-6">
            <Snowflake className="w-12 h-12 md:w-16 md:h-16 text-hearth animate-pulse" />
          </div>
          
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 font-playfair"
            data-testid="hero-title"
          >
            Warm Wishes
          </h1>
          
          <p className="text-base md:text-lg text-slate-300 mb-12 max-w-2xl mx-auto font-manrope">
            Find warmth and shelter near you. Real-time nationwide shelter discovery to help those in need stay safe during winter.
          </p>

          <div 
            className="max-w-2xl mx-auto glass-dark p-6 md:p-8 rounded-2xl shadow-2xl"
            data-testid="hero-search-section"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  data-testid="location-search-input"
                  type="text"
                  placeholder="Enter city, state, or ZIP code"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="h-14 pl-12 pr-4 rounded-full border-0 bg-white/90 backdrop-blur shadow-lg focus:ring-2 focus:ring-hearth text-lg text-slate-900 placeholder:text-slate-500"
                />
              </div>
              <Button
                data-testid="search-button"
                onClick={handleSearch}
                className="bg-hearth hover:bg-amber-600 text-white font-semibold rounded-full px-8 py-3 h-14 transition-all btn-glow"
              >
                Search
              </Button>
            </div>
            
            <div className="mt-4">
              <Button
                data-testid="use-location-button"
                onClick={handleUseMyLocation}
                disabled={isLocating}
                variant="ghost"
                className="text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <Navigation2 className="w-4 h-4 mr-2" />
                {isLocating ? 'Locating...' : 'Use My Location'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-playfair">
              Help is Available Nationwide
            </h2>
            <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto font-manrope">
              Connect with shelters, warming centers, and support services in every U.S. city
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              className="glass-dark p-8 rounded-2xl text-center group hover:border-hearth/50 transition-all duration-300"
              data-testid="feature-realtime-data"
            >
              <div className="w-16 h-16 bg-hearth/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-hearth" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-playfair">Real-Time Data</h3>
              <p className="text-slate-300 font-manrope">
                Access up-to-date information on shelters and warming centers across all 50 states
              </p>
            </div>

            <div 
              className="glass-dark p-8 rounded-2xl text-center group hover:border-hearth/50 transition-all duration-300"
              data-testid="feature-nationwide-coverage"
            >
              <div className="w-16 h-16 bg-pine/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Navigation2 className="w-8 h-8 text-pine" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-playfair">Nationwide Coverage</h3>
              <p className="text-slate-300 font-manrope">
                From major cities to small towns, find help wherever you are in the United States
              </p>
            </div>

            <div 
              className="glass-dark p-8 rounded-2xl text-center group hover:border-hearth/50 transition-all duration-300"
              data-testid="feature-essential-services"
            >
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-playfair">Essential Services</h3>
              <p className="text-slate-300 font-manrope">
                Filter by services offered including meals, showers, healthcare, and pet-friendly facilities
              </p>
            </div>
          </div>
        </div>
      </section>

      <DonationSection />

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="glass-dark p-12 md:p-16 rounded-2xl text-center max-w-4xl mx-auto">
            <Users className="w-16 h-16 text-hearth mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-playfair">
              Make a Difference
            </h2>
            <p className="text-base md:text-lg text-slate-300 mb-8 font-manrope">
              Join our community of volunteers helping to keep people warm and safe this winter
            </p>
            <Button
              data-testid="volunteer-button"
              onClick={() => setShowVolunteer(true)}
              className="bg-hearth hover:bg-amber-600 text-white font-semibold rounded-full px-8 py-3 transition-all btn-glow"
            >
              Volunteer With Us
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900/80 py-8">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 text-center">
          <p className="text-slate-400 font-manrope">
            &copy; {new Date().getFullYear()} Warm Wishes. Powered by OpenStreetMap data.
          </p>
        </div>
      </footer>

      <VolunteerModal open={showVolunteer} onClose={() => setShowVolunteer(false)} />
    </div>
  );
};

export default HomePage;