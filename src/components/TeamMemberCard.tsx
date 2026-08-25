import Image, { type StaticImageData } from "next/image";

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio?: string;
  image?: string | StaticImageData;
  twitter?: string;
  github?: string;
}

export default function TeamMemberCard({
  name,
  role,
  bio,
  image,
  twitter,
  github,
}: TeamMemberCardProps) {
  return (
    <div className="card group">
      <div className="flex items-start gap-4">
        {image ? (
          <Image
            src={image}
            alt={`${name} portrait`}
            width={56}
            height={56}
            style={{
              width: 56, height: 56, borderRadius: "50%",
              border: "1.5px solid var(--color-border)",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        ) : (
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "var(--color-bg-elevated)",
            border: "1.5px solid var(--color-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.15rem", fontWeight: 700, color: "var(--color-blue)",
            flexShrink: 0,
          }}>
            {name.charAt(0)}
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontWeight: 600, color: "var(--color-text-bright)", fontSize: "1.05rem" }}>
            {name}
          </h3>
          <p style={{ fontSize: "0.8rem", color: "var(--color-blue)", marginBottom: bio ? "0.45rem" : "0.75rem" }}>{role}</p>

          {bio && (
            <p style={{ fontSize: "0.8rem", color: "var(--color-text-body)", lineHeight: 1.55, marginBottom: "0.75rem" }}>
              {bio}
            </p>
          )}

          <div className="flex flex-col gap-1">
            {twitter && (
              <a
                href={`https://x.com/${twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-muted"
                aria-label={`${name} on X`}
                style={{ fontSize: "0.75rem", minHeight: 44, display: "flex", alignItems: "center" }}
              >
                @{twitter}
              </a>
            )}
            {github && (
              <a
                href={`https://github.com/${github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-muted"
                aria-label={`${name} on GitHub`}
                style={{ fontSize: "0.75rem", minHeight: 44, display: "flex", alignItems: "center" }}
              >
                gh/{github}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
