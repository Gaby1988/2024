import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function LeagalNoticePage() {
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/sign-up");
  };

  return (
    <div className="page-content">
      <h2>Conditions d’utilisation</h2>
      <div className="scrolling-container">
        <p>
          ARTICLE 1 : Les présentes Conditions Générales d’Utilisation ont pour
          objet l’encadrement juridique des modalités de mise à disposition des
          services du site www.inovin.fr et leur utilisation par « l’Utilisateur
          ». Les conditions générales d’utilisation doivent être acceptées par
          tout Utilisateur souhaitant accéder au site. Elles constituent le
          contrat entre le site et l’Utilisateur. L’accès au site par
          l’Utilisateur signifie son acceptation des présentes conditions
          générales d’utilisation.
        </p>
        <br />
        <p>
          ARTICLE 2 : Objet des Conditions Générales d’Utilisation & acceptation
          <br />
          Les présentes conditions générales d’utilisation (ci-après les « CGU
          ») ont pour objet de fixer les conditions d’utilisation des services
          proposés par le site www.inovin.fr (ci-après le « Site »). Les CGU
          s’appliquent à toute déclinaison ou extension sur les réseaux sociaux
          existants et à venir. Toute personne ayant accès au Site, quels qu’en
          soient sa qualité (particulier ou professionnel), l’objet et la
          finalité et son accès et/ou l’utilisation des services proposés est un
          utilisateur. Le "membre" est présumé connaître et accepter, sans
          réserve, l’ensemble des CGU qui lui sont applicables du seul fait de
          sa connexion au Site. Les CGU s’appliquent concomitamment à la Charte
          de protection des données personnelles.
        </p>
        <br />
        <p>
          ARTICLE 3 : Objet du site
          <br />
          Ce Site est une application à destination des "membres" et de
          l"administrateur" leur permettant de participer à l'atelier "Atelier
          je crée mon vin", animé par l'entreprise Inovin, dont le représentant
          légal est Monsieur Cédric Boriat. Le but de l'application est
          d'accompagner la dégustation, suggérer des préférences gustatives
          autour du vin, proposer une recette d'assemblage de cépages,
          enregistrer la-dite recette et mettre à disposition des fiches de vins
          existants dans le commerce. Il est réalisé conformément aux
          dispositions des articles L. 5122-1 et suivants du Code de la
          consommation.
        </p>
      </div>
      <div className="btn-home">
        <Button text="Retour" onClick={backToHome} id="error-page-btn" />
      </div>
    </div>
  );
}
export default LeagalNoticePage;
