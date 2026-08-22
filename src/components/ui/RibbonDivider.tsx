import styles from "./RibbonDivider.module.css";

interface RibbonDividerProps {
  type: "double" | "single";
}

export function RibbonDivider({ type }: RibbonDividerProps) {
  return (
    <div className={styles.ribbonDivider}>
      <svg className={styles.ribbonSvg} viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c6304a" />
            <stop offset="30%" stopColor="#f0d488" />
            <stop offset="55%" stopColor="#6e1220" />
            <stop offset="80%" stopColor="#e35270" />
            <stop offset="100%" stopColor="#2a060c" />
          </linearGradient>
        </defs>

        {type === "double" ? (
          <>
            <path
              d="M0,60 C150,20 250,110 400,50 C550,-10 650,100 800,45 C900,10 950,70 1000,55"
              fill="none"
              stroke="url(#ribbonGrad)"
              strokeWidth="26"
              strokeLinecap="round"
              opacity="0.85"
            >
              <animate
                attributeName="d"
                values="M0,60 C150,20 250,110 400,50 C550,-10 650,100 800,45 C900,10 950,70 1000,55;
                        M0,55 C150,90 250,10 400,70 C550,120 650,20 800,65 C900,95 950,30 1000,50;
                        M0,60 C150,20 250,110 400,50 C550,-10 650,100 800,45 C900,10 950,70 1000,55"
                dur="8s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.4 0 0.2 1;0.4 0 0.2 1"
              />
            </path>
            <path
              d="M0,60 C150,20 250,110 400,50 C550,-10 650,100 800,45 C900,10 950,70 1000,55"
              fill="none"
              stroke="var(--gold-bright)"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.4"
            >
              <animate
                attributeName="d"
                values="M0,60 C150,20 250,110 400,50 C550,-10 650,100 800,45 C900,10 950,70 1000,55;
                        M0,55 C150,90 250,10 400,70 C550,120 650,20 800,65 C900,95 950,30 1000,50;
                        M0,60 C150,20 250,110 400,50 C550,-10 650,100 800,45 C900,10 950,70 1000,55"
                dur="8s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.4 0 0.2 1;0.4 0 0.2 1"
              />
            </path>
          </>
        ) : (
          <path
            d="M0,50 C180,110 280,0 450,60 C600,115 700,10 850,60 C920,85 960,40 1000,55"
            fill="none"
            stroke="url(#ribbonGrad)"
            strokeWidth="22"
            strokeLinecap="round"
            opacity="0.8"
          >
            <animate
              attributeName="d"
              values="M0,50 C180,110 280,0 450,60 C600,115 700,10 850,60 C920,85 960,40 1000,55;
                      M0,60 C180,10 280,110 450,40 C600,0 700,110 850,40 C920,20 960,80 1000,50;
                      M0,50 C180,110 280,0 450,60 C600,115 700,10 850,60 C920,85 960,40 1000,55"
              dur="9s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.2 1;0.4 0 0.2 1"
            />
          </path>
        )}
      </svg>
    </div>
  );
}
