<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>
	<div class="header">
		<div class="driller">Driller</div>
	</div>
    <div class="sisu">
	    <h1>Drill Your Typing</h1>
	    <div class="timer">
		    <div id="mins_secs">00:00</div>
	    </div>
	    <div id="question" class="question"></div>
	    <input type="text" id="typing-area" class="answer">
	    <div id="result"></div>
	    <br>
	    <div id="counters"></div>
	    <br>
	    <button id="start" class="start">START</button>
	    <br>
	    <br>
		<form action="upload.php" method="post" enctype="multipart/form-data">
			Vali JSON formaadis ülesanne:
			<input type="file" name="fileToUpload" id="fileToUpload">
			<input type="submit" value="Lae üles" name="submit">
		</form>
		<?php 
			$dirpath = "files";
			$filenames = "";
			if (is_dir($dirpath)) {
				$files = opendir($dirpath);
				if ($files) {
					while (($filename = readdir($files)) != false) {
						if ($filename != "." && $filename != "..") {
							$filenames = $filenames."<option>$filename</option>";
						}
					}
				}
			}
		?>
		<select id="fileSelect"><?php echo $filenames; ?></select>
		<button id="fileButton">Vali ülesande fail</button>
    	</div>
	<script src="app.js"></script>
	<script src="timer.js"></script>
</body>

</html>
