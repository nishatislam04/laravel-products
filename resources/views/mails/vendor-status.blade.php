<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Vendor Status Update</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px 0">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)">
            <!-- Header -->
            <tr>
              <td style="background-color: #4f46e5; color: #ffffff; text-align: center; padding: 20px 0; font-size: 24px; font-weight: bold">Vendor Status Update</td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 30px; color: #333333; font-size: 16px; line-height: 1.6">
                <p style="margin-top: 0">Hello {{ $user_name }},</p>

                @if ((string) $vendor_status === "approved")
                  <p style="background-color: #d1fae5; color: #065f46; padding: 15px; border-radius: 5px">
                    🎉 Congratulations! Your vendor "
                    <strong>{{ $vendor_name }}</strong>
                    " has been
                    <strong>approved</strong>
                    .
                  </p>
                @else
                  <p style="background-color: #fee2e2; color: #991b1b; padding: 15px; border-radius: 5px">
                    ⚠️ We are sorry. Your vendor "
                    <strong>{{ $vendor_name }}</strong>
                    " has been
                    <strong>rejected</strong>
                    .
                  </p>
                  <p>Please contact support for more details.</p>
                @endif

                <p>Thank you for being part of our platform!</p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #f9fafb; text-align: center; padding: 20px; color: #6b7280; font-size: 14px">
                &copy; {{ date("Y") }} Your Company Name. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
