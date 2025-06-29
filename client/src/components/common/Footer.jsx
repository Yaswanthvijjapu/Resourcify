import React from 'react';
import { Calendar, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom'; // Use Link for internal navigation

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Resourcify</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Smart resource booking and management platform that streamlines the way organizations 
              manage their shared resources and spaces.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:support@resourcify.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </a>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/resources" className="text-gray-400 hover:text-white transition-colors">Resources</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/bookings" className="text-gray-400 hover:text-white transition-colors">My Bookings</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Resourcify. All rights reserved. Built with ❤️ for better resource management.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;