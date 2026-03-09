'use client';

export default function SectionDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className="pointer-events-none relative -my-2 h-20 w-full md:-my-4 md:h-28">
      <div
        className="absolute inset-0"
        style={{
          background: flip
            ? 'linear-gradient(180deg, transparent 0%, rgba(11, 13, 16, 0.42) 46%, rgba(11, 13, 16, 0.2) 58%, transparent 100%)'
            : 'linear-gradient(180deg, transparent 0%, rgba(11, 13, 16, 0.34) 50%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: flip
            ? 'radial-gradient(95% 65% at 50% 100%, rgba(58, 168, 255, 0.12) 0%, transparent 68%), radial-gradient(95% 65% at 50% 0%, rgba(123, 97, 255, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(95% 65% at 50% 0%, rgba(123, 97, 255, 0.12) 0%, transparent 68%), radial-gradient(95% 65% at 50% 100%, rgba(58, 168, 255, 0.1) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
