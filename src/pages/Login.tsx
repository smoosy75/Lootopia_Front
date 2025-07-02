"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAuth, User, UserRole } from "@/context/AuthContext";
import { login as apiLogin } from "@/api/auth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const FormSchema = z.object({
  email: z
    .string()
    .email({ message: "Veuillez entrer une adresse e-mail valide." }),
  password: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
});

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await apiLogin(data.email, data.password);

      const user: User = {
        name: response.name || "Utilisateur",
        email: data.email,
        role: (response.role as UserRole) || "joueur", // cast forcé
        token: response.token,
      };

      login(user); // met à jour le contexte utilisateur
      navigate("/"); // redirige vers la page d’accueil
    } catch (error) {
      if (error instanceof Error) {
        alert("Échec de connexion : " + error.message);
      } else {
        alert("Une erreur inconnue est survenue.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#283541]">
      <Card className="w-full max-w-md bg-[#FAD99BCC] rounded-lg shadow-lg">
        <CardHeader className="text-center text-xl font-bold text-[#283541]">
          Connexion
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse e-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="exemple@domaine.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Votre mot de passe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[#283541] text-white hover:bg-[#1f2c37]"
              >
                Se connecter
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <p className="text-sm text-[#283541]">
            Pas encore de compte ?{" "}
            <Link to="/register" className="font-bold underline">
              Créer un compte
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
