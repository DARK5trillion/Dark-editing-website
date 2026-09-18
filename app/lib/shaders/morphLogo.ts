// Morph Logo Shader - Logo Formation/Displacement
export const morphLogoVertex = `
  attribute float size;
  attribute float alpha;
  attribute float phase;
  attribute vec3 targetPosition;
  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uMouse;
  varying float vAlpha;
  varying float vPhase;
  varying float vProgress;
  
  void main() {
    vAlpha = alpha;
    vPhase = phase;
    vProgress = uProgress;
    
    vec3 pos = mix(position, targetPosition, uProgress * uProgress * (3.0 - 2.0 * uProgress));
    
    float mouseInfluence = 0.1 * (1.0 - uProgress);
    pos.x += uMouse.x * mouseInfluence * (1.0 + sin(uTime + phase));
    pos.y += uMouse.y * mouseInfluence * (1.0 + cos(uTime + phase));
    
    pos.y += sin(uTime * 0.3 + phase) * 0.01 * (1.0 - uProgress);
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * (400.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const morphLogoFragment = `
  uniform float uTime;
  uniform float uProgress;
  varying float vAlpha;
  varying float vPhase;
  varying float vProgress;
  
  void main() {
    float dist = length(gl_PointCoord - 0.5);
    if (dist > 0.5) discard;
    
    float alpha = (1.0 - dist * 2.0) * vAlpha * vProgress;
    
    vec3 goldColor = mix(
      vec3(0.83, 0.69, 0.22),
      vec3(1.0, 0.84, 0.0),
      sin(uTime + vPhase * 2.0) * 0.5 + 0.5
    );
    
    // Crown sparkle at top
    float sparkle = sin(uTime * 5.0 + vPhase * 10.0) * 0.5 + 0.5;
    goldColor += vec3(1.0, 0.95, 0.5) * sparkle * 0.3 * vProgress;
    
    gl_FragColor = vec4(goldColor, alpha);
  }
`;