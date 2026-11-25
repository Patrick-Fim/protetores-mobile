// Regras de perfil compartilhadas pelas telas e pelos serviços de dados.
import { sequenciaAtual } from './datas';

// Perfil inicial de quem acabou de criar a conta (sem e-mail: o perfil é público).
export function perfilNovo(usuario = {}, nomeInformado = '') {
  const doEmail = (usuario.email || '').split('@')[0];
  const nome = (nomeInformado || usuario.nome || doEmail || 'Protetor').trim().slice(0, 60);
  return {
    nome,
    nomeProvisorio: !(nomeInformado || usuario.nome),
    bio: '',
    cidade: '',
    anel: 'terra',
    avatarId: null,
    bannerId: null,
    xp: 0,
    xpPorPeriodo: {},
    missoesCriadas: 0,
    missoesLideradas: 0,
    engajadas: [],
    concluidas: [],
    aneisConcluidos: [],
    sequencia: 0,
    melhorSequencia: 0,
    ultimoAcesso: null,
    criadoEm: new Date().toISOString(),
  };
}

// Perfil completo do próprio usuário.
export function perfilProprio(uid, dados = {}) {
  const seguro = dados || {};
  return { uid, ...seguro, sequenciaAtual: sequenciaAtual(seguro) };
}

// Dados que aparecem para outras pessoas (ranking, membros).
export function perfilPublico(uid, dados = {}) {
  const seguro = dados || {};
  return {
    uid,
    nome: seguro.nome || 'Protetor',
    anel: seguro.anel || 'terra',
    avatarId: seguro.avatarId || null,
    bannerId: seguro.bannerId || null,
    cidade: seguro.cidade || '',
    xp: seguro.xp || 0,
    sequenciaAtual: sequenciaAtual(seguro),
    concluidas: (seguro.concluidas || []).length,
    missoesCriadas: seguro.missoesCriadas || 0,
    missoesLideradas: seguro.missoesLideradas || 0,
    criadoEm: seguro.criadoEm || null,
  };
}