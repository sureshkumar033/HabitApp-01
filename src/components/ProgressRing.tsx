interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  trackColor?: string;
  activeColor?: string;
  labelColor?: string;
  sublabelColor?: string;
}

export default function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 10,
  label,
  sublabel,
  trackColor = 'stroke-sage-100',
  activeColor = 'stroke-sage-500',
  labelColor = 'text-sage-800',
  sublabelColor = 'text-sage-400',
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.max(0, Math.min(1, progress)));

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className={trackColor}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={`${activeColor} transition-all duration-700 ease-out`}
          style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && <span className={`text-2xl font-bold ${labelColor}`}>{label}</span>}
        {sublabel && <span className={`text-xs font-medium mt-0.5 ${sublabelColor}`}>{sublabel}</span>}
      </div>
    </div>
  );
}
