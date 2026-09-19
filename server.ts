import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin with resilient path detection and fallback for Vercel
const defaultConfig = {
  projectId: "gen-lang-client-0760041056",
  appId: "1:109129506162:web:8a571f25b498288733d1eb",
  apiKey: "AIzaSyBYJONFygLMw3Qs-VoOkCXag4PqzNIRY_g",
  authDomain: "gen-lang-client-0760041056.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-c7e2b841-ab65-4dbb-82a8-08b63a746bc4",
  storageBucket: "gen-lang-client-0760041056.firebasestorage.app",
  messagingSenderId: "109129506162",
  measurementId: ""
};

let firebaseConfig = defaultConfig;
try {
  const possiblePaths = [
    path.join(process.cwd(), "firebase-applet-config.json"),
    path.join(__dirname, "firebase-applet-config.json"),
    path.join(__dirname, "..", "firebase-applet-config.json"),
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      firebaseConfig = JSON.parse(fs.readFileSync(p, "utf8"));
      break;
    }
  }
} catch (e) {
  console.warn("Using fallback Firebase configuration:", e);
}

let firebaseApp: admin.app.App;
const targetProjectId = firebaseConfig.projectId;
console.log("Target Project ID:", targetProjectId);

if (!admin.apps.length) {
  // Explicitly use the project ID from the config to avoid mismatch with the environment
  firebaseApp = admin.initializeApp({
    projectId: targetProjectId,
  });
  console.log("Firebase Admin initialized with Project ID:", targetProjectId);
} else {
  firebaseApp = admin.apps[0]!;
}

// Initialize Firestore with the specific database ID if provided, otherwise use default
let db: any;
try {
  const dbId = firebaseConfig.firestoreDatabaseId || '(default)';
  console.log(`Initializing Firestore with database ID: ${dbId}`);
  db = getFirestore(firebaseApp, dbId);
} catch (e) {
  console.error("Failed to initialize Firestore with database ID, falling back to default:", e);
  db = getFirestore(firebaseApp);
}

// Add a test query to check connectivity on startup
async function testFirestore() {
  try {
    const testDoc = await db.collection("settings").doc("global").get();
    if (testDoc.exists) {
      console.log("Firestore connectivity test (Admin SDK) successful.");
    }
  } catch (e: any) {
    // Only log if it's NOT a permission error, to keep logs clean
    if (!e.message?.includes("PERMISSION_DENIED")) {
      console.warn("Firestore connectivity test (Admin SDK) failed:", e.message);
    }
    
    if (firebaseConfig.firestoreDatabaseId) {
      try {
        const defaultDb = getFirestore(firebaseApp);
        const testDoc = await defaultDb.collection("settings").doc("global").get();
        if (testDoc.exists) {
          console.log("Firestore connectivity test (Admin SDK - default DB) successful.");
          db = defaultDb; // Switch to default DB if it works
        }
      } catch (e2: any) {
        if (!e2.message?.includes("PERMISSION_DENIED")) {
          console.warn("Firestore connectivity test (Admin SDK - default DB) failed:", e2.message);
        }
      }
    }
  }
}
testFirestore();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());

// Duel Matchmaking State (Note: Socket.IO will NOT work on Vercel Serverless Functions)
let waitingPlayer: { id: string, name: string, socketId: string } | null = null;
const activeDuels = new Map<string, any>();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_duel_queue", (userData) => {
    if (waitingPlayer && waitingPlayer.socketId !== socket.id) {
      // Match found
      const duelId = `duel_${Date.now()}`;
      const duelData = {
        id: duelId,
        player1: waitingPlayer,
        player2: { ...userData, socketId: socket.id },
        status: 'starting',
        questions: [], 
        scores: { [waitingPlayer.socketId]: 0, [socket.id]: 0 }
      };
      
      activeDuels.set(duelId, duelData);
      
      io.to(waitingPlayer.socketId).emit("duel_matched", duelData);
      io.to(socket.id).emit("duel_matched", duelData);
      
      waitingPlayer = null;
    } else {
      waitingPlayer = { ...userData, socketId: socket.id };
      socket.emit("waiting_for_opponent");
    }
  });

  socket.on("duel_score_update", ({ duelId, score }) => {
    const duel = activeDuels.get(duelId);
    if (duel) {
      duel.scores[socket.id] = score;
      const opponentId = duel.player1.socketId === socket.id ? duel.player2.socketId : duel.player1.socketId;
      io.to(opponentId).emit("opponent_score_update", { score });
    }
  });

  socket.on("duel_complete", ({ duelId }) => {
    const duel = activeDuels.get(duelId);
    if (duel) {
      const opponentId = duel.player1.socketId === socket.id ? duel.player2.socketId : duel.player1.socketId;
      io.to(opponentId).emit("opponent_finished");
    }
  });

  socket.on("disconnect", () => {
    if (waitingPlayer?.socketId === socket.id) {
      waitingPlayer = null;
    }
    activeDuels.forEach((duel, duelId) => {
      if (duel.player1.socketId === socket.id || duel.player2.socketId === socket.id) {
        const opponentId = duel.player1.socketId === socket.id ? duel.player2.socketId : duel.player1.socketId;
        io.to(opponentId).emit("opponent_disconnected");
        activeDuels.delete(duelId);
      }
    });
  });
});

const ADMIN_EMAILS = ["pjoaquim1705@gmail.com"];
const ADMIN_NAME = "Pedro Joaquim";

const checkAdmin = (req: any) => {
  const isAdmin = req.query.isAdmin === "true" || req.body.isAdmin === true;
  const email = req.query.email || req.body.email;
  const name = req.body.name; 
  
  return isAdmin && (ADMIN_EMAILS.includes(email) || name === ADMIN_NAME);
};

import { initializeApp as initializeClientApp } from "firebase/app";
import { getFirestore as getClientFirestore, doc as getClientDoc, getDoc as getClientGetDoc, setDoc as getClientSetDoc } from "firebase/firestore";

const clientApp = initializeClientApp(firebaseConfig);
const clientDb = getClientFirestore(clientApp, firebaseConfig.firestoreDatabaseId);

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// API Routes using Firestore
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.post("/api/book/page", async (req, res) => {
  const { title, author, pageNumber, category } = req.body;
  
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "GEMINI_API_KEY not configured on server" });
  }

  const prompt = `Você é o sistema avançado de processamento de texto do Armário PedroJoaquim.
O usuário está lendo a página ${pageNumber} da obra prima "${title}" (Categoria: ${category}), escrita pelo autor ${author}.

Sua missão absoluta: 
1. Gere o conteúdo técnico que REALMENTE estaria nesta página específica.
2. Use o estilo literário, vocabulário técnico e o tom de voz característico de ${author}.
3. Se a página for 1, apresente o sumário executivo ou o prefácio técnico.
4. Se for após a página 10, foque em análises clínicas densas, tabelas descritivas (em formato de texto) e raciocínio fisiopatológico.
5. O texto deve ter no mínimo 400 palavras para ser uma página completa e realista.

IMPORTANTE: Retorne APENAS um objeto JSON válido:
{
  "chapterTitle": "Título Clínico da Seção",
  "text": "Conteúdo denso e técnico simulando a página real...",
  "footerNote": "Uma citação profunda do autor ou uma pérola clínica relacionada ao texto"
}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    const text = response.text || "{}";
    
    // Extrai o JSON de forma robusta
    const jsonStr = text.replace(/```json|```/g, "").trim();
    const content = JSON.parse(jsonStr);

    res.json(content);
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to generate book content" });
  }
});

app.get("/api/settings", async (req, res) => {
  const defaultSettings = {
    coverImageGlobal: "https://lh3.googleusercontent.com/d/1n_zM13DJYSp6WpluuacxP-DPUjeeYY4C",
    isLocked: true
  };

  // Try Client SDK first for public settings (more reliable in this environment)
  try {
    const docRef = getClientDoc(clientDb, "settings", "global");
    const docSnap = await getClientGetDoc(docRef);
    if (docSnap.exists()) {
      return res.json(docSnap.data());
    }
  } catch (clientError: any) {
    // Only log if it's not a permission error or if we really need to know
    if (!clientError.message?.includes("PERMISSION_DENIED")) {
      console.warn("Client SDK settings fetch failed:", clientError.message);
    }
  }

  // Fallback to Admin SDK
  try {
    const doc = await db.collection("settings").doc("global").get();
    if (doc.exists) {
      return res.json(doc.data());
    }
  } catch (adminError: any) {
    // Suppress Admin SDK permission errors as they are expected in some sandboxes
    if (!adminError.message?.includes("PERMISSION_DENIED")) {
      console.error("Admin SDK settings fetch failed:", adminError.message);
    }
  }
  
  // Return defaults if both fail or document doesn't exist
  res.json(defaultSettings);
});

app.post("/api/settings", async (req, res) => {
  const { coverImageGlobal } = req.body;
  if (!checkAdmin(req)) return res.status(403).json({ error: "Unauthorized" });

  try {
    const docRef = db.collection("settings").doc("global");
    const doc = await docRef.get();
    const data = doc.exists ? doc.data() : { isLocked: false };
    
    if (data?.isLocked) return res.status(400).json({ error: "Locked" });
    
    await docRef.set({
      coverImageGlobal,
      isLocked: true
    }, { merge: true });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to save settings to Firestore" });
  }
});

app.get("/api/leaderboard", async (req, res) => {
  try {
    const snapshot = await db.collection("leaderboard").orderBy("score", "desc").limit(50).get();
    const leaderboard = snapshot.docs.map(doc => doc.data());
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: "Failed to read leaderboard from Firestore" });
  }
});

app.post("/api/leaderboard", async (req, res) => {
  const { name, score, level, completedCases, uid } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });

  try {
    const docId = uid || name; // Prefer UID if available
    await db.collection("leaderboard").doc(docId).set({
      name, score, level, completedCases, lastUpdate: new Date().toISOString()
    }, { merge: true });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to update leaderboard in Firestore" });
  }
});

app.get("/api/payments", async (req, res) => {
  const { email } = req.query;
  
  try {
    let query: any = db.collection("payments");
    
    if (checkAdmin(req)) {
      const snapshot = await query.get();
      return res.json(snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
    }
    
    if (email) {
      const snapshot = await query.where("userEmail", "==", email).get();
      return res.json(snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
    }
    
    res.status(403).json({ error: "Unauthorized" });
  } catch (error) {
    res.status(500).json({ error: "Failed to read payments from Firestore" });
  }
});

app.post("/api/payments", async (req, res) => {
  const { userId, name, date, status, userEmail } = req.body;
  if (!userId || !name) return res.status(400).json({ error: "Missing data" });

  try {
    const newPayment = { 
      userId, 
      name, 
      date, 
      status, 
      userEmail: userEmail || userId,
      createdAt: new Date().toISOString() 
    };
    const docRef = await db.collection("payments").add(newPayment);
    res.json({ success: true, payment: { ...newPayment, id: docRef.id } });
  } catch (error) {
    res.status(500).json({ error: "Failed to save payment to Firestore" });
  }
});

app.patch("/api/payments/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!checkAdmin(req)) return res.status(403).json({ error: "Unauthorized" });

  try {
    await db.collection("payments").doc(id).update({ status });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to update payment in Firestore" });
  }
});

app.get("/api/admin/stats", async (req, res) => {
  if (!checkAdmin(req)) return res.status(403).json({ error: "Unauthorized" });

  try {
    const leaderboardSnapshot = await db.collection("leaderboard").get();
    const paymentsSnapshot = await db.collection("payments").get();
    
    const leaderboard = leaderboardSnapshot.docs.map(doc => doc.data());
    const payments = paymentsSnapshot.docs.map(doc => doc.data());
    
    const totalUsers = leaderboard.length;
    const avgScore = totalUsers > 0 ? leaderboard.reduce((acc: number, curr: any) => acc + curr.score, 0) / totalUsers : 0;
    const totalRevenue = payments.filter((p: any) => p.status === "approved").length * 1500;
    
    res.json({
      totalUsers,
      avgScore: Math.round(avgScore),
      topUser: leaderboard[0] || null,
      activeUsers: totalUsers,
      totalRevenue
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats from Firestore" });
  }
});

app.post("/api/admin/reset-leaderboard", async (req, res) => {
  if (!checkAdmin(req)) return res.status(403).json({ error: "Unauthorized" });

  try {
    const snapshot = await db.collection("leaderboard").get();
    const batch = db.batch();
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
    res.json({ success: true, message: "Leaderboard reset successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to reset leaderboard in Firestore" });
  }
});

// Vite middleware for development (disabled in Vercel Serverless environment)
if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else if (!process.env.VERCEL) {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Export the app for Vercel Serverless Functions
export default app;

// Only listen if running as a standalone node server (not on Vercel)
if (!process.env.VERCEL && process.env.NODE_ENV !== "test") {
  const PORT = Number(process.env.PORT) || 3000;
  const HOST = '0.0.0.0';
  
  httpServer.listen(PORT, HOST, () => {
    console.log(`\n\x1b[32m✓ Server is running!\x1b[0m`);
    console.log(`\x1b[34m➜ Local:\x1b[0m    http://localhost:${PORT}`);
    console.log(`\x1b[34m➜ Network:\x1b[0m  http://0.0.0.0:${PORT}`);
    console.log(`\x1b[33m! Environment:\x1b[0m ${process.env.NODE_ENV || 'development'}\n`);
  });
}
