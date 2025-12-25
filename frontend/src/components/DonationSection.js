import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const DonationSection = () => {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/organizations`);
        setOrganizations(response.data);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  return (
    <section 
      className="py-20 md:py-32 relative overflow-hidden"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1576325782513-7d52f7c3baae?crop=entropy&cs=srgb&fm=jpg&q=85)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      data-testid="donation-section"
    >
      <div className="absolute inset-0 bg-midnight/90" />
      
      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <Heart className="w-16 h-16 text-hearth mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-playfair">
            Support the Cause
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto font-manrope">
            Your donation helps provide warmth, shelter, and hope to those in need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {organizations.map((org, index) => (
            <div
              key={index}
              className="glass-dark p-6 rounded-xl hover:border-hearth/50 transition-all duration-300"
              data-testid={`organization-card-${index}`}
            >
              <h3 className="text-xl font-bold text-white mb-2 font-playfair">{org.name}</h3>
              <p className="text-slate-300 text-sm mb-4 font-manrope">{org.description}</p>
              <div className="flex gap-3">
                <Button
                  asChild
                  size="sm"
                  className="bg-hearth hover:bg-amber-600 text-white btn-glow"
                  data-testid={`donate-button-${index}`}
                >
                  <a href={org.donation_link} target="_blank" rel="noopener noreferrer">
                    Donate
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="sm"
                  variant="ghost"
                  className="text-slate-300 hover:text-white hover:bg-white/10"
                >
                  <a href={org.website} target="_blank" rel="noopener noreferrer">
                    Learn More
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationSection;