function tambahCard(dataset){
	var longStrCard = '<div class="card konfigurasi">' +
	'<div class="card-header card-inverse card-primary mb-3">' +
	'Tabel Data ' + dataset +
	'</div>' +
	'<div class="card-block">' +
	'<blockquote class="card-blockquote" id="body'+dataset+'">'+
	'</blockquote>' +
	'</div>' +
	'</div>';

	$("#rootContainer").append(longStrCard);
	return true;
}

function cetakTabel(dataset){
	var tableStr = '<table class="table table-hover table-striped table-bordered h-50">' +
	'<thead>' +
	'<tr id="headerTable">' +
	'</tr>' +
	'</thead>' +
	'<tbody id="bodyTable">' +
	'</tbody>' +
	'</table>';
	$("#body"+dataset.namaDataset+"").append(tableStr);

	for(var i = 0; i < dataset.jmlData;i++){
		$("#bodyTable").append('<tr id="data'+i+'">');
		for(var y = 0; y <dataset.jmlAtrib; y++){
			if(i==0){
				$("#headerTable").append("<th>atribut"+(y+1)+"</th>");
			}
			$("#data"+i).append('<td>'+dataset.dataset[i][y]+'</td>');
		}
		$("#bodyTable").append("</tr>");
	}
}

function kmeanst(dataset){
	var dataAtrib = [];
	var arrayCentroid = [];

	for(var x = 0; x < dataset.jmlAtrib; x++){
		var arrayTunggal = [];
		for(var y = 0; y < dataset.jmlData; y++){
			arrayTunggal.push(dataset.dataset[y][x]);
		}
		dataAtrib.push(arrayTunggal);
	}
	console.log(dataAtrib);

	var arrayMax = cariMax(dataAtrib);
	var arrayMin = cariMin(dataAtrib);
	console.log("MAX VALUE PER ATRIBUT")
	console.log(arrayMax); //Array ini berisi nilai maximal masing2 atribut
	console.log("MIN VALUE PER ATRIBUT")
	console.log(arrayMin); //Array ini berisi nilai minimum masing2 atribut

	//PEMBANGIKTAN CENTROID
	//=============================================================
	for(var x = 0; x < dataset.jmlCentroid;x++){
		var arrayCentroidTunggal = [];
		for(var y = 0; y < dataset.jmlAtrib; y++){
			var random = ((Math.random() * (arrayMax[y]-arrayMin[y])) + arrayMin[y]);
			arrayCentroidTunggal.push(random);
		}
		arrayCentroid.push(arrayCentroidTunggal);
	}
	console.log("Koordinat Centroid : ");
	console.log(arrayCentroid); //Array ini berisi koordinat centroid random
	//=============================================================

	do{
	//PENGHITUNGAN JARAK ANTARA CENTROID DAN MASING MASING TITIK
	//=============================================================
	var arrayJarakSemua = [];
	for(var i = 0; i<dataset.jmlData; i++){
		var arrayJarakTunggal = [];
		arrayJarakTunggal.push(hitung(dataset.dataset[i],arrayCentroid));
		// console.log("JARAK PER DATA KE CENTROID");
		// console.log(arrayJarakTunggal);
		//arrayjaraktunggal akan berisi masing2 jarak node dan centroid
		//yang ada
		var minJarak = Math.min(...arrayJarakTunggal[0]);
		console.log("-------------------------");
		// console.log("JARAK");
		// console.log(minJarak);
		// console.log("ARRAYNYA");
		// console.log(arrayJarakTunggal[0]);
		var centroidTerpilih = arrayJarakTunggal[0].indexOf(minJarak);
		// console.log("CENTROID TERPILIH "+i);
		// console.log(centroidTerpilih);
		arrayJarakSemua.push([i,centroidTerpilih]); //push data ke array seluruhnya
	}
	// console.log("ARRAY BERISI INDEKS DATA DAN CENTROID PILIHNANNYA");
	// console.log(arrayJarakSemua);
	// console.log(arrayJarakSemua[0][0]);
	//=============================================================

	//PENGELOMPOKAN DATA PER CENTROID
	//=============================================================
	var arrayKelompok = [];
	for(var x = 0; x < dataset.jmlCentroid; x++){
		var arrayKTunggal = [];
		for(var y = 0; y < dataset.jmlData;y++){
			if(arrayJarakSemua[y][1] == x){
				arrayKTunggal.push(arrayJarakSemua[y][0])
			}			
		}
		arrayKelompok.push(arrayKTunggal);
	}
	console.log("INI ARRAY KELOMPOK");
	console.log(arrayKelompok); //INI ISINYA INDEKS YANG PUNYA KLAS ITU


	//CARI RATA RATA UNTUK CENTROID BARU
	//==============================================================
	if(dataset.namaDataset == "Iris"){
		var arrayRata = [];
		for(var x = 0; x < arrayKelompok.length; x++){
			var rerata1 = 0;
			var rerata2 = 0;
			var rerata3 = 0;
			var rerata4 = 0;

			var arrayTRata = [];
			for(var y = 0; y < arrayKelompok[x].length; y++){
				rerata1 += parseFloat(dataset.dataset[arrayKelompok[x][y]][0]);
				rerata2 += parseFloat(dataset.dataset[arrayKelompok[x][y]][1]);
				rerata3 += parseFloat(dataset.dataset[arrayKelompok[x][y]][2]);
				rerata4 += parseFloat(dataset.dataset[arrayKelompok[x][y]][3]);
			}
			rerata1 /= parseFloat(arrayKelompok[x].length);
			// console.log("TEST RATA RATA PEMBAGIAN");
			// console.log(rerata1);
			rerata2 /= parseFloat(arrayKelompok[x].length);
			rerata3 /= parseFloat(arrayKelompok[x].length);
			rerata4 /= parseFloat(arrayKelompok[x].length);

			arrayRata.push([rerata1,rerata2,rerata3,rerata4]);
		}
		// console.log("RATA RATA PER ATRIBUT");

		// console.log(arrayRata);
	}else if(dataset.namaDataset == "Ruspini"){
		var arrayRata = [];
		for(var x = 0; x < arrayKelompok.length; x++){
			var rerata1 = 0;
			var rerata2 = 0;

			var arrayTRata = [];
			for(var y = 0; y < arrayKelompok[x].length; y++){
				rerata1 += parseFloat(dataset.dataset[arrayKelompok[x][y]][0]);
				rerata2 += parseFloat(dataset.dataset[arrayKelompok[x][y]][1]);
			}
			rerata1 /= parseFloat(arrayKelompok[x].length);
			rerata2 /= parseFloat(arrayKelompok[x].length);

			arrayRata.push([rerata1,rerata2]);
		}
	}
	var arrayJarakCentroid = []
	for(var i = 0; i < dataset.jmlCentroid; i++){
		arrayJarakCentroid.push(hitungSen(arrayCentroid[i], arrayRata[i]));
	}	

	for(var i = 0; i<arrayJarakCentroid.length; i++){
		if(isNaN(arrayJarakCentroid[i])){
			arrayJarakCentroid[i] = 0;
		}
	}

	console.log("JARAK CENTROID LAMA DAN BARU");
	console.log(arrayJarakCentroid);
	console.log(arrayJarakCentroid[0]);
	arrayCentroid = [];
	arrayCentroid = arrayRata.slice();	

	console.log("CEK NAN");
	console.log(arrayJarakCentroid[0] >= 0.1);

	}while(arrayJarakCentroid[0] >= 0.00001);

	console.log("HASIL AKHIR CLUSTERING");
	console.log(arrayJarakSemua);
	updateTable(arrayJarakSemua);

}

function updateTable(arrayHasil){
	for(var i = 0; i < arrayHasil.length; i++){
		$("#data"+i).append('<td>'+arrayHasil[i][1]+'</td>');
	}
}

// 	function kmean(dataset){
// 		var dataAtrib = [];
// 		var arrayCentroid = [];
// 		var jarakCentroidBaru = 0;
// 		var jarakCentroidLama = 0;

// 		for(var x = 0; x < dataset.jmlAtrib; x++){
// 			var arrayTunggal = [];
// 			for(var y = 0; y < dataset.jmlData; y++){
// 				arrayTunggal.push(dataset.dataset[y][x]);
// 			}
// 			dataAtrib.push(arrayTunggal);
// 		}
// 		console.log(dataAtrib);

// 		var arrayMax = cariMax(dataAtrib);
// 		var arrayMin = cariMin(dataAtrib);
// 	console.log(arrayMax); //Array ini berisi nilai maximal masing2 atribut
// 	console.log(arrayMin); //Array ini berisi nilai minimum masing2 atribut

// 	for(var x = 0; x < dataset.jmlCentroid;x++){
// 		var arrayCentroidTunggal = [];
// 		for(var y = 0; y < dataset.jmlAtrib; y++){
// 			var random = ((Math.random() * arrayMax[y]) + arrayMin[y]).toFixed(2);
// 			arrayCentroidTunggal.push(random);
// 		}
// 		arrayCentroid.push(arrayCentroidTunggal);
// 	}
// 	console.log("Koordinat Centroid : ");
// 	console.log(arrayCentroid); //Array ini berisi koordinat centroid random

// 	// do{
// 		console.log("MIN JARAK");
// 		var arrayJarakSemua = [];
// 		for(var i = 0; i<dataset.jmlData; i++){
// 			var arrayJarakTunggal = [];
// 			arrayJarakTunggal.push(hitung(dataset.dataset[i],arrayCentroid));
// 			//arrayjaraktunggal akan berisi masing2 jarak node dan centroid
// 			//yang ada
// 			// console.log(arrayJarakTunggal);
// 			var minJarak = Math.min(...arrayJarakTunggal[0]);
// 			console.log("JARAK");
// 			console.log(minJarak);
// 			console.log("ARRAYNYA");
// 			console.log(arrayJarakTunggal[0]);
// 			var centroidTerpilih = arrayJarakTunggal[0].indexOf(minJarak);
// 			// console.log(centroidTerpilih);
// 			arrayJarakSemua.push([minJarak,centroidTerpilih]); //push data ke array seluruhnya
// 		}

// 		// console.log("Centroid Terpilih Masing Masing Titik : ");
// 		// console.log(arrayJarakSemua);

// 		for(var x = 0; x < dataset.jmlKelas; x++){
// 			var arrayFilter = []
// 			for(var y = 0; y < dataset.jmlData; y++){
// 				var arrayTunggalFilter = [];
// 				if(arrayJarakSemua[y][1]==(x+1)){
// 					arrayTunggalFilter.push(dataset.dataset[y]);
// 				}
// 			}
// 			arrayFilter.push(arrayTunggalFilter); //arrayFilter ini isinya adalah
// 			//definisi dari kelas baru atau kondisi centroid yang baru yang dipilih
// 			//oleh masing masing titik
// 			//untuk arrayFilter[0] ==> artinya kelas ke 1, memiliki member arrayFilter[0][xxxx]

// 		}

// 		// for(var x = 0; x < dataset.dataAtrib; x++){
// 		// 	var rataSeluruhAtrib = [];
// 		// 	for(var y = 0; y < dataset.jmlKelas; y++){
// 		// 		var rataPerAtrib = [];
// 		// 		for(var z =0; z < arrayFilter[y];z++){
// 		// 			var rataTunggal = [];
// 		// 			rataTunggal.push(arrayFilter[y][x]);//isinya nilai atribut ke x pada kelas ke y+1

// 		// 		}
// 		// 	}
// 		// }

// 		//DISINI NANTI HITUNG RATA RATA SELURUHNYA, LALU DIJADIKAN SEBAGAI
// 		//CENTROID
// 	// }while(Math.abs(jarakCentroidLama-jarakCentroidBaru)<0.01);
// }

function cariMax(dataAtrib){
	var arrayMax = [];
	for(var i = 0; i < dataAtrib.length; i++){
		arrayMax.push(Math.max(...dataAtrib[i]));
	}

	// console.log(arrayMax);
	return arrayMax;
}

function cariMin(dataAtrib){
	var arrayMin = [];
	for(var i = 0; i < dataAtrib.length; i++){
		arrayMin.push(Math.min(...dataAtrib[i]));
	}
	return arrayMin;
}

function hitungSen(sentroid1, sentroid2){
	var jarakNonRoot = 0;

	for(var i = 0; i < sentroid1.length; i++){
		jarakNonRoot += Math.pow((sentroid1[i] - sentroid2[i]),2);
	}
	var jarakRoot = Math.sqrt(jarakNonRoot);

	return jarakRoot;
}

function hitung(arrayTitik, arrayCentroid){
	var jarakNonRoot = 0;
	// console.log("TEST ARRAY CENTROID");
	// console.log(arrayCentroid);
	// console.log("TEST ARRAY TITIK");
	// console.log(arrayTitik);

	var arrayHitung = [];

	for(var h = 0; h < arrayCentroid.length; h++){
		// console.log("ITERASI PENGHITUNGAN"+h);
		jarakNonRoot = 0;
		for(var i = 0; i < arrayTitik.length-1; i++){
			jarakNonRoot += Math.pow((arrayTitik[i] - arrayCentroid[h][i]),2);
			// console.log(jarakNonRoot);
			// console.log(arrayTitik[i] + "-" + arrayCentroid[h][i]);
		}
		var jarakRoot = Math.sqrt(jarakNonRoot);
		arrayHitung.push(jarakRoot);
	}

	// console.log(arrayHitung);

	return arrayHitung;
}