import React, { useState, useEffect, useRef } from 'react';
import {
  Sun,
  Moon,
  ArrowRight,
  Code,
  Zap,
  Globe,
  Users,
  Award,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Sparkles,
  Rocket,
  Shield,
  Brain,
  Star,
  CheckCircle,
  Play,
  ExternalLink,
  Target,
  Clock,
  Lightbulb,
  Database,
  Cloud,
  Smartphone,
  Monitor,
  Settings,
  ChevronLeft,
  ChevronRight,
  Quote
} from 'lucide-react';
import Logo from "../assets/Images/logo.png";

const Homepage = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTypeText, setCurrentTypeText] = useState('');
  const [typeIndex, setTypeIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  

  const [counters, setCounters] = useState({
    500: 0,
    250: 0,
    50: 0,
    99: 0,
  });
  const [hasCounterStarted, setHasCounterStarted] = useState(new Set());

  const typeStrings = ['Innovation', 'Excellence', 'Technology', 'Future', 'Solutions'];
  const observerRef = useRef();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Counter animation with easing
  useEffect(() => {
    const statsData = [
      { end: 500, duration: 2500 },
      { end: 250, duration: 2000 },
      { end: 50, duration: 1800 },
      { end: 99, duration: 2200 },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counterValue = Number.parseInt(entry.target.getAttribute('data-counter'));

            if (!hasCounterStarted.has(counterValue)) {
              setHasCounterStarted((prev) => new Set([...prev, counterValue]));

              const statData = statsData.find((stat) => stat.end === counterValue);
              if (statData) {
                const startTime = Date.now();
                const timer = setInterval(() => {
                  const elapsed = Date.now() - startTime;
                  const progress = Math.min(elapsed / statData.duration, 1);
                  const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                  const currentCount = Math.floor(easeOutQuart * statData.end);

                  setCounters((prev) => ({
                    ...prev,
                    [counterValue]: currentCount,
                  }));

                  if (progress >= 1) {
                    clearInterval(timer);
                  }
                }, 16);
              }
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const counterElements = document.querySelectorAll('[data-counter]');
    counterElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [hasCounterStarted]);

  // Intersection Observer for animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  // Enhanced typing animation
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 150;
    const currentString = typeStrings[typeIndex];

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentString.length) {
        setCurrentTypeText(currentString.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setCurrentTypeText(currentString.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentString.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTypeIndex((typeIndex + 1) % typeStrings.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, typeIndex]);

  const services = [
    {
      icon: Smartphone,
      title: 'Mobile Development',
      desc: 'Native iOS & Android apps with React Native and Flutter',
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin']
    },
    {
      icon: Monitor,
      title: 'Web Development',
      desc: 'Modern web applications with cutting-edge frameworks',
      technologies: ['React', 'Next.js', 'Vue.js', 'Angular']
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      desc: 'Scalable cloud infrastructure and DevOps automation',
      technologies: ['AWS', 'Azure', 'GCP', 'Docker']
    },
    {
      icon: Database,
      title: 'Backend Systems',
      desc: 'Robust APIs and microservices architecture',
      technologies: ['Node.js', 'Python', 'Go', 'PostgreSQL']
    },
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      desc: 'Intelligent solutions with advanced ML algorithms',
      technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'Hugging Face']
    },
    {
      icon: Settings,
      title: 'DevOps & Automation',
      desc: 'CI/CD pipelines and infrastructure as code',
      technologies: ['Kubernetes', 'Terraform', 'Jenkins', 'GitHub Actions']
    }
  ];

  const projects = [
    { title: 'AI Platform By Subhash', desc: 'Next-gen customer experience with machine learning', icon: Brain, color: 'from-blue-500 to-cyan-500', status: 'Live' },
    { title: 'FinTech Suite', desc: 'Secure blockchain-based financial transactions', icon: Shield, color: 'from-green-500 to-emerald-500', status: 'Beta' },
    { title: 'Cloud Infrastructure', desc: 'Scalable microservices architecture', icon: Globe, color: 'from-purple-500 to-indigo-500', status: 'Live' },
    { title: 'E-commerce Engine', desc: 'Smart recommendations and analytics', icon: TrendingUp, color: 'from-orange-500 to-red-500', status: 'Live' },
    { title: 'EdTech Platform', desc: 'Interactive learning with AI assessments', icon: Award, color: 'from-yellow-500 to-orange-500', status: 'Development' },
    { title: 'IoT Dashboard', desc: 'Real-time industrial monitoring system', icon: Zap, color: 'from-pink-500 to-rose-500', status: 'Live' },
    { title: 'HealthTech App', desc: 'Telemedicine with AI-powered diagnostics', icon: Users, color: 'from-teal-500 to-cyan-500', status: 'Beta' },
    { title: 'DevOps Tools', desc: 'Automated deployment and monitoring', icon: Code, color: 'from-violet-500 to-purple-500', status: 'Live' },
  ];

  const features = [
    {
      icon: Rocket,
      title: 'Lightning Fast',
      desc: 'Optimized performance with cutting-edge technology stack and advanced caching strategies',
      gradient: 'from-blue-600 to-cyan-600',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      desc: 'Bank-grade security protocols with end-to-end encryption and compliance standards',
      gradient: 'from-green-600 to-emerald-600',
    },
    {
      icon: Brain,
      title: 'AI-Powered',
      desc: 'Intelligent automation and machine learning integration for predictive analytics',
      gradient: 'from-purple-600 to-indigo-600',
    },
    {
      icon: Target,
      title: 'Results Driven',
      desc: 'Data-driven approach with measurable outcomes and continuous optimization',
      gradient: 'from-orange-600 to-red-600',
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CTO, TechCorp',
      company: 'TechCorp Inc.',
      content: 'FuseLab transformed our entire digital infrastructure. Their AI solutions increased our efficiency by 300% and reduced operational costs significantly.',
      rating: 5,
      avatar: '👩‍💻'
    },
    {
      name: 'Michael Rodriguez',
      role: 'CEO, StartupX',
      company: 'StartupX',
      content: 'Outstanding development team. They delivered our fintech platform ahead of schedule with zero bugs. The attention to detail is remarkable.',
      rating: 5,
      avatar: '👨‍💼'
    },
    {
      name: 'Emily Watson',
      role: 'Product Manager, InnovateInc',
      company: 'InnovateInc',
      content: 'The cloud infrastructure they built scales seamlessly. Best investment we\'ve made in technology. Their support is world-class.',
      rating: 5,
      avatar: '👩‍🚀'
    },
    {
      name: 'David Kim',
      role: 'VP Engineering, DataFlow',
      company: 'DataFlow Systems',
      content: 'FuseLab\'s machine learning solutions revolutionized our data processing. 10x improvement in accuracy and speed.',
      rating: 5,
      avatar: '👨‍💻'
    },
    {
      name: 'Lisa Thompson',
      role: 'Founder, EduTech Solutions',
      company: 'EduTech Solutions',
      content: 'Their mobile app development expertise is unmatched. Beautiful UI, flawless performance, and delivered on time.',
      rating: 5,
      avatar: '👩‍🎓'
    },
    {
      name: 'James Wilson',
      role: 'CTO, HealthFirst',
      company: 'HealthFirst Medical',
      content: 'HIPAA-compliant healthcare platform with AI diagnostics. FuseLab exceeded all our expectations.',
      rating: 5,
      avatar: '👨‍⚕️'
    }
  ];

  const teamValues = [
    {
      icon: Lightbulb,
      title: 'Innovation First',
      desc: 'We push boundaries and explore cutting-edge technologies to deliver tomorrow\'s solutions today.'
    },
    {
      icon: Users,
      title: 'Client Success',
      desc: 'Your success is our mission. We build lasting partnerships through exceptional service and results.'
    },
    {
      icon: Clock,
      title: 'Timely Delivery',
      desc: 'We respect deadlines and deliver high-quality solutions on time, every time.'
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      desc: 'Rigorous testing and quality assurance ensure our solutions meet the highest standards.'
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${isDark ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-700">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-40 transition-all duration-500 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex-shrink-0">
                {/* <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  FuseLab
                </h2> */}
                  <img src={Logo} alt= 'a' className='w-[100px] h-[100px] rounded-lg '/>
                
              </div>

              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  {['Home', 'About', 'Services', 'Projects', 'Testimonials', 'Contact'].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="relative px-4 py-2 text-sm font-semibold transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 group"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="p-3 rounded-xl transition-all duration-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-110 hover:rotate-12"
                >
                  {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
                </button>

                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`md:hidden transition-all duration-500 ${isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
            <div className="px-4 pt-4 pb-6 space-y-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl">
              {['Home', 'About', 'Services', 'Projects', 'Testimonials', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-4 py-3 text-base font-semibold rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20"></div>
          
          {/* Floating orbs */}
          <div 
            className="absolute top-1/4 -right-64 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          />
          <div 
            className="absolute bottom-1/4 -left-64 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse"
            style={{ transform: `translateY(${scrollY * -0.1}px)`, animationDelay: '3s' }}
          />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8" data-animate id="hero-text">
                <div className={`space-y-6 ${visibleElements.has('hero-text') ? 'animate-fade-in-up' : 'opacity-0'}`}>
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 border border-blue-200 dark:border-blue-800">
                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Welcome to the Future</span>
                  </div>

                  <h1 className="text-2xl md:text-6xl font-black leading-tight">
                    Crafting{' '}
                    <span className="relative">
                      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                        {currentTypeText}
                        <span className="animate-pulse text-purple-600">|</span>
                      </span>
                    </span>
                    <br />
                    <span className="text-3xl md:text-5xl font-bold text-gray-600 dark:text-gray-400">Through Technology</span>
                  </h1>

                  <p className="text-xl md:text-2xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl">
                    We deliver cutting-edge software solutions that transform businesses, drive innovation, and create
                    lasting impact in the digital landscape.
                  </p>
                </div>

                <div className={`flex flex-col sm:flex-row gap-6 ${visibleElements.has('hero-text') ? 'animate-fade-in-scale' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
                  <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center">
                      Explore Solutions
                      <ArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-2" size={24} />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </button>

                  <button className="group px-8 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-2xl font-bold text-lg transition-all duration-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-blue-500 hover:scale-105 hover:shadow-xl flex items-center justify-center">
                    <Play className="mr-2 transition-transform duration-300 group-hover:scale-110" size={20} />
                    Watch Demo
                  </button>
                </div>
              </div>

              <div className="relative" data-animate id="hero-visual">
                <div className={`relative z-10 ${visibleElements.has('hero-visual') ? 'animate-fade-in-scale' : 'opacity-0'}`}>
                  <div className="relative group">
                    <div className="w-full h-[500px] rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 p-1 shadow-2xl hover:shadow-blue-500/25 transition-shadow duration-500">
                      <div className="h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20"></div>
                        <div className="text-center relative z-10">
                          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
                            <Code size={48} className="text-white" />
                          </div>
                          <h3 className="text-3xl font-black mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Innovation Hub
                          </h3>
                          <p className="text-lg text-gray-600 dark:text-gray-300">Building tomorrow's technology today</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20" data-animate id="about-header">
              <div className={`${visibleElements.has('about-header') ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <h2 className="text-4xl md:text-6xl font-black mb-6">
                  About{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">FuseLab</span>
                </h2>
                <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"></div>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  We are a cutting-edge technology company specializing in innovative software solutions that transform businesses and drive digital transformation across industries.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              <div data-animate id="about-content" className={`space-y-6 ${visibleElements.has('about-content') ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  At FuseLab, we believe technology should empower, not complicate. Our mission is to create sophisticated yet intuitive solutions that help businesses thrive in the digital age. We combine technical expertise with creative thinking to deliver products that make a real difference.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Founded in 2020, we've grown from a small team of passionate developers to a global technology partner, serving clients across 50+ countries. Our agile approach and commitment to excellence have made us the go-to choice for startups and Fortune 500 companies alike.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  {['Agile Development', 'Global Reach', '24/7 Support', 'Quality Assured'].map((tag) => (
                    <span key={tag} className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div data-animate id="about-visual" className={`${visibleElements.has('about-visual') ? 'animate-fade-in-scale' : 'opacity-0'}`}>
                <div className="relative">
                  <div className="w-full h-96 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                    <div className="h-full bg-white dark:bg-gray-800 rounded-3xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                            <Brain className="text-white" size={32} />
                          </div>
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                            <Rocket className="text-white" size={32} />
                          </div>
                          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                            <Shield className="text-white" size={32} />
                          </div>
                          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                            <Target className="text-white" size={32} />
                          </div>
                        </div>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Technology Excellence</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Values */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamValues.map((value, index) => (
                <div
                  key={index}
                  data-animate
                  id={`value-${index}`}
                  className={`group text-center p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                    visibleElements.has(`value-${index}`) ? 'animate-fade-in-scale' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <value.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20" data-animate id="services-header">
              <div className={`${visibleElements.has('services-header') ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <h2 className="text-4xl md:text-6xl font-black mb-6">
                  Our{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
                </h2>
                <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"></div>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Comprehensive technology solutions designed to accelerate your business growth and digital transformation.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  data-animate
                  id={`service-${index}`}
                  className={`group relative p-8 rounded-3xl transition-all duration-700 hover:scale-105 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-2xl ${
                    visibleElements.has(`service-${index}`) ? 'animate-fade-in-scale' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                      <service.icon size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">{service.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20" data-animate id="features-header">
              <div className={`${visibleElements.has('features-header') ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <h2 className="text-4xl md:text-6xl font-black mb-6">
                  Why Choose{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">FuseLab</span>
                </h2>
                <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"></div>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  We combine cutting-edge technology with innovative thinking to deliver solutions that exceed
                  expectations and drive real business results.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  data-animate
                  id={`feature-${index}`}
                  className={`group relative p-8 rounded-3xl transition-all duration-700 hover:scale-105 ${
                    visibleElements.has(`feature-${index}`) ? 'animate-fade-in-scale' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-all duration-500 shadow-lg group-hover:shadow-2xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <feature.icon size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section with Seamless Auto-Scrolling */}
        <section id="projects" className="py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20" data-animate id="projects-header">
              <div className={`${visibleElements.has('projects-header') ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <h2 className="text-4xl md:text-6xl font-black mb-6">
                  Our{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Portfolio</span>
                </h2>
                <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
              </div>
            </div>

            <div className="relative overflow-hidden mask-gradient">
              <div className="flex space-x-6 animate-scroll-seamless">
                {[...projects, ...projects, ...projects].map((project, index) => (
                  <div
                    key={`project-${index}`}
                    className="flex-shrink-0 w-80 group relative p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-600"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${project.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <project.icon className="text-white" size={24} />
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.status === 'Live' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                          project.status === 'Beta' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{project.desc}</p>
                      <button className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                        View Details
                        <ExternalLink className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section with Auto-Scrolling Reviews */}
        <section id="testimonials" className="py-32 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20" data-animate id="testimonials-header">
              <div className={`${visibleElements.has('testimonials-header') ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <h2 className="text-4xl md:text-6xl font-black mb-6">
                  What Our{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Clients Say</span>
                </h2>
                <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-8"></div>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Don't just take our word for it. Here's what industry leaders say about working with FuseLab.
                </p>
              </div>
            </div>

            {/* Auto-Scrolling Testimonials */}
            <div className="relative overflow-hidden mask-gradient mb-16">
              <div className="flex space-x-8 animate-scroll-testimonials">
                {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                  <div
                    key={`testimonial-auto-${index}`}
                    className="flex-shrink-0 w-96 group relative p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-600"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    
                    <div className="relative z-10">
                      <Quote className="text-blue-600/30 dark:text-blue-400/30 mb-4" size={32} />
                      
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed mb-6 italic">
                        "{testimonial.content}"
                      </p>
                      
                      <div className="flex items-center">
                        <div className="text-3xl mr-4">{testimonial.avatar}</div>
                        <div>
                          <h4 className="font-bold text-lg text-gray-900 dark:text-white">{testimonial.name}</h4>
                          <p className="text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                          <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">{testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Testimonial */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200 dark:border-gray-700">
                <Quote className="absolute top-6 left-6 text-blue-600/20 dark:text-blue-400/20" size={48} />
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} size={24} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed mb-8 italic">
                    "{testimonials[currentTestimonial].content}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-4xl mr-4">{testimonials[currentTestimonial].avatar}</div>
                      <div>
                        <h4 className="font-bold text-xl text-gray-900 dark:text-white">{testimonials[currentTestimonial].name}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{testimonials[currentTestimonial].role}</p>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold">{testimonials[currentTestimonial].company}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <div
                  key={index}
                  data-animate
                  id={`testimonial-grid-${index}`}
                  className={`group relative p-6 rounded-2xl transition-all duration-700 hover:scale-105 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-xl ${
                    visibleElements.has(`testimonial-grid-${index}`) ? 'animate-fade-in-scale' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 italic">
                      "{testimonial.content.substring(0, 120)}..."
                    </p>
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">{testimonial.avatar}</div>
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center space-x-2 mt-12">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-blue-600 w-8' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-blue-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { end: 500, label: 'Projects Delivered', icon: TrendingUp, color: 'from-blue-600 to-cyan-600' },
                { end: 250, label: 'Happy Clients', icon: Users, color: 'from-green-600 to-emerald-600' },
                { end: 50, label: 'Countries Served', icon: Globe, color: 'from-purple-600 to-indigo-600' },
                { end: 99, label: 'Success Rate', icon: Award, suffix: '%', color: 'from-orange-600 to-red-600' },
              ].map((stat, index) => (
                <div
                  key={index}
                  data-counter={stat.end}
                  data-animate
                  id={`stat-${index}`}
                  className={`text-center p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:scale-105 hover:border-blue-300 dark:hover:border-blue-600 group shadow-lg hover:shadow-2xl ${
                    visibleElements.has(`stat-${index}`) ? 'animate-fade-in-scale' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <stat.icon size={32} className="text-white" />
                    </div>
                    <div className="text-5xl font-black mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {counters[stat.end]}
                      {stat.suffix || '+'}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-lg font-semibold">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20" data-animate id="contact-header">
              <div className={`${visibleElements.has('contact-header') ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <h2 className="text-4xl md:text-6xl font-black mb-6">
                  Let's{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Connect</span>
                </h2>
                <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"></div>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Ready to transform your business? Let's discuss how we can help you achieve your goals.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-8" data-animate id="contact-info">
                <div className={`space-y-8 ${visibleElements.has('contact-info') ? 'animate-fade-in-up' : 'opacity-0'}`}>
                  {[
                    { icon: Mail, title: 'Email', info: 'hello@fuselab.com', gradient: 'from-blue-600 to-cyan-600' },
                    { icon: Phone, title: 'Phone', info: '+1 (555) 123-4567', gradient: 'from-purple-600 to-indigo-600' },
                    {
                      icon: MapPin,
                      title: 'Address',
                      info: '123 Innovation Street, Tech Valley, CA 94000',
                      gradient: 'from-green-600 to-emerald-600',
                    },
                  ].map((contact, index) => (
                    <div key={index} className="flex items-center space-x-6 group">
                      <div className={`w-16 h-16 bg-gradient-to-br ${contact.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <contact.icon className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {contact.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">{contact.info}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6" data-animate id="contact-form">
                <div className={`space-y-6 ${visibleElements.has('contact-form') ? 'animate-fade-in-scale' : 'opacity-0'}`}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-6 py-4 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 dark:hover:border-blue-500"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full px-6 py-4 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 dark:hover:border-blue-500"
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full px-6 py-4 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 dark:hover:border-blue-500"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={6}
                    className="w-full px-6 py-4 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 dark:hover:border-blue-500 resize-none"
                  ></textarea>
                  <button
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 group relative overflow-hidden"
                    onClick={() => alert("Message sent! We'll get back to you soon.")}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Send Message
                      <ArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-2" size={20} />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-6 md:mb-0">
                <h3 className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  FuseLab
                </h3>
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-center md:text-right">
                © 2025 FuseLab. All Rights Reserved. Built with passion and precision.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scroll-seamless {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        @keyframes scroll-testimonials {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        .animate-scroll-seamless {
          animation: scroll-seamless 40s linear infinite;
        }

        .animate-scroll-seamless:hover {
          animation-play-state: paused;
        }

        .animate-scroll-testimonials {
          animation: scroll-testimonials 50s linear infinite;
        }

        .animate-scroll-testimonials:hover {
          animation-play-state: paused;
        }

        .mask-gradient {
          mask: linear-gradient(
            90deg,
            transparent,
            white 10%,
            white 90%,
            transparent
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent,
            white 10%,
            white 90%,
            transparent
          );
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in-scale {
          animation: fade-in-scale 0.6s ease-out forwards;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-scroll-infinite {
          animation: scroll-seamless 40s linear infinite;
        }

        .animate-scroll-infinite:hover {
          animation-play-state: paused;
        }

        /* Custom hover effects */
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }

        .hover\\:scale-110:hover {
          transform: scale(1.1);
        }

        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }

        .group:hover .group-hover\\:translate-x-1 {
          transform: translateX(0.25rem);
        }

        .group:hover .group-hover\\:translate-x-2 {
          transform: translateX(0.5rem);
        }

        .group:hover .group-hover\\:text-blue-600 {
          color: rgb(37 99 235);
        }

        .dark .group:hover .group-hover\\:text-blue-400 {
          color: rgb(96 165 250);
        }

        .group:hover .group-hover\\:text-purple-600 {
          color: rgb(147 51 234);
        }

        .dark .group:hover .group-hover\\:text-purple-400 {
          color: rgb(196 181 253);
        }

        /* Responsive design helpers */
        @media (max-width: 768px) {
          .text-5xl {
            font-size: 2.5rem;
          }
          .text-7xl {
            font-size: 3.5rem;
          }
        }

        /* Dark mode transitions */
        .dark {
          color-scheme: dark;
        }

        /* Gradient text animation */
        .bg-gradient-to-r {
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default Homepage;