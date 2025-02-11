
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const fetchEnlaces = async () => {
  const { data, error } = await supabase
    .from("links")
    .select(`
      *,
      estacao_a:stations!links_estacao_a_id_fkey(numestacao),
      estacao_b:stations!links_estacao_b_id_fkey(numestacao)
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

const Enlaces = () => {
  const { data: enlaces, isLoading } = useQuery({
    queryKey: ["enlaces"],
    queryFn: fetchEnlaces,
  });

  const exportToCSV = () => {
    if (!enlaces) return;

    const headers = [
      "CNPJ",
      "Ano",
      "Estação A",
      "Estação B",
      "ID Enlace",
      "Meio",
      "Cap. Nominal",
      "SWAP",
    ];

    const csvData = enlaces.map((enlace) => [
      enlace.cnpj,
      enlace.ano,
      enlace.estacao_a?.numestacao,
      enlace.estacao_b?.numestacao,
      enlace.enlaces_proprios_terrestres_id,
      enlace.enlaces_proprios_terrestres_meio,
      enlace.enlaces_proprios_terrestres_c_nominal,
      enlace.enlaces_proprios_terrestres_swap,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `enlaces_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-secondary">Enlaces</h1>
        <div className="space-x-4">
          <Link to="/enlaces/novo">
            <Button variant="outline">Novo Enlace</Button>
          </Link>
          <Button onClick={exportToCSV}>Exportar CSV</Button>
        </div>
      </div>

      <div className="glass-card p-6 rounded-lg">
        {isLoading ? (
          <p className="text-center py-4">Carregando...</p>
        ) : enlaces && enlaces.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CNPJ</TableHead>
                <TableHead>Ano</TableHead>
                <TableHead>Estação A</TableHead>
                <TableHead>Estação B</TableHead>
                <TableHead>ID Enlace</TableHead>
                <TableHead>Meio</TableHead>
                <TableHead>Cap. Nominal</TableHead>
                <TableHead>SWAP</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enlaces.map((enlace) => (
                <TableRow key={enlace.id}>
                  <TableCell>{enlace.cnpj}</TableCell>
                  <TableCell>{enlace.ano}</TableCell>
                  <TableCell>{enlace.estacao_a?.numestacao}</TableCell>
                  <TableCell>{enlace.estacao_b?.numestacao}</TableCell>
                  <TableCell>{enlace.enlaces_proprios_terrestres_id}</TableCell>
                  <TableCell>{enlace.enlaces_proprios_terrestres_meio}</TableCell>
                  <TableCell>
                    {enlace.enlaces_proprios_terrestres_c_nominal}
                  </TableCell>
                  <TableCell>{enlace.enlaces_proprios_terrestres_swap}</TableCell>
                  <TableCell>
                    <Link to={`/enlaces/editar/${enlace.id}`}>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            Nenhum enlace cadastrado
          </p>
        )}
      </div>
    </div>
  );
};

export default Enlaces;
