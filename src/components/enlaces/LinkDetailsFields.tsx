
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface LinkDetailsFieldsProps {
  form: UseFormReturn<any>;
}

export const LinkDetailsFields = ({ form }: LinkDetailsFieldsProps) => {
  return (
    <>
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
    </>
  );
};
