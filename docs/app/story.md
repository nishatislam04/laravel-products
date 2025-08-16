# App Stories

## Vendor Apply

- a user can create only one vendor
- deleting the user delete the vendor
- and deleting the vendor will delete it's products
- when vendor created with apply request, initially the vendor status will be `need_otp`
- upon approval request, an email will be sent to the user with otp
- valid otp will change the vendor status to `pending`
- and then the pending vendor will be listings to the super admin for approval
- upon approval, we will send the success email to the user
- upon rejection, we will send the rejection email to the user

## vendor apply otp story

- when a user fill up the vendor-apply-form, we will send otp to that user email

- here is the otp db columns:

  - otp_length (6)
  - otp_code (6 digit) (hashed)
  - otp_status (incomplete, complete)
  - otp_expires_at (30 min) (current otp expires time)
  - otp_attempts (3) (current otp attempts)
  - otp_max_attempts (5) (maximum a single otp can be attempted)
  - otp_last_sent_at (when the last otp was sent)
  - otp_created_at (when the otp was created)
  - otp_resend_cooldown_seconds (300) (default 5 min) (when max attempts not hit)
  - otp_resend_cooldown_max_attempts_seconds (3600) (1 hr) (when max attempts hit)

- otp resend flow

  - if the user hit max attempts, then the resend otp unlock time will be `otp_resend_cooldown_max_attempts_seconds`
  - but if he does not hit max attempts, the resend otp will be available after `otp_resend_cooldown_seconds`

- otp success flow

  - if the user enter valid otp, then the otp status will be `complete`
  - and the vendor status will be `pending`
  - and the vendor will be listings to the super admin for approval
  - we will show an success modal on frontend & then redirect the user to public page

### add later

- implement rate limit with ip
