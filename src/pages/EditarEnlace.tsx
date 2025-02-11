
import { Button } from "@/components/ui/button";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EnlaceForm } from "@/components/enlaces/EnlaceForm";

const EditarEnlace = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: enlace, isLoading } = useQuery({
    queryKey: ["enlace", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("links")
        .select(`
          *,
          estacao_a:stations!links_estacao_a_id_fkey(numestacao),
          estacao_b:stations!links_estacao_b_id_fkey(numestacao)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Carregando dados do enlace...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-secondary">Editar Enlace</h1>
        <Link to="/enlaces">
          <Button variant="outline">Voltar</Button>
        </Link>
      </div>

      <div className="glass-card p-6 rounded-lg">
        <EnlaceForm initialData={enlace} mode="edit" />
      </div>
    </div>
  );
};

export default EditarEnlace;
