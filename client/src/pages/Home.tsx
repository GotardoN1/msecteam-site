import { useState } from "react";
import { ArrowUpRight, ChevronRight, Disc3, Instagram, Menu, Play, Trophy, Users, X } from "lucide-react";

const discordUrl = "https://discord.gg/kFtu8GSTAe";
const instagramUrl = "https://www.instagram.com/msecteam/";

const players = [
  { tag: "ROBSON", role: "PLAYER", number: "01", accent: "#b9d79d" },
  { tag: "KEVIN", role: "PLAYER", number: "02", accent: "#e6d9b7" },
  { tag: "YURI", role: "PLAYER", number: "03", accent: "#90b67c" },
  { tag: "GOTARDO", role: "PLAYER", number: "04", accent: "#c8d6a8" },
  { tag: "NATAN", role: "PLAYER", number: "05", accent: "#d9cba8" },
  { tag: "T2T", role: "PLAYER", number: "06", accent: "#a8c68e" },
];

const matches = [
  { date: "18", month: "SET", opponent: "Wolves United", game: "EA FC 26", status: "PRÓXIMO", score: "20:30" },
  { date: "24", month: "SET", opponent: "Nox Academy", game: "Valorant", status: "SCRIM", score: "21:00" },
  { date: "02", month: "OUT", opponent: "A definir", game: "Rocket League", status: "EM BREVE", score: "—" },
];

function WolfMark({ small = false }: { small?: boolean }) {
  return (
    <div className={small ? "wolf-mark wolf-mark-small" : "wolf-mark"} aria-label="MSEC TEAM">
      <span className="wolf-ear wolf-ear-left" />
      <span className="wolf-ear wolf-ear-right" />
      <span className="wolf-face"><span className="wolf-eye wolf-eye-left" /><span className="wolf-eye wolf-eye-right" /></span>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="site-shell">
      <nav className="topbar">
        <a className="brand" href="#top" aria-label="MSEC Team início">
          <WolfMark small />
          <span>MSEC <em>TEAM</em></span>
        </a>
        <div className={menuOpen ? "nav-links nav-links-open" : "nav-links"}>
          <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
          <a href="#lineup" onClick={() => setMenuOpen(false)}>Line-up</a>
          <a href="#agenda" onClick={() => setMenuOpen(false)}>Agenda</a>
          <a href="#comunidade" onClick={() => setMenuOpen(false)}>Comunidade</a>
          <a className="mobile-discord" href={discordUrl} target="_blank" rel="noreferrer">Entrar no Discord <ArrowUpRight size={15} /></a>
        </div>
        <a className="nav-cta" href={discordUrl} target="_blank" rel="noreferrer">Entrar no Discord <ArrowUpRight size={15} /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>

      <section id="top" className="hero">
        <div className="hero-image" />
        <div className="hero-grid" />
        <div className="hero-content">
          <p className="eyebrow"><span className="live-dot" /> ORGANIZAÇÃO BRASILEIRA DE ESPORTS</p>
          <h1>Joga mal.<br /><span>Compete muito.</span></h1>
          <p className="hero-copy">A casa dos piores jogadores e das melhores histórias. MSEC TEAM é comunidade, caos e competição do nosso jeito.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#lineup">Conheça a matilha <ChevronRight size={17} /></a>
            <a className="button button-ghost" href={instagramUrl} target="_blank" rel="noreferrer"><Instagram size={17} /> Ver no Instagram</a>
          </div>
        </div>
        <div className="hero-stamp"><span>EST. 2023</span><strong>MSEC</strong><span>BRASIL · ONLINE</span></div>
        <div className="hero-bottomline"><span>SCROLL PARA EXPLORAR</span><span className="line" /><span>01 / 04</span></div>
      </section>

      <section id="sobre" className="manifesto section-pad">
        <div className="section-kicker">01 / A MATILHA</div>
        <div className="manifesto-layout">
          <h2>Sem pose.<br /><span>Só presença.</span></h2>
          <div className="manifesto-copy">
            <p className="lead">Não somos a organização mais séria da sala — e é exatamente por isso que você vai lembrar da gente.</p>
            <p>Da resenha no Discord ao último round da partida, a MSEC existe para quem joga pelo jogo. Uma comunidade brasileira, competitiva quando precisa e caótica por natureza.</p>
            <a className="text-link" href={discordUrl} target="_blank" rel="noreferrer">Faça parte da matilha <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="stats-row">
          <div><strong>03</strong><span>posts na base</span></div>
          <div><strong>24</strong><span>lobos na matilha</span></div>
          <div><strong>156</strong><span>seguindo o caos</span></div>
          <div className="stat-quote">“Os piores jogadores você encontra aqui.”</div>
        </div>
      </section>

      <section id="lineup" className="lineup section-pad">
        <div className="section-heading"><div><div className="section-kicker">02 / ROSTER</div><h2>A matilha<br /><span>em campo.</span></h2></div><a className="text-link" href={instagramUrl} target="_blank" rel="noreferrer">Ver todos <ArrowUpRight size={16} /></a></div>
        <div className="players-grid">
          {players.map((player, index) => <article className="player-card" key={player.tag} style={{ "--accent": player.accent } as React.CSSProperties}>
            <div className={`player-photo photo-${index + 1}`}><div className="photo-number">{player.number}</div><div className="photo-glow" /></div>
            <div className="player-info"><div><span className="player-role">{player.role}</span><h3>{player.tag}</h3></div><ArrowUpRight size={18} /></div>
          </article>)}
        </div>
      </section>

      <section id="agenda" className="schedule section-pad">
        <div className="section-heading"><div><div className="section-kicker">03 / CALENDÁRIO</div><h2>Próximos<br /><span>confrontos.</span></h2></div><div className="season-pill"><span className="live-dot" /> TEMPORADA 2026</div></div>
        <div className="matches-list">
          {matches.map((match, index) => <div className="match-row" key={`${match.date}-${match.opponent}`}><div className="match-date"><strong>{match.date}</strong><span>{match.month}</span></div><div className="match-game"><span>{match.game}</span><strong>MSEC TEAM <i>vs</i> {match.opponent}</strong></div><div className="match-status"><span>{match.status}</span><strong>{match.score}</strong></div><div className="match-arrow"><ArrowUpRight size={18} /></div></div>)}
        </div>
      </section>

      <section id="comunidade" className="community section-pad">
        <div className="community-panel">
          <div className="community-text"><div className="section-kicker">04 / COMUNIDADE</div><h2>Entra no<br /><span>canil.</span></h2><p>Partidas, memes, calls duvidosas e aquela resenha que só quem é da matilha entende.</p><a className="button button-light" href={discordUrl} target="_blank" rel="noreferrer"><Disc3 size={17} /> Entrar no Discord <ArrowUpRight size={15} /></a></div>
          <div className="community-orbit"><div className="orbit-ring orbit-ring-one" /><div className="orbit-ring orbit-ring-two" /><WolfMark /><span className="orbit-label">MSEC<br />TEAM</span></div>
        </div>
      </section>

      <footer className="footer"><div className="brand footer-brand"><WolfMark small /><span>MSEC <em>TEAM</em></span></div><p>© 2026 MSEC TEAM. Feito no Brasil, jogado em qualquer lugar.</p><div className="footer-links"><a href={instagramUrl} target="_blank" rel="noreferrer"><Instagram size={16} /> Instagram</a><a href={discordUrl} target="_blank" rel="noreferrer"><Disc3 size={16} /> Discord</a></div></footer>
    </main>
  );
}
