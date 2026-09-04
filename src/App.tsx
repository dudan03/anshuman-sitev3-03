import React, { useEffect, useRef, useState, useMemo, Suspense } from "react";
import * as THREE from "three";
import { 
  Globe, 
  ArrowRight, 
  Linkedin,
  Mail,
  Phone,
  Code2,
  Cpu,
  Palette,
  Briefcase,
  GraduationCap,
  ChevronDown,
  ExternalLink,
  Zap,
  TrendingUp,
  Languages,
  Instagram,
  Twitter,
  Quote,
  Star,
  MapPin,
  MessageCircle,
  Trophy,
  CheckCircle2,
  Brain,
  Laptop,
  Github,
  Printer
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring, useAnimation } from "motion/react";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Float, Stars, Html, useTexture } from "@react-three/drei";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Chatbot } from "./components/Chatbot";
import { SpeedInsights } from '@vercel/speed-insights/react';

// --- CONFIGURATION ---
const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4";
const LINKEDIN_URL = "https://www.linkedin.com/in/anshuman-parida-b76a643b6?utm_source=share_via&utm_content=profile&utm_medium=member_android";
const GITHUB_URL = "https://github.com/anshumanparida913";
// THE UPLOADED PHOTOS
const USER_PHOTO_URL = "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=1000"; 
const USER_HEADSHOT_URL = "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=1000"; 

const TESTIMONIALS = [
  {
    quote: "Anshuman's ability to translate complex agricultural problems into elegant tech solutions is unparalleled. Famkart is a testament to his vision.",
    author: "Dr. Rajesh Kumar",
    role: "Agri-Tech Advisor",
    impact: "Scaling Agri-Systems"
  },
  {
    quote: "A rare mix of strategic thinking and technical execution. He doesn't just build features; he builds products that people actually want to use.",
    author: "Sarah Mitchell",
    role: "E-commerce Strategist",
    impact: "Growth & ROI Optimization"
  },
  {
    quote: "The hyper-local intelligence engine built for our supply chain reduced operational overhead by 40%. Exceptionally reliable architecture.",
    author: "Prateek Mohanty",
    role: "CEO, LogisticX",
    impact: "40% Efficiency Gain"
  },
  {
    quote: "Anshuman's technical depth in full-stack architecture helped us deploy a high-performance web platform in record time. His precision in code and delivery is world-class.",
    author: "Alex Chen",
    role: "Technical Director, DevStream",
    impact: "3x Deployment Speed"
  }
];

const TIMELINE_MILESTONES = [
  {
    year: "2023",
    period: "Jan — May 2023",
    title: "Dropshipping Venture Launch",
    subtitle: "End-to-End E-Commerce Operations",
    category: "Dropshipping",
    description: "Launched automated digital storefronts. Mastered supplier operations, fulfillment workflows, and targeted customer acquisition strategy.",
    vibrantColor: "from-vibrant-emerald to-teal-500",
    glowColor: "shadow-vibrant-emerald/20",
    borderColor: "border-vibrant-emerald/30",
    pointColor: "bg-vibrant-emerald",
    icon: Briefcase,
    tags: ["Operations", "Market Research", "E-Commerce"],
    stats: { label: "Performance", value: "Self-Managed" }
  },
  {
    year: "2023",
    period: "Jun — Nov 2023",
    title: "High-ROI Marketing & Analytics",
    subtitle: "Organic & Paid Growth Performance",
    category: "Dropshipping",
    description: "Designed bespoke high-converting campaigns on Canva, leveraging quantitative customer behavior modeling in MS Excel for maximum profit margins.",
    vibrantColor: "from-vibrant-rose to-pink-500",
    glowColor: "shadow-vibrant-rose/20",
    borderColor: "border-vibrant-rose/30",
    pointColor: "bg-vibrant-rose",
    icon: TrendingUp,
    tags: ["Canva Design", "MS Excel", "ROI Opt."],
    stats: { label: "Campaigns", value: "High ROI" }
  },
  {
    year: "2024",
    period: "Jan — Apr 2024",
    title: "Famkart Conception & Architecture",
    subtitle: "Hyper-Local Digital Platform Layout",
    category: "Famkart",
    description: "Envisioned and diagrammed local supply chain ecosystems. Translated vendor-consumer friction points into clickable wireframes and product layout specs.",
    vibrantColor: "from-vibrant-purple to-indigo-500",
    glowColor: "shadow-vibrant-purple/20",
    borderColor: "border-vibrant-purple/30",
    pointColor: "bg-vibrant-purple",
    icon: Palette,
    tags: ["Product Design", "Canva", "Wireframes"],
    stats: { label: "Phase", value: "Conception" }
  },
  {
    year: "2024",
    period: "May — Oct 2024",
    title: "Famkart Frontend Swift Engineering",
    subtitle: "Native iOS Client Integration",
    category: "Famkart",
    description: "Designed and engineered the native iOS interface in Swift. Focused on fast layout rendering, smooth inertial gestures, and clear local storage states.",
    vibrantColor: "from-vibrant-blue to-cyan-500",
    glowColor: "shadow-vibrant-blue/20",
    borderColor: "border-vibrant-blue/30",
    pointColor: "bg-vibrant-blue",
    icon: Code2,
    tags: ["Swift", "iOS", "Mobile UX"],
    stats: { label: "Status", value: "UI Completed" }
  },
  {
    year: "2024",
    period: "Nov 2024 — Present",
    title: "Backend Services & AI Optimization",
    subtitle: "Core Python Server-Side Scaling",
    category: "Famkart",
    description: "Developed and integrated core server logic using Python, implementing light routing maps for location-oriented physical stores and direct dispatch algorithms.",
    vibrantColor: "from-vibrant-amber to-orange-500",
    glowColor: "shadow-vibrant-amber/20",
    borderColor: "border-vibrant-amber/30",
    pointColor: "bg-vibrant-amber",
    icon: Cpu,
    tags: ["Python", "Algorithms", "System Sync"],
    stats: { label: "Current", value: "Active Dev" }
  },
  {
    year: "2025",
    period: "2025 — Present",
    title: "Founder & Lead Architect",
    subtitle: "Dudan Technology Pvt Ltd",
    category: "Dudan Technology",
    description: "Founded Dudan Technology Pvt Ltd, specializing in AI Chatbot App Development, Custom Web & Mobile Apps, and dynamic Custom Website designs for enterprises.",
    vibrantColor: "from-vibrant-blue to-indigo-500",
    glowColor: "shadow-vibrant-blue/20",
    borderColor: "border-vibrant-blue/30",
    pointColor: "bg-vibrant-blue",
    icon: Brain,
    tags: ["AI Chatbots", "Custom Apps", "Custom Websites"],
    stats: { label: "Role", value: "Founder" }
  }
];

// --- UTILS ---
const latLongToVector3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

// --- COMPONENTS ---

// Using reliable Three.js GitHub textures
const EARTH_TEXTURE = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg";
const CLOUD_TEXTURE = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png"; 
const MOON_TEXTURE = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg";

function EarthSystem({ size, speed, opacity = 1 }: { size: number; speed: number; opacity?: number }) {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const sunRef = useRef<THREE.DirectionalLight>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Odisha, India Coordinates
  const markerPos = useMemo(() => latLongToVector3(20.3, 85.8, size), [size]);

  // Load textures with fallback handling
  const [earthMap, cloudMap, moonMap] = useLoader(THREE.TextureLoader, [
    EARTH_TEXTURE,
    CLOUD_TEXTURE,
    MOON_TEXTURE
  ], (loader) => {
    loader.crossOrigin = 'anonymous';
  });

  // Fixed Cinematic Sun position to ensure the light side is always visible
  const sunX = 10; 
  const sunZ = 10; 

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.2;
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.003 * speed;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y += 0.004 * speed;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * speed;
    }
    if (sunRef.current) {
      // Subtle pulse to the sun intensity for a living feel
      sunRef.current.intensity = 4.5 + Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
    }
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  const handleEarthClick = (e: any) => {
    e.stopPropagation();
    const el = document.getElementById('education');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      el.classList.add('ring-4', 'ring-white/20', 'transition-all');
      setTimeout(() => el.classList.remove('ring-4', 'ring-white/20'), 2000);
    }
  };

  const handleMoonClick = (e: any) => {
    e.stopPropagation();
    const el = document.getElementById('experience');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      el.classList.add('ring-4', 'ring-white/20', 'transition-all');
      setTimeout(() => el.classList.remove('ring-4', 'ring-white/20'), 2000);
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
      <group>
        {/* The Sun Visual and Light - Based on Local Time */}
        <group position={[sunX, 2, sunZ]}>
          <directionalLight 
            ref={sunRef}
            intensity={4} 
            color="#fff5e6" 
            castShadow
          />
          {/* Visual Sun Flare */}
          <mesh>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshBasicMaterial color="#fff5e6" />
          </mesh>
          <pointLight intensity={10} distance={10} color="#fff5e6" />
        </group>

        <ambientLight intensity={0.15} />
        <pointLight position={[0, 0, 0]} intensity={0.2} color="#4466ff" />

        {/* Earth - Education */}
        <group 
          onClick={handleEarthClick}
          onPointerOver={() => setHovered('earth')}
          onPointerOut={() => setHovered(null)}
          scale={hovered === 'earth' ? 1.05 : 1}
        >
          <mesh ref={earthRef}>
            <sphereGeometry args={[size, 64, 64]} />
            <meshStandardMaterial 
              map={earthMap} 
              roughness={0.6} 
              metalness={0.4} 
              transparent 
              opacity={opacity} 
            />
          </mesh>
          {/* Cloud Layer */}
          <mesh ref={cloudRef} scale={1.015}>
            <sphereGeometry args={[size, 64, 64]} />
            <meshStandardMaterial 
              map={cloudMap} 
              transparent 
              opacity={0.3 * opacity} 
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          {/* India Marker */}
          <group position={markerPos}>
            <mesh 
              onPointerOver={() => setHovered('odisha')}
              onPointerOut={() => setHovered(null)}
            >
              <sphereGeometry args={[0.015 * size, 16, 16]} />
              <meshBasicMaterial color="#ff3366" />
              {hovered === 'odisha' && (
                <Html distanceFactor={10}>
                  <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-xl whitespace-nowrap pointer-events-none transform -translate-y-12 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="p-1.5 bg-rose-500/20 rounded-md">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-white/40">Base Location</span>
                    </div>
                    <p className="text-sm font-medium text-white">Odisha, India</p>
                    <p className="text-[10px] text-white/50 mt-1">Industrial Estate, Khordha</p>
                  </div>
                </Html>
              )}
            </mesh>
            {/* Pulsing ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.02 * size, 0.025 * size, 32]} />
              <meshBasicMaterial color="#ff3366" transparent opacity={0.6} />
            </mesh>
          </group>

          {/* Atmosphere Glow */}
          <mesh scale={1.08}>
            <sphereGeometry args={[size, 64, 64]} />
            <meshStandardMaterial 
              color="#4466ff"
              transparent
              opacity={0.15 * opacity}
              side={THREE.BackSide}
            />
          </mesh>
        </group>

        {/* Moon - My Work */}
        <group ref={orbitRef}>
          <group 
            position={[size * 2.8, 0, 0]}
            onClick={handleMoonClick}
            onPointerOver={() => setHovered('moon')}
            onPointerOut={() => setHovered(null)}
            scale={hovered === 'moon' ? 1.2 : 1}
          >
            <mesh>
              <sphereGeometry args={[size * 0.27, 32, 32]} />
              <meshStandardMaterial 
                map={moonMap} 
                roughness={1} 
                transparent 
                opacity={opacity} 
              />
            </mesh>
          </group>
        </group>
      </group>
    </Float>
  );
}

function AvatarGlobe({ url, size = 1 }: { url: string; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      url,
      (tex) => {
        tex.wrapS = THREE.RepeatWrapping;
        tex.repeat.set(2, 1);
        tex.needsUpdate = true;
        setTexture(tex);
      },
      undefined,
      (err) => {
        console.error("Error loading texture:", url, err);
        setError(true);
      }
    );
  }, [url]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.006;
    }
  });

  if (error) {
    return (
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color="#222" roughness={0.8} />
      </mesh>
    );
  }

  if (!texture) {
    return (
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color="#111" transparent opacity={0.5} />
      </mesh>
    );
  }

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial 
          map={texture} 
          roughness={0.4} 
          metalness={0.2}
          emissive="#ffffff"
          emissiveIntensity={0.05}
        />
      </mesh>
      {/* Atmosphere glow for the person-globe */}
      <mesh scale={1.05}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.05} 
          side={THREE.BackSide} 
        />
      </mesh>
    </group>
  );
}

function MainAvatarGlobe({ url, isSmall = false }: { url: string; isSmall?: boolean }) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, isSmall ? 2.5 : 3.5], fov: 40 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={1.5} />
          <pointLight position={[5, 5, 5]} intensity={2} />
          <AvatarGlobe url={url} size={isSmall ? 1 : 1.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Globe3D({ size = 1.3, speed = 0.5, opacity = 1 }: { size?: number; speed?: number; opacity?: number }) {
  const [responsiveSize, setResponsiveSize] = useState(size);

  useEffect(() => {
    const updateSize = () => {
      const isMobile = window.innerWidth < 768;
      setResponsiveSize(isMobile ? size * 0.75 : size);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [size]);

  return (
    <div className="w-full h-full min-h-[400px] relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={1} />
          <EarthSystem size={responsiveSize} speed={speed} opacity={opacity} />
          <OrbitControls enableZoom={false} autoRotate={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-6"
    >
      <div className="text-center">
        <motion.div
           initial={{ opacity: 0, filter: "blur(20px)", scale: 0.8 }}
           animate={{ 
             opacity: [0, 1, 1, 0], 
             filter: ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"],
             scale: [0.8, 1, 1.05, 1.2]
           }}
           transition={{ duration: 3.5, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
           className="relative"
        >
          <h1 
            className="text-6xl md:text-[10rem] text-white font-bold tracking-[0.3em] uppercase leading-none select-none italic"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Anshuman<br />Parida
          </h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "circOut" }}
            className="h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent mt-12 mx-auto w-1/2"
          />
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
            transition={{ duration: 3.5, times: [0, 0.3, 0.7, 1] }}
            className="text-[12px] uppercase tracking-[0.8em] text-white/70 mt-8 font-bold"
          >
            Digital Architect • Entrepreneur
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState(0);
  const opacityRef = useRef(0);
  const fadingOutRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  const animateOpacity = (target: number, duration: number) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    const startOpacity = opacityRef.current;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const nextOpacity = startOpacity + (target - startOpacity) * progress;
      opacityRef.current = nextOpacity;
      setOpacity(nextOpacity);
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        animationFrameRef.current = null;
      }
    };
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const remaining = video.duration - video.currentTime;
    if (remaining <= 0.55 && !fadingOutRef.current) {
      fadingOutRef.current = true;
      animateOpacity(0, 500);
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;
    setOpacity(0);
    opacityRef.current = 0;
    setTimeout(() => {
      video.currentTime = 0;
      video.play();
      fadingOutRef.current = false;
      animateOpacity(1, 500);
    }, 100);
  };

  const handleCanPlay = () => {
    if (opacityRef.current === 0 && !fadingOutRef.current) {
      animateOpacity(1, 500);
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-black">
      <video
        ref={videoRef}
        id="bg-video"
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onCanPlay={handleCanPlay}
        onError={() => (videoRef.current!.style.display = 'none')}
        className="absolute inset-0 w-full h-full object-cover translate-y-[17%] transition-none pointer-events-none"
        style={{ opacity }}
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
    </div>
  );
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-white/80 hover:text-white transition-all text-sm font-medium tracking-wide hover:tracking-[0.2em]">{children}</a>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: "easeOut" 
    }
  }
} as const;

const SkillsSolarSystem = () => {
  const languages = [
    { name: "Python", color: "#3B82F6", orbit: 1, duration: 15, delay: 0 },
    { name: "C++", color: "#6366F1", orbit: 1, duration: 15, delay: 5 },
    { name: "Java", color: "#EC4899", orbit: 1, duration: 15, delay: 10 },
    { name: "Swift", color: "#F43F5E", orbit: 1.4, duration: 25, delay: 2 },
    { name: "Node.js", color: "#10B981", orbit: 1.4, duration: 25, delay: 8 },
    { name: "SQL", color: "#F59E0B", orbit: 1.4, duration: 25, delay: 14 },
    { name: "Prompt Eng.", color: "#A855F7", orbit: 1.8, duration: 35, delay: 20 },
    { name: "Canva Pro", color: "#00D2D3", orbit: 1.8, duration: 35, delay: 28 },
    { name: "UI/UX", color: "#FF7675", orbit: 1.8, duration: 35, delay: 32 }
  ];

  return (
    <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-vibrant-blue/5 blur-[120px] rounded-full scale-150 -z-10" />
      
      {/* Center Laptop */}
      <motion.div 
        animate={{ 
          y: [0, -10, 0],
          rotateY: [0, 10, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative z-20 scale-75 md:scale-100"
      >
        <div className="relative p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] liquid-glass border border-white/20 shadow-[0_0_50px_rgba(59,130,246,0.3)]">
          <Laptop className="w-12 h-12 md:w-20 md:h-20 text-white icon-glow-blue" />
        </div>
      </motion.div>

      {/* Orbits & Orbiting Items Wrapper (Responsive Scale) */}
      <div className="absolute inset-0 flex items-center justify-center scale-[0.5] sm:scale-[0.75] md:scale-100">
        {/* Static Orbits */}
        {[240, 340, 440].map((size, i) => (
          <div 
            key={i}
            style={{ width: size, height: size }}
            className="absolute border border-white/5 rounded-full pointer-events-none"
          />
        ))}

        {/* Orbiting Items */}
        {languages.map((lang, idx) => {
          const orbitSize = lang.orbit * 240; // Base size
          return (
            <motion.div
              key={idx}
              className="absolute"
              animate={{
                rotate: 360
              }}
              transition={{
                duration: lang.duration,
                repeat: Infinity,
                ease: "linear",
                delay: -lang.delay
              }}
              style={{
                width: orbitSize,
                height: orbitSize,
              }}
            >
              <motion.div 
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ rotate: -360 }}
                transition={{
                  duration: lang.duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: -lang.delay
                }}
              >
                <div 
                  className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 backdrop-blur-md text-[9px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap shadow-lg select-none hover:scale-110 transition-transform cursor-pointer"
                  style={{ 
                    backgroundColor: `${lang.color}20`,
                    borderColor: `${lang.color}40`,
                    color: lang.color,
                    boxShadow: `0 0 20px ${lang.color}20`
                  }}
                >
                  {lang.name}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const Section = ({ id, children, title, subtitle }: { id: string; children: React.ReactNode; title?: string; subtitle?: string }) => (
    <motion.section 
    id={id} 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-5%" }}
    variants={containerVariants}
    className="relative z-10 py-16 md:py-32 px-5 sm:px-6 max-w-7xl mx-auto min-h-fit"
  >
    {(title || subtitle) && (
      <motion.div 
        variants={itemVariants}
        className="text-center mb-16 md:mb-24"
      >
        {title && (
          <h2 className="text-4xl sm:text-5xl md:text-[5.5rem] bg-gradient-to-r from-white via-white to-vibrant-blue bg-clip-text text-transparent mb-6 md:mb-8 italic text-glow-white" style={{ fontFamily: "'Instrument Serif', serif" }}>
            {title}
          </h2>
        )}
        {subtitle && <p className="text-white/80 max-w-2xl mx-auto text-base md:text-xl leading-relaxed font-light tracking-wide text-shadow-strong px-4 md:px-0">{subtitle}</p>}
      </motion.div>
    )}
    <motion.div variants={itemVariants}>
      {children}
    </motion.div>
  </motion.section>
);

const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 400, damping: 30 }}
    className={`liquid-glass rounded-[3rem] p-10 md:p-14 hover:bg-white/[0.04] transition-all duration-700 border border-white/5 group ${className}`}
  >
    {children}
  </motion.div>
);

const FAQS = [
  {
    question: "What specific services does Dudan Technology Pvt Ltd offer?",
    answer: "We specialize in bespoke AI Chatbot App Development, Custom Web and Mobile Applications, and scalable Custom Website designs tailored to elevate your enterprise's digital presence."
  },
  {
    question: "How does the custom AI chatbot development process work?",
    answer: "Our process begins with understanding your unique business needs, followed by training custom AI models on your proprietary data. We then seamlessly integrate the chatbot into your existing platforms for an intelligent, context-aware user experience."
  },
  {
    question: "Do you build custom software for specific industries?",
    answer: "Yes, we build scalable, custom applications across various sectors including e-commerce, AgriTech, and corporate enterprises, leveraging modern tech stacks to ensure optimal performance, security, and scalability."
  },
  {
    question: "How can I start a project with Dudan Technology?",
    answer: "You can reach out via the contact section below to schedule a consultation. We'll discuss your vision, define the technical scope, and map out a strategic timeline for execution."
  }
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {FAQS.map((faq, idx) => (
        <div key={idx} className="border-b border-white/5 overflow-hidden">
          <button 
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
          >
            <span className={`text-lg md:text-2xl font-light tracking-wide transition-colors ${openIndex === idx ? "text-vibrant-blue text-glow-blue" : "text-white/80 group-hover:text-white"}`}>
              {faq.question}
            </span>
            <div className={`p-2.5 rounded-full transition-all duration-500 transform ${openIndex === idx ? "bg-vibrant-blue/10 rotate-180 text-vibrant-blue shadow-[0_0_15px_rgba(59,130,246,0.2)]" : "bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white/80"}`}>
              <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
            </div>
          </button>
          <AnimatePresence>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="pb-8 pr-12 text-white/60 leading-relaxed font-light text-base md:text-lg">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/**
 * ARCHITECTURE OVERVIEW:
 * This application is built using the "Holy Trinity" of Web Development:
 * 1. HTML5: Providing the semantic structure of the DOM.
 * 2. CSS3 (via Tailwind CSS): Driving the high-performance cinematic animations and responsive layout.
 * 3. JavaScript/TypeScript: Powering the interactive logic, 3D orbits, and dynamic content.
 * 
 * It is configured as a Progressive Web App (PWA) for full offline capabilities.
 */
export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [timelineFilter, setTimelineFilter] = useState("All");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-[#030303] text-white bg-gradient-mesh bg-grain">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-vibrant-blue via-vibrant-purple to-vibrant-rose origin-left z-[100]"
        style={{ scaleX }}
      />
      <AnimatePresence>
        {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      </AnimatePresence>

      <VideoBackground />      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none">
        <div className="liquid-glass rounded-full px-5 py-3 md:px-8 md:py-5 flex items-center justify-between max-w-6xl mx-auto pointer-events-auto border-white/10">
          <div className="flex items-center gap-6 lg:gap-20">
            <div className="flex items-center gap-2">
              <span className="font-medium text-xl md:text-2xl italic tracking-tighter bg-gradient-to-r from-white via-white to-vibrant-blue bg-clip-text text-transparent" style={{ fontFamily: "'Instrument Serif', serif" }}>
                AnshumanParida.
              </span>
            </div>
            <div className="hidden lg:flex items-center gap-12">
              <NavLink href="#about">About</NavLink>
              <NavLink href="#skills">Toolkit</NavLink>
              <NavLink href="#experience">Work</NavLink>
              <NavLink href="#impact">Impact</NavLink>
              <NavLink href="#faq">FAQ</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <motion.a 
              href={LINKEDIN_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="hidden sm:block text-white/80 hover:text-white transition-all transform"
            >
              <Linkedin className="w-5 h-5 icon-glow-blue" />
            </motion.a>
            <motion.a 
              href="https://wa.me/917008872724" 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="hidden sm:block text-white/80 hover:text-[#25D366] transition-all transform"
            >
              <MessageCircle className="w-5 h-5 icon-glow-emerald" />
            </motion.a>
            <motion.a 
              href="tel:+917008872724" 
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="hidden sm:block text-white/80 hover:text-white transition-all transform"
            >
              <Phone className="w-5 h-5 icon-glow-amber" />
            </motion.a>
            <button
              onClick={() => window.print()}
              className="hidden sm:flex items-center justify-center text-white/80 hover:text-white transition-all transform"
              title="Print Portfolio"
            >
              <Printer className="w-5 h-5 icon-glow-blue" />
            </button>
            <a 
              href="mailto:anshuman.parida19@gmail.com" 
              className="liquid-glass rounded-full px-5 py-2 md:px-8 md:py-3 text-[10px] md:text-sm font-bold tracking-widest uppercase hover:bg-white/10 transition-all border border-vibrant-blue/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
            >
              Hire Me →
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center px-4 md:px-6 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
           transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
           className="relative w-full"
        >
          <div className="absolute inset-0 -z-10 bg-white/[0.03] blur-[120px] rounded-full scale-150" />
          
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-6 md:mb-10">
            <div className="h-px w-8 bg-vibrant-blue/40" />
            <span className="text-[10px] md:text-[12px] uppercase tracking-[0.6em] text-white/60 font-bold">Quick Profile</span>
            <div className="h-px w-8 bg-vibrant-blue/40" />
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-6xl sm:text-8xl md:text-[11rem] lg:text-[14rem] mb-4 md:mb-8 tracking-tighter leading-[0.85] md:leading-[0.8] select-none relative" 
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent italic">Anshuman</span> <span className="italic block font-normal bg-gradient-to-r from-vibrant-blue via-vibrant-purple to-vibrant-rose bg-clip-text text-transparent">Parida.</span>
            <motion.div 
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.2, duration: 1.2, type: "spring", bounce: 0.5 }}
              className="absolute -top-10 -right-10 md:-top-20 md:-right-20 w-24 h-24 md:w-40 md:h-40 rounded-full border border-vibrant-blue/30 overflow-hidden hidden md:block bg-black/40 backdrop-blur-sm shadow-[0_0_50px_rgba(59,130,246,0.2)]"
            >
              <MainAvatarGlobe url={USER_HEADSHOT_URL} isSmall />
            </motion.div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 opacity-30 pointer-events-none">
              <Globe3D size={2} speed={0.3} opacity={0.1} />
            </div>
          </motion.h1>
          
          <motion.div variants={itemVariants} className="max-w-5xl mx-auto space-y-10 md:space-y-16">
            <p className="text-lg sm:text-2xl md:text-4xl text-white/90 leading-relaxed font-light tracking-wide max-w-3xl mx-auto italic px-4 text-shadow-strong" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Dual Degree Undergraduate • Founder of Famkart • <span className="text-white border-b border-white/40 pb-1 md:pb-2">AI Enthusiast</span>
            </p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 pt-4 md:pt-8"
            >
              <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-4 md:gap-6 w-full sm:w-auto border border-white/20">
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-white/80">Let's Work</span>
                <a 
                   href={LINKEDIN_URL} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="bg-vibrant-blue text-white px-8 py-3 md:px-10 md:py-4 rounded-full font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_40px_rgba(59,130,246,0.4)]"
                 >
                   LinkedIn <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                 </a>
              </div>
              
              <a href="#experience" className="text-white/60 hover:text-white font-bold text-[9px] md:text-[10px] tracking-[0.4em] uppercase flex items-center gap-3 md:gap-4 group transition-all py-2">
                Project Gallery <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-3 transition-transform" />
              </a>

              <button 
                onClick={() => window.print()}
                className="text-white/60 hover:text-vibrant-blue font-bold text-[9px] md:text-[10px] tracking-[0.4em] uppercase flex items-center gap-3 md:gap-4 transition-colors py-2 md:ml-4"
              >
                <Printer className="w-4 h-4 md:w-5 md:h-5" /> Print PDF
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-5 group"
        >
          <span className="text-[10px] uppercase tracking-[0.8em] text-white/40 font-bold group-hover:text-white transition-colors">Digital Manifesto</span>
          <div className="w-[1px] h-24 bg-gradient-to-b from-white/30 via-white/5 to-transparent group-hover:h-32 transition-all duration-1000" />
        </motion.div>
      </section>

      {/* Profile Section */}
      <Section id="about" title="The Founder" subtitle="Building at the intersection of logic and intuition.">
        <div className="grid lg:grid-cols-12 gap-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-12"
          >
            <GlassCard className="p-8 md:p-14">
              <div className="flex flex-col xl:flex-row items-center gap-12 md:gap-20">
                <div className="relative group perspective-1000 w-full md:w-auto flex justify-center">
                  <div className="absolute inset-0 bg-white/30 blur-[120px] opacity-0 group-hover:opacity-60 transition-opacity duration-1000 -z-10" />
                  <div className="w-full max-w-[20rem] aspect-[3/4] md:w-[26rem] md:h-[36rem] rounded-[3rem] md:rounded-[4rem] overflow-hidden border border-white/20 shadow-2xl relative bg-black/40 backdrop-blur-md">
                    <div className="absolute inset-0 z-0">
                      <MainAvatarGlobe url={USER_PHOTO_URL} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none" />
                    <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                      <p className="text-[10px] md:text-[12px] uppercase tracking-[0.6em] text-white/70 mb-2 md:mb-3 font-bold">Founder & Visionary</p>
                      <p className="text-3xl md:text-4xl font-light italic text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>Anshuman Parida.</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 space-y-8 md:space-y-12 text-center xl:text-left">
                  <div className="space-y-4 md:space-y-6">
                    <h3 className="text-4xl md:text-8xl italic leading-[1] md:leading-[0.9] text-glow-white" style={{ fontFamily: "'Instrument Serif', serif" }}>
                      <span className="bg-gradient-to-r from-vibrant-blue to-vibrant-purple bg-clip-text text-transparent">Bridging Tradition</span> <br className="hidden md:block" /><span className="text-white/60">with Technology.</span>
                    </h3>
                  </div>
                  
                  <p className="text-xl md:text-3xl text-white/90 leading-relaxed font-light tracking-tight max-w-4xl">
                    "Tech entrepreneur and developer bridging AI, digital design, and e-commerce. Founder of Famkart and Dudan Technology Pvt Ltd, specializing in bespoke Chatbot AI Apps, Custom Applications, and Custom Website Development."
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    {[
                      { 
                        t: "AI & Custom Dev", 
                        d: "Dudan Technology Pvt Ltd: Crafting AI chatbots, custom apps, and specialized websites tailored for scale.", 
                        c: "from-vibrant-blue to-cyan-400" 
                      },
                      { 
                        t: "E-Commerce & Biz", 
                        d: "Founder of Famkart & Desikart; skilled in Shopify, dropshipping logistics, and MS Excel.", 
                        c: "from-vibrant-purple to-pink-500" 
                      },
                      { 
                        t: "Design & Marketing", 
                        d: "UI/UX design (Canva Pro), video editing, and executing high-ROI digital ad campaigns.", 
                        c: "from-vibrant-rose to-orange-400" 
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/10 space-y-3 group/item hover:bg-white/[0.05] transition-all">
                        <h4 className={`text-lg font-bold bg-gradient-to-r ${item.c} bg-clip-text text-transparent italic`} style={{ fontFamily: "'Instrument Serif', serif" }}>{item.t}</h4>
                        <p className="text-[12px] text-white/60 leading-relaxed font-light">{item.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </Section>

      {/* Core Mastery Section */}
      <Section id="mastery" title="The Core Trilogy" subtitle="Expertise in the foundational languages that power the modern web.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-32">
          {[
            { 
              name: "HTML5", 
              desc: "Semantic structure & modern web standards.", 
              color: "text-[#E34F26]", 
              bg: "hover:bg-[#E34F26]/5",
              glow: "icon-glow-rose",
              items: ["Semantics", "Accessibility", "SEO"]
            },
            { 
              name: "CSS3", 
              desc: "Cinematic styling & high-performance layouts.", 
              color: "text-[#1572B6]", 
              bg: "hover:bg-[#1572B6]/5",
              glow: "icon-glow-blue",
              items: ["Flexbox", "Animations", "Tailwind"]
            },
            { 
              name: "JavaScript", 
              desc: "Dynamic logic & complex interactive systems.", 
              color: "text-[#F7DF1E]", 
              bg: "hover:bg-[#F7DF1E]/5",
              glow: "icon-glow-amber",
              items: ["ES6+", "DOM Manipulation", "Async Logic"]
            }
          ].map((skill, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`p-10 rounded-[2.5rem] liquid-glass border border-white/10 transition-all duration-500 ${skill.bg} group`}
            >
              <div className="flex flex-col gap-6">
                <div className={`text-4xl md:text-5xl font-black italic tracking-tighter ${skill.color} ${skill.glow}`} style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {skill.name}
                </div>
                <p className="text-white/60 font-medium leading-relaxed italic">
                  {skill.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, idx) => (
                    <span key={idx} className="text-[9px] uppercase tracking-[0.3em] font-bold py-1.5 px-3 rounded-full bg-white/5 border border-white/5 text-white/40">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Skills Orbit Section */}
      <Section 
        id="stack" 
        title="The Tech Ecosystem" 
        subtitle="Exploring the orbital mechanics of my learned languages and specialized tools around a central logic core."
      >
        <SkillsSolarSystem />
      </Section>


      {/* Toolkit */}
      <Section id="skills" title="The Toolkit" subtitle="Technical & strategic capabilities for the next era.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {[
            { 
               icon: Code2, 
               title: "Development Suite", 
               color: "from-vibrant-blue to-emerald-400",
               items: [
                 { name: "Python (Control & Logic)", level: 92 }, 
                 { name: "C++ & Java (Architecture)", level: 88 }, 
                 { name: "Swift & Node.js", level: 82 },
                 { name: "HTML5 / CSS3 / SQL", level: 95 }
               ] 
             },
             { 
               icon: Brain, 
               title: "AI Workflows", 
               color: "from-vibrant-purple to-pink-500",
               items: [
                 { name: "Advanced Prompt Engineering", level: 98 }, 
                 { name: "AI Scripting & Logic", level: 94 }, 
                 { name: "Generative Workflows", level: 92 }
               ] 
             },
             { 
               icon: Briefcase, 
               title: "Design & Business", 
               color: "from-vibrant-rose to-orange-500",
               items: [
                 { name: "UI/UX (Canva Pro)", level: 94 }, 
                 { name: "Digital Ad Campaigns", level: 90 }, 
                 { name: "E-commerce Logistics", level: 95 }
               ] 
             }
           ].map((skill, idx) => (
             <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
               <GlassCard className="h-full hover:border-vibrant-white/10 active:scale-95 transition-all hover:bg-white/[0.05]">
                 <div className={`w-20 h-20 rounded-[2rem] bg-white/[0.03] flex items-center justify-center group-hover:bg-white text-white group-hover:text-black transition-all duration-1000 mb-12 border border-white/5 shadow-[0_0_30px_rgba(255,255,255,0.05)]`}>
                   <skill.icon className={`w-8 h-8 transition-transform duration-500 group-hover:scale-110 ${
                     skill.color.includes('blue') ? 'icon-glow-blue group-hover:text-vibrant-blue' : 
                     skill.color.includes('purple') ? 'icon-glow-purple group-hover:text-vibrant-purple' : 
                     skill.color.includes('rose') ? 'icon-glow-rose group-hover:text-vibrant-rose' : 
                     skill.color.includes('amber') ? 'icon-glow-amber group-hover:text-vibrant-amber' : 
                     'icon-glow-emerald group-hover:text-vibrant-emerald'
                   }`} />
                  </div>
                  <h4 className="text-4xl italic mb-10" style={{ fontFamily: "'Instrument Serif', serif" }}>{skill.title}</h4>
                 <div className="space-y-8">
                   {skill.items.map((item, i) => (
                     <div key={i} className="space-y-3 group/item">
                       <div className="flex items-center justify-between gap-5 text-sm text-white/70 group-hover:text-white/90 group-hover/item:text-white transition-all">
                         <div className="flex items-center gap-3">
                            <div className={`w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-white transition-all transform group-hover/item:scale-150`} />
                            {item.name}
                         </div>
                         <span className="text-[10px] font-bold tracking-tighter text-white/40 group-hover/item:text-white/80 transition-colors uppercase">{item.level}%</span>
                       </div>
                       <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: `${item.level}%` }}
                           viewport={{ once: true }}
                           transition={{ duration: 1.5, ease: "circOut", delay: 0.2 + (i * 0.1) }}
                           className={`h-full bg-gradient-to-r ${skill.color} opacity-60 group-hover/item:opacity-100 transition-all`}
                         />
                       </div>
                     </div>
                   ))}
                 </div>
               </GlassCard>
             </motion.div>
           ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Work" subtitle="Architecting products that solve real friction.">
        <div className="space-y-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <GlassCard className="p-0 overflow-hidden">
              <div className="grid lg:grid-cols-5 h-full">
                <div className="lg:col-span-3 p-16 md:p-24 space-y-12 flex flex-col justify-center border-r border-white/5 animate-in">
                  <div className="space-y-6">
                    <div className="px-4 py-1.5 rounded-full border border-vibrant-blue/20 w-fit text-[10px] uppercase tracking-[0.4em] font-bold text-vibrant-blue bg-vibrant-blue/5">Founder & Lead Developer</div>
                    <h3 className="text-6xl md:text-9xl italic leading-[0.8]" style={{ fontFamily: "'Instrument Serif', serif" }}><span className="bg-gradient-to-r from-white to-vibrant-blue bg-clip-text text-transparent">Famkart</span></h3>
                  </div>
                  <p className="text-2xl text-white/70 font-light leading-relaxed max-w-xl italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    "Conceptualized and developed 'Famkart', a hyper-local e-commerce app designed to bridge local vendors with digital consumers."
                  </p>
                  
                  {/* Results Highlight */}
                  <div className="space-y-4 border-l border-vibrant-blue/50 pl-8">
                    <span className="text-[10px] uppercase font-bold text-white/50 tracking-[0.4em]">Core Contributions</span>
                    <div className="flex flex-wrap gap-10">
                      <div className="space-y-1">
                        <p className="text-3xl text-glow-blue font-medium text-white">Full Lifecycle</p>
                        <p className="text-xs text-white/50 uppercase tracking-widest leading-none">Ideation to Testing</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-3xl text-glow-purple font-medium text-white">UI/UX Identity</p>
                        <p className="text-xs text-white/50 uppercase tracking-widest leading-none">Canva Directed Design</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-10 pt-10">
                    <div className="space-y-3">
                      <span className="text-[10px] uppercase font-bold text-white/50 tracking-[0.4em]">iOS Framework</span>
                      <p className="text-sm text-white/90">Swift Integration</p>
                    </div>
                    <div className="space-y-3">
                      <span className="text-[10px] uppercase font-bold text-white/50 tracking-[0.4em]">Logic & Data</span>
                      <p className="text-sm text-white/90">Python Backend</p>
                    </div>
                  </div>
                </div>
                    <div className="lg:col-span-2 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center relative overflow-hidden group min-h-[500px]">
                       <div className="absolute inset-0 opacity-100 transition-transform duration-[3000ms] group-hover:scale-125">
                         <Globe3D size={1.6} speed={1.2} />
                       </div>
                    </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Dropshipping */}
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <GlassCard className="p-16 md:p-24 space-y-16">
              <div className="flex flex-col md:flex-row justify-between gap-12 items-baseline">
                <h3 className="text-5xl md:text-7xl italic leading-none" style={{ fontFamily: "'Instrument Serif', serif" }}>Dropshipping Business</h3>
                <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/50">Founder | 2023 – Present</span>
              </div>
              <div className="grid md:grid-cols-3 gap-20">
                {[
                  { t: "Market Operations", d: "Handling product research, supplier coordination, and customer service for an end-to-end venture.", r: "Self-Managed" },
                  { t: "Digital Marketing", d: "Designing and executing high-ROI campaigns using Canva and video editing tools to drive sales.", r: "High ROI" },
                  { t: "Data Strategy", d: "Applied MS Excel to analyze sales trends and profit margins for data-driven results.", r: "Data Driven" }
                ].map((item, i) => (
                  <div key={i} className="space-y-8 group/item">
                    <div className="flex items-center justify-between">
                      <TrendingUp className="w-7 h-7 text-white/20 group-hover/item:text-white transition-colors icon-glow-emerald" />
                      <span className="text-[10px] font-bold text-white/10 group-hover/item:text-white/40 transition-colors tracking-tighter">{item.r}</span>
                    </div>
                    <h4 className="text-4xl italic tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>{item.t}</h4>
                    <p className="text-sm text-white/70 leading-relaxed font-light">{item.d}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Vertical Timeline Component */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="pt-16 md:pt-24 space-y-16"
          >
            <div className="text-center space-y-6 max-w-xl mx-auto">
              <div className="px-4 py-1.5 rounded-full border border-vibrant-purple/20 w-fit mx-auto text-[10px] uppercase tracking-[0.4em] font-bold text-vibrant-purple bg-vibrant-purple/5">Interactive Timeline</div>
              <h3 className="text-4xl md:text-6xl italic leading-none" style={{ fontFamily: "'Instrument Serif', serif" }}>Chronology of Innovation</h3>
              <p className="text-sm text-white/50 leading-relaxed font-light">Explore the detailed technical development phases, system modeling, and growth milestones behind each digital venture.</p>

              {/* Interactive Filter Tabs */}
              <div className="flex justify-center items-center gap-2 p-1.5 bg-white/[0.03] border border-white/5 rounded-full w-fit mx-auto">
                {["All", "Famkart", "Dropshipping"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setTimelineFilter(cat)}
                    className={`relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      timelineFilter === cat 
                        ? 'text-black z-10' 
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {timelineFilter === cat && (
                      <motion.div 
                        layoutId="activeTimelineTab" 
                        className="absolute inset-0 bg-white rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Vertical Line Container */}
            <div className="relative max-w-5xl mx-auto">
              {/* Central Glowing Line */}
              <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-vibrant-emerald via-vibrant-purple to-vibrant-amber opacity-30 shadow-[0_0_15px_rgba(255,255,255,0.1)]" />

              <div className="space-y-12 md:space-y-16">
                {TIMELINE_MILESTONES
                  .filter(m => timelineFilter === "All" || m.category === timelineFilter)
                  .map((milestone, idx) => {
                    const IconComponent = milestone.icon;
                    return (
                      <motion.div
                        key={milestone.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className={`relative flex flex-col md:flex-row ${
                          idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                        } items-start md:items-center`}
                      >
                        {/* Center Point Icon with breathing pulse */}
                        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                          <div className={`w-10 h-10 rounded-full ${milestone.pointColor} bg-opacity-20 border border-white/10 backdrop-blur-md flex items-center justify-center group hover:scale-110 transition-transform duration-300 shadow-lg ${milestone.glowColor}`}>
                            <IconComponent className="w-4 h-4 text-white" />
                            <div className={`absolute inset-0 rounded-full ${milestone.pointColor} opacity-25 animate-ping -z-10`} />
                          </div>
                        </div>

                        {/* Timeline Card */}
                        <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${
                          idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                        }`}>
                          <motion.div
                            whileHover={{ y: -5, scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className={`p-8 rounded-[2rem] bg-white/[0.02] hover:bg-white/[0.04] border ${milestone.borderColor} relative group overflow-hidden transition-all duration-500`}
                          >
                            {/* Accent Glow Background */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${milestone.vibrantColor} opacity-[0.03] blur-2xl group-hover:opacity-[0.08] transition-opacity duration-500`} />
                            
                            <div className="space-y-6 relative z-10">
                              <div className="flex flex-wrap items-center justify-between gap-4">
                                <span className={`text-[10px] font-bold uppercase tracking-[0.3em] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/5 text-white/50 group-hover:text-white transition-colors`}>
                                  {milestone.period}
                                </span>
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/[0.03] border border-white/5 rounded-full">
                                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{milestone.stats.label}:</span>
                                  <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest">{milestone.stats.value}</span>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h4 className="text-2xl md:text-3xl italic tracking-tight font-medium text-white group-hover:text-white/100 transition-colors" style={{ fontFamily: "'Instrument Serif', serif" }}>
                                  {milestone.title}
                                </h4>
                                <p className="text-xs uppercase tracking-[0.2em] font-bold text-white/30">{milestone.subtitle}</p>
                              </div>

                              <p className="text-sm text-white/60 group-hover:text-white/85 leading-relaxed font-light transition-colors">
                                {milestone.description}
                              </p>

                              <div className="flex flex-wrap gap-2 pt-2">
                                {milestone.tags.map((tag) => (
                                  <span key={tag} className="text-[9px] uppercase tracking-[0.2em] font-bold py-1 px-2.5 rounded-full bg-white/[0.03] border border-white/10 text-white/40">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        </div>
                        
                        {/* Space placeholder on desktop */}
                        <div className="hidden md:block w-1/2" />
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Impact & Testimonials */}
      <Section id="impact" title="Impact" subtitle="The results of technical precision and strategic vision.">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
            <GlassCard className="h-full flex flex-col justify-between p-8 md:p-12 group hover:bg-white/[0.05] hover:border-vibrant-purple/30 transition-all border-white/5 shadow-[0_0_40px_rgba(168,85,247,0.05)] hover:shadow-[0_0_40px_rgba(168,85,247,0.1)]">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <Quote className="w-10 h-10 text-white/10 group-hover:text-vibrant-purple transition-all duration-500 icon-glow-purple group-hover:scale-110" />
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-vibrant-amber/40 text-vibrant-amber/40 icon-glow-amber" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xl md:text-2xl italic font-light leading-relaxed text-white/90" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    "{t.quote}"
                  </p>
                </div>
                <div className="mt-12 pt-8 border-t border-white/5 space-y-4">
                  <div className="space-y-1">
                    <p className="font-medium text-white group-hover:text-vibrant-purple transition-colors">{t.author}</p>
                    <p className="text-xs text-white/40 uppercase tracking-widest">{t.role}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vibrant-emerald/5 border border-vibrant-emerald/10">
                    <TrendingUp className="w-3 h-3 text-vibrant-emerald" />
                    <span className="text-[10px] font-bold text-vibrant-emerald uppercase tracking-widest">{t.impact}</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section id="faq" title="FAQ" subtitle="Answers to common questions about Dudan Technology Pvt Ltd.">
        <FAQAccordion />
      </Section>

      {/* Final Contact */}
      <Section id="contact">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="liquid-glass rounded-[5rem] p-20 md:p-40 text-center space-y-24 relative overflow-hidden bg-gradient-to-b from-vibrant-blue/5 via-vibrant-purple/5 to-transparent border-vibrant-blue/10"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-white/[0.02] to-transparent pointer-events-none" />
          <div className="space-y-10 relative z-10">
            <h2 className="text-8xl md:text-[12rem] bg-gradient-to-r from-white via-white to-vibrant-blue bg-clip-text text-transparent italic leading-none text-glow-white" style={{ fontFamily: "'Instrument Serif', serif" }}>Let's Build.</h2>
            <p className="text-2xl md:text-4xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed italic text-shadow-strong" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Strategizing the next move in <span className="text-vibrant-blue text-glow-blue">technical excellence</span>.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 relative z-10 px-4">
            {[
              { i: Github, l: "GitHub", sub: "Code", h: GITHUB_URL, color: "group-hover:text-white", glow: "hover:shadow-white/20", line: "bg-white" },
              { i: Linkedin, l: "LinkedIn", sub: "Network", h: LINKEDIN_URL, color: "group-hover:text-vibrant-blue", glow: "hover:shadow-vibrant-blue/20", line: "bg-vibrant-blue" },
              { i: Mail, l: "Email", sub: "Direct", h: "mailto:anshuman.parida19@gmail.com", color: "group-hover:text-vibrant-rose", glow: "hover:shadow-vibrant-rose/20", line: "bg-vibrant-rose" },
              { i: MessageCircle, l: "WhatsApp", sub: "Active", h: "https://wa.me/917008872724", color: "group-hover:text-vibrant-emerald", glow: "hover:shadow-vibrant-emerald/20", line: "bg-vibrant-emerald" },
              { i: Phone, l: "Tel", sub: "Mobile", h: "tel:+917008872724", color: "group-hover:text-vibrant-amber", glow: "hover:shadow-vibrant-amber/20", line: "bg-vibrant-amber" }
            ].map((item, idx) => (
              <motion.a 
                key={idx} 
                href={item.h} 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover="hover"
                initial="initial"
                whileTap={{ scale: 0.95 }}
                variants={{
                  initial: { y: 0, scale: 1 },
                  hover: { y: -20, scale: 1.05 }
                }}
                transition={{ type: "spring", stiffness: 350, damping: 15 }}
                className="group flex flex-col items-center gap-6 md:gap-10 transition-colors"
              >
                <div className="relative">
                  {/* Outer Glow Ring */}
                  <motion.div 
                    variants={{
                      initial: { scale: 0.8, opacity: 0 },
                      hover: { scale: 1.2, opacity: 0.2 }
                    }}
                    className={`absolute inset-0 rounded-full blur-xl ${item.line}`}
                  />
                  
                  {/* Icon Container */}
                  <div className={`w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:border-white shadow-2xl relative z-10 overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-full group-hover:translate-x-[-150%] transition-transform duration-1000" />
                    <item.i className={`w-6 h-6 md:w-9 md:h-9 text-white group-hover:text-black transition-all duration-500 group-hover:scale-110`} />
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1.5 md:gap-2">
                  <header className="flex flex-col items-center gap-1">
                    <span className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] font-bold text-white/30 group-hover:text-white/40 transition-colors">
                      {item.sub}
                    </span>
                    <span className={`text-[10px] md:text-[11px] uppercase tracking-[0.6em] font-black text-white/60 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] ${item.color}`}>
                      {item.l}
                    </span>
                  </header>
                  <motion.div 
                    variants={{
                      initial: { width: 0, opacity: 0 },
                      hover: { width: "120%", opacity: 1 }
                    }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className={`h-[1.5px] ${item.line} shadow-[0_0_10px_currentColor]`}
                  />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Footer */}
      <footer className="relative z-10 py-32 px-6 border-t border-white/5 backdrop-blur-3xl bg-black/90">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-24">
          <div className="flex flex-col items-center lg:items-start gap-10">
             <span className="text-4xl italic font-medium tracking-tighter text-glow-white" style={{ fontFamily: "'Instrument Serif', serif" }}>AnshumanParida.</span>
             <div className="space-y-2 text-center lg:text-left">
                <p className="text-[10px] uppercase tracking-[0.8em] text-white/70 font-bold">Innovative Progress</p>
                <div className="flex items-center justify-center lg:justify-start gap-4 text-white/60 text-[9px] uppercase tracking-[0.4em]">
                   <span>Bhubaneswar, Odisha — Global Citizen</span>
                   <div className="w-4 h-4 opacity-70">
                     <Globe3D size={0.8} speed={1} opacity={0.7} />
                   </div>
                </div>
             </div>
          </div>
          
          <div className="flex flex-col items-center lg:items-end gap-12">
            <div className="flex gap-12">
              {[Instagram, Twitter, Linkedin, MessageCircle, Mail].map((Icon, idx) => {
                const links = [
                  "#", 
                  "#", 
                  LINKEDIN_URL, 
                  "https://wa.me/917008872724",
                  "mailto:anshuman.parida19@gmail.com"
                ];
                const isWhatsApp = idx === 3;
                const iconClasses = [
                  "hover:text-vibrant-rose icon-glow-rose",
                  "hover:text-vibrant-blue icon-glow-blue",
                  "hover:text-vibrant-blue icon-glow-blue",
                  "hover:text-[#25D366] icon-glow-emerald",
                  "hover:text-vibrant-rose icon-glow-rose"
                ];
                return (
                  <motion.a 
                    key={idx} 
                    href={links[idx]} 
                    whileHover={{ 
                      scale: 1.4, 
                      y: -15, 
                      rotate: idx % 2 === 0 ? 12 : -12,
                    }}
                    whileTap={{ scale: 0.85 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 600, 
                      damping: 10,
                      mass: 0.6
                    }}
                    className={`transition-all duration-300 ${iconClasses[idx]} text-white/80 hover:text-white`}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                );
              })}
            </div>
            <div className="flex flex-col items-center md:items-end gap-4">
              <p className="text-[8px] uppercase tracking-[1em] text-white/40 font-bold mb-4">
                © 2024 DESIGNED FOR THE FUTURE.
              </p>
              <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">
                <span className="hover:text-vibrant-rose transition-colors">HTML5</span>
                <span className="w-1 h-1 rounded-full bg-white/10" />
                <span className="hover:text-vibrant-blue transition-colors">CSS3</span>
                <span className="w-1 h-1 rounded-full bg-white/10" />
                <span className="hover:text-vibrant-amber transition-colors">JavaScript</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mt-4">
                <div className="w-1.5 h-1.5 rounded-full bg-vibrant-emerald animate-pulse" />
                <span className="text-[8px] uppercase tracking-widest text-white/40 font-bold">Offline Ready (PWA)</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <Chatbot />
      <SpeedInsights />
    </div>
  );
}
