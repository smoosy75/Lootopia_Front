"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

// Définir le schéma de validation avec zod
const FormSchema = z
  .object({
    fullName: z.string().min(2, {
      message: "Le nom complet doit contenir au moins 2 caractères.",
    }),
    email: z
      .string()
      .email({ message: "Veuillez entrer une adresse e-mail valide." }),
    password: z.string().min(6, {
      message: "Le mot de passe doit contenir au moins 6 caractères.",
    }),
    confirmPassword: z
      .string()
      .min(6, { message: "La confirmation du mot de passe est requise." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"], // Champ où afficher l'erreur
  });

function Register() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log("Données soumises :", data);

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Inscription réussie");
        // Rediriger ou afficher un message de succès
      } else {
        console.error("Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#283541]">
      <Card className="w-full max-w-md bg-[#FAD99BCC] rounded-lg shadow-lg">
        <CardHeader className="text-center text-xl font-bold text-[#283541]">
          Inscription
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Champ Nom complet */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre nom complet" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Champ Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse e-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="exemple@lootopia.com" {...field} />
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

              {/* Champ Confirmation du mot de passe */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer le mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirmez votre mot de passe"
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
                S'inscrire
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <p className="text-sm text-[#283541]">
            Vous avez déjà un compte ?{" "}
            <Link to="/login" className="font-bold underline">
              Se connecter
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Register;
