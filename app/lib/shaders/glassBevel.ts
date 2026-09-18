// Glass Bevel Shader - Fresnel + Gold Rim
export const glassBevelVertex = `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vViewDir;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vViewDir = normalize(cameraPosition - vWorldPosition);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const glassBevelFragment = `
  uniform float uTime;
  uniform float uBevelWidth;
  uniform vec3 uGoldColor;
  uniform vec3 uGoldLight;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vViewDir;
  
  float fresnel(vec3 viewDir, vec3 normal, float power) {
    return pow(1.0 - max(dot(viewDir, normal), 0.0), power);
  }
  
  void main() {
    float f = fresnel(vViewDir, vNormal, 3.0);
    float rim = fresnel(vViewDir, vNormal, 1.5);
    
    vec3 baseColor = vec3(0.1, 0.1, 0.1);
    vec3 glassColor = mix(baseColor, uGoldColor, rim * uBevelWidth);
    glassColor += uGoldLight * f * 0.3;
    
    // Subtle animated shimmer
    float shimmer = sin(vWorldPosition.x * 5.0 + uTime) * sin(vWorldPosition.y * 5.0 + uTime * 0.7) * 0.5 + 0.5;
    glassColor += uGoldLight * shimmer * 0.05 * f;
    
    float alpha = 0.15 + f * 0.3;
    
    gl_FragColor = vec4(glassColor, alpha);
  }
`;