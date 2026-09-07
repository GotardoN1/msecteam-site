import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronRight, Disc3, Instagram, Menu, Play, Trophy, Users, X } from "lucide-react";
import { useSiteContent } from "@/lib/siteContent";

const discordUrl = "https://discord.gg/kFtu8GSTAe";
const instagramUrl = "https://www.instagram.com/msecteam/";
const logoUrl = "/manus-storage/pasted_file_3ZhlSm_image_9d5c5ac6.png";

function WolfMark({ small = false }: { small?: boolean }) {
  return <img className={small ? "official-logo official-logo-small" : "official-logo"} src={logoUrl} alt="MSEC — Me Sinto em Casa Esports" />;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const content = useSiteContent();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="site-shell">
      <nav className={scrolled ? "topbar topbar-scrolled" : "topbar"}>
        <a className="brand" href="#top" aria-label="MSEC Team início">
          <WolfMark small />
          <span>MSEC <em>TEAM</em></span>
        </a>
        <div className={menuOpen ? "nav-links nav-links-open" : "nav-links"}>
          <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
          <a href="#lineup" onClick={() => setMenuOpen(false)}>Line-up</a>
          <a href="#agenda" onClick={() => setMenuOpen(false)}>Agenda</a>
          <a href="#noticias" onClick={() => setMenuOpen(false)}>Notícias</a>
          <a href="#transmissoes" onClick={() => setMenuOpen(false)}>Ao vivo</a>
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
          <h1>{content.heroTitle}<br /><span>{content.heroAccent}</span></h1>
          <p className="hero-copy">{content.heroCopy}</p>
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
          <h2>{content.manifestoTitle}<br /><span>{content.manifestoAccent}</span></h2>
          <div className="manifesto-copy">
            <p className="lead">{content.manifestoLead}</p>
            <p>{content.manifestoBody}</p>
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
          {content.players.map((player, index) => <article className="player-card" key={`${player.tag}-${index}`} style={{ "--accent": player.accent } as React.CSSProperties}>
            <div className={`player-photo photo-${index + 1}`}><div className="photo-number">{player.number}</div><div className="photo-glow" /></div>
            <div className="player-info"><div><span className="player-role">{player.role}</span><h3>{player.tag}</h3><small>{player.realName} · {player.social}</small></div><ArrowUpRight size={18} /></div>
          </article>)}
        </div>
      </section>

      <section id="agenda" className="schedule section-pad">
        <div className="section-heading"><div><div className="section-kicker">03 / CALENDÁRIO</div><h2>Próximos<br /><span>confrontos.</span></h2></div><div className="season-pill"><span className="live-dot" /> TEMPORADA 2026</div></div>
        <div className="matches-list">
          {content.matches.map((match, index) => <div className="match-row" key={`${match.date}-${match.opponent}-${index}`}><div className="match-date"><strong>{match.date}</strong><span>{match.month}</span></div><div className="match-game"><span>{match.game}</span><strong>MSEC TEAM <i>vs</i> {match.opponent}</strong></div><div className="match-status"><span>{match.status}</span><strong>{match.score}</strong></div><div className="match-arrow"><ArrowUpRight size={18} /></div></div>)}
        </div>
        <div className="results-block"><div className="results-label">ÚLTIMOS RESULTADOS</div>{content.results.map((result, index) => <div className="result-row" key={`${result.date}-${result.opponent}-${index}`}><span className="result-date">{result.date} {result.month}</span><span className="result-game">{result.game}</span><strong>{result.opponent}</strong><span className={result.status === "VITÓRIA" ? "result-win" : "result-loss"}>{result.status}</span><b>{result.score}</b></div>)}</div>
      </section>

      <section id="noticias" className="news section-pad">
        <div className="section-heading"><div><div className="section-kicker">04 / NOTÍCIAS</div><h2>Do front<br /><span>da matilha.</span></h2></div><a className="text-link" href="/master">Editar notícias <ArrowUpRight size={16} /></a></div>
        <div className="news-grid">{content.news.map((item, index) => <article className={item.featured ? "news-card news-card-featured" : "news-card"} key={`${item.title}-${index}`}><div className="news-art"><span>{item.category}</span><strong>0{index + 1}</strong></div><div className="news-meta"><span>{item.date}</span><ArrowUpRight size={16} /></div><h3>{item.title}</h3><p>{item.excerpt}</p></article>)}</div>
      </section>

      <section id="transmissoes" className="streams section-pad"><div className="section-heading"><div><div className="section-kicker">05 / AO VIVO</div><h2>Assista a<br /><span>matilha.</span></h2></div><a className="text-link" href={content.streams[0]?.url || "#"} target="_blank" rel="noreferrer"><Play size={15} /> Abrir canal <ArrowUpRight size={16} /></a></div><div className="streams-grid">{content.streams.map((stream, index) => <a className="stream-card" href={stream.url} target="_blank" rel="noreferrer" key={`${stream.title}-${index}`}><div className="stream-art"><img src={logoUrl} alt="" /><span className={stream.live ? "stream-live" : "stream-upcoming"}>{stream.live ? "AO VIVO AGORA" : "PRÓXIMA TRANSMISSÃO"}</span></div><div className="stream-info"><span>{stream.platform} · {stream.date}</span><h3>{stream.title}</h3><ArrowUpRight size={18} /></div></a>)}</div></section>

      <section id="parceiros" className="partners section-pad"><div className="section-heading"><div><div className="section-kicker">06 / PARCEIROS</div><h2>Do nosso<br /><span>lado.</span></h2></div><a className="text-link" href="mailto:parcerias@msecteam.gg">Quero apoiar <ArrowUpRight size={16} /></a></div><div className="partners-grid">{content.partners.map((partner, index) => <article className="partner-card" key={`${partner.name}-${index}`}><img src={logoUrl} alt="" /><span>{partner.tier}</span><h3>{partner.name}</h3><p>{partner.description}</p></article>)}</div></section>

      <section id="comunidade" className="community section-pad">
        <div className="community-panel">
          <div className="community-text"><div className="section-kicker">04 / COMUNIDADE</div><h2>{content.communityTitle}<br /><span>{content.communityAccent}</span></h2><p>{content.communityBody}</p><a className="button button-light" href={discordUrl} target="_blank" rel="noreferrer"><Disc3 size={17} /> Entrar no Discord <ArrowUpRight size={15} /></a></div>
          <div className="community-orbit"><div className="orbit-ring orbit-ring-one" /><div className="orbit-ring orbit-ring-two" /><WolfMark /><span className="orbit-label">MSEC<br />TEAM</span></div>
        </div>
      </section>

      <footer className="footer"><div className="brand footer-brand"><WolfMark small /><span>MSEC <em>TEAM</em></span></div><p>© 2026 MSEC TEAM. Feito no Brasil, jogado em qualquer lugar.</p><div className="footer-links"><a href={instagramUrl} target="_blank" rel="noreferrer"><Instagram size={16} /> Instagram</a><a href={discordUrl} target="_blank" rel="noreferrer"><Disc3 size={16} /> Discord</a><a href="/master"><span className="footer-master-dot" /> Área Master</a></div></footer>
    </main>
  );
}
