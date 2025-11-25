export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15 10 Q10 10 10 15 L10 45 Q10 50 15 50 L25 50 Q30 50 30 45 L30 35 L20 35 L20 25 L35 25 L35 15 Q35 10 30 10 Z"
        fill="#0066CC"
      />
      <path
        d="M40 15 Q40 10 45 10 L55 10 Q60 10 60 15 L60 25 Q60 30 55 30 L50 30 L50 50 L40 50 Z M50 20 L50 25 L52 25 Q54 25 54 23 L54 22 Q54 20 52 20 Z"
        fill="#0066CC"
      />
      <text x="65" y="32" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#0066CC">
        PRO EN
      </text>
      <text x="65" y="48" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#0066CC">
        POCHE
      </text>
      <text x="65" y="57" fontFamily="Arial, sans-serif" fontSize="7" fill="#666">
        MARKETPLACE DE SERVICES PROFESSIONNEL
      </text>
    </svg>
  )
}
