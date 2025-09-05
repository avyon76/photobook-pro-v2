import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Users, Headphones } from "lucide-react";

const Contact = () => {
  const [language, setLanguage] = useState<'cs' | 'en'>('cs');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const t = {
    cs: {
      title: "Kontaktujte ",
      titleGradient: "nás",
      subtitle: "Jsme tu pro vás. Napište nám nebo nás navštivte v našich pobočkách.",
      form: {
        title: "Napište nám",
        name: "Jméno",
        email: "E-mail",
        subject: "Předmět",
        message: "Zpráva",
        send: "Odeslat zprávu",
        sending: "Odesílám...",
        success: "Zpráva byla úspěšně odeslána!",
        error: "Chyba při odesílání zprávy."
      },
      info: {
        title: "Kontaktní informace",
        address: "Adresa",
        phone: "Telefon",
        email: "E-mail",
        hours: "Otevírací doba"
      },
      office: {
        address: "Václavské náměstí 1, 110 00 Praha 1",
        phone: "+420 123 456 789",
        email: "info@photobookpro.cz",
        hours: "Po-Pá: 9:00-18:00"
      },
      channels: [
        {
          icon: MessageSquare,
          title: "Live Chat",
          description: "Rychlá odpověď během několika minut",
          action: "Spustit chat",
          available: true
        },
        {
          icon: Users,
          title: "Komunitní fórum",
          description: "Diskutujte s ostatními uživateli",
          action: "Přejít na fórum",
          available: true
        },
        {
          icon: Headphones,
          title: "Telefonní podpora",
          description: "Osobní konzultace s expertem",
          action: "Zavolat nyní",
          available: true
        }
      ]
    },
    en: {
      title: "Contact ",
      titleGradient: "us",
      subtitle: "We're here for you. Write to us or visit us at our branches.",
      form: {
        title: "Write to us",
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        send: "Send message",
        sending: "Sending...",
        success: "Message sent successfully!",
        error: "Error sending message."
      },
      info: {
        title: "Contact information",
        address: "Address",
        phone: "Phone",
        email: "Email",
        hours: "Opening hours"
      },
      office: {
        address: "Wenceslas Square 1, 110 00 Prague 1",
        phone: "+420 123 456 789",
        email: "info@photobookpro.cz",
        hours: "Mon-Fri: 9:00-18:00"
      },
      channels: [
        {
          icon: MessageSquare,
          title: "Live Chat",
          description: "Quick response within minutes",
          action: "Start chat",
          available: true
        },
        {
          icon: Users,
          title: "Community Forum",
          description: "Discuss with other users",
          action: "Go to forum",
          available: true
        },
        {
          icon: Headphones,
          title: "Phone Support",
          description: "Personal consultation with expert",
          action: "Call now",
          available: true
        }
      ]
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: t[language].form.success,
        description: language === 'cs' ? 'Odpovíme vám do 24 hodin.' : 'We will respond within 24 hours.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen">
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t[language].title}
              <span className="gradient-text">{t[language].titleGradient}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t[language].subtitle}
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <Card className="p-8">
                <h2 className="text-3xl font-bold mb-6">{t[language].form.title}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t[language].form.name}
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-glass-border rounded-lg bg-glass backdrop-blur-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t[language].form.email}
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-glass-border rounded-lg bg-glass backdrop-blur-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t[language].form.subject}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-glass-border rounded-lg bg-glass backdrop-blur-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t[language].form.message}
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-glass-border rounded-lg bg-glass backdrop-blur-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    variant="glossy" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t[language].form.sending : t[language].form.send}
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <Card className="p-8">
                  <h2 className="text-3xl font-bold mb-6">{t[language].info.title}</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <MapPin className="h-6 w-6 text-primary mt-1 mr-4" />
                      <div>
                        <h3 className="font-semibold mb-1">{t[language].info.address}</h3>
                        <p className="text-muted-foreground">{t[language].office.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-6 w-6 text-primary mt-1 mr-4" />
                      <div>
                        <h3 className="font-semibold mb-1">{t[language].info.phone}</h3>
                        <p className="text-muted-foreground">{t[language].office.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="h-6 w-6 text-primary mt-1 mr-4" />
                      <div>
                        <h3 className="font-semibold mb-1">{t[language].info.email}</h3>
                        <p className="text-muted-foreground">{t[language].office.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-6 w-6 text-primary mt-1 mr-4" />
                      <div>
                        <h3 className="font-semibold mb-1">{t[language].info.hours}</h3>
                        <p className="text-muted-foreground">{t[language].office.hours}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Map */}
                <Card className="p-6">
                  <div className="bg-gradient-primary h-64 rounded-lg flex items-center justify-center">
                    <div className="text-white text-center">
                      <MapPin className="h-16 w-16 mx-auto mb-4 opacity-80" />
                      <p className="text-lg font-medium">Interactive Map</p>
                      <p className="opacity-80">Prague Office Location</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Support Channels */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              {language === 'cs' ? 'Další možnosti ' : 'Other support '}
              <span className="gradient-text">
                {language === 'cs' ? 'podpory' : 'channels'}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              {language === 'cs' 
                ? 'Vyberte si způsob komunikace, který vám nejvíce vyhovuje'
                : 'Choose the communication method that suits you best'
              }
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {t[language].channels.map((channel, index) => {
                const IconComponent = channel.icon;
                return (
                  <Card key={index} className="p-6 text-center hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{channel.title}</h3>
                    <p className="text-muted-foreground mb-6 text-sm">
                      {channel.description}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      disabled={!channel.available}
                    >
                      {channel.action}
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;