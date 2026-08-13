'use client';

import React, { useRef, useState, useEffect } from 'react';

interface CameraCaptureProps {
  onCapture: (dataUrl: string) => void;
  onClose: () => void;
}

export default function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function startCamera() {
      try {
        setLoading(true);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: 480, height: 480 },
          audio: false,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setLoading(false);
      } catch (err: unknown) {
        console.error('Camera access error:', err);
        setError('Could not access camera. Please allow camera permissions.');
        setLoading(false);
      }
    }

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = 480;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Draw centered square crop from video
      ctx.drawImage(videoRef.current, 0, 0, 480, 480);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      onCapture(dataUrl);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-[#0A2B1D] border-2 border-[#E8B83D] rounded-2xl p-6 max-w-md w-full flex flex-col items-center gap-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#FAF5E8]/60 hover:text-white font-mono text-xl"
        >
          ×
        </button>

        <h3 className="font-serif font-black text-xl text-[#E8B83D] uppercase">TAKE A PHOTO</h3>
        <p className="font-mono text-[10px] text-[#FAF5E8]/60 text-center uppercase tracking-wide">
          Center your face inside the preview and snap your pass photo
        </p>

        {/* Video feed container */}
        <div className="relative w-64 h-64 rounded-full border-4 border-[#355C48] overflow-hidden bg-black flex items-center justify-center">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-4 border-t-[#E8B83D] border-white/10 animate-spin" />
            </div>
          )}

          {error ? (
            <p className="text-red-400 font-mono text-xs text-center px-4">{error}</p>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover scale-x-[-1]"
            />
          )}
        </div>

        {/* Capture Buttons */}
        <div className="flex gap-4 w-full mt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full border border-[#FAF5E8]/20 text-[#FAF5E8]/60 hover:text-white font-mono text-xs uppercase transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCapture}
            disabled={loading || !!error}
            className="flex-1 py-3 rounded-full bg-[#E8B83D] text-[#0A2B1D] font-mono font-bold text-xs uppercase hover:bg-[#E8B83D]/90 disabled:opacity-50 transition-colors shadow-lg shadow-[#E8B83D]/10"
          >
            Capture
          </button>
        </div>
      </div>
    </div>
  );
}
