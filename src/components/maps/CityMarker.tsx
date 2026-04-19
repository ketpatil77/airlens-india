import { motion } from "framer-motion";
import { Marker } from "react-simple-maps";
import type { CityAQI } from "@/data/aqi-data";

interface CityMarkerProps {
  cityIndex?: number;
  cityName: string;
  city: CityAQI;
  lat: number;
  lng: number;
  aqi: number;
  displayValue: number;
  color: string;
  inView?: boolean;
  isHovered?: boolean;
  onHover: (name: string | null) => void;
  onClick?: () => void;
}

/**
 * U10 — CityMarker
 * Performance: transform-gpu only animations.
 * Features: Enlarges when hovered via Map or Top-10 List.
 */
export function CityMarker({
  cityIndex = 0,
  cityName,
  lat,
  lng,
  displayValue,
  color,
  inView = false,
  isHovered = false,
  onHover,
  onClick,
}: CityMarkerProps) {
  // Adaptive radius based on AQI/Pollutant level
  const radius = Math.max(3.5, Math.min(10, (displayValue / 500) * 12));

  return (
    <Marker coordinates={[lng, lat]}>
      {/* Pulse effect for highly polluted or currently hovered */}
      {isHovered && (
        <motion.circle
          r={radius + 6}
          fill={color}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
          style={{ pointerEvents: "none" }}
        />
      )}
      
      <motion.circle
        r={radius}
        fill={color}
        stroke="#0D1117"
        strokeWidth={1.5}
        onMouseEnter={() => onHover(cityName)}
        onMouseLeave={() => onHover(null)}
        onClick={onClick}
        initial={{ scale: 0 }}
        animate={{ 
          scale: inView ? (isHovered ? 1.5 : 1) : 0,
          filter: isHovered ? "brightness(1.2) saturate(1.2)" : "brightness(1)"
        }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: inView ? cityIndex * 0.02 : 0 
        }}
        className="cursor-pointer transform-gpu"
        style={{ transformOrigin: "center" }}
      />
    </Marker>
  );
}
