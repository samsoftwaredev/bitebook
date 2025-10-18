const WordLogoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="320"
    height="64"
    viewBox="0 0 320 64"
    role="img"
    aria-labelledby="title desc"
  >
    <title id="title">BiteBook — logo</title>
    <desc id="desc">
      BiteBook wordmark with a minimal open-book icon. The spine and a small
      page notch subtly form a cross, symbolizing thoughtful design and purpose.
    </desc>
    <style>
      {`:root{ --ink:#0B1C17; --accent:#0FB77A; --muted:#0A7F56; --bg:transparent; }
      @media (prefers-color-scheme: dark){
        :root{ --ink:#F5FFFB; --accent:#6EE7C8; --muted:#A7F3D0; --bg:transparent; }
      }
      .ink{ fill:var(--ink); }
      .accent{ fill:var(--accent); }
      .muted{ fill:var(--muted); }`}
    </style>

    {/* icon: minimal open book with subtle cross */}
    <g transform="translate(16,10)">
      <rect
        x="0"
        y="0"
        rx="10"
        ry="10"
        width="62"
        height="62"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
      />
      {/* left page */}
      <path
        d="M10 16c10-6 20-6 30 0v28c-10-6-20-6-30 0V16z"
        className="accent"
      />
      {/* right page */}
      <path
        d="M52 16c-10-6-20-6-30 0v28c10-6 20-6 30 0V16z"
        className="muted"
      />
      {/* spine */}
      <rect
        x="30.25"
        y="12"
        width="1.5"
        height="36"
        fill="currentColor"
        className="ink"
        opacity=".9"
      />
      {/* page notch forming subtle cross */}
      <rect
        x="26"
        y="22"
        width="10"
        height="2"
        fill="currentColor"
        className="ink"
        opacity=".9"
        rx="1"
      />
      {/* small bookmark */}
      <path
        d="M44 14 h8 v10 l-4-3 -4 3z"
        fill="currentColor"
        className="ink"
        opacity=".18"
      />
    </g>

    {/* single-line wordmark: BiteBook */}
    <g transform="translate(100,47)">
      <text
        className="ink"
        x="0"
        y="0"
        fontFamily="Inter, Helvetica, Arial, sans-serif"
        fontSize="34"
        fontWeight="800"
        letterSpacing="0.2"
      >
        BiteBook
      </text>
    </g>
  </svg>
);

const LogoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    viewBox="0 0 64 64"
    role="img"
    aria-label="BiteBook icon"
  >
    <style>
      {`:root{ --accent:#0FB77A; --muted:#0A7F56; --ink:#0B1C17; }
    @media (prefers-color-scheme: dark){
      :root{ --accent:#6EE7C8; --muted:#A7F3D0; --ink:#F5FFFB; }
    }`}
    </style>
    <rect
      x="1"
      y="1"
      width="62"
      height="62"
      rx="10"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="2"
    />
    <path
      d="M10 16c10-6 20-6 30 0v28c-10-6-20-6-30 0V16z"
      fill="var(--accent)"
    />
    <path
      d="M52 16c-10-6-20-6-30 0v28c10-6 20-6 30 0V16z"
      fill="var(--muted)"
    />
    <rect
      x="30.25"
      y="12"
      width="1.5"
      height="36"
      fill="var(--ink)"
      opacity=".9"
    />
    <rect
      x="26"
      y="22"
      width="10"
      height="2"
      rx="1"
      fill="var(--ink)"
      opacity=".9"
    />
  </svg>
);

interface Props {
  type?: 'wordLogo' | 'logo';
}

const Logo = ({ type = 'wordLogo' }: Props) => {
  return (
    <span data-testid="logo">
      {type === 'wordLogo' ? <WordLogoIcon /> : <LogoIcon />}
    </span>
  );
};

export default Logo;
