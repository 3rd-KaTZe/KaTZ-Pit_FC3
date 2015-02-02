// --------------------------------------------------------------------
// Fonction de conversion/lecture des données recues
// --------------------------------------------------------------------


function dataread_split_2(data){
	// Fonction de lecture de deux données contenues dans une export_data_chaine de 8 chiffres ; bbbbaaaa
	// Les valeures réelles ont été encapsulé dans DCS export avec +5000
	// pour gestion zero et négatif, on enlève donc 5000
	//
	// Appel de la fonction sous la forme :
	// Valeur = dataread_split_2(data)
	// Nombre a = Valeur[0]
	// Nombre b = Valeur[1]
	
	var a = (data % 10000) - 5000	
	var b = (Math.floor (data / 10000)) - 5000
	
	//console.log("a= ",a)
	//console.log("b= ",b)
	
	return [a,b];

}

function dataread_posit(data,position){
	// Fonction de lecture d'une valeur 0-9, contenue dans une export_data_chaine de 8 chiffres
	// Les valeures réelles ont été encapsulé dans DCS export avec +5
	// pour gestion zero et négatif, on enlève donc 5
	// Appel de la fonction sous la forme :
	// Chiffre = dataread_posit(data,x)  où x est le xieme chiffre en partant de la droite (1 pour unité, 2 pour dizaine ...)
	
	var c = Math.floor (data % Math.pow(10,position) / Math.pow(10,position-1)) - 5 
	
	//console.log("c= ",c)
	
	return c;

}