'use client';

export default function SectionDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className="pointer-events-none relative h-32 w-full md:h-48"
      style={{
        background: flip
          ? 'linear-gradient(180deg, transparent 0%, rgba(11, 13, 16, 1) 40%, rgba(11, 13, 16, 1) 60%, transparent 100%)'
          : 'linear-gradient(180deg, transparent 0%, rgba(11, 13, 16, 0.95) 50%, transparent 100%)',
      }}
    />
  );
}
