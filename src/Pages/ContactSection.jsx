import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  AlertCircle,
  Loader,
  User,
  MessageSquare,
  Clock,
  ChevronDown
} from 'lucide-react';

const ContactSection = ({ isDark, visibleElements, observerRef }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
    date: '',
    time: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

  const services = [
    'Mobile Development',
    'Web Development', 
    'Cloud Solutions',
    'Backend Systems',
    'AI & Machine Learning',
    'DevOps & Automation',
    'Consultation',
    'Other'
  ];

  // Generate time slots with 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) { // 24/7 availability
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01 ${timeString}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        slots.push({ value: timeString, label: displayTime });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTimeSelect = (timeValue) => {
    setFormData(prev => ({
      ...prev,
      time: timeValue
    }));
    setIsTimeDropdownOpen(false);
    if (errors.time) {
      setErrors(prev => ({
        ...prev,
        time: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a preferred date';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Please select a future date';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Please select a preferred time';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Create datetime with timezone offset to preserve client's local time
      const datetime = new Date(`${formData.date}T${formData.time}`);
      const timezoneOffset = datetime.getTimezoneOffset();
      const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const response = await fetch(`https://fuselab.onrender.com/client-contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          datetime: `${formData.date}T${formData.time}`, // Send as local datetime string
          timezone: clientTimezone, // Send client's timezone
          timezoneOffset: timezoneOffset // Send timezone offset in minutes
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          service: '',
          message: '',
          date: '',
          time: ''
        });
      } else {
        throw new Error(result.detail || 'Something went wrong');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <section id="contact" className="py-32 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20" data-animate id="contact-header">
          <div className={`${visibleElements?.has('contact-header') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-8 backdrop-blur-sm">
              <MessageSquare className="mr-2" size={16} />
              Get In Touch
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
              Let's{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                Connect
              </span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Ready to transform your business? Let's discuss how we can help you achieve your goals with cutting-edge solutions.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Contact Info */}
          <div className="space-y-12" data-animate id="contact-info">
            <div className={`space-y-10 ${visibleElements?.has('contact-info') ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/50">
                <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Contact Information</h3>
                {[
                  { 
                    icon: Mail, 
                    title: 'Email', 
                    info: 'hello@fuselab.com', 
                    gradient: 'from-blue-500 to-cyan-500',
                    description: 'Drop us a line anytime'
                  },
                  { 
                    icon: Phone, 
                    title: 'Phone', 
                    info: '+1 (555) 123-4567', 
                    gradient: 'from-purple-500 to-indigo-500',
                    description: 'Mon-Fri from 8am to 5pm'
                  },
                  {
                    icon: MapPin,
                    title: 'Address',
                    info: '123 Innovation Street, Tech Valley, CA 94000',
                    gradient: 'from-green-500 to-emerald-500',
                    description: 'Come visit our office'
                  },
                ].map((contact, index) => (
                  <div key={index} className="flex items-start space-x-6 p-6 rounded-2xl hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-all duration-300 group cursor-pointer">
                    <div className={`w-16 h-16 bg-gradient-to-br ${contact.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                      <contact.icon className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {contact.title}
                      </h4>
                      <p className="text-gray-900 dark:text-gray-100 text-lg font-medium mb-1">{contact.info}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{contact.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Business Hours */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-8 border border-green-200/50 dark:border-green-800/50">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                    <Clock className="text-white" size={20} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Availability</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Customer Support</span>
                    <span className="font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full text-sm">24/7 Available</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Response Time</span>
                    <span className="font-semibold text-gray-900 dark:text-white">Within 2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Emergency Support</span>
                    <span className="font-semibold text-gray-900 dark:text-white">Always Available</span>
                  </div>
                  <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                    <p className="text-sm text-green-700 dark:text-green-300 text-center">
                      🌟 We're here for you anytime, anywhere!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-6" data-animate id="contact-form">
            <div className={`space-y-6 ${visibleElements?.has('contact-form') ? 'animate-fade-in-scale' : 'opacity-0'}`}>
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/50">
                <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Send us a Message</h3>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 animate-fade-in-scale mb-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                        <CheckCircle className="text-white" size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">Message Sent Successfully!</h4>
                        <p className="text-green-600 dark:text-green-300">Thank you for reaching out. We'll contact you soon at your preferred time.</p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-800 animate-fade-in-scale mb-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                        <AlertCircle className="text-white" size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">Oops! Something went wrong</h4>
                        <p className="text-red-600 dark:text-red-300">Please try again later or contact us directly.</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name and Email Row */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        <User className="inline mr-2" size={16} />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={`w-full px-6 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                          errors.name 
                            ? 'border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-gray-200 dark:border-gray-600'
                        }`}
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <p className="mt-3 text-sm text-red-600 dark:text-red-400 flex items-center font-medium">
                          <AlertCircle size={14} className="mr-2" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        <Mail className="inline mr-2" size={16} />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className={`w-full px-6 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                          errors.email 
                            ? 'border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-gray-200 dark:border-gray-600'
                        }`}
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <p className="mt-3 text-sm text-red-600 dark:text-red-400 flex items-center font-medium">
                          <AlertCircle size={14} className="mr-2" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="relative">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Service Interest *
                    </label>
                    <div className="relative">
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className={`w-full px-6 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none cursor-pointer ${
                          errors.service 
                            ? 'border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-gray-200 dark:border-gray-600'
                        }`}
                        disabled={isSubmitting}
                      >
                        <option value="">Select a service...</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                    {errors.service && (
                      <p className="mt-3 text-sm text-red-600 dark:text-red-400 flex items-center font-medium">
                        <AlertCircle size={14} className="mr-2" />
                        {errors.service}
                      </p>
                    )}
                  </div>

                  {/* Date and Time Selection */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        <Calendar className="inline mr-2" size={16} />
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        min={getMinDate()}
                        className={`w-full px-6 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 ${
                          errors.date 
                            ? 'border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-gray-200 dark:border-gray-600'
                        }`}
                        disabled={isSubmitting}
                      />
                      {errors.date && (
                        <p className="mt-3 text-sm text-red-600 dark:text-red-400 flex items-center font-medium">
                          <AlertCircle size={14} className="mr-2" />
                          {errors.date}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        <Clock className="inline mr-2" size={16} />
                        Preferred Time *
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                          className={`w-full px-6 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-gray-700 text-left flex items-center justify-between ${
                            errors.time 
                              ? 'border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-500/20' 
                              : 'border-gray-200 dark:border-gray-600'
                          }`}
                          disabled={isSubmitting}
                        >
                          <span className={`${formData.time ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                            {formData.time 
                              ? timeSlots.find(slot => slot.value === formData.time)?.label 
                              : 'Select time...'
                            }
                          </span>
                          <ChevronDown className={`text-gray-400 transition-transform duration-200 ${isTimeDropdownOpen ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        
                        {isTimeDropdownOpen && (
                          <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-2xl max-h-60 overflow-y-auto">
                            <div className="p-2">
                              {timeSlots.map((slot) => (
                                <button
                                  key={slot.value}
                                  type="button"
                                  onClick={() => handleTimeSelect(slot.value)}
                                  className={`w-full px-4 py-3 text-left rounded-xl hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors duration-200 ${
                                    formData.time === slot.value 
                                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold' 
                                      : 'text-gray-700 dark:text-gray-300'
                                  }`}
                                >
                                  {slot.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      {errors.time && (
                        <p className="mt-3 text-sm text-red-600 dark:text-red-400 flex items-center font-medium">
                          <AlertCircle size={14} className="mr-2" />
                          {errors.time}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      <MessageSquare className="inline mr-2" size={16} />
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project, requirements, and how we can help you achieve your goals..."
                      rows={6}
                      maxLength={500}
                      className={`w-full px-6 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-blue-400 dark:hover:border-blue-500 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                        errors.message 
                          ? 'border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-gray-200 dark:border-gray-600'
                      }`}
                      disabled={isSubmitting}
                    />
                    <div className="flex justify-between items-center mt-3">
                      {errors.message ? (
                        <p className="text-sm text-red-600 dark:text-red-400 flex items-center font-medium">
                          <AlertCircle size={14} className="mr-2" />
                          {errors.message}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Minimum 10 characters
                        </p>
                      )}
                      <span className={`text-sm font-medium ${
                        formData.message.length >= 10 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-gray-400'
                      }`}>
                        {formData.message.length}/500
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <Loader className="mr-3 animate-spin" size={20} />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-2" size={20} />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </button>

                  {/* Required fields notice */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Fields marked with <span className="text-red-500 font-semibold">*</span> are required
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, rgba(0,0,0,.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 4s ease infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-fade-in-scale {
          animation: fade-in-scale 0.6s ease-out forwards;
        }
        
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-scale {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        /* Custom scrollbar for time dropdown */
        .max-h-60::-webkit-scrollbar {
          width: 6px;
        }
        
        .max-h-60::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .max-h-60::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }
        
        .max-h-60::-webkit-scrollbar-thumb:hover {
          background-color: rgba(156, 163, 175, 0.7);
        }
        
        /* Dark mode scrollbar */
        .dark .max-h-60::-webkit-scrollbar-thumb {
          background-color: rgba(75, 85, 99, 0.5);
        }
        
        .dark .max-h-60::-webkit-scrollbar-thumb:hover {
          background-color: rgba(75, 85, 99, 0.7);
        }
      `}</style>
    </section>
  );
};

export default ContactSection;