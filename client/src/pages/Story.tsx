import { ArrowLeft, ArrowUpRight, Disc3, Instagram } from "lucide-react";
import { Link } from "wouter";

const logoUrl = "/manus-storage/pasted_file_3ZhlSm_image_9d5c5ac6.png";
const heroUrl = "/manus-storage/msec-news-community_b24b455a.jpg";

export default function Story() {
  return <main className="story-shell">
    <nav className="story-nav"><Link href="/"><ArrowLeft size={15} /> Voltar ao site</Link><div className="story-brand"><img src={logoUrl} alt="MSEC — Me Sinto em Casa" /><span>MSEC <em>TEAM</em></span></div><a href="/tryout">Fazer parte <ArrowUpRight size={15} /></a></nav>
    <section className="story-hero"><div className="story-hero-image" style={{ backgroundImage: `linear-gradient(90deg, rgba(8,11,8,.92) 15%, rgba(8,11,8,.35), rgba(8,11,8,.28)), url(${heroUrl})` }} /><div className="story-hero-copy"><span className="section-kicker">MSEC / ME SINTO EM CASA</span><h1>Não é só um time.<br /><span>É uma casa.</span></h1><p>Onde a resenha encontra a competição, o lobo encontra a matilha e todo mundo pode chegar do seu jeito.</p></div></section>
    <section className="story-content"><div className="section-kicker">01 / NOSSA ORIGEM</div><div className="story-grid"><h2>Me Sinto<br /><span>em Casa.</span></h2><div><p className="lead">MSEC significa Me Sinto em Casa. É uma ideia simples: criar um lugar onde jogar junto seja tão importante quanto vencer.</p><p>A MSEC nasceu da vontade de transformar partidas, calls e aquela resenha depois do jogo em algo maior. Somos uma equipe brasileira de esports, mas também somos uma comunidade que acolhe quem chega, incentiva quem tenta e comemora quem permanece.</p><p>O lobo representa esse espírito. Ele é independente, atento e forte, mas nunca está sozinho. Na MSEC, cada pessoa traz sua própria história para a matilha.</p></div></div></section>
    <section className="story-values"><div className="section-kicker">02 / O QUE NOS MOVE</div><div className="values-grid"><article><strong>01</strong><h3>Pertencimento</h3><p>Antes de qualquer placar, existe um lugar para chamar de seu.</p></article><article><strong>02</strong><h3>Competição</h3><p>Entramos para jogar sério, evoluir juntos e deixar nossa marca.</p></article><article><strong>03</strong><h3>Comunidade</h3><p>A melhor parte da MSEC acontece quando todo mundo participa.</p></article></div></section>
    <section className="story-cta"><img src={logoUrl} alt="Logo MSEC" /><div><span className="section-kicker">03 / SUA VEZ</span><h2>Chega mais<br /><span>na matilha.</span></h2><p>Quer jogar, criar ou simplesmente fazer parte? A porta está aberta.</p><div className="story-actions"><a className="button button-primary" href="/tryout">Quero fazer parte <ArrowUpRight size={16} /></a><a className="button button-ghost" href="https://discord.gg/kFtu8GSTA" target="_blank" rel="noreferrer"><Disc3 size={16} /> Discord</a></div></div></section>
    <footer className="story-footer"><span>© 2026 MSEC TEAM — ME SINTO EM CASA</span><div><a href="https://www.instagram.com/msecteam/" target="_blank" rel="noreferrer"><Instagram size={15} /> Instagram</a><Link href="/">Início</Link></div></footer>
  </main>;
}
