# Vendor Apply

- a user can create only one vendor
- deleting the user delete the vendor
- and deleting the vendor will delete it's products
- when vendor created with apply request, initially the vendor status will be `need_otp`
- upon approval request, an email will be sent to the user with otp
- valid otp will change the vendor status to `pending`
- and then the pending vendor will be listings to the super admin for approval
- upon approval, we will send the success email to the user
- upon rejection, we will send the rejection email to the user
