'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useMediaQuery } from 'usehooks-ts'
import { useTheme } from 'next-themes'
import { liquidVertexShader, liquidFragmentShader } from './liquid-shader'
import { cn } from '@/lib/utils'

interface LiquidBackgroundProps {
  className?: string
}

// globals.css의 oklch CSS 변수를 런타임에 읽어 THREE.Color로 변환
// (색상은 globals.css에서만 정의하고, 여기서는 참조만 함)
// 주의: getComputedStyle().color는 브라우저에 따라 lab()/oklch() 등 넓은 색역 표기를
// 그대로 반환할 수 있어 THREE.Color.setStyle()이 파싱하지 못한다.
// canvas 2D context는 어떤 CSS 색상 문법이든 항상 8비트 sRGB 픽셀로 변환해주므로 이를 이용한다.
let colorProbeCtx: CanvasRenderingContext2D | null = null
function readCssColor(varName: string): THREE.Color {
  const oklch = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
  if (!colorProbeCtx) {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    colorProbeCtx = canvas.getContext('2d')
  }
  const ctx = colorProbeCtx
  if (!ctx) return new THREE.Color(0xffffff)

  ctx.fillStyle = oklch
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  return new THREE.Color(r / 255, g / 255, b / 255)
}

export function LiquidBackground({ className }: LiquidBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const timeRef = useRef(0)
  const rafIdRef = useRef<number | null>(null)

  // 서버와 클라이언트 첫 렌더 결과를 일치시켜 하이드레이션 불일치를 방지 (initializeWithValue: false)
  const isDesktop = useMediaQuery('(min-width: 768px)', { initializeWithValue: false })
  const showCanvas = isDesktop
  const [webglFailed, setWebglFailed] = useState(false)
  const fallbackRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!showCanvas || webglFailed || !canvasRef.current || !containerRef.current) return

    // WebGL 컨텍스트 생성 실패(미지원 브라우저/GPU 드라이버 문제 등)는 THREE.WebGLRenderer가
    // 예외를 던지므로, 이를 잡아 fallback 그래디언트로 graceful degradation 처리한다.
    let renderer: THREE.WebGLRenderer

    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true })
    } catch {
      // WebGL 컨텍스트 생성이라는 브라우저 API 호출 결과를 React 상태로 동기화하는 것으로,
      // effect가 담당해야 할 정상적인 외부 시스템 연동에 해당한다.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWebglFailed(true)
      return
    }

    // Three.js 씬 초기화
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    camera.position.z = 1

    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight)
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer

    // 메쉬 생성 (liquid-shader.ts의 재사용 가능한 셰이더 사용)
    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader: liquidVertexShader,
      fragmentShader: liquidFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: readCssColor('--primary') },
        uColor2: { value: readCssColor('--secondary') },
      },
      transparent: true,
      side: THREE.DoubleSide,
    })
    materialRef.current = material

    const mesh = new THREE.Mesh(geometry, material)
    meshRef.current = mesh
    scene.add(mesh)

    // 애니메이션 루프
    const animate = () => {
      rafIdRef.current = requestAnimationFrame(animate)
      timeRef.current += 0.01

      if (meshRef.current && meshRef.current.material instanceof THREE.ShaderMaterial) {
        meshRef.current.material.uniforms.uTime.value = timeRef.current
        meshRef.current.rotation.z += 0.0001
      }

      if (rendererRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, camera)
      }
    }

    animate()

    // Fallback 페이드 아웃
    if (fallbackRef.current) {
      fallbackRef.current.style.opacity = '0'
      fallbackRef.current.style.transition = 'opacity 0.6s ease-out'
    }

    // 정리
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
      materialRef.current = null
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [showCanvas, webglFailed])

  // 다크/라이트 모드 전환 시 셰이더 색상 갱신 (globals.css의 oklch 변수를 다시 읽음)
  useEffect(() => {
    if (!materialRef.current) return
    materialRef.current.uniforms.uColor1.value = readCssColor('--primary')
    materialRef.current.uniforms.uColor2.value = readCssColor('--secondary')
  }, [resolvedTheme, showCanvas])

  if (!isDesktop) {
    return (
      <div
        className={cn('bg-gradient-to-br from-primary/20 to-secondary/10', className)}
        aria-hidden="true"
      />
    )
  }

  return (
    <div ref={containerRef} className={className}>
      {/* Fallback 정적 그래디언트 */}
      <div
        ref={fallbackRef}
        className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/15"
        aria-hidden="true"
      />

      {/* Canvas (WebGL 컨텍스트 생성 실패 시 fallback 그래디언트만 유지) */}
      {showCanvas && !webglFailed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        />
      )}
    </div>
  )
}
