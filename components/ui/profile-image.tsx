export function ProfileImage({
    url_photo,
    nom,
    prenom,
}: Readonly<{
    url_photo: string;
    nom: string;
    prenom: string;
}>) {
    const lastNameInitial = nom ? nom[0] : "";
    const firstNameInitial = prenom ? prenom[0] : "";

    if (url_photo) {
        return (
            <img width='auto' height={50} src={url_photo} alt={ firstNameInitial + lastNameInitial}/>
        );
    }
    else {
        return (
            <span className="user-profile-image">
                {firstNameInitial}
                {lastNameInitial}
            </span>
        );
    }
} 