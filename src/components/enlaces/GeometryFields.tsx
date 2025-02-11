
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MapDrawPath } from "@/components/MapDrawPath";
import { UseFormReturn } from "react-hook-form";

interface GeometryFieldsProps {
  form: UseFormReturn<any>;
  wktPath: string;
  setWktPath: (path: string) => void;
}

export const GeometryFields = ({ form, wktPath, setWktPath }: GeometryFieldsProps) => {
  return (
    <div className="w-full space-y-4">
      <FormField
        control={form.control}
        name="geometria_wkt"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Geometria WKT</FormLabel>
            <FormControl>
              <div className="space-y-4">
                <Input 
                  placeholder="Digite a geometria WKT ou use o mapa abaixo" 
                  {...field}
                  value={wktPath || field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    setWktPath(e.target.value);
                  }}
                />
                <div className="h-[400px] w-full rounded-lg overflow-hidden border">
                  <MapDrawPath 
                    onPathChange={setWktPath} 
                    initialWkt={field.value || wktPath}
                  />
                </div>
              </div>
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
  );
};
