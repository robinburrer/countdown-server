
<?php

// Function to send HTML email
function sendEmail($to, $subject, $message) {
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: myUser@burrer.de" . "\r\n"; // Replace with your email address or sender name

    // Load HTML template
    $htmlTemplate = file_get_contents('template.html');

    // Replace placeholders in the template with actual content
    // $htmlTemplate = str_replace('{{subject}}', $subject, $htmlTemplate);
    // $htmlTemplate = str_replace('{{message}}', $message, $htmlTemplate);
    $randomNumber = random_int(1, 10000);
    $htmlTemplate = str_replace('{{timeStamp}}', $randomNumber, $htmlTemplate);

    // Send the email
    mail($to, $subject, $htmlTemplate, $headers);
}

// Usage example
$to = 'robin@burrer.de'; // Replace with the recipient's email address
$subject = 'Carnival is soon'; // Replace with the email subject
$message = 'Offer ends soon'; // Replace with the email message

sendEmail($to, $subject, $message);

?>  