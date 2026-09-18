// Custom GSAP Eases
export const customEases = {
  luxury: '0.87, 0, 0.13, 1',
  spring: '0.5, 2.5, 0.3, 0.9',
  expo: '0.87, 0, 0.13, 1',
  bounce: '0.68, -0.55, 0.27, 1.55',
  smooth: '0.4, 0, 0.2, 1',
};

export function registerCustomEases() {
  if (typeof window !== 'undefined') {
    const { CustomEase } = require('gsap/CustomEase');
    Object.entries(customEases).forEach(([name, ease]) => {
      CustomEase.create(name, ease);
    });
  }
}