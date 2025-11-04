import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Form is created", () => {
  it("affiche les champs du formulaire", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("affiche des erreurs si les champs sont invalides", async () => {
      const onError = jest.fn();
      const onSuccess = jest.fn();

      render(<Form onSuccess={onSuccess} onError={onError} />);

      // clique sur le bouton sans rien remplir
      const button = screen.getByRole("button", { name: /Envoyer/i });
      fireEvent.click(button);

      // on attend que les messages d’erreur apparaissent
      await waitFor(() => {
        expect(screen.getByText(/Email invalide/i)).toBeInTheDocument();
        expect(screen.getByText(/Le message ne peut pas être vide/i)).toBeInTheDocument();
      });

      // le succès ne doit pas être appelé
      expect(onSuccess).not.toHaveBeenCalled();
      expect(onError).toHaveBeenCalled();
    });

    it("appelle onSuccess si le formulaire est valide", async () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();

      render(<Form onSuccess={onSuccess} onError={onError} />);

      // on remplit les champs requis
      fireEvent.change(screen.getByPlaceholderText(/exemple@mail.com/i), {
        target: { value: "test@mail.com" },
      });

      fireEvent.change(screen.getByPlaceholderText(/Votre message/i), {
        target: { value: "Hello test" },
      });

      // on clique sur envoyer
      const button = screen.getByRole("button", { name: /Envoyer/i });
      fireEvent.click(button);

      // on attend que le succès soit appelé
      await waitFor(() => expect(onSuccess).toHaveBeenCalled());
      expect(onError).not.toHaveBeenCalled();
    });
  });
});
