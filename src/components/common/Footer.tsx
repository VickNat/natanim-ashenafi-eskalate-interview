import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Instagram, Facebook, Twitter, Heart, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Section */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Team</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contact</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help & Support</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Partner with us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Ride with us</a></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Refund & Cancellation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Social Media & Newsletter Section */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-gray-400 uppercase tracking-wide text-sm">Follow Us</h3>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 mb-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={24} />
              </a>
            </div>

            {/* Newsletter Signup */}
            <div>
              <p className="text-gray-300 mb-4">Receive exclusive offers in your mailbox</p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    type="email"
                    placeholder="Enter Your email"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 pl-10 focus:border-primary"
                  />
                </div>
                <Button className="bg-gradient-to-r from-primary to-[#FF9A0E] hover:from-primary/90 hover:to-[#FF9A0E]/90 text-white px-6">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>All rights Reserved © Your Company, 2021</p>
            <p className="flex items-center gap-1 mt-2 md:mt-0">
              Made with <Heart size={16} className="text-red-500" fill="currentColor" /> by Themewagon
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer