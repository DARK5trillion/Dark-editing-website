// Gold Particle Shader - Vertex & Fragment
export const goldParticleVertex = `
  attribute float size;
  attribute float alpha;
  attribute float phase;
  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uMouse;
  varying float vAlpha;
  varying float vPhase;
  varying vec3 vPosition;
  
  void main() {
    vAlpha = alpha;
    vPhase = phase;
    vPosition = position;
    
    vec3 pos = position;
    
    float morph = uProgress;
    float ringRadius = 1.8;
    float ringWidth = 0.3;
    
    float distFromRing = abs(length(pos.xy) - ringRadius);
    float ringFactor = smoothstep(ringWidth, 0.0, distFromRing);
    
    float angle = atan(pos.y, pos.x);
    float crownHeight = 0.0;
    for (int i = 0; i < 5; i++) {
      float crownAngle = float(i) * 3.14159 * 2.0 / 5.0;
      float diff = abs(angle - crownAngle);
      diff = min(diff, 6.28318 - diff);
      crownHeight += smoothstep(0.4, 0.0, diff) * 0.6;
    }
    
    vec3 targetPos = pos;
    targetPos.xy = normalize(pos.xy) * ringRadius;
    targetPos.z = mix(pos.z, crownHeight, ringFactor);
    
    pos = mix(pos, targetPos, morph * morph * (3.0 - 2.0 * morph));
    
    float mouseInfluence = 0.15 * (1.0 - morph);
    pos.x += uMouse.x * mouseInfluence * (1.0 + sin(uTime + phase));
    pos.y += uMouse.y * mouseInfluence * (1.0 + cos(uTime + phase));
    
    pos.y += sin(uTime * 0.5 + phase) * 0.02 * (1.0 - morph);
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const goldParticleFragment = `
  uniform float uTime;
  uniform float uProgress;
  varying float vAlpha;
  varying float vPhase;
  varying vec3 vPosition;
  
  void main() {
    float dist = length(gl_PointCoord - 0.5);
    if (dist > 0.5) discard;
    
    float alpha = (1.0 - dist * 2.0) * vAlpha;
    
    vec3 goldColor = mix(
      vec3(0.83, 0.69, 0.22),
      vec3(1.0, 0.84, 0.0),
      sin(uTime + vPhase * 3.0) * 0.5 + 0.5
    );
    
    float crownGlow = smoothstep(0.5, 1.0, vPosition.z) * (1.0 - uProgress);
    goldColor += vec3(1.0, 0.9, 0.3) * crownGlow * 0.5;
    
    gl_FragColor = vec4(goldColor, alpha * (0.5 + 0.5 * uProgress));
  }
`;