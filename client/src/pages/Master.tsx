import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, ClipboardList, Download, FileText, LockKeyhole, LogOut, Play, RotateCcw, Save, Upload, Users } from "lucide-react";
import { Link } from "wouter";
import { defaultSiteContent, deleteApplication, loadApplications, loadSiteContent, resetSiteContent, saveSiteContent, type Application, type ApplicationStatus, type SiteContent } from "@/lib/siteContent";
import { appPath, assetPath } from "@/lib/paths";

const tabs = [
  { id: "conteudo", label: "Conteúdo", icon: FileText },
  { id: "equipe", label: "Equipe", icon: Users },
  { id: "agenda", label: "Agenda", icon: ClipboardList },
  { id: "resultados", label: "Resultados", icon: ClipboardList },
  { id: "noticias", label: "Notícias", icon: FileText },
  { id: "ao-vivo", label: "Ao vivo", icon: Play },
  { id: "parceiros", label: "Parceiros", icon: Users },
  { id: "candidaturas", label: "Candidaturas", icon: ClipboardList },
];

const MASTER_KEY = "msec-master-password";

export default function Master() {
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem(MASTER_KEY) === "ok");
  const [password, setPassword] = useState("");
  const [configured, setConfigured] = useState(() => Boolean(localStorage.getItem(MASTER_KEY + "-configured")));
  const [error, setError] = useState("");

  const enter = () => {
    if (!configured) {
      if (password.length < 6) return setError("Use pelo menos 6 caracteres.");
      localStorage.setItem(MASTER_KEY + "-configured", "true");
      localStorage.setItem(MASTER_KEY, password);
      sessionStorage.setItem(MASTER_KEY, "ok");
      setConfigured(true); setAuthenticated(true); setPassword(""); return;
    }
    if (password === localStorage.getItem(MASTER_KEY)) { sessionStorage.setItem(MASTER_KEY, "ok"); setAuthenticated(true); setError(""); setPassword(""); }
    else setError("Senha incorreta.");
  };
  if (!authenticated) return <section className="master-gate"><div className="master-gate-card"><LockKeyhole size={28} /><span className="master-kicker">MSEC TEAM / MASTER</span><h1>{configured ? "Área reservada." : "Crie sua senha."}</h1><p>{configured ? "Digite a senha local para editar o conteúdo da matilha." : "Esta proteção é local ao navegador. Para proteger entre dispositivos, conecte um backend de autenticação."}</p><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} onKeyDown={(event) => event.key === "Enter" && enter()} placeholder="Senha do Master" autoFocus /><button className="master-save" onClick={enter}>{configured ? "Entrar no Master" : "Criar senha e entrar"}</button>{error && <small className="gate-error">{error}</small>}<Link href={appPath("/")} className="master-back"><ArrowLeft size={15} /> Voltar ao site</Link></div></section>;
  return <MasterEditor onLogout={() => { sessionStorage.removeItem(MASTER_KEY); setAuthenticated(false); }} />;
}

function MasterEditor({ onLogout }: { onLogout: () => void }) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [activeTab, setActiveTab] = useState("conteudo");
  const [saved, setSaved] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => { setContent(loadSiteContent()); setApplications(loadApplications()); }, []);
  const update = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => setContent((current) => ({ ...current, [key]: value }));
  const save = () => { saveSiteContent(content); setSaved(true); window.setTimeout(() => setSaved(false), 2200); };
  const reset = () => { if (window.confirm("Restaurar todos os conteúdos originais?")) { resetSiteContent(); setContent(defaultSiteContent); } };
  const exportContent = () => { const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = "msec-conteudo.json"; anchor.click(); URL.revokeObjectURL(url); };
  const importContent = (event: React.ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { try { const imported = JSON.parse(String(reader.result)) as SiteContent; setContent({ ...defaultSiteContent, ...imported }); setSaved(false); } catch { window.alert("Arquivo inválido. Exporte um JSON pelo próprio Master."); } }; reader.readAsText(file); event.target.value = ""; };

  return <main className="master-shell">
    <aside className="master-sidebar">
      <Link href={appPath("/")} className="master-back"><ArrowLeft size={15} /> Voltar ao site</Link>
      <div className="master-brand"><img src={assetPath("msec-logo.png")} alt="MSEC — Me Sinto em Casa Esports" /><span>MSEC</span><em>MASTER</em></div>
      <p className="master-intro"><strong>Me Sinto em Casa.</strong><br />Painel de conteúdo<br />da matilha.</p>
      <nav className="master-tabs">{tabs.map((tab) => { const Icon = tab.icon; return <button className={activeTab === tab.id ? "master-tab active" : "master-tab"} key={tab.id} onClick={() => setActiveTab(tab.id)}><Icon size={16} /> {tab.label}</button>; })}</nav>
      <div className="master-note">As alterações são salvas neste navegador e aparecem na home imediatamente.</div>
    </aside>
    <section className="master-main">
      <header className="master-header"><div><span className="master-kicker">MSEC TEAM / MASTER</span><h1>{tabs.find((tab) => tab.id === activeTab)?.label}</h1></div><div className="master-actions"><button className="master-reset" onClick={reset}><RotateCcw size={14} /> Restaurar</button><button className="master-reset" onClick={exportContent}><Download size={14} /> Exportar</button><label className="master-reset file-import"><Upload size={14} /> Importar<input type="file" accept="application/json,.json" onChange={importContent} /></label><button className="master-save" onClick={save}>{saved ? <Check size={15} /> : <Save size={15} />} {saved ? "Salvo" : "Salvar alterações"}</button><button className="master-reset" onClick={onLogout}><LogOut size={14} /> Sair</button></div></header>
      {activeTab === "conteudo" && <ContentEditor content={content} update={update} />}
      {activeTab === "equipe" && <TeamEditor content={content} update={update} />}
      {activeTab === "agenda" && <ScheduleEditor content={content} update={update} />}
      {activeTab === "resultados" && <ScheduleEditor content={{ ...content, matches: content.results }} update={(key, value) => key === "matches" ? update("results", value as SiteContent["results"]) : update(key, value)} />}
      {activeTab === "noticias" && <NewsEditor content={content} update={update} />}
      {activeTab === "ao-vivo" && <StreamEditor content={content} update={update} />}
      {activeTab === "parceiros" && <PartnerEditor content={content} update={update} />}
      {activeTab === "candidaturas" && <ApplicationsEditor applications={applications} onDelete={(id) => setApplications(deleteApplication(id))} />}
    </section>
  </main>;
}

function ApplicationsEditor({ applications, onDelete }: { applications: Application[]; onDelete: (id: string) => void }) {
  const [game, setGame] = useState("TODOS");
  const [status, setStatus] = useState("TODOS");
  const [query, setQuery] = useState("");
  const [items, setItems] = useState(applications);
  useEffect(() => setItems(applications), [applications]);
  const updateStatus = (id: string, nextStatus: ApplicationStatus) => { const next = items.map((item) => item.id === id ? { ...item, status: nextStatus } : item); setItems(next); window.localStorage.setItem("msec-team-site-applications", JSON.stringify(next)); };
  const filtered = items.filter((item) => (game === "TODOS" || item.game === game) && (status === "TODOS" || (item.status || "NOVO") === status) && `${item.nickname} ${item.name} ${item.role}`.toLowerCase().includes(query.toLowerCase()));
  if (!applications.length) return <div className="master-empty"><ClipboardList size={28} /><h2>Nenhuma ficha ainda.</h2><p>As candidaturas enviadas pela página de peneira aparecem aqui neste navegador.</p><Link className="master-add" href={appPath("/tryout")}>Abrir página de peneira <ArrowUpRight size={14} /></Link></div>;
  const games = Array.from(new Set(items.map((item) => item.game)));
  return <div className="applications-wrap"><div className="application-filters"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar candidato..." /><select value={game} onChange={(event) => setGame(event.target.value)}><option>TODOS</option>{games.map((item) => <option key={item}>{item}</option>)}</select><select value={status} onChange={(event) => setStatus(event.target.value)}><option>TODOS</option><option>NOVO</option><option>EM ANÁLISE</option><option>APROVADO</option><option>ARQUIVADO</option></select><span className="application-count">{filtered.length} de {items.length}</span></div><div className="applications-list">{filtered.map((application) => <article className="application-card" key={application.id}><div className="application-top"><div><span className="master-kicker">{application.game} · {application.role}</span><h2>{application.nickname} <small>/{application.name}</small></h2></div><span className="application-date">{new Date(application.submittedAt).toLocaleDateString("pt-BR")}</span></div><div className="application-details"><span><b>IDADE</b>{application.age}</span><span><b>LOCAL</b>{application.location}</span><span><b>PERFIL</b>{application.profile || "Não informado"}</span></div><div className="application-actions"><select value={application.status || "NOVO"} onChange={(event) => updateStatus(application.id, event.target.value as ApplicationStatus)}><option>NOVO</option><option>EM ANÁLISE</option><option>APROVADO</option><option>ARQUIVADO</option></select><button className="master-reset" onClick={() => onDelete(application.id)}>Excluir ficha</button></div></article>)}</div></div>;
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
