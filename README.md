# NextJs + Supabase template
This project is a template for a system that requires users management with roles and permits using NextJs as framework and Supabase as database and auth provider.

## Getting Started
### Clone the repository
On Github open the template repository and click the `Use this template` button to create a new repository. Then clone to your local machine.

### Supabase
Create and account on Supabase if you don't have one.

Create a new project and go to `Project Settings` -> `Data API` to get the connection keys.

Duplicate the file `.env.example` and rename as `.env.local` and paste the values for the keys from `Supabase`.

### Database
This project has a few tables by default, you can change the columns if you need.

```postgres
CREATE TABLE roles WITH (security_invoker = on) (
    id uuid not null default gen_random_uuid (),
    name character varying not null,
    active boolean not null default true,
    created_at timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    updated_at timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    constraint roles_pkey primary key (id),
    constraint roles_name_key unique (name)
);
```

```postgres
CREATE TABLE permits WITH (security_invoker = on) (
    id uuid not null default gen_random_uuid (),
    name character varying not null,
    key character varying not null,
    menu character varying not null,
    crud boolean not null,
    constraint permits_pkey primary key (id),
    constraint permits_key_key unique (key)
);
```

```postgres
CREATE TABLE role_permissions WITH (security_invoker = on) (
    role_id uuid not null,
    permission_id uuid not null,
    "create" boolean not null,
    "read" boolean not null,
    "update" boolean not null,
    "delete" boolean not null,
    constraint role_permissions_pkey primary key (role_id, permission_id),
    constraint role_permissions_permission_id_fkey foreign KEY (permission_id) references permits (id) on update CASCADE on delete CASCADE,
    constraint role_permissions_role_id_fkey foreign KEY (role_id) references roles (id) on update CASCADE on delete CASCADE
);
```

```postgres
CREATE TABLE user_roles WITH (security_invoker = on) (
    user_id uuid not null,
    role_id uuid not null,
    constraint user_roles_pkey primary key (user_id, role_id),
    constraint user_roles_role_id_fkey foreign KEY (role_id) references roles (id) on update CASCADE on delete CASCADE,
    constraint user_roles_user_id_fkey foreign KEY (user_id) references auth.users (id) on update CASCADE on delete CASCADE
);
```

This view is required for check the user permits mergin all the roles asigned.

```postgres
CREATE VIEW user_permissions WITH (security_invoker = on) AS
SELECT p.menu,
    p.key,
    rp."create",
    rp.read,
    rp.update,
    rp.delete,
    ur.user_id
FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    JOIN role_permissions rp ON r.id = rp.role_id
    JOIN permits p ON rp.permission_id = p.id;
```

> [!NOTE]
> To enable the connection to the database go to `Authentication` -> `Policies` and create the rules for each CRUD action on the tables.