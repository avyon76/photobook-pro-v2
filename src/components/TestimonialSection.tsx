import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TestimonialSectionProps {
  language: 'cs' | 'en';
}

const TestimonialSection = ({ language }: TestimonialSectionProps) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const t = {
    cs: {
      title: "Co říkají naši ",
      titleGradient: "zákazníci",
      subtitle: "Přečtěte si recenze spokojených zákazníků z celé České republiky",
      testimonials: [
        {
          name: "Marie Nováková",
          role: "Maminka na mateřské",
          location: "Praha",
          rating: 5,
          text: "Fotokniha byla úžasná! AI mi pomohlo krásně rozmístit fotky z naší dovolené. Kvalita tisku je perfektní a dodání bylo rychlé.",
          avatar: "/api/placeholder/40/40"
        },
        {
          name: "Petr Svoboda", 
          role: "Fotograf",
          location: "Brno",
          rating: 5,
          text: "Používám PhotoBook Pro pro své klienty. Kvalita je na profesionální úrovni a ceny jsou konkurenceschopné. Doporučuji!",
          avatar: "/api/placeholder/40/40"
        },
        {
          name: "Jana Dvořáková",
          role: "Babička",
          location: "Ostrava", 
          rating: 5,
          text: "Vnukům jsem udělala kalendář s jejich fotkami. Byli nadšení! Objednávání bylo jednoduché i pro mě jako seniora.",
          avatar: "/api/placeholder/40/40"
        },
        {
          name: "Tomáš Procházka",
          role: "Podnikatel",
          location: "Plzeň",
          rating: 5,
          text: "Wall Art pro naši kancelář vypadá úžasně. Akrylové sklo dodává prostoru moderní vzhled. Určitě budeme objednávat znovu.",
          avatar: "/api/placeholder/40/40"
        }
      ]
    },
    en: {
      title: "What our ",
      titleGradient: "customers say",
      subtitle: "Read reviews from satisfied customers across the Czech Republic",
      testimonials: [
        {
          name: "Marie Nováková",
          role: "Stay-at-home mom",
          location: "Prague",
          rating: 5,
          text: "The photobook was amazing! AI helped me beautifully arrange photos from our vacation. Print quality is perfect and delivery was fast.",
          avatar: "/api/placeholder/40/40"
        },
        {
          name: "Petr Svoboda",
          role: "Photographer", 
          location: "Brno",
          rating: 5,
          text: "I use PhotoBook Pro for my clients. Quality is professional level and prices are competitive. Highly recommend!",
          avatar: "/api/placeholder/40/40"
        },
        {
          name: "Jana Dvořáková",
          role: "Grandmother",
          location: "Ostrava",
          rating: 5,
          text: "I made a calendar with grandchildren's photos. They were thrilled! Ordering was simple even for me as a senior.",
          avatar: "/api/placeholder/40/40"
        },
        {
          name: "Tomáš Procházka", 
          role: "Entrepreneur",
          location: "Plzen",
          rating: 5,
          text: "Wall Art for our office looks amazing. Acrylic glass gives the space a modern look. We'll definitely order again.",
          avatar: "/api/placeholder/40/40"
        }
      ]
    }
  };

  const testimonials = t[language].testimonials;

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t[language].title}
            <span className="gradient-text">{t[language].titleGradient}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t[language].subtitle}
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="sm"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Testimonial Card */}
            <Card className="mx-8 border-glass bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 md:p-12">
                <div className="text-center">
                  <Quote className="h-12 w-12 text-primary/20 mx-auto mb-6" />
                  
                  <p className="text-lg md:text-xl text-muted-foreground mb-8 italic leading-relaxed">
                    "{testimonials[currentTestimonial].text}"
                  </p>

                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Customer Info */}
                  <div className="flex flex-col items-center">
                    <Avatar className="w-16 h-16 mb-4">
                      <AvatarImage src={testimonials[currentTestimonial].avatar} />
                      <AvatarFallback className="bg-gradient-primary text-white text-lg">
                        {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h4 className="font-semibold text-lg">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-muted-foreground">
                      {testimonials[currentTestimonial].role}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentTestimonial].location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-primary' : 'bg-muted'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-3xl mx-auto text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15k+</div>
            <div className="text-muted-foreground">{language === 'cs' ? 'Spokojených zákazníků' : 'Happy customers'}</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.9</div>
            <div className="text-muted-foreground">{language === 'cs' ? 'Průměrné hodnocení' : 'Average rating'}</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">48h</div>
            <div className="text-muted-foreground">{language === 'cs' ? 'Průměrná doba výroby' : 'Average production time'}</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">99%</div>
            <div className="text-muted-foreground">{language === 'cs' ? 'Míra spokojenosti' : 'Satisfaction rate'}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;