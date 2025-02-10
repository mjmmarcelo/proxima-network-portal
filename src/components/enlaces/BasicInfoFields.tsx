
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface BasicInfoFieldsProps {
  form: UseFormReturn<any>;
}

export const BasicInfoFields = ({ form }: BasicInfoFieldsProps) => {
  return (
    <>
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
    </>
  );
};
