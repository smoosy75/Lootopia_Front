import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const NewsletterSchema = z.object({
  email: z
    .string()
    .email({ message: "Veuillez entrer une adresse e-mail valide." }),
  consent: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les conditions pour vous inscrire.",
  }),
});

function Footer() {
  const form = useForm<z.infer<typeof NewsletterSchema>>({
    resolver: zodResolver(NewsletterSchema),
    defaultValues: {
      email: "",
      consent: false,
    },
  });

  const onSubmit = (data: z.infer<typeof NewsletterSchema>) => {
    console.log("Adresse e-mail soumise :", data);
  };

  return (
    <footer className="bg-gray-200 text-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Informations */}
          <div>
            <h3 className="font-bold text-lg mb-4">INFORMATIONS</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:underline">
                  Qui sommes-nous ?
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contactez-nous
                </Link>
              </li>
            </ul>
          </div>

          {/* À propos */}
          <div>
            <h3 className="font-bold text-lg mb-4">À PROPOS</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/legal" className="hover:underline">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>

          {/* Chasses */}
          <div>
            <h3 className="font-bold text-lg mb-4">CHASSES</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/discoveries" className="hover:underline">
                  Découvertes
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              S'INSCRIRE AUX NEWSLETTERS
            </h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Champ Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Votre adresse e-mail"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Case à cocher */}
                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          id="newsletter"
                          checked={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          ref={field.ref}
                          className="mt-1"
                        />
                        <label htmlFor="newsletter" className="text-sm">
                          En validant votre inscription, vous acceptez que
                          LOOTOPIA utilise votre adresse email dans le but de
                          vous envoyer notre lettre d'informations.
                        </label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Bouton Envoyer */}
                <Button
                  type="submit"
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
                  Envoyé
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-400 pt-4 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-600">© Lootopia 2025</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter
                className="text-gray-600 hover:text-gray-800"
                size={24}
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram
                className="text-gray-600 hover:text-gray-800"
                size={24}
              />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook
                className="text-gray-600 hover:text-gray-800"
                size={24}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
