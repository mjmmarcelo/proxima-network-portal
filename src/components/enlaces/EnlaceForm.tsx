
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MapDrawPath } from "@/components/MapDrawPath";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  cnpj: z.string().min(14, "CNPJ deve ter 14 dígitos"),
  ano: z.string().min(4, "Ano deve ter 4 dígitos"),
  estacao_a_id: z.string().min(1, "Estação A é obrigatória"),
  estacao_b_id: z.string().min(1, "Estação B é obrigatória"),
  enlaces_proprios_terrestres_id: z.string().min(1, "ID do enlace é obrigatório"),
  enlaces_proprios_terrestres_meio: z.enum(["FIBRA", "RADIO", "CABO"], {
    required_error: "Tipo de meio é obrigatório",
  }),
  enlaces_proprios_terrestres_c_nominal: z.string().min(1, "Capacidade nominal é obrigatória"),
  enlaces_proprios_terrestres_swap: z.string().min(1, "SWAP é obrigatório"),
  geometria_wkt: z.string().min(1, "Geometria WKT é obrigatória"),
  srid: z.string().min(1, "SRID é obrigatório"),
});

type FormValues = z.infer<typeof formSchema>;

export const EnlaceForm = () => {
  const navigate = useNavigate();
  const [wktPath, setWktPath] = useState("");
  
  const { data: stations, isLoading: isLoadingStations } = useQuery({
    queryKey: ["stations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cnpj: "",
      ano: new Date().getFullYear().toString(),
      estacao_a_id: "",
      estacao_b_id: "",
      enlaces_proprios_terrestres_id: "",
      enlaces_proprios_terrestres_meio: undefined,
      enlaces_proprios_terrestres_c_nominal: "",
      enlaces_proprios_terrestres_swap: "",
      geometria_wkt: "",
      srid: "4326",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const { error } = await supabase
        .from("links")
        .insert({
          ...values,
          geometria_wkt: wktPath || values.geometria_wkt,
        });

      if (error) throw error;
      
      toast.success("Enlace cadastrado com sucesso!");
      navigate("/enlaces");
    } catch (error) {
      console.error("Erro ao cadastrar enlace:", error);
      toast.error("Erro ao cadastrar enlace");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BasicInfoFields form={form} />
          <StationFields form={form} stations={stations} />
          <LinkDetailsFields form={form} />
        </div>

        <GeometryFields 
          form={form} 
          wktPath={wktPath} 
          setWktPath={setWktPath} 
        />

        <div className="flex justify-end space-x-4">
          <Button type="submit" className="bg-secondary hover:bg-secondary/90">
            Cadastrar Enlace
          </Button>
        </div>
      </form>
    </Form>
  );
};
