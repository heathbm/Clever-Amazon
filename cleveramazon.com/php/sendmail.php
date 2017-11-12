<?php

$secret = ''; // Your google capcha secret

function post_captcha($user_response) {
        $fields_string = $secret;
        $fields = array(
            'secret' => 'Your Secret',
            'response' => $user_response
        );
        foreach($fields as $key=>$value)
        $fields_string .= $key . '=' . $value . '&';
        $fields_string = rtrim($fields_string, '&');

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
        curl_setopt($ch, CURLOPT_POST, count($fields));
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, True);

        $result = curl_exec($ch);
        curl_close($ch);

        return json_decode($result, true);
    }

    if(isset($_POST['g-recaptcha-response'])) {

        $res = post_captcha($_POST['g-recaptcha-response']);

    if (!$res['success']) {
        // What happens when the reCAPTCHA is not properly set up
        echo 'reCAPTCHA error: Check to make sure your keys match the registered domain and are in the correct locations. You may also want to doublecheck your code for typos or syntax errors.';
    } else {
        // If CAPTCHA is successful...

        // Paste mail function or whatever else you want to happen here!
        echo '<br><p>CAPTCHA was completed successfully!</p><br>';
        sendMail();
    }
}

    function sendMail() {
            $host = '';
            $yourEmail = '';
            $port = '';

            ini_set("SMTP", $host);
            ini_set("sendmail_from", $youremail;

            $message = "New mail message was sent with the following mail setting:\r\nSMTP = " + $host + "\r\nsmtp_port = " + $youremail + "\r\nsendmail_from = " + $youremail;

            $headers = "From: " + $youremail;

            mail($youremail, "Testing", $message, $headers);
            echo "Check your email now....<BR/>";
    }
