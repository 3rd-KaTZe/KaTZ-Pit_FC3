function route_calc(a_dis, a_deg, t_dis, t_deg){

	// Fonction de calcul "addition de deux vecteurs"
	// Utilisée pour calculer Route Directe à partir de deux routes bulls
	// Argument, relèvement + distance pour chaque route (v_deg, v_dis)
	// Renvoi x_deg, x_dis, qui sont le cap et la distance direct

	// Calcul sur deux axe x,y
	var a_x = Math.cos(a_deg * Math.PI / 180) * a_dis
	var a_z = Math.sin(a_deg * Math.PI / 180) * a_dis
	//console.log("Avion-Nord = ",a_x )
	//console.log("Avion-Est = ",a_z )

	var t_x = Math.cos(t_deg * Math.PI / 180) * t_dis
	var t_z = Math.sin(t_deg * Math.PI / 180) * t_dis
	//console.log("target-Nord = ",t_x )
	//console.log("target-Est = ",t_z )

	var r_x = t_x - a_x
	var r_z = t_z - a_z
	//console.log("rx = ",r_x )	
	//console.log("rz = ",r_z )

	// Pythagore Distance = SQRT (x²+y²)
	var r_dis = Math.sqrt ( Math.pow(r_x,2) + Math.pow(r_z,2) )

	var r_ang = Math.atan( r_z / r_x ) * 180 / Math.PI

	// conversion des valeurs négative sur 360 degrés
	if (r_x < 0) {r_deg = r_ang + 180} else {r_deg = (r_ang + 360) % 360}

	return [r_dis, r_deg];
	

}

function time_format_0(t){
	
	// Fonction de formatage d'un temps en chaine str hh:mn:ss
	var h1 = (Math.floor(t / 36000))
	var h2 = (Math.floor((t % 36000) / 3600))
	var mn1 = Math.floor((t % 3600) / 600)
	var mn2 = Math.floor((t % 600) / 60)
	var sec1= Math.floor((t % 60) / 10)
	var sec2= Math.floor((t % 10))

	//console.log("hr:",hr,"mn:",mn,"sec:",sec)
	// stringout = toString(hr)+":"+toString(mn)+":"+toString(sec);
	stringout = h1+""+h2+":"+mn1+""+mn2+":"+sec1+""+sec2
	//console.log(stringout)

	return stringout

}
function time_format_1(t){
	
	// Fonction de formatage d'un temps en chaine str hh:mn:ss
	var h = (Math.floor(t / 3600))
	var mn1 = Math.floor((t % 3600) / 600)
	var mn2 = Math.floor((t % 600) / 60)
	var sec1= Math.floor((t % 60) / 10)
	var sec2= Math.floor((t % 10))
	

	//console.log("hr:",hr,"mn:",mn,"sec:",sec)
	// stringout = toString(hr)+":"+toString(mn)+":"+toString(sec);
	stringout = h+"h"+mn1+""+mn2+"\'"+sec1+""+sec2+"\"";
	//console.log(stringout)

	return stringout

}

function freq_format(frequence){
	// Fonction de formatage des fréquences sur aaa.bbb (avec zero significatifs)
	
	var FreqU = Math.floor(frequence/1000)
	var FreqD = frequence%1000

	var s_FreqU = FreqU.toString()
	var s_FreqD = FreqD.toString()
	
	var l_FreqU = s_FreqU.length
		if (l_FreqU <2) {s_FreqU = "00" + s_FreqU}
		else if (l_FreqU < 3) {s_FreqU = "0" + s_FreqU}
		else { s_FreqU = s_FreqU}
		
	var l_FreqD = s_FreqD.length
		if (l_FreqD <2) {s_FreqD = "00" + s_FreqD}
		else if (l_FreqD < 3) {s_FreqD = "0" + s_FreqD}
		else { s_FreqD = s_FreqD}
		
	var stringout = s_FreqU+"."+s_FreqD
		
	return stringout
}