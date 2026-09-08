import { useEffect, useState } from "react";

export type Player = { tag: string; role: string; number: string; accent: string; realName?: string; social?: string };
export type Match = { date: string; month: string; opponent: string; game: string; status: string; score: string };
export type News = { title: string; category: string; date: string; excerpt: string; featured?: boolean };
export type Stream = { title: string; platform: string; date: string; url: string; live: boolean };
export type Partner = { name: string; tier: string; description: string };

export type SiteContent = {
  heroTitle: string; heroAccent: string; heroCopy: string;
  manifestoTitle: string; manifestoAccent: string; manifestoLead: string; manifestoBody: string;
  communityTitle: string; communityAccent: string; communityBody: string;
  players: Player[]; matches: Match[]; results: Match[]; news: News[]; streams: Stream[]; partners: Partner[];
};

export const defaultSiteContent: SiteContent = {
  heroTitle: "Joga mal.", heroAccent: "Compete muito.", heroCopy: "A casa dos piores jogadores e das melhores histórias. MSEC TEAM é comunidade, caos e competição do nosso jeito.",
  manifestoTitle: "Sem pose.", manifestoAccent: "Só presença.", manifestoLead: "Não somos a organização mais séria da sala — e é exatamente por isso que você vai lembrar da gente.", manifestoBody: "Da resenha no Discord ao último round da partida, a MSEC existe para quem joga pelo jogo. Uma comunidade brasileira, competitiva quando precisa e caótica por natureza.",
  communityTitle: "Entra no", communityAccent: "canil.", communityBody: "Partidas, memes, calls duvidosas e aquela resenha que só quem é da matilha entende.",
  players: [
    { tag: "ROBSON", role: "PLAYER", number: "01", accent: "#b9d79d", realName: "Robson", social: "@robson.barrxs" },
    { tag: "KEVIN", role: "PLAYER", number: "02", accent: "#e6d9b7", realName: "Kevin", social: "@kevin" },
    { tag: "YURI", role: "PLAYER", number: "03", accent: "#90b67c", realName: "Yuri", social: "@yuri" },
    { tag: "GOTARDO", role: "PLAYER", number: "04", accent: "#c8d6a8", realName: "Gotardo", social: "@gotardo" },
    { tag: "NATAN", role: "PLAYER", number: "05", accent: "#d9cba8", realName: "Natan", social: "@natan" },
    { tag: "T2T", role: "PLAYER", number: "06", accent: "#a8c68e", realName: "T2T", social: "@t2t" },
  ],
  matches: [
    { date: "18", month: "SET", opponent: "Wolves United", game: "EA FC 26", status: "PRÓXIMO", score: "20:30" },
    { date: "24", month: "SET", opponent: "Nox Academy", game: "Valorant", status: "SCRIM", score: "21:00" },
    { date: "02", month: "OUT", opponent: "A definir", game: "Rocket League", status: "EM BREVE", score: "—" },
  ],
  results: [
    { date: "12", month: "SET", opponent: "Red Wolves", game: "EA FC 26", status: "VITÓRIA", score: "3 — 1" },
    { date: "08", month: "SET", opponent: "Nox Academy", game: "Valorant", status: "DERROTA", score: "1 — 2" },
    { date: "31", month: "AGO", opponent: "Fênix Club", game: "Rocket League", status: "VITÓRIA", score: "2 — 0" },
  ],
  news: [
    { title: "A matilha está completa", category: "ROSTER", date: "05 SET 2026", excerpt: "Robson, Kevin, Yuri, Gotardo, Natan e T2T formam a nova linha de frente da MSEC TEAM.", featured: true },
    { title: "Bem-vindo ao canil", category: "COMUNIDADE", date: "01 SET 2026", excerpt: "Nosso Discord está aberto para quem joga sério — ou pelo menos tenta.", featured: false },
    { title: "MSEC entra em campo", category: "COMPETIÇÃO", date: "28 AGO 2026", excerpt: "A temporada começa com novos desafios, novas calls e a mesma resenha.", featured: false },
  ],
  streams: [
    { title: "MSEC TEAM vs Wolves United", platform: "Twitch", date: "18 SET · 20:30", url: "https://twitch.tv/", live: false },
    { title: "Watch party da matilha", platform: "YouTube", date: "24 SET · 21:00", url: "https://youtube.com/", live: false },
  ],
  partners: [
    { name: "SUA MARCA", tier: "PARCEIRO PRINCIPAL", description: "Posicione sua marca ao lado da nova geração da MSEC TEAM." },
    { name: "MSEC COMMUNITY", tier: "APOIO OFICIAL", description: "Projetos, eventos e ativações que movimentam a nossa comunidade." },
    { name: "ME SINTO EM CASA", tier: "ORIGEM", description: "Uma matilha brasileira, feita por quem joga junto." },
  ],
};

const STORAGE_KEY = "msec-team-site-content";
export function loadSiteContent(): SiteContent { if (typeof window === "undefined") return defaultSiteContent; try { const saved = window.localStorage.getItem(STORAGE_KEY); return saved ? { ...defaultSiteContent, ...JSON.parse(saved) } : defaultSiteContent; } catch { return defaultSiteContent; } }
export function saveSiteContent(content: SiteContent) { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content)); }
export function resetSiteContent() { window.localStorage.removeItem(STORAGE_KEY); }
export function useSiteContent() { const [content, setContent] = useState<SiteContent>(defaultSiteContent); useEffect(() => setContent(loadSiteContent()), []); return content; }
