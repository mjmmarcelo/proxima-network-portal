
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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

const NovoEnlace = () => {
  // TODO: Replace with actual stations data from backend
  const mockStations = [
    { id: "1", nome: "Estação 1" },
    { id: "2", nome: "Estação 2" },
    { id: "3", nome: "Estação 3" },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
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
      srid: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // TODO: Implementar integração com backend
    console.log(values);
    toast.success("Enlace cadastrado com sucesso!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-secondary">Novo Enlace</h1>
        <Link to="/enlaces">
          <Button variant="outline">Voltar</Button>
        </Link>
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
                name="estacao_a_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estação A</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a estação A" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockStations.map((station) => (
                          <SelectItem key={station.id} value={station.id}>
                            {station.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="estacao_b_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estação B</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a estação B" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockStations.map((station) => (
                          <SelectItem key={station.id} value={station.id}>
                            {station.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enlaces_proprios_terrestres_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID do Enlace</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o ID do enlace" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enlaces_proprios_terrestres_meio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Meio</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de meio" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="FIBRA">FIBRA</SelectItem>
                        <SelectItem value="RADIO">RADIO</SelectItem>
                        <SelectItem value="CABO">CABO</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enlaces_proprios_terrestres_c_nominal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacidade Nominal</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite a capacidade nominal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enlaces_proprios_terrestres_swap"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SWAP</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o SWAP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="geometria_wkt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Geometria WKT</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite a geometria WKT" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="srid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SRID</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o SRID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="submit" className="bg-secondary hover:bg-secondary/90">
                Cadastrar Enlace
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NovoEnlace;
