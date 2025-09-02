
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Calendar, Clock, Award, Star, ArrowRight, UserPlus, Users, MapPin, Mail, Phone, Shield, Leaf, Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import { useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel';
import { Card, CardContent } from './ui/card';
import { CURRENCY_SYMBOL, formatPriceWithPlus } from './utils/currency';

export const LandingPage = () => {
  // Refs for scrolling
  const topRef = useRef(null);
  const contactRef = useRef(null);
  const aboutRef = useRef(null);

  // Scroll functions
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Sample services - expanded for carousel with safe image URLs
 const services = [
    {
      id: 1,
      name: "Advanced Facial Treatments",
      description:
        "Rejuvenate your skin with our signature facial treatments customized for your specific skin type and concerns.",
      price: 85,
      priceDisplay: formatPriceWithPlus(85),
      icon: <Star className="h-10 w-10 text-primary" />,
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      features: [
        "Deep cleansing",
        "Exfoliation",
        "Customized masks",
        "LED therapy",
      ],
    },
    {
      id: 2,
      name: "Medical Dermatology",
      description:
        "Professional medical treatments for various skin conditions including acne, rosacea, eczema, and psoriasis.",
      price: 120,
      priceDisplay: formatPriceWithPlus(120),
      icon: <Shield className="h-10 w-10 text-primary" />,
      image:
        "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      features: [
        "Skin condition diagnosis",
        "Prescription treatments",
        "Follow-up care",
        "Medical-grade products",
      ],
    },
    {
      id: 3,
      name: "Anti-Aging Treatments",
      description:
        "Turn back the clock with our advanced anti-aging therapies that reduce fine lines and restore youthful glow.",
      price: 150,
      priceDisplay: formatPriceWithPlus(150),
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      image:
        "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      features: [
        "Collagen stimulation",
        "Fine line reduction",
        "Skin tightening",
        "Age spot treatment",
      ],
    },
    {
      id: 4,
      name: "Hydrating Skin Therapy",
      description:
        "Deep hydration treatments to restore moisture balance and revitalize dehydrated skin for a plump, dewy complexion.",
      price: 95,
      priceDisplay: formatPriceWithPlus(95),
      icon: <Leaf className="h-10 w-10 text-primary" />,
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      features: [
        "Hyaluronic infusion",
        "Moisture barrier repair",
        "Hydrating masks",
        "Long-lasting hydration",
      ],
    },
  ];

  // Sample testimonials
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Regular Customer",
      comment: "The best skin treatments I've ever had! The staff is incredibly talented and knowledgeable.",
      avatar: "/public/services/hydrating-skin-therapy.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "New Client",
      comment: "I was amazed by the attention to detail and personalized dermatological care. Will definitely come back!",
      avatar: "/public/services/skin-analysis-consultation.jpg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col" ref={topRef}>
      <Navigation scrollToTop={scrollToTop} scrollToContact={scrollToContact} scrollToAbout={scrollToAbout} />

      {/* Promotional Banner */}
      <div className="bg-primary text-white py-2 px-4 text-center">
        <p className="text-sm md:text-base">
          <span className="font-medium">New Client Special:</span> Sign up today and get 15% off your first treatment!
          <Link to="/signup" className="underline ml-2 font-medium hover:text-white/90">Register Now</Link>
        </p>
      </div>

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-b from-muted to-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              <span className="text-primary">Skin</span> and <span className="text-primary">Dermatology</span> <br />
              All in One Place
            </h1>
            <p className="mb-8 text-gray-600 max-w-lg">
              Experience premium dermatological services tailored to your needs. Our professional team offers expert skin care, treatments, and therapies.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Button className="bg-primary text-white hover:bg-primary/90 px-6">
                  Our Services
                </Button>
              </Link>
              <Link to="/booking">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-6">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-5 -left-5 w-20 h-20 rounded-full bg-secondary z-[-1]" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80"
                alt="Dermatology Clinic Interior"
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <div className="absolute -bottom-5 -right-5 w-20 h-20 rounded-full bg-accent z-[-1]" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-12 text-center">Why Choose Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-muted rounded-lg p-6 text-center">
              <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Expert Dermatologists</h3>
              <p className="text-gray-600">Experienced specialists with a passion for skin health</p>
            </div>

            <div className="bg-muted rounded-lg p-6 text-center">
              <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Flexible Hours</h3>
              <p className="text-gray-600">Open 7 days a week with extended evening hours</p>
            </div>

            <div className="bg-muted rounded-lg p-6 text-center">
              <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Easy Booking</h3>
              <p className="text-gray-600">Book your appointment online anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" ref={aboutRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold mb-4">About K DERMA</h2>
            <div className="h-1 w-24 bg-primary mx-auto"></div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80"
                alt="Dermatology Clinic"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>

            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Our Story</h3>
              <p className="mb-4">
                Founded in 2015, K DERMA Beauty Clinic has been at the forefront of skin care and dermatology, offering premium treatments that combine medical expertise with aesthetic excellence.
              </p>
              <p className="mb-4">
                Our team of board-certified dermatologists and skin care specialists are dedicated to providing personalized care and achieving the best results for each client's unique skin needs.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-6 text-primary">Our Mission</h3>
              <p className="mb-4">
                We believe that healthy skin is the foundation of confidence and well-being. Our mission is to empower our clients through expert dermatological care and education, helping them achieve and maintain radiant, healthy skin at every stage of life.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="bg-muted p-2 rounded-full mr-3">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Expert Team</h4>
                    <p className="text-gray-600">Board-certified professionals</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-muted p-2 rounded-full mr-3">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Top Rated</h4>
                    <p className="text-gray-600">5-star client satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="services" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold mb-4">Our Services</h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Discover our comprehensive range of dermatological treatments and skincare services designed to enhance your natural beauty and maintain healthy skin.
            </p>
          </div>

          <div className="relative px-4 md:px-10">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {services.map((service) => (
                  <CarouselItem key={service.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="overflow-hidden border border-border/30 transition-all hover:border-primary/30 hover:shadow-md">
                        <div className="relative h-48 w-full overflow-hidden">
                          <ImageWithFallback
                            src={service.image}
                            alt={service.name}
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                            type="service"
                          />
                          <div className="absolute top-4 right-4 bg-primary text-white py-1 px-3 rounded-full">
                            {service.priceDisplay}
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="mb-4">
                            <div className="flex items-center mb-3">
                              <div className="p-2 rounded-full bg-primary/10 mr-3">
                                {service.icon}
                              </div>
                              <h3 className="font-medium text-xl">{service.name}</h3>
                            </div>
                            <p className="text-gray-600 mb-4">{service.description}</p>
                            <ul className="space-y-2">
                              {service.features.map((feature, index) => (
                                <li key={index} className="flex items-center text-sm text-gray-600">
                                  <ArrowRight className="h-3 w-3 text-primary mr-2" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <Link to="/signup" className="mt-4 inline-flex items-center text-primary hover:underline">
                            Book this service <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="left-0 bg-white/80 hover:bg-white border-primary text-primary" />
                <CarouselNext className="right-0 bg-white/80 hover:bg-white border-primary text-primary" />
              </div>
            </Carousel>
          </div>

          <div className="mt-10 text-center">
            <div className="flex justify-center">
              <Link to="/signup">
                <Button className="bg-primary text-white hover:bg-primary/90 px-6 py-6">
                  Sign Up to Book Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-6">Ready to Experience the Best?</h2>
          <p className="mb-8 max-w-lg mx-auto">
            Book your appointment today and discover the difference that professional dermatological care makes.
          </p>
          <div className="flex justify-center">
            <Link to="/signup">
              <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-6">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" ref={contactRef} className="bg-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium mb-4 text-primary">K DERMA</h3>
              <p className="text-gray-600 mb-4">
                Your destination for premium skin health and beauty services.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-primary">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-primary">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-primary">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4 text-gray-800">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="text-gray-600 hover:text-primary">Home</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-600 hover:text-primary">Services</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToAbout(); }} className="text-gray-600 hover:text-primary">About Us</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToContact(); }} className="text-gray-600 hover:text-primary">Contact</a></li>
                <li><Link to="/signup" className="text-gray-600 hover:text-primary">Sign Up</Link></li>
                <li><Link to="/login" className="text-gray-600 hover:text-primary">Login</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4 text-gray-800">Contact Us</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-2" />
                  KDerma Beauty Clinic, National Highway, Poblacion 4, Calaca
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-2" />
                  0967 295 5646
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-2" />
                  info@kderma.com
                </li>
                <li className="mt-4">
                  <Button
                    onClick={() => window.open('https://maps.google.com', '_blank')}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Get Directions
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>&copy; 2025 K DERMA Beauty Clinic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
