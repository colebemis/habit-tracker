export function IconButton(props: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      {...props}
      className="grid h-12 w-12 place-content-center rounded-lg text-text-secondary hover:bg-bg-secondary"
    />
  );
}
