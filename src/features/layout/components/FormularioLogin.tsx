import { Button, TextInput, PasswordInput, Stack } from "@mantine/core";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const LOGIN = z.object({
  username: z.string().min(5, "El usuario es obligatorio"),
  contrasena: z.string().min(5, "La contraseña es obligatoria"),
});

type FormValue = z.infer<typeof LOGIN>;

interface FormularioLoginProps {
  onSubmit: (username: string, contrasena: string) => void;
  onCancel: () => void;
}


export default function FormularioLogin({ onSubmit, onCancel }: FormularioLoginProps) {
  const form = useForm<FormValue>({
    resolver: zodResolver(LOGIN),
    defaultValues: {
      username: "",
      contrasena: ""
    },
    mode: "onChange"
  });

  const submitForm = (data: FormValue) => {
    onSubmit(data.username, data.contrasena);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(submitForm)}>
      <Stack gap="md">
        <TextInput
          label="Usuario"
          placeholder="Ingresa tu usuario"
          {...form.register("username")}
          error={form.formState.errors.username?.message}
          styles={{
            label: {
              color: "var(--color-secondary-700)",
              fontWeight: 600
            },
            input: {
              borderColor: "var(--color-secondary-600)",
              backgroundColor: "#fff",
              color: "var(--color-secondary-800)"
            }
          }}
        />
        <PasswordInput
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          {...form.register("contrasena")}
          error={form.formState.errors.contrasena?.message}
          styles={{
            label: {
              color: "var(--color-secondary-700)",
              fontWeight: 600
            },
            input: {
              borderColor: "var(--color-secondary-600)",
              backgroundColor: "#fff",
              color: "var(--color-secondary-800)"
            }
          }}
        />
        <Stack gap="sm" mt="md">
          <Button
            type="submit"
            fullWidth
            style={{
              backgroundColor: "var(--color-secondary-600)",
              border: "none",
              color: "#fff",
              fontWeight: 600,
              boxShadow: "0 2px 8px 0 rgba(44,82,146,0.10)"
            }}
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            loading={form.formState.isSubmitting}
          >
            <span style={{ color: "#fff" }}>Iniciar Sesión</span>
          </Button>
          <Button
            variant="outline"
            fullWidth
            onClick={onCancel}
            style={{
              borderColor: "var(--color-secondary-600)",
              color: "var(--color-secondary-700)",
              backgroundColor: "#fff",
              fontWeight: 600
            }}
          >
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}