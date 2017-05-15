<?php
	$jmlCentroid = $dataset = "";
	$return = array();
	$arrayDataset = array();

	if($_SERVER["REQUEST_METHOD"] == "POST"){
		$jmlCentroid = $_POST['jmlCentroid'];
		$file = fopen("dataset/".$_POST['dataset']."Dataset.csv","r");

		while (!feof($file)) {
			array_push($arrayDataset,fgetcsv($file));
		}
		fclose($file);
		
		if($jmlCentroid != null){
			$return['jmlCentroid'] = (int)$jmlCentroid;
		}

		if($arrayDataset != null){
			$return['dataset'] = $arrayDataset;
			$return['jmlAtrib'] = sizeof($arrayDataset[0])-1;
			$return['jmlData'] = $GLOBALS['jmlData'] = sizeof($arrayDataset);
			$return['jmlKelas'] = hitungkelas($arrayDataset);
			$return['namaDataset'] = $_POST['dataset'];
		}

		echo json_encode($return);
	}

	function hitungkelas($data){
		$posisikelas = sizeof($data[0])-1;
		$currentclass = $data[0][$posisikelas];
		$counter = 0;

		for($i = 0; $i<sizeof($data); $i++){
			if($data[$i][$posisikelas]!=$currentclass){
				$counter++;
				$currentclass = $data[$i][$posisikelas];
			}
		}

		return $counter+1;
	}
?>