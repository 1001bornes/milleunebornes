import Image from 'next/image';
export function ProfileImage({ url_photo, nom, role }:
    Readonly<{ url_photo: string; nom: string; role?: string}>) {
    const parts: string[] = nom ? nom.split(/[ -]/) : [];
    const initials: string = parts.map(part => part[0].toUpperCase()).join("");

    if (url_photo)
        return (<Image
            src={url_photo}
            style={{
                height: '50px',
                width: 'auto',
            }}
            height={50}
            width={50}
            title={initials + (role? ' - ' + role : '')}
            alt={initials}
            className="overflow-hidden rounded-full" />
        )
    else
        return (
            <span className="user-profile-image" title={role??''}>
                {initials}
            </span>
        );
} 