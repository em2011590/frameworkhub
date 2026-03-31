"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Play, Copy, Check, Code2, Lock, Globe } from "lucide-react";
import { fadeUp, tabSlide } from "@/lib/animations";
import { clsx } from "clsx";
import { useSession } from "next-auth/react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const SNIPPETS: Record<string, { label: string; language: string; code: string }[]> = {
  react: [
    {
      label: "Hello World",
      language: "jsx",
      code: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;`,
    },
    {
      label: "useEffect Hook",
      language: "jsx",
      code: `import React, { useState, useEffect } from 'react';

function DataFetcher({ url }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, [url]);

  if (loading) return <div>Loading...</div>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}`,
    },
  ],
  vue: [
    {
      label: "Hello World",
      language: "html",
      code: `<template>
  <div class="app">
    <h1>{{ message }}</h1>
    <button @click="count++">
      Clicked {{ count }} times
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('Hello, Vue 3!');
const count = ref(0);
</script>

<style scoped>
.app { text-align: center; padding: 2rem; }
</style>`,
    },
  ],
  express: [
    {
      label: "Basic Server",
      language: "javascript",
      code: `const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store
let items = [];

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const item = { id: Date.now(), ...req.body };
  items.push(item);
  res.status(201).json(item);
});

app.delete('/items/:id', (req, res) => {
  items = items.filter((i) => i.id !== Number(req.params.id));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
});`,
    },
  ],
  fastapi: [
    {
      label: "REST API",
      language: "python",
      code: `from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI(title="Items API", version="1.0.0")

class Item(BaseModel):
    id: int = 0
    name: str
    price: float

items_db: List[Item] = []
counter = 0

@app.get("/items", response_model=List[Item])
async def get_items():
    return items_db

@app.post("/items", response_model=Item, status_code=201)
async def create_item(item: Item):
    global counter
    counter += 1
    item.id = counter
    items_db.append(item)
    return item

@app.delete("/items/{item_id}")
async def delete_item(item_id: int):
    global items_db
    items_db = [i for i in items_db if i.id != item_id]
    return {"success": True}`,
    },
  ],
};

const FRAMEWORK_TABS = Object.keys(SNIPPETS);

export default function PlaygroundPage() {
  const { data: session } = useSession();
  const [framework, setFramework] = useState("react");
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [code, setCode] = useState(SNIPPETS.react[0].code);
  const [copied, setCopied] = useState(false);

  const currentSnippets = SNIPPETS[framework] ?? [];
  const currentSnippet = currentSnippets[snippetIdx] ?? currentSnippets[0];

  const switchFramework = (fw: string) => {
    setFramework(fw);
    setSnippetIdx(0);
    setCode(SNIPPETS[fw]?.[0]?.code ?? "");
  };

  const switchSnippet = (idx: number) => {
    setSnippetIdx(idx);
    setCode(currentSnippets[idx]?.code ?? "");
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [isPrivate, setIsPrivate] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Code <span className="gradient-text">Playground</span>
          </h1>
          <p className="text-gray-400">Browse real code examples — edit inline and copy instantly.</p>
        </div>

        {/* Visibility Toggle (Pro) */}
        <div className="glass rounded-2xl p-4 border border-surface-border flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isPrivate ? "bg-accent-purple/20 text-purple-400" : "bg-white/5 text-gray-400"}`}>
              {isPrivate ? <Lock size={16} /> : <Globe size={16} />}
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                Snippet Visibility
                <span className="text-[9px] bg-accent-purple px-1 py-0.5 rounded text-white font-black uppercase tracking-tighter">Pro</span>
              </div>
              <p className="text-[10px] text-gray-500">{isPrivate ? "Private (Only you)" : "Public (Visible to all)"}</p>
            </div>
          </div>
          <button
            onClick={() => {
              if (session?.user?.plan !== "premium" && session?.user?.role !== "admin") {
                alert("Upgrade to Pro to make your playground snippets private!");
              } else {
                setIsPrivate(!isPrivate);
              }
            }}
            className={clsx(
              "relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none",
              isPrivate ? "bg-accent-purple" : "bg-white/10"
            )}
          >
            <span className={clsx("inline-block h-3 w-3 transform rounded-full bg-white transition-transform", isPrivate ? "translate-x-5" : "translate-x-1")} />
          </button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-3">
          <div className="glass rounded-2xl p-4 border border-surface-border">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Framework</div>
            <div className="space-y-1">
              {FRAMEWORK_TABS.map((fw) => (
                <button
                  key={fw}
                  onClick={() => switchFramework(fw)}
                  className={clsx(
                    "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize",
                    framework === fw
                      ? "bg-primary-500/20 text-primary-300 border border-primary-500/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {fw}
                </button>
              ))}
            </div>
          </div>

          {currentSnippets.length > 1 && (
            <div className="glass rounded-2xl p-4 border border-surface-border">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Snippets</div>
              <div className="space-y-1">
                {currentSnippets.map((snippet, idx) => (
                  <button
                    key={snippet.label}
                    onClick={() => switchSnippet(idx)}
                    className={clsx(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                      snippetIdx === idx
                        ? "bg-accent-purple/20 text-purple-300"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {snippet.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Editor */}
        <div className="lg:col-span-3">
          <div className="glass rounded-2xl border border-surface-border overflow-hidden" style={{ minHeight: 540 }}>
            {/* Editor header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-surface-border">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <Code2 size={14} className="text-gray-500" />
                <span className="text-gray-400 text-sm">{currentSnippet?.label}</span>
                <span className="text-xs text-gray-600 bg-white/5 px-2 py-0.5 rounded">
                  {currentSnippet?.language}
                </span>
              </div>
              <button onClick={copyCode} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors">
                {copied ? <Check size={12} className="text-accent-green" /> : <Copy size={12} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={`${framework}-${snippetIdx}`} variants={tabSlide} initial="hidden" animate="visible" exit="exit">
                <MonacoEditor
                  height="500px"
                  language={currentSnippet?.language ?? "javascript"}
                  value={code}
                  onChange={(val) => setCode(val ?? "")}
                  theme="vs-dark"
                  options={{
                    fontSize: 13,
                    fontFamily: "'JetBrains Mono', monospace",
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    padding: { top: 16, bottom: 16 },
                    lineNumbers: "on",
                    renderLineHighlight: "none",
                    tabSize: 2,
                    wordWrap: "on",
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
