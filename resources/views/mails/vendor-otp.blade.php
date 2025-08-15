<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Your Vendor OTP Code</title>
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family: Arial, sans-serif;">
    <table role="presentation" style="width:100%; border-collapse:collapse; background-color:#f3f4f6;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width:100%; max-width:600px; background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <!-- Header -->
                    <tr>
                        <td style="background-color:#2563eb; padding:20px; text-align:center; color:white; font-size:20px; font-weight:bold;">
                            Vendor Application Verification
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:30px; color:#111827; font-size:16px; line-height:1.5;">
                            <p style="margin:0 0 15px;">Hi {{ $userName }},</p>
                            <p style="margin:0 0 15px;">We received your request to create a vendor account. Please use the OTP code below to verify your email address:</p>

                            <p style="margin:20px 0; text-align:center;">
                                <span style="display:inline-block; padding:12px 24px; font-size:24px; font-weight:bold; color:#2563eb; border:2px solid #2563eb; border-radius:6px; letter-spacing:2px; background-color:#f9fafb;">
                                    {{ $otp }}
                                </span>
                            </p>

                            <p style="margin:0 0 15px;">This OTP will expire in <strong>{{ $otp_expires_at }}</strong>. Do not share it with anyone for security reasons.</p>
                            <p style="margin:0;">If you didn’t request this, please ignore this email.</p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color:#f3f4f6; padding:15px; text-align:center; color:#6b7280; font-size:12px;">
                            &copy; {{ date('Y') }} Your App Name. All rights reserved.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
