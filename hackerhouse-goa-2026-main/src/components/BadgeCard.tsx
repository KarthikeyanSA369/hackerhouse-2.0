'use client';

import React, { useRef, useState } from 'react';

interface BadgeCardProps {
  name?: string;
  skill?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  photoUrl?: string;
  zoom?: number;
  offsetX?: number;
  offsetY?: number;
  vibe?: string; // Goa Beach Poster, Sunset Horizon, Tropical Oasis, Azulejo Heritage, Hibiscus Palms, Coastal Sunset
  theme?: string; // Tropical Vintage, Tech Jungle, Sunset Gradient
  onCropChange?: (crop: { zoom: number; offsetX: number; offsetY: number }) => void;
  isInteractive?: boolean;
}

export default function BadgeCard({
  name = 'ENTER YOUR NAME',
  skill = 'ENTER YOUR STACK',
  github = '',
  twitter = '',
  linkedin = '',
  photoUrl = '',
  zoom = 1,
  offsetX = 0,
  offsetY = 0,
  vibe = 'Goa Beach Poster',
  theme = 'Tropical Vintage',
  onCropChange,
  isInteractive = true,
}: BadgeCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [currentOffset, setCurrentOffset] = useState({ x: offsetX, y: offsetY });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isInteractive || !photoUrl) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - currentOffset.x, y: e.clientY - currentOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isInteractive || !photoUrl) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    setCurrentOffset({ x: newX, y: newY });
    if (onCropChange) {
      onCropChange({ zoom, offsetX: newX, offsetY: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!isInteractive || !photoUrl) return;
    e.preventDefault();
    const zoomFactor = 0.05;
    const direction = e.deltaY < 0 ? 1 : -1;
    const newZoom = Math.max(1, Math.min(4, zoom + direction * zoomFactor));
    if (onCropChange) {
      onCropChange({ zoom: newZoom, offsetX: currentOffset.x, offsetY: currentOffset.y });
    }
  };

  // Touch support for mobile dragging
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isInteractive || !photoUrl || e.touches.length !== 1) return;
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX - currentOffset.x, y: touch.clientY - currentOffset.y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !isInteractive || !photoUrl || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const newX = touch.clientX - dragStart.x;
    const newY = touch.clientY - dragStart.y;
    setCurrentOffset({ x: newX, y: newY });
    if (onCropChange) {
      onCropChange({ zoom, offsetX: newX, offsetY: newY });
    }
  };

  // Render Vibe PFP Frame SVGs
  const renderVibeFrame = () => {
    switch (vibe) {
      case 'Sunset Horizon':
        return (
          <div className="absolute inset-0 rounded-full border-4 border-[#E8B83D] pointer-events-none z-10 flex items-center justify-center">
            {/* Sun Rays Frame */}
            <svg className="absolute w-[115%] h-[115%] animate-spin-slow text-[#E8B83D]/30 fill-current" viewBox="0 0 100 100">
              <path d="M50 0 L55 35 L90 10 L65 42 L100 50 L65 58 L90 90 L55 65 L50 100 L45 65 L10 90 L35 58 L0 50 L35 42 L10 10 L45 35 Z" />
            </svg>
          </div>
        );
      case 'Tropical Oasis':
        return (
          <div className="absolute inset-0 pointer-events-none z-10 scale-[1.12]">
            {/* Palm leaves frame */}
            <svg className="w-full h-full" viewBox="0 0 120 120" fill="none">
              <path d="M10 20 Q30 5 60 15 Q80 20 110 30" stroke="#355C48" strokeWidth="4" strokeLinecap="round" />
              <path d="M110 30 Q105 60 90 90 Q80 110 60 110" stroke="#355C48" strokeWidth="4" strokeLinecap="round" />
              <path d="M15 85 C30 110 80 115 105 85" stroke="#E26A7A" strokeWidth="3" strokeLinecap="round" />
              {/* Palm leaf veins */}
              <circle cx="25" cy="18" r="3" fill="#E8B83D" />
              <circle cx="95" cy="95" r="3" fill="#E8B83D" />
            </svg>
          </div>
        );
      case 'Azulejo Heritage':
        return (
          <div className="absolute inset-0 rounded-full border-8 border-double border-[#1E3A8A] pointer-events-none z-10">
            {/* Portuguese Blue Pattern */}
            <div className="absolute inset-[-4px] rounded-full border-2 border-white/80" />
          </div>
        );
      case 'Hibiscus Palms':
        return (
          <div className="absolute inset-0 pointer-events-none z-10 scale-[1.08]">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Hibiscus flowers */}
              <path d="M10,50 Q20,30 30,50 Q40,30 50,50 Q40,70 30,50 Q20,70 10,50" fill="#E26A7A" opacity="0.9" />
              <circle cx="30" cy="50" r="4" fill="#E8B83D" />
              <path d="M70,20 Q80,5 90,20 Q100,5 95,30 Q80,35 70,20" fill="#E26A7A" opacity="0.9" />
              <circle cx="85" cy="20" r="3" fill="#E8B83D" />
            </svg>
          </div>
        );
      case 'Coastal Sunset':
        return (
          <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#E26A7A] pointer-events-none z-10 animate-spin-slow" />
        );
      case 'Goa Beach Poster':
      default:
        return (
          <div className="absolute inset-0 rounded-full border-4 border-[#355C48] pointer-events-none z-10">
            <div className="absolute inset-0 rounded-full border border-[#E8B83D] m-1" />
          </div>
        );
    }
  };

  // Render Theme Templates
  const renderThemeContent = () => {
    switch (theme) {
      case 'Tech Jungle':
        return (
          <div className="w-full h-full bg-[#061d13] text-[#00FF66] flex flex-col justify-between p-6 relative border-4 border-[#00FF66]/30">
            {/* Circuit Background lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 10 H30 L40 20 H70 L80 30 H100 M20 100 V70 L30 60 H80 L90 50 V0" stroke="#00FF66" strokeWidth="0.5" fill="none" />
              <circle cx="30" cy="10" r="1.5" fill="#00FF66" />
              <circle cx="70" cy="20" r="1.5" fill="#00FF66" />
              <circle cx="30" cy="60" r="1.5" fill="#00FF66" />
            </svg>

            {/* Header */}
            <div className="flex justify-between items-start z-10">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#00FF66]/60">Hacker House Goa</h3>
                <h2 className="text-xl font-bold uppercase tracking-wider text-white">BUILDER ID</h2>
              </div>
              <span className="font-mono text-[9px] border border-[#00FF66]/40 px-2 py-0.5 rounded text-[#00FF66]/80">VERIFIED</span>
            </div>

            {/* Center Area */}
            <div className="flex items-center gap-6 z-10 my-auto">
              {/* Photo Frame */}
              <div className="relative w-28 h-28 flex-shrink-0">
                <div className="w-full h-full rounded-full bg-[#0a2b1d] border-2 border-[#00FF66] overflow-hidden relative cursor-move"
                     onMouseDown={handleMouseDown}
                     onMouseMove={handleMouseMove}
                     onMouseUp={handleMouseUp}
                     onMouseLeave={handleMouseUp}
                     onTouchStart={handleTouchStart}
                     onTouchMove={handleTouchMove}
                     onTouchEnd={handleMouseUp}
                     onWheel={handleWheel}
                >
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt="PFP"
                      className="absolute max-w-none select-none pointer-events-none"
                      style={{
                        width: `${100 * zoom}%`,
                        height: `${100 * zoom}%`,
                        left: `calc(50% - ${50 * zoom}% + ${currentOffset.x}px)`,
                        top: `calc(50% - ${50 * zoom}% + ${currentOffset.y}px)`,
                        transformOrigin: 'center',
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[10px] text-[#00FF66]/40 font-mono text-center px-2">
                      <span>NO IMAGE</span>
                    </div>
                  )}
                </div>
                {renderVibeFrame()}
              </div>

              {/* Text Fields */}
              <div className="flex-grow flex flex-col gap-1">
                <div className="border-b border-[#00FF66]/20 pb-1">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-[#00FF66]/60">BUILDER NAME</span>
                  <div className="font-bold text-white text-base tracking-wide truncate max-w-[240px]">{name.toUpperCase()}</div>
                </div>
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-wider text-[#00FF66]/60">SKILL / STACK</span>
                  <div className="font-mono text-xs text-[#00FF66] truncate max-w-[240px]">{skill.toUpperCase()}</div>
                </div>
              </div>
            </div>

            {/* Footer handles */}
            <div className="flex justify-between items-center z-10 pt-2 border-t border-[#00FF66]/20">
              <div className="flex gap-4">
                {github && <span className="font-mono text-[10px] text-[#00FF66]/60">GH: {github}</span>}
                {twitter && <span className="font-mono text-[10px] text-[#00FF66]/60">X: {twitter}</span>}
              </div>
              <span className="font-mono text-[9px] text-[#00FF66]/80">OCT 28-31 • GOA</span>
            </div>
          </div>
        );

      case 'Sunset Gradient':
        return (
          <div className="w-full h-full bg-gradient-to-tr from-[#E26A7A] to-[#E8B83D] text-[#FAF5E8] flex flex-col justify-between p-6 relative border-4 border-white/20">
            {/* Sunset Waves vector */}
            <svg className="absolute bottom-0 inset-x-0 w-full h-1/3 opacity-30 pointer-events-none" viewBox="0 0 100 30" preserveAspectRatio="none">
              <path d="M0 20 Q25 15 50 20 T100 20 L100 30 L0 30 Z" fill="white" />
              <path d="M0 10 Q25 18 50 12 T100 15 L100 30 L0 30 Z" fill="white" opacity="0.5" />
            </svg>

            {/* Header */}
            <div className="flex justify-between items-start z-10">
              <div>
                <h3 className="font-serif italic text-xs tracking-wider text-white/80">HackerHouse Goa 2026</h3>
                <h2 className="text-2xl font-serif font-black uppercase tracking-widest">RESIDENCY PASS</h2>
              </div>
              <span className="font-mono text-[9px] bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">MINTED</span>
            </div>

            {/* Center Area */}
            <div className="flex items-center gap-6 z-10 my-auto">
              {/* Photo Frame */}
              <div className="relative w-28 h-28 flex-shrink-0">
                <div className="w-full h-full rounded-full bg-black/20 border-2 border-white overflow-hidden relative cursor-move"
                     onMouseDown={handleMouseDown}
                     onMouseMove={handleMouseMove}
                     onMouseUp={handleMouseUp}
                     onMouseLeave={handleMouseUp}
                     onTouchStart={handleTouchStart}
                     onTouchMove={handleTouchMove}
                     onTouchEnd={handleMouseUp}
                     onWheel={handleWheel}
                >
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt="PFP"
                      className="absolute max-w-none select-none pointer-events-none"
                      style={{
                        width: `${100 * zoom}%`,
                        height: `${100 * zoom}%`,
                        left: `calc(50% - ${50 * zoom}% + ${currentOffset.x}px)`,
                        top: `calc(50% - ${50 * zoom}% + ${currentOffset.y}px)`,
                        transformOrigin: 'center',
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[10px] text-white/50 font-mono text-center px-2">
                      <span>DRAG PHOTO HERE</span>
                    </div>
                  )}
                </div>
                {renderVibeFrame()}
              </div>

              {/* Text Fields */}
              <div className="flex-grow flex flex-col gap-2">
                <div className="border-b border-white/20 pb-1">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-white/70">RESIDENT NAME</span>
                  <div className="font-serif font-bold text-white text-lg tracking-wide truncate max-w-[240px]">{name.toUpperCase()}</div>
                </div>
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-wider text-white/70">RESIDENT CLASS</span>
                  <div className="font-serif italic text-sm text-[#FAF5E8] truncate max-w-[240px]">{skill.toUpperCase()}</div>
                </div>
              </div>
            </div>

            {/* Footer handles */}
            <div className="flex justify-between items-center z-10 pt-2 border-t border-white/20">
              <div className="flex gap-4">
                {github && <span className="font-mono text-[10px] text-white/80">github.com/{github}</span>}
                {twitter && <span className="font-mono text-[10px] text-white/80">x.com/{twitter}</span>}
              </div>
              <span className="font-mono text-[9px] text-white/90 font-bold">#FrameInGoa</span>
            </div>
          </div>
        );

      case 'Tropical Vintage':
      default:
        return (
          <div className="w-full h-full bg-[#F6F2E5] text-[#0A2B1D] flex flex-col justify-between p-6 relative border-4 border-[#355C48]/40 shadow-inner">
            {/* Floral decorations at corner */}
            {/* Top-Left Flower */}
            <svg className="absolute -top-1 -left-1 w-10 h-10 text-[#E26A7A] fill-current pointer-events-none" viewBox="0 0 24 24">
              <path d="M12 0c1.2 2 3.6 2.4 4.8 3.6s1.6 3.6 3.6 4.8-1.2 3.6-2.4 4.8-.4 3.6-1.6 4.8c-1.2 1.2-3.6.4-4.8 1.6s-3.6 1.2-4.8 0c-1.2-1.2-.4-3.6-1.6-4.8s-3.6-1.2-2.4-4.8 1.6-3.6 3.6-4.8 1.2-3.6 2.4-4.8.4-3.6 1.6-4.8z" />
              <circle cx="12" cy="12" r="3" fill="#E8B83D" />
            </svg>
            {/* Top-Right Flower */}
            <svg className="absolute -top-1 -right-1 w-10 h-10 text-[#E26A7A] fill-current pointer-events-none" viewBox="0 0 24 24">
              <path d="M12 0c1.2 2 3.6 2.4 4.8 3.6s1.6 3.6 3.6 4.8-1.2 3.6-2.4 4.8-.4 3.6-1.6 4.8c-1.2 1.2-3.6.4-4.8 1.6s-3.6 1.2-4.8 0c-1.2-1.2-.4-3.6-1.6-4.8s-3.6-1.2-2.4-4.8 1.6-3.6 3.6-4.8 1.2-3.6 2.4-4.8.4-3.6 1.6-4.8z" />
              <circle cx="12" cy="12" r="3" fill="#E8B83D" />
            </svg>
            {/* Bottom-Left Flower */}
            <svg className="absolute -bottom-1 -left-1 w-10 h-10 text-[#E26A7A] fill-current pointer-events-none" viewBox="0 0 24 24">
              <path d="M12 0c1.2 2 3.6 2.4 4.8 3.6s1.6 3.6 3.6 4.8-1.2 3.6-2.4 4.8-.4 3.6-1.6 4.8c-1.2 1.2-3.6.4-4.8 1.6s-3.6 1.2-4.8 0c-1.2-1.2-.4-3.6-1.6-4.8s-3.6-1.2-2.4-4.8 1.6-3.6 3.6-4.8 1.2-3.6 2.4-4.8.4-3.6 1.6-4.8z" />
              <circle cx="12" cy="12" r="3" fill="#E8B83D" />
            </svg>
            {/* Bottom-Right Flower */}
            <svg className="absolute -bottom-1 -right-1 w-10 h-10 text-[#E26A7A] fill-current pointer-events-none" viewBox="0 0 24 24">
              <path d="M12 0c1.2 2 3.6 2.4 4.8 3.6s1.6 3.6 3.6 4.8-1.2 3.6-2.4 4.8-.4 3.6-1.6 4.8c-1.2 1.2-3.6.4-4.8 1.6s-3.6 1.2-4.8 0c-1.2-1.2-.4-3.6-1.6-4.8s-3.6-1.2-2.4-4.8 1.6-3.6 3.6-4.8 1.2-3.6 2.4-4.8.4-3.6 1.6-4.8z" />
              <circle cx="12" cy="12" r="3" fill="#E8B83D" />
            </svg>

            {/* Header */}
            <div className="flex justify-between items-start z-10 px-4">
              <div>
                <h3 className="font-mono text-[9px] uppercase tracking-widest text-[#355C48]/80 font-bold">HackerHouse Goa 2026</h3>
                <h2 className="text-xl font-serif font-black uppercase tracking-wider text-[#0A2B1D] mt-0.5">BUILDER RESIDENCY</h2>
              </div>
              <span className="font-mono text-[9px] bg-[#E8B83D]/20 border border-[#E8B83D]/40 px-2 py-0.5 rounded text-[#0A2B1D] font-bold">OFFICIAL</span>
            </div>

            {/* Center Area */}
            <div className="flex items-center gap-6 z-10 my-auto px-4">
              {/* Photo Frame */}
              <div className="relative w-28 h-28 flex-shrink-0">
                <div className="w-full h-full rounded-full bg-[#355C48]/10 border-2 border-[#355C48] overflow-hidden relative cursor-move"
                     onMouseDown={handleMouseDown}
                     onMouseMove={handleMouseMove}
                     onMouseUp={handleMouseUp}
                     onMouseLeave={handleMouseUp}
                     onTouchStart={handleTouchStart}
                     onTouchMove={handleTouchMove}
                     onTouchEnd={handleMouseUp}
                     onWheel={handleWheel}
                >
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt="PFP"
                      className="absolute max-w-none select-none pointer-events-none"
                      style={{
                        width: `${100 * zoom}%`,
                        height: `${100 * zoom}%`,
                        left: `calc(50% - ${50 * zoom}% + ${currentOffset.x}px)`,
                        top: `calc(50% - ${50 * zoom}% + ${currentOffset.y}px)`,
                        transformOrigin: 'center',
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[9px] text-[#355C48]/60 font-mono text-center px-1">
                      <span>UPLOAD PHOTO</span>
                      <span className="text-[7px] text-[#355C48]/40 mt-0.5">CLICK OR DRAG</span>
                    </div>
                  )}
                </div>
                {renderVibeFrame()}
              </div>

              {/* Text Fields */}
              <div className="flex-grow flex flex-col gap-1.5">
                <div className="border-b border-[#355C48]/30 pb-1">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-[#355C48]/70 font-black">BUILDER NAME</span>
                  <div className="font-serif font-black text-[#0A2B1D] text-base truncate max-w-[200px]">{name.toUpperCase()}</div>
                </div>
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-wider text-[#355C48]/70 font-black">SKILL / STACK</span>
                  <div className="font-mono text-xs text-[#355C48] font-bold truncate max-w-[200px]">{skill.toUpperCase()}</div>
                </div>
              </div>
            </div>

            {/* Footer handles */}
            <div className="flex justify-between items-center z-10 pt-2 border-t border-[#355C48]/30 px-4">
              <div className="flex gap-4">
                {github && (
                  <span className="font-mono text-[9px] text-[#355C48] font-bold flex items-center gap-1">
                    gh: {github}
                  </span>
                )}
                {twitter && (
                  <span className="font-mono text-[9px] text-[#355C48] font-bold flex items-center gap-1">
                    x: {twitter}
                  </span>
                )}
              </div>
              <span className="font-mono text-[8px] text-[#355C48] font-black uppercase tracking-wider">#FrameInGoa</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden select-none bg-[#0A2B1D]"
    >
      {renderThemeContent()}
    </div>
  );
}
