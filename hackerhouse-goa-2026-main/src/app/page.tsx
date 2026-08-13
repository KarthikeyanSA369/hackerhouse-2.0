'use client';

import React, { useState, useRef } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import BadgeCard from '@/components/BadgeCard';
import CameraCapture from '@/components/CameraCapture';
import html2canvas from 'html2canvas';

export default function Home() {
  // Step navigation: 'hero' | 'vibe' | 'builder'
  const [step, setStep] = useState<'hero' | 'vibe' | 'builder'>('hero');
  
  // Custom Card Properties
  const [vibe, setVibe] = useState<string>('Goa Beach Poster');
  const [theme, setTheme] = useState<string>('Tropical Vintage');
  const [name, setName] = useState<string>('');
  const [skill, setSkill] = useState<string>('');
  const [github, setGithub] = useState<string>('');
  const [twitter, setTwitter] = useState<string>('');
  const [linkedin, setLinkedin] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  
  // Crop offsets
  const [crop, setCrop] = useState({ zoom: 1, offsetX: 0, offsetY: 0 });
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // List of Vibe options and themes matching screen copy.png
  const vibeOptions = [
    { name: 'Goa Beach Poster', subtitle: 'Masterpiece' },
    { name: 'Sunset Horizon', subtitle: 'Spacious' },
    { name: 'Tropical Oasis', subtitle: 'Intricate' },
    { name: 'Azulejo Heritage', subtitle: 'Vintage' },
    { name: 'Hibiscus Palms', subtitle: 'Artistic' },
    { name: 'Coastal Sunset', subtitle: 'Vibrant' },
  ];

  const themeOptions = [
    { name: 'Tropical Vintage' },
    { name: 'Tech Jungle' },
    { name: 'Sunset Gradient' },
  ];

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
          setCrop({ zoom: 1, offsetX: 0, offsetY: 0 });
          triggerToast('Photo uploaded successfully! Adjust zoom and drag to crop.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Capture High-Res PNG from off-screen hidden card
  const handleDownload = async () => {
    if (!photoUrl) {
      triggerToast('Please upload a photo first!');
      return;
    }
    const offscreenContainer = document.getElementById('offscreen-badge-container');
    if (!offscreenContainer) return;

    try {
      setDownloading(true);
      triggerToast('Generating high-res card... Please wait.');
      
      // Delay slightly to let image render fully
      await new Promise((resolve) => setTimeout(resolve, 800));

      const canvas = await html2canvas(offscreenContainer, {
        scale: 3, // 3x scale makes it beautiful and crisp
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${name.trim() ? name.replace(/\s+/g, '_') : 'hackerhouse'}_residency_pass.png`;
      link.href = dataUrl;
      link.click();
      
      triggerToast('Pass downloaded successfully! 🎉');
    } catch (err) {
      console.error(err);
      triggerToast('Failed to download PNG. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = () => {
    const text = encodeURIComponent(`Locked in my builder identity for HackerHouse Goa 2026! 🌴 See you at #FrameInGoa!`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 bg-[#0A2B1D] min-h-screen relative overflow-hidden">
      
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-6 right-6 bg-[#E8B83D] text-[#0A2B1D] font-mono text-xs uppercase px-4 py-3 rounded-xl border border-white/20 shadow-2xl z-50 animate-bounce">
          {toast}
        </div>
      )}

      {/* Main aspect-ratio page canvas wrapper */}
      <div className="w-full max-w-5xl aspect-[1414/795] relative bg-[#04140e] border border-[#355C48]/30 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
        
        {/* --- STEP 1: HERO / LANDING PAGE --- */}
        {step === 'hero' && (
          <div 
            className="absolute inset-0 bg-cover bg-center flex flex-col justify-between"
            style={{ backgroundImage: `url('/screen-hero.png')` }}
          >
            {/* The supplied references intentionally omit the Hacker House masthead. */}
            <div className="brand-mask brand-mask--hero" aria-hidden="true" />
            {/* Clickable Overlay for "Create Your ID" button */}
            <button
              onClick={() => setStep('vibe')}
              className="absolute right-[2.2%] top-[3.5%] w-[12.6%] h-[5.5%] rounded-full opacity-0 hover:opacity-10 hover:bg-white/10 cursor-pointer transition-opacity"
              title="Create Your ID"
            />
          </div>
        )}

        {/* --- STEP 2: CHOOSE VIBE & THEME --- */}
        {step === 'vibe' && (
          <div 
            className="absolute inset-0 bg-cover bg-center flex flex-col justify-between"
            style={{ backgroundImage: `url('/screen-vibe.png')` }}
          >
            {/* Keep the selection experience focused on the templates, without a masthead. */}
            <div className="brand-mask brand-mask--vibe" aria-hidden="true" />
            {/* Back Button */}
            <button
              onClick={() => setStep('hero')}
              className="absolute left-[2.2%] top-[3.5%] flex items-center gap-1 bg-[#E8B83D]/10 hover:bg-[#E8B83D]/20 text-[#E8B83D] border border-[#E8B83D]/30 px-3 py-1.5 rounded-full font-mono text-[9px] uppercase tracking-wider transition-all"
            >
              <ArrowLeft className="w-3 h-3" /> Back
            </button>

            {/* Next / Proceed Button (Header position) */}
            <button
              onClick={() => setStep('builder')}
              className="absolute right-[2.2%] top-[3.5%] flex items-center gap-1.5 bg-[#E8B83D] hover:bg-[#E8B83D]/90 text-[#0A2B1D] px-4 py-1.5 rounded-full font-mono font-bold text-[10px] uppercase tracking-wider transition-all shadow-lg"
            >
              Continue <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* PFP Frame selection circles overlay */}
            {/* Aligned with horizontal frame bar at top right */}
            <div className="absolute top-[17.5%] left-[36.5%] w-[53.5%] h-[18.5%] grid grid-cols-6 gap-2">
              {vibeOptions.map((v) => (
                <button
                  key={v.name}
                  onClick={() => {
                    setVibe(v.name);
                    triggerToast(`Vibe selected: ${v.name}`);
                  }}
                  className={`w-full h-full rounded-xl cursor-pointer relative border-2 transition-all ${
                    vibe === v.name 
                      ? 'border-[#E8B83D] bg-[#E8B83D]/5 shadow-lg shadow-[#E8B83D]/10' 
                      : 'border-transparent hover:border-white/10 hover:bg-white/5'
                  }`}
                  title={`${v.name} (${v.subtitle})`}
                >
                  {vibe === v.name && (
                    <div className="absolute -top-1.5 -right-1.5 bg-[#E8B83D] text-[#0A2B1D] text-[7px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                      ✓
                    </div>
                  )}
                </button>
              ))}
            </div>

          </div>
        )}

        {/* --- STEP 3: BUILDER ID CREATOR & CONTROLS --- */}
        {step === 'builder' && (
          <div 
            className="absolute inset-0 bg-cover bg-center flex flex-col justify-between"
            style={{ backgroundImage: `url('/screen-builder.png')` }}
          >
            {/* Remove the two header decorations called out in the supplied screenshots. */}
            <div className="brand-mask brand-mask--builder" aria-hidden="true" />
            <div className="brand-mask brand-mask--residency" aria-hidden="true" />
            {/* Back Button */}
            <button
              onClick={() => setStep('vibe')}
              className="absolute left-[2.2%] top-[3.5%] flex items-center gap-1 bg-[#E8B83D]/10 hover:bg-[#E8B83D]/20 text-[#E8B83D] border border-[#E8B83D]/30 px-3 py-1.5 rounded-full font-mono text-[9px] uppercase tracking-wider transition-all"
            >
              <ArrowLeft className="w-3 h-3" /> Templates
            </button>

            {/* Hidden Input File Trigger */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />

            {/* Form overlays (left side) */}
            {/* Upload Photo Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute left-[11.5%] top-[25.5%] w-[12.2%] h-[5.5%] opacity-0 hover:opacity-10 hover:bg-white/10 cursor-pointer rounded-lg transition-opacity"
              title="Upload Photo File"
            />

            {/* Take Photo Button */}
            <button
              onClick={() => setIsCameraOpen(true)}
              className="absolute left-[24.7%] top-[25.5%] w-[12.2%] h-[5.5%] opacity-0 hover:opacity-10 hover:bg-white/10 cursor-pointer rounded-lg transition-opacity"
              title="Capture Webcam Photo"
            />

            {/* Name Input */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="absolute left-[11.5%] top-[41.8%] w-[25.8%] h-[5%] px-3 bg-transparent text-[#FAF5E8] font-mono text-xs border border-transparent focus:border-[#E8B83D]/40 rounded focus:outline-none transition-colors"
            />

            {/* Skill / Stack Input */}
            <input
              type="text"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="Enter your stack"
              className="absolute left-[11.5%] top-[52.8%] w-[25.8%] h-[5%] px-3 bg-transparent text-[#FAF5E8] font-mono text-xs border border-transparent focus:border-[#E8B83D]/40 rounded focus:outline-none transition-colors"
            />

            {/* GitHub Handle Input */}
            <input
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="Enter GitHub handle"
              className="absolute left-[11.5%] top-[63.8%] w-[25.8%] h-[5%] px-3 bg-transparent text-[#FAF5E8] font-mono text-xs border border-transparent focus:border-[#E8B83D]/40 rounded focus:outline-none transition-colors"
            />

            {/* Twitter Handle Input */}
            <input
              type="text"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              placeholder="Enter Twitter handle"
              className="absolute left-[11.5%] top-[75.6%] w-[25.8%] h-[5%] px-3 bg-transparent text-[#FAF5E8] font-mono text-xs border border-transparent focus:border-[#E8B83D]/40 rounded focus:outline-none transition-colors"
            />

            {/* LinkedIn Handle Input */}
            <input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="Enter LinkedIn handle"
              className="absolute left-[11.5%] top-[83.8%] w-[25.8%] h-[5%] px-3 bg-transparent text-[#FAF5E8] font-mono text-xs border border-transparent focus:border-[#E8B83D]/40 rounded focus:outline-none transition-colors"
            />

            {/* Live Interactive ID Card Canvas (Right Side) */}
            {/* Fits directly inside the card preview area */}
            <div className="absolute left-[43.5%] top-[13.6%] w-[46.5%] h-[58%] rounded-2xl overflow-hidden shadow-xl border border-[#355C48]/30">
              <BadgeCard
                key={photoUrl}
                name={name || 'ENTER YOUR NAME'}
                skill={skill || 'ENTER YOUR STACK'}
                github={github}
                twitter={twitter}
                linkedin={linkedin}
                photoUrl={photoUrl}
                zoom={crop.zoom}
                offsetX={crop.offsetX}
                offsetY={crop.offsetY}
                vibe={vibe}
                theme={theme}
                onCropChange={(c) => setCrop(c)}
                isInteractive={true}
              />
            </div>

            {/* Download PNG Button */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="absolute left-[43.5%] top-[75.5%] w-[46.5%] h-[6.8%] opacity-0 hover:opacity-10 hover:bg-white/10 cursor-pointer rounded-lg transition-opacity"
              title="Download Badge PNG"
            />

            {/* Share on Twitter Button */}
            <button
              onClick={handleShare}
              className="absolute left-[43.5%] top-[84.8%] w-[46.5%] h-[6.8%] opacity-0 hover:opacity-10 hover:bg-white/10 cursor-pointer rounded-lg transition-opacity"
              title="Share on Twitter/X"
            />
          </div>
        )}
      </div>

      {/* --- HIDDEN CANVAS FOR HIGH-RES EXPORTS (1080x720px) --- */}
      <div 
        id="offscreen-badge-container"
        className="fixed left-[-9999px] top-[-9999px]"
        style={{ width: '1080px', height: '720px' }}
      >
        <BadgeCard
          name={name || 'ENTER YOUR NAME'}
          skill={skill || 'ENTER YOUR STACK'}
          github={github}
          twitter={twitter}
          linkedin={linkedin}
          photoUrl={photoUrl}
          zoom={crop.zoom}
          offsetX={crop.offsetX * 2.22} // Scaled offsets for 1080x720 card from 486x324 canvas
          offsetY={crop.offsetY * 2.22}
          vibe={vibe}
          theme={theme}
          isInteractive={false}
        />
      </div>

      {/* Camera Capture Modal */}
      {isCameraOpen && (
        <CameraCapture
          onCapture={(data) => {
            setPhotoUrl(data);
            setCrop({ zoom: 1, offsetX: 0, offsetY: 0 });
            setIsCameraOpen(false);
            triggerToast('Camera picture captured successfully!');
          }}
          onClose={() => setIsCameraOpen(false)}
        />
      )}
    </main>
  );
}
