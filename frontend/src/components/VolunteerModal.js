import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const VolunteerModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`${BACKEND_URL}/api/volunteer`, formData);
      toast.success('Thank you for your interest! We\'ll be in touch soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
      onClose();
    } catch (error) {
      console.error('Error submitting volunteer form:', error);
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-midnight border-slate-700" data-testid="volunteer-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair text-white">Volunteer With Us</DialogTitle>
          <DialogDescription className="text-slate-300 font-manrope">
            Fill out the form below and we'll reach out with volunteer opportunities.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-200">Name *</Label>
            <Input
              id="name"
              data-testid="volunteer-name-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-200">Email *</Label>
            <Input
              id="email"
              type="email"
              data-testid="volunteer-email-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-200">Phone</Label>
            <Input
              id="phone"
              type="tel"
              data-testid="volunteer-phone-input"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message" className="text-slate-200">Message (Optional)</Label>
            <Textarea
              id="message"
              data-testid="volunteer-message-input"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
              placeholder="Tell us about your interests and availability..."
            />
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-slate-300 hover:text-white hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              data-testid="volunteer-submit-button"
              className="bg-hearth hover:bg-amber-600 text-white btn-glow"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VolunteerModal;