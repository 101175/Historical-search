window.addEventListener('DOMContentLoaded', () => {
    try {
      TagCanvas.Start('tagcanvas', 'taglist', {
        textColour: '#5a3b14',
        outlineColour: '#d1bfa3',
        reverse: true,
        depth: 0.9,
        maxSpeed: 0.05,
        shape: 'sphere',
        shadow: '#c5b89b',
        shadowBlur: 2,
        wheelZoom: false,
        freezeActive: true,
        pinchZoom: true,
        clickToFront: 600,
        textFont: 'Georgia, Times, serif',
      });
    } catch (e) {
      console.log('TagCanvas error:', e);
    }
  });