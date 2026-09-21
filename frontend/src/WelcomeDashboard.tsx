import React from "react";

type Activity = { title: string; detail: string; time: string; tone: string };

const activity: Activity[] = [
  { title: "Maya joined your workspace", detail: "People", time: "12 min ago", tone: "#8b7cf6" },
  { title: "Project brief was updated", detail: "Atlas launch", time: "Yesterday", tone: "#4db6ac" },
  { title: "You completed onboarding", detail: "Getting started", time: "Mon", tone: "#f2a65a" },
];

const steps = [
  ["01", "Create", "Start with a simple project"],
  ["02", "Invite", "Bring the right people in"],
  ["03", "Ship", "Turn momentum into progress"],
];

export function WelcomeDashboard({ populated = false, narrow = false }: { populated?: boolean; narrow?: boolean }) {
  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <header style={styles.header}>
          <div style={styles.brand}><span style={styles.brandMark}>p</span><span>parleo</span></div>
          <div style={styles.profile}><span style={styles.avatar}>A</span><span style={styles.profileName}>Alex Morgan</span><span style={styles.chevron}>⌄</span></div>
        </header>

        <section style={styles.hero}>
          <div style={styles.heroCopy}>
            <p style={styles.eyebrow}>MONDAY, SEPTEMBER 21</p>
            <h1 style={styles.title}>Good morning, Alex<span style={styles.period}>.</span></h1>
            <p style={styles.subtitle}>Let’s turn your next idea into momentum.</p>
            <button style={styles.cta}>Create your first project <span style={styles.arrow}>→</span></button>
          </div>
          <div style={styles.orbit} aria-hidden="true"><div style={styles.orbitCore}>✦</div><div style={{...styles.orbitDot, top: 12, right: 24}}>•</div><div style={{...styles.orbitDot, bottom: 18, left: 16}}>•</div></div>
        </section>

        <section style={{...styles.grid, ...(narrow ? styles.narrowGrid : {})}}>
          <article style={styles.card}>
            <div style={styles.cardHeading}><div><p style={styles.cardKicker}>YOUR STARTING POINT</p><h2 style={styles.cardTitle}>A little goes a long way</h2></div><span style={styles.spark}>✧</span></div>
            <div style={styles.steps}>{steps.map(([number, label, copy]) => <div key={number} style={styles.step}><span style={styles.stepNumber}>{number}</span><div><strong style={styles.stepLabel}>{label}</strong><p style={styles.stepCopy}>{copy}</p></div><span style={styles.stepArrow}>↗</span></div>)}</div>
          </article>

          <article style={{...styles.card, ...styles.activityCard}}>
            <div style={styles.cardHeading}><div><p style={styles.cardKicker}>RECENT ACTIVITY</p><h2 style={styles.cardTitle}>{populated ? "Keep the rhythm" : "Your workspace is ready"}</h2></div><span style={styles.more}>•••</span></div>
            {populated ? <div style={styles.activityList}>{activity.map((item) => <div key={item.title} style={styles.activity}><span style={{...styles.activityDot, background: item.tone}}></span><div style={styles.activityText}><strong style={styles.activityTitle}>{item.title}</strong><span style={styles.activityDetail}>{item.detail}</span></div><span style={styles.activityTime}>{item.time}</span></div>)}</div> : <div style={styles.empty}><div style={styles.emptyIcon}>◌</div><p style={styles.emptyText}>Once you start, the things you care about will show up here.</p><span style={styles.emptyHint}>Your first project is a good place to begin.</span></div>}
          </article>
        </section>
        <footer style={styles.footer}><span>Built for thoughtful progress</span><span style={styles.footerDot}>•</span><span>Need a hand? <u>Visit the guide</u></span></footer>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#f7f7f4", color: "#222321", fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif", padding: "0 28px" },
  shell: { maxWidth: 1180, margin: "0 auto" },
  header: { height: 88, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e5e5df" },
  brand: { display: "flex", alignItems: "center", gap: 10, fontSize: 20, fontWeight: 700, letterSpacing: "-0.04em" },
  brandMark: { width: 30, height: 30, display: "grid", placeItems: "center", borderRadius: 10, background: "#252625", color: "#fff", fontSize: 18, fontStyle: "italic" },
  profile: { display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#5f625f" },
  avatar: { display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: "50%", background: "#e8d9c8", color: "#7a5e43", fontWeight: 700 },
  profileName: { color: "#30322f", fontWeight: 600 }, chevron: { fontSize: 18, color: "#9a9c96" },
  hero: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "76px 30px 72px", borderBottom: "1px solid #e5e5df" },
  heroCopy: { maxWidth: 650 }, eyebrow: { fontSize: 11, letterSpacing: "0.16em", color: "#92958e", margin: "0 0 18px", fontWeight: 700 },
  title: { fontSize: "clamp(42px, 6vw, 72px)", lineHeight: 0.98, letterSpacing: "-0.075em", margin: 0, fontWeight: 650 }, period: { color: "#9b8df4" }, subtitle: { fontSize: 20, color: "#6d706b", margin: "22px 0 30px", letterSpacing: "-0.02em" },
  cta: { border: 0, borderRadius: 12, background: "#252625", color: "white", padding: "15px 19px", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 20px rgba(34,35,33,.12)" }, arrow: { color: "#b8adff", fontSize: 18, marginLeft: 14 },
  orbit: { width: 190, height: 190, borderRadius: "50%", border: "1px solid #deddd7", position: "relative", display: "grid", placeItems: "center", transform: "rotate(-18deg)" }, orbitCore: { width: 76, height: 76, borderRadius: "50%", background: "#d7d0fb", display: "grid", placeItems: "center", color: "#5e54b4", fontSize: 28, boxShadow: "0 0 0 16px rgba(215,208,251,.3)" }, orbitDot: { position: "absolute", color: "#a394f4", fontSize: 26 },
  grid: { display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 18, padding: "28px 0" }, narrowGrid: { gridTemplateColumns: "1fr", paddingTop: 18 }, card: { background: "#fff", border: "1px solid #e9e9e4", borderRadius: 18, padding: 28, boxShadow: "0 8px 28px rgba(43,44,40,.035)" }, activityCard: { background: "#eeecff" }, cardHeading: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 26 }, cardKicker: { margin: 0, fontSize: 10, letterSpacing: "0.14em", color: "#92958e", fontWeight: 800 }, cardTitle: { margin: "9px 0 0", fontSize: 24, letterSpacing: "-0.05em" }, spark: { fontSize: 26, color: "#a096ed" }, more: { color: "#a39dca", letterSpacing: 2 },
  steps: { display: "grid", gap: 12 }, step: { display: "flex", alignItems: "center", gap: 15, padding: "14px 0", borderTop: "1px solid #efefea" }, stepNumber: { color: "#aaa9a0", fontSize: 11, fontWeight: 800, width: 24 }, stepLabel: { fontSize: 14 }, stepCopy: { margin: "4px 0 0", fontSize: 12, color: "#858780" }, stepArrow: { marginLeft: "auto", color: "#babbb4" },
  empty: { minHeight: 170, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", border: "1px dashed #c9c5eb", borderRadius: 14, padding: 18 }, emptyIcon: { fontSize: 34, color: "#9489e8", marginBottom: 10 }, emptyText: { maxWidth: 250, fontSize: 14, lineHeight: 1.45, margin: 0, color: "#57547a" }, emptyHint: { marginTop: 10, fontSize: 11, color: "#9792b8" },
  activityList: { display: "grid", gap: 2 }, activity: { display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderTop: "1px solid #dcd8fa" }, activityDot: { width: 9, height: 9, borderRadius: "50%", flexShrink: 0 }, activityText: { display: "grid", gap: 4 }, activityTitle: { fontSize: 13 }, activityDetail: { fontSize: 11, color: "#817da3" }, activityTime: { marginLeft: "auto", fontSize: 10, color: "#938db9" },
  footer: { display: "flex", justifyContent: "center", gap: 12, color: "#aaa9a0", fontSize: 11, padding: "8px 0 36px" }, footerDot: { color: "#c3baf7" },
};

export function ActivityDashboard() { return <WelcomeDashboard populated />; }
export function NarrowDashboard() { return <WelcomeDashboard narrow />; }

export default WelcomeDashboard;
