import { useEffect, useState } from "react";
import { ArrowLeft, Check, ClipboardList, FileText, Play, RotateCcw, Save, Users } from "lucide-react";
import { Link } from "wouter";
import { defaultSiteContent, loadSiteContent, resetSiteContent, saveSiteContent, type SiteContent } from "@/lib/siteContent";

const tabs = [
  { id: "conteudo", label: "Conteúdo", icon: FileText },
  { id: "equipe", label: "Equipe", icon: Users },
  { id: "agenda", label: "Agenda", icon: ClipboardList },
  { id: "resultados", label: "Resultados", icon: ClipboardList },
  { id: "noticias", label: "Notícias", icon: FileText },
  { id: "ao-vivo", label: "Ao vivo", icon: Play },
  { id: "parceiros", label: "Parceiros", icon: Users },
];

export default function Master() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [activeTab, setActiveTab] = useState("conteudo");
  const [saved, setSaved] = useState(false);

  useEffect(() => setContent(loadSiteContent()), []);
  const update = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => setContent((current) => ({ ...current, [key]: value }));
  const save = () => { saveSiteContent(content); setSaved(true); window.setTimeout(() => setSaved(false), 2200); };
  const reset = () => { if (window.confirm("Restaurar todos os conteúdos originais?")) { resetSiteContent(); setContent(defaultSiteContent); } };

  return <main className="master-shell">
    <aside className="master-sidebar">
      <Link href="/" className="master-back"><ArrowLeft size={15} /> Voltar ao site</Link>
      <div className="master-brand"><img src="/manus-storage/pasted_file_3ZhlSm_image_9d5c5ac6.png" alt="MSEC — Me Sinto em Casa Esports" /><span>MSEC</span><em>MASTER</em></div>
      <p className="master-intro">Painel de conteúdo<br />da matilha.</p>
      <nav className="master-tabs">{tabs.map((tab) => { const Icon = tab.icon; return <button className={activeTab === tab.id ? "master-tab active" : "master-tab"} key={tab.id} onClick={() => setActiveTab(tab.id)}><Icon size={16} /> {tab.label}</button>; })}</nav>
      <div className="master-note">As alterações são salvas neste navegador e aparecem na home imediatamente.</div>
    </aside>
    <section className="master-main">
      <header className="master-header"><div><span className="master-kicker">MSEC TEAM / MASTER</span><h1>{tabs.find((tab) => tab.id === activeTab)?.label}</h1></div><div className="master-actions"><button className="master-reset" onClick={reset}><RotateCcw size={14} /> Restaurar</button><button className="master-save" onClick={save}>{saved ? <Check size={15} /> : <Save size={15} />} {saved ? "Salvo" : "Salvar alterações"}</button></div></header>
      {activeTab === "conteudo" && <ContentEditor content={content} update={update} />}
      {activeTab === "equipe" && <TeamEditor content={content} update={update} />}
      {activeTab === "agenda" && <ScheduleEditor content={content} update={update} />}
      {activeTab === "resultados" && <ScheduleEditor content={{ ...content, matches: content.results }} update={(key, value) => key === "matches" ? update("results", value as SiteContent["results"]) : update(key, value)} />}
      {activeTab === "noticias" && <NewsEditor content={content} update={update} />}
      {activeTab === "ao-vivo" && <StreamEditor content={content} update={update} />}
      {activeTab === "parceiros" && <PartnerEditor content={content} update={update} />}
    </section>
  </main>;
}

function Field({ label, value, onChange, textarea = false }: { label: string; value: string; onChange: (value: string) => void; textarea?: boolean }) {
  return <label className="master-field"><span>{label}</span>{textarea ? <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={4} /> : <input value={value} onChange={(event) => onChange(event.target.value)} />}</label>;
}

function ContentEditor({ content, update }: { content: SiteContent; update: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void }) {
  return <div className="master-form"><div className="master-form-section"><div className="form-section-title"><span>01</span><div><h2>Hero principal</h2><p>A primeira impressão da MSEC TEAM.</p></div></div><div className="field-grid"><Field label="Título principal" value={content.heroTitle} onChange={(value) => update("heroTitle", value)} /><Field label="Título em destaque" value={content.heroAccent} onChange={(value) => update("heroAccent", value)} /><Field label="Texto de apoio" value={content.heroCopy} onChange={(value) => update("heroCopy", value)} textarea /></div></div><div className="master-form-section"><div className="form-section-title"><span>02</span><div><h2>Manifesto</h2><p>O texto que explica o espírito da matilha.</p></div></div><div className="field-grid"><Field label="Título" value={content.manifestoTitle} onChange={(value) => update("manifestoTitle", value)} /><Field label="Título em destaque" value={content.manifestoAccent} onChange={(value) => update("manifestoAccent", value)} /><Field label="Lead" value={content.manifestoLead} onChange={(value) => update("manifestoLead", value)} textarea /><Field label="Texto completo" value={content.manifestoBody} onChange={(value) => update("manifestoBody", value)} textarea /></div></div><div className="master-form-section"><div className="form-section-title"><span>03</span><div><h2>Comunidade</h2><p>Chamada para o Discord e para a comunidade.</p></div></div><div className="field-grid"><Field label="Título" value={content.communityTitle} onChange={(value) => update("communityTitle", value)} /><Field label="Título em destaque" value={content.communityAccent} onChange={(value) => update("communityAccent", value)} /><Field label="Texto" value={content.communityBody} onChange={(value) => update("communityBody", value)} textarea /></div></div></div>;
}

function TeamEditor({ content, update }: { content: SiteContent; update: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void }) {
  const players = content.players;
  return <div className="master-list">{players.map((player, index) => <div className="master-card" key={`${player.tag}-${index}`}><div className="master-card-number">0{index + 1}</div><div className="field-grid compact"><Field label="Nome / tag" value={player.tag} onChange={(value) => { const next = [...players]; next[index] = { ...player, tag: value }; update("players", next); }} /><Field label="Função" value={player.role} onChange={(value) => { const next = [...players]; next[index] = { ...player, role: value }; update("players", next); }} /></div></div>)}<button className="master-add" onClick={() => update("players", [...players, { tag: "NOVO", role: "PLAYER", number: String(players.length + 1).padStart(2, "0"), accent: "#b9d79d" }])}>+ Adicionar jogador</button></div>;
}

function ScheduleEditor({ content, update }: { content: SiteContent; update: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void }) {
  const matches = content.matches;
  return <div className="master-list">{matches.map((match, index) => <div className="master-card" key={`${match.date}-${index}`}><div className="master-card-number">0{index + 1}</div><div className="field-grid compact"><Field label="Dia" value={match.date} onChange={(value) => { const next = [...matches]; next[index] = { ...match, date: value }; update("matches", next); }} /><Field label="Mês" value={match.month} onChange={(value) => { const next = [...matches]; next[index] = { ...match, month: value }; update("matches", next); }} /><Field label="Jogo" value={match.game} onChange={(value) => { const next = [...matches]; next[index] = { ...match, game: value }; update("matches", next); }} /><Field label="Adversário" value={match.opponent} onChange={(value) => { const next = [...matches]; next[index] = { ...match, opponent: value }; update("matches", next); }} /><Field label="Status" value={match.status} onChange={(value) => { const next = [...matches]; next[index] = { ...match, status: value }; update("matches", next); }} /><Field label="Horário" value={match.score} onChange={(value) => { const next = [...matches]; next[index] = { ...match, score: value }; update("matches", next); }} /></div></div>)}<button className="master-add" onClick={() => update("matches", [...matches, { date: "00", month: "MÊS", opponent: "Novo adversário", game: "Novo jogo", status: "A DEFINIR", score: "—" }])}>+ Adicionar confronto</button></div>;
}

function NewsEditor({ content, update }: { content: SiteContent; update: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void }) {
  const news = content.news;
  return <div className="master-list">{news.map((item, index) => <div className="master-card news-edit-card" key={`${item.title}-${index}`}><div className="master-card-number">0{index + 1}</div><div className="field-grid compact"><Field label="Título" value={item.title} onChange={(value) => { const next = [...news]; next[index] = { ...item, title: value }; update("news", next); }} /><Field label="Categoria" value={item.category} onChange={(value) => { const next = [...news]; next[index] = { ...item, category: value }; update("news", next); }} /><Field label="Data" value={item.date} onChange={(value) => { const next = [...news]; next[index] = { ...item, date: value }; update("news", next); }} /><Field label="Resumo" value={item.excerpt} onChange={(value) => { const next = [...news]; next[index] = { ...item, excerpt: value }; update("news", next); }} textarea /></div></div>)}<button className="master-add" onClick={() => update("news", [...news, { title: "Nova notícia", category: "GERAL", date: "05 SET 2026", excerpt: "Escreva aqui o resumo da notícia.", featured: false }])}>+ Adicionar notícia</button></div>;
}

function StreamEditor({ content, update }: { content: SiteContent; update: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void }) {
  const streams = content.streams;
  return <div className="master-list">{streams.map((stream, index) => <div className="master-card" key={`${stream.title}-${index}`}><div className="master-card-number">0{index + 1}</div><div className="field-grid compact"><Field label="Título" value={stream.title} onChange={(value) => { const next = [...streams]; next[index] = { ...stream, title: value }; update("streams", next); }} /><Field label="Plataforma" value={stream.platform} onChange={(value) => { const next = [...streams]; next[index] = { ...stream, platform: value }; update("streams", next); }} /><Field label="Data e horário" value={stream.date} onChange={(value) => { const next = [...streams]; next[index] = { ...stream, date: value }; update("streams", next); }} /><Field label="URL do canal" value={stream.url} onChange={(value) => { const next = [...streams]; next[index] = { ...stream, url: value }; update("streams", next); }} /></div></div>)}<button className="master-add" onClick={() => update("streams", [...streams, { title: "Nova transmissão", platform: "Twitch", date: "A definir", url: "https://twitch.tv/", live: false }])}>+ Adicionar transmissão</button></div>;
}

function PartnerEditor({ content, update }: { content: SiteContent; update: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void }) {
  const partners = content.partners;
  return <div className="master-list">{partners.map((partner, index) => <div className="master-card" key={`${partner.name}-${index}`}><div className="master-card-number">0{index + 1}</div><div className="field-grid compact"><Field label="Nome" value={partner.name} onChange={(value) => { const next = [...partners]; next[index] = { ...partner, name: value }; update("partners", next); }} /><Field label="Categoria" value={partner.tier} onChange={(value) => { const next = [...partners]; next[index] = { ...partner, tier: value }; update("partners", next); }} /><Field label="Descrição" value={partner.description} onChange={(value) => { const next = [...partners]; next[index] = { ...partner, description: value }; update("partners", next); }} textarea /></div></div>)}<button className="master-add" onClick={() => update("partners", [...partners, { name: "NOVO PARCEIRO", tier: "APOIO OFICIAL", description: "Descreva a parceria." }])}>+ Adicionar parceiro</button></div>;
}
