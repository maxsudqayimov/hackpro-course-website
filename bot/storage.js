import fs from 'node:fs/promises';
import path from 'node:path';

const dataDir = path.resolve(process.env.BOT_DATA_DIR || './bot/data');
const leadsFile = path.join(dataDir, 'leads.json');
const inquiriesFile = path.join(dataDir, 'inquiries.json');
const stateFile = path.join(dataDir, 'state.json');

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(leadsFile);
  } catch {
    await fs.writeFile(leadsFile, '[]\n', 'utf8');
  }

  try {
    await fs.access(inquiriesFile);
  } catch {
    await fs.writeFile(inquiriesFile, '[]\n', 'utf8');
  }

  try {
    await fs.access(stateFile);
  } catch {
    await fs.writeFile(stateFile, '{}\n', 'utf8');
  }
}

export async function readLeads() {
  await ensureStore();
  const content = await fs.readFile(leadsFile, 'utf8');
  return JSON.parse(content || '[]');
}

export async function saveLead(lead) {
  const leads = await readLeads();
  const savedLead = {
    id: `lead_${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'new',
    ...lead,
  };

  leads.unshift(savedLead);
  await fs.writeFile(leadsFile, `${JSON.stringify(leads, null, 2)}\n`, 'utf8');
  return savedLead;
}

export async function getLeadStats() {
  const leads = await readLeads();
  const byCourse = leads.reduce((acc, lead) => {
    acc[lead.course] = (acc[lead.course] || 0) + 1;
    return acc;
  }, {});

  return {
    total: leads.length,
    latest: leads[0],
    byCourse,
  };
}

export async function saveInquiry(inquiry) {
  await ensureStore();
  const content = await fs.readFile(inquiriesFile, 'utf8');
  const inquiries = JSON.parse(content || '[]');
  const savedInquiry = {
    id: `inquiry_${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'new',
    ...inquiry,
  };

  inquiries.unshift(savedInquiry);
  await fs.writeFile(inquiriesFile, `${JSON.stringify(inquiries, null, 2)}\n`, 'utf8');
  return savedInquiry;
}

export async function readState() {
  await ensureStore();
  const content = await fs.readFile(stateFile, 'utf8');
  return JSON.parse(content || '{}');
}

export async function saveState(nextState) {
  await ensureStore();
  const currentState = await readState();
  const state = {
    ...currentState,
    ...nextState,
    savedAt: new Date().toISOString(),
  };

  await fs.writeFile(stateFile, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
  return state;
}
