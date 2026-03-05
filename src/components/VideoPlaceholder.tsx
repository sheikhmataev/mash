'use client';

interface VideoPlaceholderProps {
  videoSrc?: string;
  className?: string;
  gradient?: 'default' | 'blue' | 'warm';
}

const gradients = {
  default:
    'radial-gradient(ellipse at 30% 40%, rgba(123, 97, 255, 0.1) 0%, transparent 55%), radial-gradient(ellipse at 70% 60%, rgba(58, 168, 255, 0.07) 0%, transparent 50%)',
  blue:
    'radial-gradient(ellipse at 40% 50%, rgba(58, 168, 255, 0.1) 0%, transparent 55%), radial-gradient(ellipse at 60% 40%, rgba(0, 255, 209, 0.05) 0%, transparent 50%)',
  warm:
    'radial-gradient(ellipse at 30% 50%, rgba(123, 97, 255, 0.08) 0%, transparent 55%), radial-gradient(ellipse at 70% 50%, rgba(255, 60, 172, 0.05) 0%, transparent 50%)',
};

export default function VideoPlaceholder({
  videoSrc,
  className = '',
  gradient = 'default',
}: VideoPlaceholderProps) {
  if (videoSrc) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    );
  }

  return (
    <div
      className={`absolute inset-0 animate-gradient ${className}`}
      style={{
        background: `${gradients[gradient]}, #0B0D10`,
        backgroundSize: '200% 200%',
      }}
    />
  );
}
