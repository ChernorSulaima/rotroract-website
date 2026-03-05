export const metadata = {
    title: "Sanity Studio | Rotaract Club of Freetown Sunset",
    description: "Content management studio for the Rotaract Club of Freetown Sunset website",
}

export default function StudioLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div
            id="sanity-studio"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
                background: "#fff",
            }}
        >
            {children}
        </div>
    )
}
