import React, { useState } from "react";

const App = () => {
  // setup App
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmationMotDePasse, setConfirmationMotDePasse] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [cgu, setCgu] = useState(false);
  const [erreurs, setErreurs] = useState({});

  // validation de l'email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // verification of tha form is this is good or nah
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErreurs = validateForm();
    if (Object.keys(validationErreurs).length === 0) {
      console.log("Formulaire valide, traitement...");
    } else {
      setErreurs(validationErreurs);
    }
  };

  const validateForm = () => {
    const newErreurs = {};

    if (!/^[a-zA-Z]+$/.test(nom)) {
      newErreurs.nom =
        "Le nom est obligatoire et ne doit pas contenir de chiffres.";
    }
    if (!validateEmail(email)) {
      newErreurs.email = "Email invalide.";
    }
    if (motDePasse.length < 3) {
      newErreurs.motDePasse =
        "Le mot de passe doit contenir au moins 3 caractères.";
    }
    if (motDePasse !== confirmationMotDePasse) {
      newErreurs.confirmationMotDePasse =
        "La confirmation du mot de passe ne correspond pas.";
    }
    if (!/^https?:\/\//.test(urlImage)) {
      newErreurs.urlImage =
        "L'URL de l'image doit commencer par http:// ou https://.";
    }
    if (!cgu) {
      newErreurs.cgu = "Vous devez accepter les CGU.";
    }

    return newErreurs;
  };

  const handleChange = () => {
    setErreurs(validateForm());
  };

  const isFormValid =
    Object.keys(erreurs).length === 0 &&
    nom &&
    email &&
    motDePasse &&
    confirmationMotDePasse &&
    urlImage &&
    cgu;

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  };

  const cardStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "20px",
    marginBottom: "30px",
    backgroundColor: "#000000",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "600px",
  };

  const formContainerStyle = {
    width: "100%",
    maxWidth: "600px",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  const inputGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  };

  const inputStyle = {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <img
          src={urlImage || "placeholder.jpg"}
          alt="Profile"
          style={{
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            objectFit: "cover",
          }}
        />
        <div>
          <h2 style={{ margin: "0" }}>{nom || "Nom"}</h2>
          <p style={{ margin: "5px 0 0 0" }}>{email || "Email"}</p>
        </div>
      </div>

      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label>Nom:</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => {
                setNom(e.target.value);
                handleChange();
              }}
              style={inputStyle}
              className={erreurs.nom ? "error" : ""}
            />
            {erreurs.nom && <div className="error-message">{erreurs.nom}</div>}
          </div>

          <div style={inputGroupStyle}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleChange();
              }}
              style={inputStyle}
              className={erreurs.email ? "error" : ""}
            />
            {erreurs.email && (
              <div className="error-message">{erreurs.email}</div>
            )}
          </div>

          <div style={inputGroupStyle}>
            <label>Mot de passe:</label>
            <input
              type="password"
              value={motDePasse}
              onChange={(e) => {
                setMotDePasse(e.target.value);
                handleChange();
              }}
              style={inputStyle}
              className={erreurs.motDePasse ? "error" : ""}
            />
            {erreurs.motDePasse && (
              <div className="error-message">{erreurs.motDePasse}</div>
            )}
          </div>

          <div style={inputGroupStyle}>
            <label>Confirmation du mot de passe:</label>
            <input
              type="password"
              value={confirmationMotDePasse}
              onChange={(e) => {
                setConfirmationMotDePasse(e.target.value);
                handleChange();
              }}
              style={inputStyle}
              className={erreurs.confirmationMotDePasse ? "error" : ""}
            />
            {erreurs.confirmationMotDePasse && (
              <div className="error-message">
                {erreurs.confirmationMotDePasse}
              </div>
            )}
          </div>

          <div style={inputGroupStyle}>
            <label>URL de l'image de profil:</label>
            <input
              type="text"
              value={urlImage}
              onChange={(e) => {
                setUrlImage(e.target.value);
                handleChange();
              }}
              style={inputStyle}
              className={erreurs.urlImage ? "error" : ""}
            />
            {erreurs.urlImage && (
              <div className="error-message">{erreurs.urlImage}</div>
            )}
          </div>

          <div style={inputGroupStyle}>
            <label
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <input
                type="checkbox"
                checked={cgu}
                onChange={(e) => {
                  setCgu(e.target.checked);
                  handleChange();
                }}
              />
              J'accepte les CGU
            </label>
            {erreurs.cgu && <div className="error-message">{erreurs.cgu}</div>}
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            style={{
              padding: "10px 20px",
              backgroundColor: !isFormValid ? "#cccccc" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              // cursor: !isFormValid ? "not-allowed" : "pointer",
              // cursor: isFormValid ? "allowed" : "pointer",
              marginTop: "10px",
            }}
          >
            Soumettre
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
