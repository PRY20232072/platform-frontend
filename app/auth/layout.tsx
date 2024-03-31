export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className=" flex flex-col justify-start items-center">
      {children}
    </section>
  );
}
