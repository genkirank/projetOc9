import { useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

// simulation d’un appel API (demi-seconde)
const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), 500);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorEmail("");
    setErrorMessage("");
    setSending(true);

    let hasError = false;

    if (!email.includes("@") || !email.includes(".")) {
      setErrorEmail("Email invalide");
      onError(new Error("Email invalide"));
      hasError = true;
    }

    if (message.trim() === "") {
      setErrorMessage("Le message ne peut pas être vide");
      onError(new Error("Message manquant"));
      hasError = true;
    }

    if (hasError) {
      setSending(false);
      return;
    }

    try {
      await mockContactApi();
      onSuccess();
    } catch (err) {
      onError(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
          <Field label="Nom" />
          <Field label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />

          <Field
            label="Email"
            placeholder="exemple@mail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorEmail && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>{errorEmail}</p>
          )}

          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>

        <div className="col">
          <Field
            label="Message"
            placeholder="Votre message..."
            type={FIELD_TYPES.TEXTAREA}
            onChange={(e) => setMessage(e.target.value)}
          />
          {errorMessage && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>{errorMessage}</p>
          )}
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
