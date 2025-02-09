
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";

const EditarEnlace = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-secondary">Editar Enlace</h1>
        <Link to="/enlaces">
          <Button variant="outline">Voltar</Button>
        </Link>
      </div>

      <div className="glass-card p-6 rounded-lg">
        <p className="text-muted-foreground text-center py-8">
          Formulário de edição será implementado aqui - ID: {id}
        </p>
      </div>
    </div>
  );
};

export default EditarEnlace;
