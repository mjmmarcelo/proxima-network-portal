
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { EnlaceForm } from "@/components/enlaces/EnlaceForm";

const NovoEnlace = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-secondary">Novo Enlace</h1>
        <div className="space-x-4">
          <Link to="/enlaces">
            <Button variant="outline">Voltar</Button>
          </Link>
          <Link to="/">
            <Button variant="outline">Início</Button>
          </Link>
        </div>
      </div>

      <div className="glass-card p-6 rounded-lg">
        <EnlaceForm />
      </div>
    </div>
  );
};

export default NovoEnlace;
