import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Download, Share2, Edit } from "lucide-react";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [language, setLanguage] = useState<'cs' | 'en'>('cs');

  const t = {
    cs: {
      title: "Detail projektu",
      notFound: "Projekt nenalezen",
      edit: "Upravit",
      download: "Stáhnout",
      share: "Sdílet"
    },
    en: {
      title: "Project details", 
      notFound: "Project not found",
      edit: "Edit",
      download: "Download", 
      share: "Share"
    }
  };

  return (
    <div className="min-h-screen">
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">
              {t[language].title} #{projectId}
            </h1>
            
            <Card className="p-8 max-w-4xl mx-auto text-center">
              <div className="bg-gradient-primary h-64 rounded-lg flex items-center justify-center mb-8">
                <div className="text-white">
                  <Eye className="h-16 w-16 mx-auto mb-4 opacity-80" />
                  <p className="text-lg">Project Preview</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  {t[language].edit}
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  {t[language].download}
                </Button>
                <Button variant="glossy">
                  <Share2 className="mr-2 h-4 w-4" />
                  {t[language].share}
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProjectDetails;