<!DOCTYPE html>
<html lang="en">
<head>
  <!-- REQUIRED METAS -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- CSS BOOTSTRAP -->
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/custom.css">
</head>
<body>
  <div class="container-fluid" id="rootContainer">
    <h4 class="text-center">Program Clustering Dataset Dengan Algoritma K-Mean</h4>
    <p class="text-center">Dimas Rizky H.P. - 2110141011 - 3 D4 IT A</p>

    <br>

    <div class="card konfigurasi"> 
      <div class="card-header card-inverse card-primary mb-3">
        Konfigurasi
      </div>
      <div class="card-block">
        <blockquote class="card-blockquote">
          <form method="post">
            <div class="form-group">
              <label for="inputCentroid">Jumlah Kelas (Centroid)</label>
              <input type="number" name="jmlCentroid" class="form-control" id="inputCentroid" placeholder="Masukan K">
            </div>
            <fieldset class="form-group">
              <legend>Pilih Dataset</legend>
              <div class="form-check">
                <label class="form-check-label">
                  <input type="radio" class="form-check-input" name="dataset" id="iris" value="Iris" checked>
                  Iris Dataset
                </label>
              </div>
              <div class="form-check">
                <label for="form-check-label">
                  <input type="radio" name="dataset" id="ruspini" value="Ruspini">
                  Ruspini Dataset
                </label>
              </div>
            </fieldset>
          </form>
          <button class="btn btn-primary" id="btnSubmit">K-Mean</button>  
        </blockquote>
      </div>
    </div>
    <br>
  </div>
  <!-- FILE JQUERY, TETHER, JS BOOTSTRAP -->
  <script src="js/jquery-3.1.1.min.js"></script>
  <script src="js/tether-1.4.0.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script type="text/javascript">
    $(function(){
      var jmlCentroid = 0;
      console.log("JS JALAN");

      $('#btnSubmit').click(function(){
        $.ajax({
          type: 'post',
          url: 'load-data.php',
          data: $('form').serialize(),
          success: function(dataset,status){
            console.log(status);
            dataset = JSON.parse(dataset);
            console.log(dataset);
            console.log(dataset.dataset.length);
            
            //======================================
            // console.log(dataset.jmlCentroid);
            // console.log(dataset.jmlAtrib);
            // console.log(dataset.jmlData);
            // console.log(dataset.jmlKelas);
            // console.log(dataset.namaDataset);
            //======================================
            tambahCard(dataset.namaDataset);
            cetakTabel(dataset);
            kmeanst(dataset);
          },
          error : function(textStatus, errorThrown){
            console.log(textStatus, errorThrown);
          }
        });
      });
    });

  </script>
  <script src="js/cetakTabel.js"></script>
</body>
</html>