<!DOCTYPE html>
<html>
<head>
<title>Email Form</title>
</head>
<body>
    <?php
    // Function to send HTML email
    function sendEmail($to, $subject, $message) {
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: testMailer@burrer.de" . "\r\n"; // Replace with your email address or sender name

        // Load HTML template
        $htmlTemplate = file_get_contents('template.html');
   

        // Replace placeholders in the template with actual content
        $randomNumber = random_int(1, 10000);
        $htmlTemplate = str_replace('{{timeStamp}}', $randomNumber, $htmlTemplate);

        // Send the email
        mail($to, $subject, $htmlTemplate, $headers);
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Retrieve the email address submitted in the form
        $email = $_POST['email'];
        $code = $_POST['code'];

        if ($code === ''){
             // Email parameters
            $to = $email; // Recipient's email address
            $subject = 'Wann ist der 11.11'; // Email subject
            $message = ''; // Email message

            // Call the sendEmail() function
            sendEmail($to, $subject, $message);

            // Display a success message to the user
            echo 'Email sent successfully!';
        } else {
            echo 'wrong code!';
        }
       
    }
    ?>

    <h2>Send Email</h2>
    <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <br>
        <br>
        <label for="code">Password:</label>
        <input type="password" id="code" name="code" required>
        <br><br>
        <input type="submit" value="Send Email">
    </form>
</body>
</html>