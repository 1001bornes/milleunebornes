import Image from 'next/image';
export function ProfileImage({ url_photo, nom }:
    Readonly<{ url_photo: string; nom: string; }>) {
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
            alt={initials}
            className="overflow-hidden rounded-full" />
        )
    else
        return (
            <span className="user-profile-image">
                {initials}
            </span>
        );
} 