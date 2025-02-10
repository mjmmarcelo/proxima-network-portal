
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
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
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  cnpj: z.string().min(14, "CNPJ deve ter 14 dígitos"),
  ano: z.string().min(4, "Ano deve ter 4 dígitos"),
  numestacao: z.string().min(1, "Número da estação é obrigatório"),
  lat: z.string().min(1, "Latitude é obrigatória"),
  long: z.string().min(1, "Longitude é obrigatória"),
  cod_ibge: z.string().min(1, "Código IBGE é obrigatório"),
  endereco: z.string().min(1, "Endereço é obrigatório"),
  abertura: z.string().min(1, "Data de abertura é obrigatória"),
});

const NovaEstacao = () => {
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cnpj: "",
      ano: new Date().getFullYear().toString(),
      numestacao: "",
      lat: "",
      long: "",
      cod_ibge: "",
      endereco: "",
      abertura: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await supabase
        .from("stations")
        .insert({
          ...values
        });
      
      if (error) throw error;
      
      toast.success("Estação cadastrada com sucesso!");
      navigate("/estacoes");
    } catch (error) {
      console.error("Erro ao cadastrar estação:", error);
      toast.error("Erro ao cadastrar estação");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Nova Estação</h1>
        <div className="space-x-4">
          <Link to="/estacoes">
            <Button variant="outline">Voltar</Button>
          </Link>
          <Link to="/">
            <Button variant="outline">Início</Button>
          </Link>
        </div>
      </div>

      <div className="glass-card p-6 rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o CNPJ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ano"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ano</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numestacao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número da Estação</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o número da estação" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        placeholder="Digite a latitude"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="long"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        placeholder="Digite a longitude"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cod_ibge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código IBGE</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o código IBGE" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endereco"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o endereço completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="abertura"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Abertura</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Cadastrar Estação
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NovaEstacao;
