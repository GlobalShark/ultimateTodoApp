<?php  
include('sqlselectlink.php');  
		session_start();
        $email = mysqli_real_escape_string ($conn,$_POST["email"]);
        $password = mysqli_real_escape_string ($conn,$_POST["password"]);


        if(empty($email) || empty($password)){
        		echo "error0";
        }
        else{	
			$sql = "SELECT * FROM person WHERE email = '$email'";
			$result = mysqli_query($conn, $sql);
			$resultCheck = mysqli_num_rows($result);
			if($resultCheck < 1) {
				echo "<br><div class='alert alert-danger' role='alert'>
					        <strong>Oh snap! </strong><br> Incorrect Email </div>";
			}
			else{
				if($row = mysqli_fetch_assoc($result)){
					//dehashing
					if (password_verify($password, $row['password'])) {
						echo "success";
						$_SESSION['loggedIn'] = true;
						header('Location: about.php?home=About &login=success');
					}
					else{
								
				    echo "<br><div class='alert alert-danger' role='alert'>
					        <strong>Oh snap! </strong><br> Incorrect Email Or Password</div>";

					}
				}
			}      	
        }
?> 

<script>
	$("#password").val("");
	$(function(){
        $('.form-message').slideDown(2000);
        $('.form-message').slideUp(10000);
	});
</script>