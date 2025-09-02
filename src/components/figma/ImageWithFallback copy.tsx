
import React, { useState, useCallback } from 'react'

// Main default fallback image - use a reliable and fast loading image
const MAIN_FALLBACK = 'https://images.unsplash.com/photo-1609365635346-524d0024684f?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'

// SVG fallback for when even the main fallback fails - embedded to avoid network requests
const ERROR_SVG =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHZpZXdCb3g9IjAgMCA4OCA4OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTY2LjM3NzkgMTQuNjczOEM3MC4yNTIzIDE0Ljg3MDUgNzMuMzMzOCAxOC4wNzM5IDczLjMzNCAyMS45OTcxVjY1Ljk5NzFMNzMuMzI0MiA2Ni4zNzVDNzMuMTMzOSA3MC4xMjQzIDcwLjEyNzIgNzMuMTMxIDY2LjM3NzkgNzMuMzIxM0w2NiA3My4zMzExSDIyTDIxLjYyMyA3My4zMjEzQzE3Ljg3MzUgNzMuMTMxMyAxNC44NjcxIDcwLjEyNDUgMTQuNjc2OCA2Ni4zNzVMMTQuNjY3IDY1Ljk5NzFWMjEuOTk3MUMxNC42NjcyIDE4LjA3MzcgMTcuNzQ4NCAxNC44NzAyIDIxLjYyMyAxNC42NzM4TDIyIDE0LjY2NDFINjZMNjYuMzc3OSAxNC42NzM4Wk0xOC4zMzQgNTcuNTg2OVY2NS45OTcxQzE4LjMzNDIgNjguMDIxOSAxOS45NzUyIDY5LjY2MzkgMjIgNjkuNjY0MUg1OS43NDEyTDMyLjk5OSA0Mi45MjE5TDE4LjMzNCA1Ny41ODY5Wk0yMiAxOC4zMzExQzE5Ljk3NTIgMTguMzMxMiAxOC4zMzQyIDE5Ljk3MjMgMTguMzM0IDIxLjk5NzFWNTIuNDA0M0wzMS43MDQxIDM5LjAzNDJMMzEuODQyOCAzOC45MDgyQzMyLjU2MjggMzguMzIwOSAzMy42MjQ3IDM4LjM2MzEgMzQuMjk1OSAzOS4wMzQyTDY0LjkyNjggNjkuNjY0MUg2NkM2OC4wMjQ4IDY5LjY2MzkgNjkuNjY2OCA2OC4wMjE5IDY5LjY2NyA2NS45OTcxVjIxLjk5NzFDNjkuNjY2OCAxOS45NzIzIDY4LjAyNDggMTguMzMxMiA2NiAxOC4zMzExSDIyWk01My42Mzg3IDI1LjY3NThDNTguNDgxOSAyNS45MjE0IDYyLjMzMyAyOS45MjY4IDYyLjMzMyAzNC44MzExTDYyLjMyMTMgMzUuMzAyN0M2Mi4wNzU1IDQwLjE0NTcgNTguMDcxIDQzLjk5NjkgNTMuMTY3IDQzLjk5NzFMNTIuNjk1MyA0My45ODU0QzQ4LjAwODIgNDMuNzQ3OSA0NC4yNDk2IDM5Ljk4OTcgNDQuMDExNyAzNS4zMDI3TDQ0IDM0LjgzMTFDNDQgMjkuNzY4NCA0OC4xMDQ0IDI1LjY2NDEgNTMuMTY3IDI1LjY2NDFMNTMuNjM4NyAyNS42NzU4Wk01My4xNjcgMjkuMzMxMUM1MC4xMjk0IDI5LjMzMTEgNDcuNjY3IDMxLjc5MzUgNDcuNjY3IDM0LjgzMTFDNDcuNjY3MyAzNy44NjgzIDUwLjEyOTYgNDAuMzMxMSA1My4xNjcgNDAuMzMxMUM1Ni4yMDQyIDQwLjMzMDkgNTguNjY2NiAzNy44NjgyIDU4LjY2NyAzNC44MzExQzU4LjY2NyAzMS43OTM2IDU2LjIwNDQgMjkuMzMxMiA1My4xNjcgMjkuMzMxMVoiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuMyIvPgo8L3N2Zz4K'

// Category-specific fallbacks (all using Unsplash images)
const TYPE_FALLBACKS: Record<string, string> = {
  'product': 'https://images.unsplash.com/photo-1571781418606-d638235051a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'service': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'person': 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'profile': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'avatar': 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'staff': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'therapy': 'https://images.unsplash.com/photo-1620165479836-f8641c252da3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'analysis': 'https://images.unsplash.com/photo-1571781418606-d638235051a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
}

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  category?: string;
  type?: 'product' | 'service' | 'person' | 'profile' | 'avatar' | 'staff' | 'therapy' | 'analysis';
}

export function ImageWithFallback({
  src,
  alt,
  style,
  className,
  category,
  type,
  ...rest
}: ImageWithFallbackProps) {
  const [fallbackSrc, setFallbackSrc] = useState<string | null>(null)
  
  // Normalize and fix image paths
  const getFixedImagePath = useCallback((imagePath: string | undefined): string => {
    if (!imagePath) return MAIN_FALLBACK
    
    // If it's already a fallback or data URI, return as is
    if (imagePath.startsWith('data:') || imagePath === MAIN_FALLBACK || imagePath === ERROR_SVG) {
      return imagePath
    }
    
    // Remove /public prefix if present (common mistake)
    if (imagePath.startsWith('/public/')) {
      return imagePath.replace('/public/', '/')
    }
    
    // Handle Facebook and other potentially blocked domains
    if (imagePath.includes('fbcdn.net') || 
        imagePath.includes('facebook.com') || 
        imagePath.includes('fb.com') || 
        imagePath.includes('fna.fbcdn')) {
      // Return appropriate fallback based on type
      return type && TYPE_FALLBACKS[type] ? TYPE_FALLBACKS[type] : MAIN_FALLBACK
    }
    
    return imagePath
  }, [type])
  
  // Get the initial fixed path
  const initialSrc = getFixedImagePath(src)
  
  // Handle image loading error
  const handleError = useCallback(() => {
    // Log error for debugging
    console.warn(`Image failed to load: ${initialSrc}`)
    
    // Determine appropriate fallback
    let fallbackImage = MAIN_FALLBACK
    
    if (type && TYPE_FALLBACKS[type]) {
      fallbackImage = TYPE_FALLBACKS[type]
    }
    
    // Set fallback source (if not already using it)
    if (initialSrc !== fallbackImage) {
      setFallbackSrc(fallbackImage)
    } else {
      // If we're already using the main fallback, go to SVG
      setFallbackSrc(ERROR_SVG)
    }
  }, [initialSrc, type])
  
  // Render appropriate image based on fallback state
  const imageSrc = fallbackSrc || initialSrc
  const imageAlt = alt || (type ? `${type} image` : "Image")
  
  return (
    <img 
      src={imageSrc} 
      alt={imageAlt} 
      className={className} 
      style={style} 
      {...rest} 
      onError={handleError}
    />
  )
}
