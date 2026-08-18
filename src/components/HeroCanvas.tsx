import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 })
  const [ready, setReady] = useState(false)
  const threeRefs = useRef<any>({
    scene: null, camera: null, renderer: null, composer: null,
    stars: [], nebula: null, mountains: [], animationId: null,
    locations: [], targetCameraX: 0, targetCameraY: 30, targetCameraZ: 300,
  })

  useEffect(() => {
    const refs = threeRefs.current
    const canvas = canvasRef.current
    if (!canvas) return

    // Scene
    refs.scene = new THREE.Scene()
    refs.scene.fog = new THREE.FogExp2(0x0d1a0f, 0.00018)

    // Camera
    refs.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    refs.camera.position.set(0, 20, 100)

    // Renderer
    refs.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    refs.renderer.setSize(window.innerWidth, window.innerHeight)
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping
    refs.renderer.toneMappingExposure = 0.45

    // Post-processing
    refs.composer = new EffectComposer(refs.renderer)
    refs.composer.addPass(new RenderPass(refs.scene, refs.camera))
    const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.6, 0.4, 0.85)
    refs.composer.addPass(bloom)

    // Stars — warm gold/white tones
    for (let layer = 0; layer < 3; layer++) {
      const count = 4000
      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(count * 3)
      const col = new Float32Array(count * 3)
      const sizes = new Float32Array(count)

      for (let j = 0; j < count; j++) {
        const r = 200 + Math.random() * 800
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(Math.random() * 2 - 1)
        pos[j * 3] = r * Math.sin(phi) * Math.cos(theta)
        pos[j * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        pos[j * 3 + 2] = r * Math.cos(phi)

        const c = new THREE.Color()
        const pick = Math.random()
        if (pick < 0.65) c.setHSL(0.08, 0.2, 0.75 + Math.random() * 0.2)       // warm white
        else if (pick < 0.85) c.setHSL(0.09, 0.7, 0.72)                          // gold
        else c.setHSL(0.33, 0.3, 0.65)                                            // soft sage

        col[j * 3] = c.r; col[j * 3 + 1] = c.g; col[j * 3 + 2] = c.b
        sizes[j] = Math.random() * 1.8 + 0.4
      }

      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
      geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

      const mat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, depth: { value: layer } },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          uniform float depth;
          void main() {
            vColor = color;
            vec3 p = position;
            float angle = time * 0.04 * (1.0 - depth * 0.3);
            mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
            p.xy = rot * p.xy;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = size * (280.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float op = 1.0 - smoothstep(0.0, 0.5, d);
            gl_FragColor = vec4(vColor, op);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const stars = new THREE.Points(geo, mat)
      refs.scene.add(stars)
      refs.stars.push(stars)
    }

    // Nebula — deep green/gold tones
    const nebGeo = new THREE.PlaneGeometry(7000, 3500, 80, 80)
    const nebMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x1c3a20) },   // deep green
        color2: { value: new THREE.Color(0x5a3a10) },   // dark gold
        opacity: { value: 0.22 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vElev;
        uniform float time;
        void main() {
          vUv = uv;
          vec3 p = position;
          float e = sin(p.x * 0.008 + time) * cos(p.y * 0.008 + time) * 18.0;
          p.z += e; vElev = e;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1; uniform vec3 color2;
        uniform float opacity; uniform float time;
        varying vec2 vUv; varying float vElev;
        void main() {
          float m = sin(vUv.x * 8.0 + time * 0.4) * cos(vUv.y * 8.0 + time * 0.4);
          vec3 col = mix(color1, color2, m * 0.5 + 0.5);
          float a = opacity * (1.0 - length(vUv - 0.5) * 2.0);
          a *= 1.0 + vElev * 0.008;
          gl_FragColor = vec4(col, max(a, 0.0));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    refs.nebula = new THREE.Mesh(nebGeo, nebMat)
    refs.nebula.position.z = -1050
    refs.scene.add(refs.nebula)

    // Mountains — Gardenia dark green palette
    const layers = [
      { z: -50, h: 55, color: 0x0d1a0f, op: 1.0 },
      { z: -100, h: 75, color: 0x111f13, op: 0.9 },
      { z: -150, h: 95, color: 0x152618, op: 0.7 },
      { z: -200, h: 115, color: 0x1a3020, op: 0.5 },
    ]
    layers.forEach((layer, idx) => {
      const pts: THREE.Vector2[] = []
      const seg = 50
      for (let i = 0; i <= seg; i++) {
        const x = (i / seg - 0.5) * 1000
        const y = Math.sin(i * 0.1) * layer.h +
                  Math.sin(i * 0.05) * layer.h * 0.5 +
                  Math.random() * layer.h * 0.2 - 100
        pts.push(new THREE.Vector2(x, y))
      }
      pts.push(new THREE.Vector2(5000, -300))
      pts.push(new THREE.Vector2(-5000, -300))

      const shape = new THREE.Shape(pts)
      const geo = new THREE.ShapeGeometry(shape)
      const mat = new THREE.MeshBasicMaterial({ color: layer.color, transparent: true, opacity: layer.op, side: THREE.DoubleSide })
      const mountain = new THREE.Mesh(geo, mat)
      mountain.position.z = layer.z
      mountain.position.y = layer.z
      mountain.userData = { baseZ: layer.z, index: idx }
      refs.scene.add(mountain)
      refs.mountains.push(mountain)
    })

    // Store initial mountain Z positions
    refs.locations = refs.mountains.map((m: THREE.Mesh) => m.position.z)

    // Atmosphere
    const atmGeo = new THREE.SphereGeometry(600, 32, 32)
    const atmMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform float time;
        void main() {
          float i = pow(0.7 - dot(vNormal, vec3(0,0,1)), 2.0);
          vec3 atm = vec3(0.1, 0.35, 0.15) * i;
          float pulse = sin(time * 1.5) * 0.08 + 0.92;
          atm *= pulse;
          gl_FragColor = vec4(atm, i * 0.2);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })
    refs.scene.add(new THREE.Mesh(atmGeo, atmMat))

    // Animation loop
    const animate = () => {
      refs.animationId = requestAnimationFrame(animate)
      const t = Date.now() * 0.001

      refs.stars.forEach((s: THREE.Points) => {
        if ((s.material as any).uniforms) (s.material as any).uniforms.time.value = t
      })
      if (refs.nebula?.material?.uniforms) refs.nebula.material.uniforms.time.value = t * 0.5

      if (refs.camera) {
        const smooth = 0.05
        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * smooth
        smoothCameraPos.current.y += (refs.targetCameraY - smoothCameraPos.current.y) * smooth
        smoothCameraPos.current.z += (refs.targetCameraZ - smoothCameraPos.current.z) * smooth
        refs.camera.position.x = smoothCameraPos.current.x + Math.sin(t * 0.1) * 1.5
        refs.camera.position.y = smoothCameraPos.current.y + Math.cos(t * 0.13) * 0.8
        refs.camera.position.z = smoothCameraPos.current.z
        refs.camera.lookAt(0, 10, -600)
      }

      refs.mountains.forEach((m: THREE.Mesh, i: number) => {
        const pf = 1 + i * 0.5
        m.position.x = Math.sin(t * 0.1) * 1.5 * pf
        m.position.y = 50 + Math.cos(t * 0.13) * pf
      })

      refs.composer?.render()
    }
    animate()
    setReady(true)

    // Scroll handler
    const onScroll = () => {
      const progress = Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1)
      const cams = [
        { x: 0, y: 30, z: 300 },
        { x: 0, y: 40, z: -50 },
        { x: 0, y: 50, z: -700 },
      ]
      const sect = Math.floor(progress * 2)
      const sp = (progress * 2) % 1
      const cur = cams[sect] || cams[0]
      const nxt = cams[sect + 1] || cur
      refs.targetCameraX = cur.x + (nxt.x - cur.x) * sp
      refs.targetCameraY = cur.y + (nxt.y - cur.y) * sp
      refs.targetCameraZ = cur.z + (nxt.z - cur.z) * sp

      refs.mountains.forEach((m: THREE.Mesh, i: number) => {
        if (progress > 0.7) m.position.z = 600000
        else m.position.z = refs.locations[i]
      })
      if (refs.nebula && refs.mountains[3]) {
        refs.nebula.position.z = refs.mountains[3].position.z
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Resize
    const onResize = () => {
      if (!refs.camera || !refs.renderer || !refs.composer) return
      refs.camera.aspect = window.innerWidth / window.innerHeight
      refs.camera.updateProjectionMatrix()
      refs.renderer.setSize(window.innerWidth, window.innerHeight)
      refs.composer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(refs.animationId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      refs.stars.forEach((s: THREE.Points) => { s.geometry.dispose(); (s.material as THREE.Material).dispose() })
      refs.mountains.forEach((m: THREE.Mesh) => { m.geometry.dispose(); (m.material as THREE.Material).dispose() })
      refs.nebula?.geometry.dispose();
      (refs.nebula?.material as THREE.Material)?.dispose()
      refs.renderer?.dispose()
    }
  }, [])

  // Entrance animation
  const overlayRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ready || !overlayRef.current) return
    gsap.from(overlayRef.current, { opacity: 0, y: 30, duration: 1.4, ease: 'power3.out', delay: 0.3 })
  }, [ready])

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
    </div>
  )
}
