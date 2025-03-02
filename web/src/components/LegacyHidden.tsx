type LegacyHiddenProps = {
  children: React.ReactNode;
  htmlAttributes: React.HTMLAttributes<HTMLDivElement>;
  mode?: 'hidden' | 'visible';
  suppressHydrationWarning?: boolean;
  ref?: React.Ref<HTMLDivElement>;
};

export default function LegacyHidden({
  children,
  htmlAttributes,
  mode,
  ref,
}: LegacyHiddenProps) {
  return (
    <div
      ref={ref}
      hidden={mode === 'hidden' ? true : undefined}
      {...htmlAttributes}
    >
      {children}
    </div>
  );
}
