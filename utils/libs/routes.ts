const Routes = {
    root: "/",
    signIn: "/sign-in",
    home: "/system",
    user_profiles: {
        list: "/system/config/user-profiles",
        create: "/system/config/user-profiles/create",
        update: "/system/config/user-profiles/update",
        api: "/api/user-profiles"
    },
    users: {
        list: "/system/users",
        create: "/system/users/create",
        update: "/system/users/update"
    },
};

export default Routes;