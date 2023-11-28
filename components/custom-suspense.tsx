interface CustomSuspenseProps {
    isLoading: Boolean;
    fallback: React.ReactNode;
    children: React.ReactNode;
}

export default function CustomSuspense({ isLoading, fallback, children }: CustomSuspenseProps) {
    if (isLoading) {
        return fallback;
    }
    return <>{children}</>;
}