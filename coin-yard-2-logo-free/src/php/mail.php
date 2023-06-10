<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

//Load Composer's autoloader
// require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);


$phone      = $_POST['userPhone'];

try {
    //Server settings
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                       //Enable verbose debug output
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};
    // $mail->isSMTP();                                             //Send using SMTP
    $mail->CharSet = 'UTF-8';
    $mail->SMTPAuth   = true;                                       //Enable SMTP authentication

    $mail->Host       = 'smtp.yandex.ru';                             //Set the SMTP server to send through
    $mail->Username   = 'd.monetniy@yandex.ru';                       //SMTP username
    $mail->Password   = 'kkuhpupqtsgwbhus';                     //SMTP password

    // $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;             //Enable implicit TLS encryption

    $mail->SMTPSecure = 'ssl';                                      //Enable implicit TLS encryption
    $mail->Port       = 465;                                        //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    


    //Recipients
    $mail->setFrom('d.monetniy@yandex.ru', 'Европейский Монетный Двор');
    //Add a recipient              
    $mail->addAddress('to.pavel.box@gmail.com');                        



    //Content
    $mail->isHTML(true);                                            //Set email format to HTML
    $mail->Subject = 'Заявка с сайта "Европейский Монетный Двор"';
    $mail->Body    =    
                    "<b>Телефон: </b>{$phone}";
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';






   

    $mail->isSMTP();
    if ($mail->send()) {
        $result = "success"; 
    } else {
        $result = "error";
    }
    

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);
?>