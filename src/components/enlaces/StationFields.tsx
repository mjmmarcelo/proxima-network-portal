
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface StationFieldsProps {
  form: UseFormReturn<any>;
  stations: any[] | undefined;
}

export const StationFields = ({ form, stations }: StationFieldsProps) => {
  return (
    <>
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
                {stations?.map((station) => (
                  <SelectItem key={station.id} value={station.id}>
                    {`${station.numestacao} - ${station.endereco}`}
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
                {stations?.map((station) => (
                  <SelectItem key={station.id} value={station.id}>
                    {`${station.numestacao} - ${station.endereco}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
