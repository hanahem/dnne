$( document ).ready(function() {
	//javascript du boutton "Save the Code on a file.txt"
	$("#generatefile").click(function() {
		//récupération du contenant de la balise html à l'identifiant "mon-code"
		var textToSave = document.getElementById("mon-code").textContent;

		var hiddenElement = document.createElement('a');
		//enregistrement du code dans un fichier .txt
		hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
		hiddenElement.target = '_blank';
		hiddenElement.download = 'myCode.txt';
		hiddenElement.click();
	});
});