/* import type { ConnectionState, proto, SocketConfig, WASocket } from '@adiwajshing/baileys';
import makeWASocket, {
  Browsers,
  DisconnectReason,
  isJidBroadcast,
  makeCacheableSignalKeyStore,
} from '@adiwajshing/baileys';
import type { Boom } from '@hapi/boom';
import { initStore, Store, useSession } from '@ookamiiixd/baileys-store';
import type { Response } from 'express';
// import { writeFile } from 'fs/promises';
// import { join } from 'path';
import { toDataURL } from 'qrcode';
import { logger, prisma } from './shared';

type Session = WASocket & {
  destroy: () => Promise<void>;
  store: Store;
};

const sessions = new Map<string, Session>();
const retries = new Map<string, number>();
const SSEQRGenerations = new Map<string, number>();

const RECONNECT_INTERVAL = Number(process.env.RECONNECT_INTERVAL || 0);
const MAX_RECONNECT_RETRIES = Number(process.env.MAX_RECONNECT_RETRIES || 5);
const SSE_MAX_QR_GENERATION = Number(process.env.SSE_MAX_QR_GENERATION || 5);
const SESSION_CONFIG_ID = 'session-config';


//     loading and initializing any existing sessions from the database and making them ready for use.
export async function init() {
  initStore({ prisma, logger });
  const sessions = await prisma.session.findMany({
    select: { sessionId: true, data: true },
    where: { id: { startsWith: SESSION_CONFIG_ID } },
  });

  for (const { sessionId, data } of sessions) {
    createSession({ sessionId, socketConfig: JSON.parse(data) });
  }
}


type createSessionOptions = {
  sessionId: string;
  res?: Response;
  SSE?: boolean;
  socketConfig?: SocketConfig;
};

// declare a function that returns a promise which creates a new session
export async function createSession(options: createSessionOptions) {

  // destructure the options object and assign default values
  const { sessionId, res, SSE = false, socketConfig } = options;

  // create a string identifier for this session
  const configID = `${SESSION_CONFIG_ID}-${sessionId}`;}





  const handleConnectionUpdate = SSE ? handleSSEConnectionUpdate : handleNormalConnectionUpdate;
  const { state, saveCreds } = await useSession(sessionId);
  const socket = makeWASocket({
    printQRInTerminal: true,
    browser: Browsers.ubuntu('Chrome'),
    generateHighQualityLinkPreview: true,
    ...socketConfig,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    logger,
    shouldIgnoreJid: (jid) => isJidBroadcast(jid),
    getMessage: async (key) => {
      const data = await prisma.message.findFirst({
        where: { remoteJid: key.remoteJid!, id: key.id!, sessionId },
      });
      return (data?.message || undefined) as proto.IMessage | undefined;
    },
  });

 

  const store = new Store(sessionId, socket.ev);
  sessions.set(sessionId, { ...socket, destroy, store });


  socket.ev.on('messages.upsert', ({ messages }) => {
    console.log('Mensagem recebida: ', messages)}) //send via socket.io


 */