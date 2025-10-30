import { Button, TextInput, PasswordInput, Stack } from "@mantine/core";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const REGISTRO = z.object({
  username: z.string().min(5, "El usuario es obligatorio"),
  contrasena: z.string().min(5, "La contraseña es obligatoria"),
  confirmarContrasena: z.string().min(5, "Confirma tu contraseña"),
}).refine((data) => data.contrasena === data.confirmarContrasena, {
  message: "Las contraseñas no coinciden",
  path: ["confirmarContrasena"],
});

type FormValue = z.infer<typeof REGISTRO>;

interface FormularioRegistroProps {
  onSubmit: (username: string, contrasena: string) => void;
  onCancel: () => void;
}

export default function FormularioRegistro({ onSubmit, onCancel }: FormularioRegistroProps) {
  const form = useForm<FormValue>({
    resolver: zodResolver(REGISTRO),
    defaultValues: {
      username: "",
      contrasena: "",
      confirmarContrasena: ""
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
          placeholder="Crea una contraseña"
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
        <PasswordInput
          label="Confirmar Contraseña"
          placeholder="Repite la contraseña"
          {...form.register("confirmarContrasena")}
          error={form.formState.errors.confirmarContrasena?.message}
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
            <span style={{ color: "#fff" }}>Registrarse</span>
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
