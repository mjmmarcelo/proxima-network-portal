
import { useState, useEffect } from "react";
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
import { format } from "date-fns";

const fetchEstacoes = async () => {
  const { data, error } = await supabase
    .from("stations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

const Estacoes = () => {
  const { data: estacoes, isLoading } = useQuery({
    queryKey: ["estacoes"],
    queryFn: fetchEstacoes,
  });

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

      <div className="glass-card p-6 rounded-lg">
        {isLoading ? (
          <p className="text-center py-4">Carregando...</p>
        ) : estacoes && estacoes.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CNPJ</TableHead>
                <TableHead>Ano</TableHead>
                <TableHead>Número</TableHead>
                <TableHead>Latitude</TableHead>
                <TableHead>Longitude</TableHead>
                <TableHead>Código IBGE</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>Data Abertura</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {estacoes.map((estacao) => (
                <TableRow key={estacao.id}>
                  <TableCell>{estacao.cnpj}</TableCell>
                  <TableCell>{estacao.ano}</TableCell>
                  <TableCell>{estacao.numestacao}</TableCell>
                  <TableCell>{estacao.lat}</TableCell>
                  <TableCell>{estacao.long}</TableCell>
                  <TableCell>{estacao.cod_ibge}</TableCell>
                  <TableCell>{estacao.endereco}</TableCell>
                  <TableCell>
                    {format(new Date(estacao.abertura), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    <Link to={`/estacoes/editar/${estacao.id}`}>
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
            Nenhuma estação cadastrada
          </p>
        )}
      </div>
    </div>
  );
};

export default Estacoes;
