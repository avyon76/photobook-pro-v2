import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Award, Heart, Target, Calendar, MapPin } from "lucide-react";

const About = () => {
  const [language, setLanguage] = useState<'cs' | 'en'>('cs');

  const t = {
    cs: {
      hero: {
        title: "O ",
        titleGradient: "PhotoBook Pro",
        subtitle: "Jsme český startup, který revolucionalizuje tvorbu fotoknih pomocí AI technologií a poskytuje profesionální tiskové služby nejvyšší kvality."
      },
      story: {
        title: "Náš příběh",
        content: "PhotoBook Pro vzniklo v roce 2023 s vizí demokratizovat profesionální tisk fotografií. Náš tým vývojářů, designérů a tiskových expertů vytvořil platformu, která kombinuje nejmodernější AI technologie s tradiční řemeslnou kvalitou tisku."
      },
      mission: {
        title: "Naše mise",
        content: "Věříme, že každá vzpomínka si zaslouží být zachována v nejlepší možné kvalitě. Proto vyvíjíme nástroje, které umožňují každému vytvořit profesionální fotoknihu bez nutnosti znalosti designu."
      },
      values: [
        {
          icon: Target,
          title: "Inovace",
          description: "Kontinuálně vyvíjíme nové technologie pro zlepšení uživatelského zážitku."
        },
        {
          icon: Award,
          title: "Kvalita",
          description: "Používáme pouze nejkvalitnější materiály a nejmodernější tiskové technologie."
        },
        {
          icon: Heart,
          title: "Zákaznický přístup",
          description: "Každý zákazník je pro nás důležitý a snažíme se překonávat jeho očekávání."
        },
        {
          icon: Users,
          title: "Komunita",
          description: "Budujeme komunitu fotografů a milovníků vzpomínek po celé Evropě."
        }
      ],
      team: {
        title: "Náš tým",
        members: [
          {
            name: "Jan Novák",
            position: "CEO & Founder",
            description: "Visionář s 15letou zkušeností v tech průmyslu."
          },
          {
            name: "Anna Svobodová", 
            position: "CTO",
            description: "AI expert a architektka naší technologické platformy."
          },
          {
            name: "Petr Dvořák",
            position: "Head of Design",
            description: "Kreativní ředitel s citem pro detail a uživatelský zážitek."
          },
          {
            name: "Marie Nováková",
            position: "Print Operations",
            description: "Expertka na tiskové technologie s 20letou praxí."
          }
        ]
      },
      stats: [
        { number: "50,000+", label: "Spokojených zákazníků" },
        { number: "500,000+", label: "Vytisknutých fotoknih" },
        { number: "15", label: "Evropských zemí" },
        { number: "99.8%", label: "Spokojenost zákazníků" }
      ],
      contact: {
        title: "Chcete se dozvědět více?",
        subtitle: "Kontaktujte nás a rádi zodpovíme všechny vaše otázky.",
        button: "Kontaktovat nás"
      }
    },
    en: {
      hero: {
        title: "About ",
        titleGradient: "PhotoBook Pro",
        subtitle: "We are a Czech startup revolutionizing photobook creation with AI technologies and providing professional printing services of the highest quality."
      },
      story: {
        title: "Our story",
        content: "PhotoBook Pro was founded in 2023 with a vision to democratize professional photo printing. Our team of developers, designers and printing experts created a platform that combines cutting-edge AI technologies with traditional craft printing quality."
      },
      mission: {
        title: "Our mission", 
        content: "We believe every memory deserves to be preserved in the best possible quality. That's why we develop tools that allow anyone to create professional photobooks without design knowledge."
      },
      values: [
        {
          icon: Target,
          title: "Innovation",
          description: "We continuously develop new technologies to improve user experience."
        },
        {
          icon: Award,
          title: "Quality", 
          description: "We use only the highest quality materials and cutting-edge printing technologies."
        },
        {
          icon: Heart,
          title: "Customer focus",
          description: "Every customer is important to us and we strive to exceed their expectations."
        },
        {
          icon: Users,
          title: "Community",
          description: "We build a community of photographers and memory lovers across Europe."
        }
      ],
      team: {
        title: "Our team",
        members: [
          {
            name: "Jan Novák",
            position: "CEO & Founder", 
            description: "Visionary with 15 years of experience in tech industry."
          },
          {
            name: "Anna Svobodová",
            position: "CTO",
            description: "AI expert and architect of our technology platform."
          },
          {
            name: "Petr Dvořák", 
            position: "Head of Design",
            description: "Creative director with attention to detail and user experience."
          },
          {
            name: "Marie Nováková",
            position: "Print Operations",
            description: "Printing technology expert with 20 years of experience."
          }
        ]
      },
      stats: [
        { number: "50,000+", label: "Happy customers" },
        { number: "500,000+", label: "Printed photobooks" },
        { number: "15", label: "European countries" },
        { number: "99.8%", label: "Customer satisfaction" }
      ],
      contact: {
        title: "Want to learn more?",
        subtitle: "Contact us and we'll be happy to answer all your questions.",
        button: "Contact us"
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t[language].hero.title}
              <span className="gradient-text">{t[language].hero.titleGradient}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t[language].hero.subtitle}
            </p>
          </div>
        </section>

        {/* Story & Mission */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <Card className="p-8">
                <h2 className="text-3xl font-bold mb-6">{t[language].story.title}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t[language].story.content}
                </p>
              </Card>
              
              <Card className="p-8">
                <h2 className="text-3xl font-bold mb-6">{t[language].mission.title}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t[language].mission.content}
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {t[language].values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {t[language].stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-16">{t[language].team.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {t[language].team.members.map((member, index) => (
                <Card key={index} className="p-6 text-center hover:scale-105 transition-transform duration-300">
                  {/* Avatar */}
                  <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.position}</p>
                  <p className="text-muted-foreground text-sm">
                    {member.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <div className="glass-panel p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                {t[language].contact.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t[language].contact.subtitle}
              </p>
              <Button variant="glossy" size="lg">
                {t[language].contact.button}
              </Button>
            </div>
          </div>
        </section>

        {/* Office Location */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary mr-2" />
                <h3 className="text-xl font-semibold">
                  {language === 'cs' ? 'Najdete nás v Praze' : 'Find us in Prague'}
                </h3>
              </div>
              <p className="text-muted-foreground mb-8">
                PhotoBook Pro s.r.o.<br />
                Wenceslas Square 1<br />
                110 00 Praha 1, Czech Republic
              </p>
              
              <div className="bg-gradient-primary h-64 rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <MapPin className="h-16 w-16 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-medium">Prague Office</p>
                  <p className="opacity-80">Interactive Map</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;