import Image from 'next/image';

export function ProfileImage({ url_photo, nom, role }:
    Readonly<{ url_photo: string; nom: string; role?: string }>) {
    const parts: string[] = nom ? nom.split(/[ -]/) : [];
    const initials: string = parts.map(part => part[0].toUpperCase()).join("");

    return (
        <div className='user-profile-image'>
            {url_photo ? (
                <Image
                    src={url_photo}
                    height={50}
                    width={50}
                    title={initials + (role ? ' - ' + role : '')}
                    alt={initials} />
            )
                : (
                    <span title={role ?? ''}>
                        {initials}
                    </span>
                )}
        </div>
    )
} 