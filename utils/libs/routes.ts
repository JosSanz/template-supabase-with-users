const Routes = {
    root: "/",
    signIn: "/sign-in",
    reset_password: '/auth/reset_password',
    home: "/system",
    user_profiles: {
        list: "/system/config/user-profiles",
        create: "/system/config/user-profiles/create",
        update: "/system/config/user-profiles/update",
        api: "/api/user-profiles"
    },
    users: {
        list: "/system/config/users",
        create: "/system/config/users/create",
        update: "/system/config/users/update",
        api: "/api/users"
    },
};

export default Routes;