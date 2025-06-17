"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

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
      email: "admin@demo.com",
      password: "password123",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    // Simule différents rôles selon l'email
    let user = null;
    if (data.email === "admin@demo.com" && data.password === "password123") {
      user = {
        name: "Admin Demo",
        email: data.email,
        role: "admin",
      } as const;
    } else if (
      data.email === "orga@demo.com" &&
      data.password === "password123"
    ) {
      user = {
        name: "Orga Demo",
        email: data.email,
        role: "organisateur",
      } as const;
    } else if (
      data.email === "joueur@demo.com" &&
      data.password === "password123"
    ) {
      user = {
        name: "Joueur Demo",
        email: data.email,
        role: "joueur",
      } as const;
    } else if (
      data.email === "pro@demo.com" &&
      data.password === "password123"
    ) {
      user = {
        name: "Pro Demo",
        email: data.email,
        role: "pro",
      } as const;
    }

    if (user) {
      login(user);
      navigate("/");
    } else {
      alert("Identifiants invalides !");
    }
  };

  // Pour utiliser un vrai backend, décommente et adapte ce code :
  // const onSubmit = async (data: z.infer<typeof FormSchema>) => {
  //   try {
  //     const response = await fetch("http://localhost:5000/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //
  //     if (response.ok) {
  //       // On suppose que le backend renvoie { name, email, role }
  //       const user = await response.json();
  //       login(user); // Stocke l'utilisateur dans le contexte
  //       navigate("/");
  //     } else {
  //       alert("Identifiants invalides !");
  //     }
  //   } catch (error) {
  //     alert("Erreur réseau : " + error);
  //   }
  // };  //   console.log("Données soumises :", data);

  //   try {
  //     const response = await fetch("http://localhost:5000/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log("Connexion réussie :", result);
  //     } else {
  //       console.error("Erreur lors de la connexion :", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Erreur réseau :", error);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#283541]">
      <Card className="w-full max-w-md bg-[#FAD99BCC] rounded-lg shadow-lg">
        <CardHeader className="text-center text-xl font-bold text-[#283541]">
          Connexion
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Champ Email */}
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

              {/* Champ Mot de passe */}
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
