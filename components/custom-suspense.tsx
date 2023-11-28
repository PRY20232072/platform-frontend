import Loading from "./loading";

export default function CustomSuspense({ isLoading, children }: { isLoading: Boolean, children: React.ReactNode }) {
    if (isLoading) {
        return <Loading />;
    }
    return <>{children}</>;
}