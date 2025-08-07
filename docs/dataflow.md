# Data Flow of this application

here we will lay out our application architecture & data flow.

## Roles

- super admin
- vendor admin
- customer (user)

## Data Flow between user roles

1. super admin are static users. they have their own dedicated admin panel. where they can add vendor users & manage other users and do other stuffs.
2. to become a vendor user, a user need to apply for it & super-admin user will approve it
3. upon approving vendor user, they will get a vendor admin role
4. vendor user will have their own admin panel. where they can add staffs & products & orders & recive notifications etc
5. customer can place orders upon getting authenticated.

## implementing this architecture in UI

### super admin panel

1. manage vendors
2. manage users
3. recive notifications about orders

### vendor admin panel

1. manage staffs
2. manage products
3. manage orders
4. recive notifications about orders
