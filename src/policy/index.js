import { AbilityBuilder, Ability } from "@casl/ability";

const policies = {
    admin(user, {can}) {
        can("view", "Patient");
        can("create", "Patient", {user_id: user.username});
        can("read", "Patient", {user_id: user.username});
        can("update", "Patient", {user_id: user.username});
        can("delete", "Patient", {user_id: user.username});
        can("view", "Polyclinic");
        can("create", "Polyclinic", {user_id: user.username});
        can("read", "Polyclinic", {user_id: user.username});
        can("update", "Polyclinic", {user_id: user.username});
        can("delete", "Polyclinic", {user_id: user.username});
        can("view", "Drug");
        can("create", "Drug", {user_id: user.username});
        can("read", "Drug", {user_id: user.username});
        can("update", "Drug", {user_id: user.username});
        can("delete", "Drug", {user_id: user.username});
        can("view", "Transaction");
        can("create", "Transaction", {user_id: user.username});
        can("read", "Transaction", {user_id: user.username});
        can("update", "Transaction", {user_id: user.username});
        can("view", "MedicalRecord");
        can("create", "MedicalRecord", {user_id: user.username});
        can("read", "MedicalRecord", {user_id: user.username});
        can("update", "MedicalRecord", {user_id: user.username});
        can("read", "MedicalRecord", {user_id: user.username});
        can("view", "MedicalRecord");
        can("create", "Progress", {user_id: user.username});
        can("read", "Progress", {user_id: user.username});
        can("update", "Progress", {user_id: user.username});
        can("read", "Progress", {user_id: user.username});
        can("view", "Progress");
        can("create", "Image", {user_id: user.username});
        can("read", "Image", {user_id: user.username});
        can("update", "Image", {user_id: user.username});
        can("read", "Image", {user_id: user.username});
        can("view", "Image");
        can("read", "User", {user_id: user.username});
        can("view", "User");
        can("create", "Project", {user_id: user.username});
        can("read", "Project", {user_id: user.username});
        can("update", "Project", {user_id: user.username});
        can("read", "Project", {user_id: user.username});
        can("delete", "Project", {user_id: user.username});
        can("view", "Project");
        can("read", "User", {user_id: user.username});
        can("view", "User");
    },

    doctor(user, {can}) {
        can("view", "MedicalRecord");
        can("create", "MedicalRecord", {user_id: user.username});
        can("read", "MedicalRecord", {user_id: user.username});
        can("update", "MedicalRecord", {user_id: user.username});
        can("delete", "MedicalRecord", {user_id: user.username});
        can("read", "Polyclinic", {user_id: user.username});
        can("read", "Patient", {user_id: user.username});
        can("update", "Patient", {user_id: user.username});
        can("view", "Polyclinic");
        can("view", "Patient");
    },

    client(user, {can}) {
        can("view", "Progress");
        can("read", "Progress", {user_id: user.username});
        can("view", "Project");
        can("read", "Project", {user_id: user.username});
    },

    superAdmin(user, {can}) {
        can("manage", "all");
    }
};

function policyFor(user) {
    let builder = new AbilityBuilder();

    if (user && typeof policies[user.role] === "function") {
        policies[user.role](user, builder);
    }

    return new Ability(builder.rules);
}

export {
    policyFor
}