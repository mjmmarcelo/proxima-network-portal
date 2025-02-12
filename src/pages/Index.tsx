
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logout realizado com sucesso");
      navigate("/auth");
    } catch (error) {
      toast.error("Erro ao realizar logout");
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto px-4 py-16">
        {/* Logout button */}
        <div className="absolute top-4 right-4">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
            PROXXIMA TELECOMUNICAÇÕES
          </h1>
          <p className="text-lg text-muted-foreground">
            Portal de Gerenciamento de Estações e Enlaces
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/estacoes" className="block">
              <div className="glass-card hover-scale rounded-2xl p-8 h-full">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  Estações
                </h2>
                <p className="text-muted-foreground mb-6">
                  Gerencie suas estações de telecomunicações com facilidade.
                  Cadastre, edite e visualize todas as informações.
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Acessar Estações
                </Button>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/enlaces" className="block">
              <div className="glass-card hover-scale rounded-2xl p-8 h-full">
                <h2 className="text-2xl font-semibold mb-4 text-secondary">
                  Enlaces
                </h2>
                <p className="text-muted-foreground mb-6">
                  Controle seus enlaces de comunicação. Conecte estações e
                  mantenha sua rede organizada.
                </p>
                <Button className="w-full bg-secondary hover:bg-secondary/90">
                  Acessar Enlaces
                </Button>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
