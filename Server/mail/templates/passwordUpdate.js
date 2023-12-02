exports.passordUpdated = (email, name) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Passowrd Update Confirmation</title>
        <style>
            body{
                background-color:#ffffff;
                font-family: Arial, sans-serifl;
                font-size:16px;
                line-height:1.4;
                color:#333333;
                margin:0;
                padding:0;
            }

            .container{
                max-width:600px;
                margin:0 auto;
                padding:20px;
                text-align:center;
            }

            .logo{
                max-width:200px;
                margin-bottom:20px;
            }

            .message{
                font-size:18px;
                font-weight:bold;
                margin-bottom:20px;
            }

            .body{
                font-size:16px;
                margin-bottom:20px;
            }

            .support{
                font-size:14px;
                color:#999999;
                margin-top:20px;
            }

            .highlight{
                font-weight:bold;
            }

        </style>

    </head>

    <body>
            <div class="conatiner">
            <a href=""><img class="logo" src="" alt=""></a>
            <div class="message">Password update confirmation</div>
            <div class="body">
                <p>Hey ${name},</p>
                <p>Your password has been successfully updated for the email <span class="highlight">${email}</span></p>
                <p>If you did not make this request please contact us immediately to secure Your account</p>
            </div>
            <div class="support">If you have any questions or need personal assistance,please feel free to reach at
                at
                <a href=""></a>. We are here to help
            </div>
        </div>
    </body>
    </html>`;
};

