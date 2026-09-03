"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, Play, Pause, Square, AlertCircle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArticleAudioPlayerProps {
  title: string;
  content: string;
  readTime?: string;
  className?: string;
}

// Clean markdown and extract natural, readable sentence chunks
function extractSentenceChunks(title: string, markdown: string): string[] {
  // 1. Remove images
  let text = markdown.replace(/!\[.*?\]\(.*?\)/g, "");

  // 2. Remove markdown links [text](url) -> text
  text = text.replace(/\[(.*?)\]\(.*?\)/g, "$1");

  // 3. Remove headers and dividers
  text = text.replace(/^#{1,6}\s+/gm, "");
  text = text.replace(/^---\s*$/gm, "");

  // 4. Remove bold / italic formatting
  text = text.replace(/[*_]{1,3}(.*?)[*_]{1,3}/g, "$1");

  // 5. Remove list markers
  text = text.replace(/^[-*+]\s+/gm, "").replace(/^\d+\.\s+/gm, "");

  // Combine title with body
  const fullText = `${title}. ${text}`.replace(/\s+/g, " ").trim();

  // Split into manageable sentences (~100-200 chars) for SpeechSynthesis stability
  const rawSentences = fullText.match(/[^.!?]+[.!?]+(\s+|$)|[^.!?]+$/g) || [fullText];
  const chunks: string[] = [];

  for (const s of rawSentences) {
    const trimmed = s.trim();
    if (trimmed.length > 0) {
      // If a single sentence is extremely long (>250 chars), break on commas or clauses
      if (trimmed.length > 250) {
        const subParts = trimmed.match(/[^,;:]+[,;:]+(\s+|$)|[^,;:]+$/g) || [trimmed];
        for (const sp of subParts) {
          const spTrimmed = sp.trim();
          if (spTrimmed) chunks.push(spTrimmed);
        }
      } else {
        chunks.push(trimmed);
      }
    }
  }

  return chunks;
}

export default function ArticleAudioPlayer({
  title,
  content,
  readTime = "8 min",
  className,
}: ArticleAudioPlayerProps) {
  const [supported, setSupported] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);

  const chunksRef = useRef<string[]>([]);
  const chunkIndexRef = useRef(0);
  const isPlayingRef = useRef(false);
  const isPausedRef = useRef(false);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const heartbeatTimerRef = useRef<NodeJS.Timeout | null>(null);
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Initialize SpeechSynthesis support and voice selection
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }

    const synth = window.speechSynthesis;

    const updateVoices = () => {
      const voices = synth.getVoices();
      if (voices.length > 0) {
        // Prefer natural high quality English voices (Google US English, Samantha, Microsoft Natural)
        const naturalEnglish = voices.find(
          (v) =>
            v.lang.startsWith("en") &&
            (v.name.includes("Natural") ||
              v.name.includes("Google") ||
              v.name.includes("Samantha") ||
              v.name.includes("Premium"))
        );
        selectedVoiceRef.current = naturalEnglish || voices.find((v) => v.lang.startsWith("en")) || voices[0];
      }
    };

    updateVoices();
    if ("onvoiceschanged" in synth) {
      synth.onvoiceschanged = updateVoices;
    }

    return () => {
      if ("onvoiceschanged" in synth) {
        synth.onvoiceschanged = null;
      }
    };
  }, []);

  // Prepare text chunks
  useEffect(() => {
    const chunks = extractSentenceChunks(title, content);
    chunksRef.current = chunks;
    setTotalChunks(chunks.length);
  }, [title, content]);

  // Chrome 14-second SpeechSynthesis heartbeat to prevent engine timeout
  const startHeartbeat = useCallback(() => {
    if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
    heartbeatTimerRef.current = setInterval(() => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const synth = window.speechSynthesis;
        if (synth.speaking && !synth.paused) {
          synth.pause();
          synth.resume();
        }
      }
    }, 10000);
  }, []);

  const stopHeartbeat = useCallback(() => {
    if (heartbeatTimerRef.current) {
      clearInterval(heartbeatTimerRef.current);
      heartbeatTimerRef.current = null;
    }
  }, []);

  // Speak a specific chunk index sequentially
  const speakChunk = useCallback(
    (index: number) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      const synth = window.speechSynthesis;

      if (index >= chunksRef.current.length) {
        // Finished entire article
        synth.cancel();
        stopHeartbeat();
        isPlayingRef.current = false;
        isPausedRef.current = false;
        chunkIndexRef.current = 0;
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentChunkIndex(0);
        return;
      }

      chunkIndexRef.current = index;
      setCurrentChunkIndex(index);

      const utterance = new SpeechSynthesisUtterance(chunksRef.current[index]);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = "en-US";

      if (selectedVoiceRef.current) {
        utterance.voice = selectedVoiceRef.current;
      }

      utterance.onstart = () => {
        isPlayingRef.current = true;
        isPausedRef.current = false;
        setIsPlaying(true);
        setIsPaused(false);
      };

      utterance.onend = () => {
        if (isPlayingRef.current && !isPausedRef.current) {
          speakChunk(index + 1);
        }
      };

      utterance.onerror = (e) => {
        if (e.error !== "canceled" && e.error !== "interrupted") {
          // If a single chunk encounters an error, proceed smoothly to next chunk
          if (isPlayingRef.current && !isPausedRef.current) {
            speakChunk(index + 1);
          }
        }
      };

      // Retain utterance ref to prevent garbage collection cut-out in Chrome
      activeUtteranceRef.current = utterance;
      synth.speak(utterance);
    },
    [stopHeartbeat]
  );

  // Play / Start speech
  const handlePlay = useCallback(() => {
    if (!supported || typeof window === "undefined") return;
    const synth = window.speechSynthesis;

    if (isPaused) {
      // Resume paused speech
      synth.resume();
      isPlayingRef.current = true;
      isPausedRef.current = false;
      setIsPlaying(true);
      setIsPaused(false);
      startHeartbeat();
      return;
    }

    // Cancel any previous residual speech and start fresh from chunk 0 (or current index)
    synth.cancel();
    isPlayingRef.current = true;
    isPausedRef.current = false;
    setIsPlaying(true);
    setIsPaused(false);
    startHeartbeat();
    speakChunk(chunkIndexRef.current);
  }, [isPaused, speakChunk, startHeartbeat, supported]);

  // Pause speech
  const handlePause = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    synth.pause();
    stopHeartbeat();
    isPlayingRef.current = false;
    isPausedRef.current = true;
    setIsPlaying(false);
    setIsPaused(true);
  }, [stopHeartbeat]);

  // Stop speech completely
  const handleStop = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    stopHeartbeat();
    isPlayingRef.current = false;
    isPausedRef.current = false;
    chunkIndexRef.current = 0;
    activeUtteranceRef.current = null;
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentChunkIndex(0);
  }, [stopHeartbeat]);

  // Restart speech from beginning
  const handleRestart = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    chunkIndexRef.current = 0;
    setCurrentChunkIndex(0);
    handlePlay();
  }, [handlePlay]);

  // Clean up on component unmount or route transition
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      stopHeartbeat();
    };
  }, [stopHeartbeat]);

  if (!supported) {
    return (
      <div
        className={cn(
          "p-3.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl text-xs font-mono text-[var(--text-muted)] flex items-center gap-2",
          className
        )}
      >
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
        <span>Audio playback isn&apos;t supported in this browser.</span>
      </div>
    );
  }

  const progressPercent =
    totalChunks > 0 ? Math.round(((currentChunkIndex + 1) / totalChunks) * 100) : 0;

  return (
    <div
      className={cn(
        "p-4 sm:p-5 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl select-none transition-all duration-300 relative overflow-hidden",
        isPlaying && "border-[#7C3AED]/70 shadow-[0_0_25px_rgba(124,58,237,0.18)]",
        className
      )}
      role="region"
      aria-label="Listen to this article"
    >
      {/* Subtle background audio progress bar */}
      {(isPlaying || isPaused) && (
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#7C3AED] to-[#FF6A00] transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* State / Icon / Label */}
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0",
              isPlaying
                ? "bg-[#7C3AED] text-white border-[#7C3AED] shadow-[0_0_12px_rgba(124,58,237,0.5)]"
                : isPaused
                ? "bg-[var(--section-bg)] text-[#FF6A00] border-[#FF6A00]/40"
                : "bg-[var(--section-bg)] text-[var(--text-muted)] border-[var(--border)]"
            )}
          >
            <Volume2 className={cn("w-4 h-4", isPlaying && "animate-pulse")} />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--text-primary)]">
                Listen to this article
              </span>
              {isPlaying && (
                <span className="text-[10px] font-mono px-2 py-0.2 bg-[#7C3AED]/20 text-[#C4B5FD] border border-[#7C3AED]/40 rounded-full animate-pulse">
                  Playing {progressPercent}%
                </span>
              )}
              {isPaused && (
                <span className="text-[10px] font-mono px-2 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
                  Paused
                </span>
              )}
            </div>

            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              {isPlaying
                ? "Streaming Web Speech narration"
                : isPaused
                ? "Narration paused — click Resume"
                : `Native browser voice (${readTime})`}
            </span>
          </div>

          {/* Animated Wave Equalizer when active */}
          {isPlaying && (
            <div className="hidden md:flex items-center gap-0.5 h-3.5 ml-2">
              <span className="w-0.5 bg-[#7C3AED] rounded-full animate-bounce [animation-delay:-0.35s] h-3.5" />
              <span className="w-0.5 bg-[#7C3AED] rounded-full animate-bounce [animation-delay:-0.15s] h-2" />
              <span className="w-0.5 bg-[#7C3AED] rounded-full animate-bounce [animation-delay:-0.45s] h-4" />
              <span className="w-0.5 bg-[#7C3AED] rounded-full animate-bounce [animation-delay:-0.2s] h-2.5" />
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {!isPlaying ? (
            <button
              onClick={handlePlay}
              className="px-3.5 py-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-md font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(124,58,237,0.4)]"
              aria-label={isPaused ? "Resume listening" : "Play article audio"}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isPaused ? "Resume" : `Play (${readTime})`}</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="px-3.5 py-1.5 bg-[var(--section-bg)] hover:bg-[var(--card-bg-hover)] border border-[#7C3AED] text-[var(--text-primary)] rounded-md font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer"
              aria-label="Pause listening"
            >
              <Pause className="w-3.5 h-3.5 text-[#FF6A00] fill-[#FF6A00]" />
              <span>Pause</span>
            </button>
          )}

          {(isPlaying || isPaused) && (
            <>
              <button
                onClick={handleRestart}
                className="px-2.5 py-1.5 bg-[var(--section-bg)] hover:bg-[var(--card-bg-hover)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-md font-semibold inline-flex items-center gap-1 transition-all cursor-pointer"
                aria-label="Restart audio from beginning"
                title="Restart"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Restart</span>
              </button>

              <button
                onClick={handleStop}
                className="px-2.5 py-1.5 bg-[var(--section-bg)] hover:bg-[var(--card-bg-hover)] border border-[var(--border)] hover:border-red-500/60 text-[var(--text-muted)] hover:text-red-400 rounded-md font-semibold inline-flex items-center gap-1 transition-all cursor-pointer"
                aria-label="Stop audio"
                title="Stop audio"
              >
                <Square className="w-3 h-3 fill-current" />
                <span className="hidden sm:inline">Stop</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
