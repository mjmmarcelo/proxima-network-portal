
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Estacoes = () => {
  const [estacoes, setEstacoes] = useState([]);

  const exportToCSV = () => {
    // TODO: Implement CSV export
    console.log("Exportando para CSV...");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Estações</h1>
        <div className="space-x-4">
          <Link to="/estacoes/nova">
            <Button variant="outline">Nova Estação</Button>
          </Link>
          <Button onClick={exportToCSV}>Exportar CSV</Button>
        </div>
      </div>

      {/* Placeholder for station list */}
      <div className="glass-card p-6 rounded-lg">
        <p className="text-muted-foreground text-center py-8">
          Lista de estações será implementada aqui
        </p>
      </div>
    </div>
  );
};

export default Estacoes;
