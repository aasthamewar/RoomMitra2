import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Shield, Star, Sparkles, Home, Heart, CheckCircle2, MessageSquare, Lock } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/signup");  // New users go to signup
    } else {
      navigate("/find_match");  // Logged-in users go to find matches
    }
  };

  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI-Powered Matching",
      description: "Smart algorithm finds your perfect living companion based on lifestyle preferences"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safe & Verified",
      description: "All members are verified women with background checks for peace of mind"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Lifestyle Compatibility",
      description: "Match with roommates who share your values, habits, and interests"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Tell us about yourself and your ideal living situation",
      icon: <Users className="w-6 h-6" />
    },
    {
      number: "02",
      title: "Get Smart Matches",
      description: "AI recommends rooms and roommates perfectly suited to you",
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      number: "03",
      title: "Explore & Connect",
      description: "View detailed room previews and connect with potential roommates",
      icon: <Home className="w-6 h-6" />
    },
    {
      number: "04",
      title: "Move In With Confidence",
      description: "Secure booking with verified communities and support",
      icon: <CheckCircle2 className="w-6 h-6" />
    }
  ];

  const stats = [
    { number: "2.5K+", label: "Happy Matches", icon: <Heart className="w-5 h-5" /> },
    { number: "98%", label: "Satisfaction Rate", icon: <Star className="w-5 h-5" /> },
    { number: "100%", label: "Verified Women", icon: <Shield className="w-5 h-5" /> },
    { number: "50+", label: "Cities Covered", icon: <Home className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* ===== HERO SECTION ===== */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Panel */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">AI-Powered Matching Now Live</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Your perfect{" "}
                <span className="relative inline-block">
                  <span className="text-primary font-extrabold">roommate match</span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-secondary/40 rounded-full"></div>
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-extrabold">
                  powered by AI
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Find your ideal living companion with our intelligent matching system. Safe, verified, and designed specifically for women seeking the perfect co-living experience.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                variant="hero" 
                size="lg"
                onClick={handleGetStarted}
                className="group text-base font-semibold px-8 h-12 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-secondary text-foreground hover:bg-secondary/10 text-base font-semibold px-8 h-12 rounded-xl"
              >
                Learn More
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-8 border-t border-muted">
              <div className="flex items-center gap-3 animate-slide-up">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">2.5K+</p>
                  <p className="text-sm text-muted-foreground">Happy Matches</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 animate-slide-up delay-75">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <Star className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">98%</p>
                  <p className="text-sm text-muted-foreground">Satisfaction</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 animate-slide-up delay-150">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">100%</p>
                  <p className="text-sm text-muted-foreground">Verified Women</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Hero Image */}
          <div className="flex justify-center lg:justify-end animate-fade-in delay-300">
            <div className="relative w-full max-w-md">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-0 animate-glow"></div>
              
              {/* Card */}
              <Card className="relative bg-white/60 dark:bg-slate-950/60 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-primary/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
                <img 
                  src={heroIllustration}
                  alt="Two happy women"
                  className="w-full h-auto rounded-2xl relative z-10 object-cover"
                />
              </Card>
              
              {/* Floating Badge 1 */}
              <div className="absolute -top-6 -right-6 animate-float">
                <div className="bg-primary/95 text-primary-foreground rounded-full p-4 shadow-lg border-4 border-white dark:border-slate-900">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-bold text-sm">AI Match</span>
                  </div>
                </div>
              </div>
              
              {/* Floating Badge 2 */}
              <div className="absolute -bottom-4 -left-4 animate-float delay-700">
                <div className="bg-secondary/95 text-white rounded-full p-3 shadow-lg border-4 border-white dark:border-slate-900 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span className="font-semibold text-xs">Safe & Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose RoomieMatch?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine smart technology with human values to create perfect living matches
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card 
                key={idx}
                className="bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-muted p-8 hover:shadow-lg transition-all duration-300 animate-fade-in hover-elevate"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                  <div className="text-primary">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS SECTION ===== */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find your perfect match in just 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="relative animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                {/* Connection Line */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 -right-3 w-6 h-1 bg-gradient-to-r from-primary to-transparent"></div>
                )}

                <Card className="bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-muted p-6 h-full hover:shadow-lg transition-all hover-elevate">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4 mt-4">
                    <div className="text-primary">{step.icon}</div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, idx) => (
              <Card 
                key={idx}
                className="bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-muted p-6 text-center hover:shadow-lg transition-all animate-fade-in hover-elevate"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-3">
                  <div className="text-primary">{stat.icon}</div>
                </div>
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-4">What Users Love</h2>
            <p className="text-lg text-muted-foreground">Real stories from our community</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Priya", quote: "Found my perfect match within a week! The AI matching is incredible.", rating: 5 },
              { name: "Anjali", quote: "Safety and verification gave me so much peace of mind. Highly recommended!", rating: 5 },
              { name: "Shreya", quote: "Best roommate hunting experience ever. Worth every moment!", rating: 5 }
            ].map((testimonial, idx) => (
              <Card 
                key={idx}
                className="bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-muted p-6 hover:shadow-lg transition-all animate-fade-in hover-elevate"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold text-foreground">— {testimonial.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20 border border-primary/30 p-12 text-center overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50"></div>
            
            <div className="relative z-10 space-y-6 animate-fade-in">
              <h2 className="text-4xl font-bold text-foreground">Ready to Find Your Perfect Roommate?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of women who've found their ideal living companion with RoomieMatch
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  variant="hero"
                  size="lg"
                  onClick={handleGetStarted}
                  className="group text-base font-semibold px-8 h-12 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-foreground/20 text-foreground hover:bg-foreground/5 text-base font-semibold px-8 h-12 rounded-xl"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contact Support
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ===== CSS ANIMATIONS ===== */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }

        @keyframes glow {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .delay-75 {
          animation-delay: 75ms;
        }

        .delay-150 {
          animation-delay: 150ms;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .delay-700 {
          animation-delay: 700ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
