import nodeCrypto from "crypto";

// Use the web browser Crypto API if you're on the client,
// otherwise use the Node.js Crypto API on the server
export const cryp = typeof window !== "undefined" ? window.crypto : nodeCrypto;
