/*sortir le code output dans une autre page pour l'enregistrer apprès ! */
$( document ).ready(function() {
//javascript du boutton "Open the Code on a new page"
	  $("#generatecode").click(function() {
	  	//ouverture d'un nouvel onglet
          var newWindow = window.open("");
          var body = newWindow.document.body;
          var text = "innerText" in body ? "innerText" : "textContent";

          // l'identifiant "mon-code" permet de récupérer le texte contenu dans la balise html concernée
          body[text] = document.getElementById("mon-code").textContent;
          });

});