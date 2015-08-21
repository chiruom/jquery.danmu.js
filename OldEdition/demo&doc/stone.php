<?php 
header('Content-type:text/html;charset=utf8');
$conn = @ mysql_connect("localhost", "root", "") or die("datebase can`t been connected");
mysql_select_db("danmu", $conn);
mysql_query("set names 'utf8'"); //

// function htmtocode($content) {
// 	$content = str_replace("\n", "<br>", str_replace(" ", "&nbsp;", $content));
// 	return $content;
// }

// // $c=$_GET['c'];
// if($c =="insert"){




// }
// elseif($c=="query") {

// $P="SELECT * FROM `danmu` ";
// $queryp=mysql_query($P);
// }
// else {


// }

$danmu=$_POST['danmu'];
//$sql="INSERT INTO `danmu` VALUES ('".$danmu."')";
$sql="INSERT INTO `danmu` VALUES ('".$danmu."','')";
$query=mysql_query($sql); 
//echo $danmu;
echo $danmu;

?>
