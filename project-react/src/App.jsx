import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // État des champs du formulaire
  const [form, setForm] = useState({
    nom: "",
    email: "",
    motDePasse: "",
    confirmationMotDePasse: "",
    imageProfil: "",
    termesAcceptees: false,
  });

  const [erreurs, setErreurs] = useState({});
  const [formValide, setFormValide] = useState(false);
  const [messageSucces, setMessageSucces] = useState("");

  // Validation des champs
  useEffect(() => {
    const validerFormulaire = () => {
      const nouvellesErreurs = {};
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const regexNom = /^[A-Za-z\s]+$/;

      // Validation du nom
      if (!form.nom || !regexNom.test(form.nom)) {
        nouvellesErreurs.nom = "Votre nom de doit pas contenir de chiffres";
      }

      // Validation de l'email
      if (!form.email || !regexEmail.test(form.email)) {
        nouvellesErreurs.email = "Email erroné";
      }

      // Validation du mot de passe
      if (form.motDePasse.length < 4) {
        nouvellesErreurs.motDePasse =
          "Votre mot de passe est trop court, il doit contenir minimum 4 caractères";
      }

      // Validation de la confirmation du mot de passe
      if (form.motDePasse !== form.confirmationMotDePasse) {
        nouvellesErreurs.confirmationMotDePasse =
          "Les mots de passe ne correspondent pas";
      }

      // Validation de l'URL de l'image
      if (
        !form.imageProfil ||
        (!form.imageProfil.startsWith("http://") &&
          !form.imageProfil.startsWith("https://"))
      ) {
        nouvellesErreurs.imageProfil =
          "L'URL doit débuter par http:// ou https://";
      }

      // Validation des CGU
      if (!form.termesAcceptees) {
        nouvellesErreurs.termesAcceptees = "Vous devez accepter les CGU";
      }

      setErreurs(nouvellesErreurs);
      setFormValide(Object.keys(nouvellesErreurs).length === 0);
    };

    validerFormulaire();
  }, [form]);

  // Gestion de l'input
  const gererChangement = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Générer le nom d'utilisateur à partir de l'email
  const genererNomUtilisateur = () => {
    return form.email.split("@")[0];
  };

  // Soumission du formulaire
  const gererSoumission = (e) => {
    e.preventDefault();

    if (formValide) {
      const donneesSoumission = {
        nom: form.nom,
        email: form.email,
        imageProfil: form.imageProfil,
        termesAcceptees: form.termesAcceptees,
        nomUtilisateur: genererNomUtilisateur(),
        soumisLe: new Date().toISOString(),
      };

      console.log(donneesSoumission);

      // Afficher le message de succès
      setMessageSucces("Inscription réussie !");
      setTimeout(() => {
        setMessageSucces("");
      }, 3000);

      // Réinitialiser le formulaire (optionnel)
      setForm({
        nom: "",
        email: "",
        motDePasse: "",
        confirmationMotDePasse: "",
        imageProfil: "",
        termesAcceptees: false,
      });
    }
  };

  return (
    <div className="App">
      <div className="profile-card">
        <img
          src={form.imageProfil || "https://via.placeholder.com/100"}
          alt="Profil"
        />
        <div className="profile-info">
          <h3>{form.nom || "Votre nom"}</h3>
          <p>{form.email || "Votre email"}</p>
          <p>{genererNomUtilisateur() || "Nom utilisateur"}</p>
        </div>
      </div>

      <form onSubmit={gererSoumission}>
        <label>
          Nom:
          <input
            type="text"
            name="nom"
            value={form.nom}
            onChange={gererChangement}
            className={erreurs.nom ? "invalid" : ""}
          />
          {erreurs.nom && <div className="error">{erreurs.nom}</div>}
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={gererChangement}
            className={erreurs.email ? "invalid" : ""}
          />
          {erreurs.email && <div className="error">{erreurs.email}</div>}
        </label>

        <label>
          Mot de passe:
          <input
            type="password"
            name="motDePasse"
            value={form.motDePasse}
            onChange={gererChangement}
            className={erreurs.motDePasse ? "invalid" : ""}
          />
          {erreurs.motDePasse && (
            <div className="error">{erreurs.motDePasse}</div>
          )}
        </label>

        <label>
          Confirmation du mot de passe:
          <input
            type="password"
            name="confirmationMotDePasse"
            value={form.confirmationMotDePasse}
            onChange={gererChangement}
            className={erreurs.confirmationMotDePasse ? "invalid" : ""}
          />
          {erreurs.confirmationMotDePasse && (
            <div className="error">{erreurs.confirmationMotDePasse}</div>
          )}
        </label>

        <label>
          URL de l'image de profil:
          <input
            type="url"
            name="imageProfil"
            value={form.imageProfil}
            onChange={gererChangement}
            className={erreurs.imageProfil ? "invalid" : ""}
          />
          {erreurs.imageProfil && (
            <div className="error">{erreurs.imageProfil}</div>
          )}
        </label>

        <label>
          <input
            type="checkbox"
            name="termesAcceptees"
            checked={form.termesAcceptees}
            onChange={gererChangement}
          />
          Accepter les CGU
          {erreurs.termesAcceptees && (
            <div className="error">{erreurs.termesAcceptees}</div>
          )}
        </label>

        <button type="submit" disabled={!formValide}>
          Soumettre
        </button>
      </form>

      {messageSucces && <div className="success">{messageSucces}</div>}
    </div>
  );
}

export default App;
