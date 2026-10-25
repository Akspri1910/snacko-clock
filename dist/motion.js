// Motion changes only transforms, so content survives missed or failed triggers.
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  const animate = () => media.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.timeline({defaults:{ease:'power3.out'}})
      .from('.hero h1 > span, .hero h1 > em', {y:22,stagger:.12,duration:.9,clearProps:'transform'})
      .from('.hero-image-wrap', {y:22,rotation:2,duration:1,clearProps:'transform'},.1)
      .from('.round-stamp', {rotation:10,scale:.9,duration:.8,clearProps:'transform'},.3);
    gsap.utils.toArray('.craving-card, .story-heading, .story-gallery, .puneri-note, .chapter-copy, .reveal-ticket').forEach(element => {
      gsap.from(element,{y:24,duration:.75,immediateRender:false,scrollTrigger:{trigger:element,start:'top 98%',once:true},clearProps:'transform'});
    });
  });
  animate();
  document.querySelector('.motion-toggle').addEventListener('click', event => {
    const paused = event.currentTarget.getAttribute('aria-pressed') !== 'true';
    event.currentTarget.setAttribute('aria-pressed',String(paused));
    event.currentTarget.setAttribute('aria-label',paused?'Play animations':'Pause animations');
    event.currentTarget.textContent = paused ? '▶' : 'Ⅱ';
    document.body.classList.toggle('motion-paused',paused);
    media.revert();
    if (!paused) animate();
  });
  document.querySelectorAll('.category-nav a, .craving-card').forEach(link => link.addEventListener('click', () => requestAnimationFrame(() => ScrollTrigger.refresh())));
  document.body.classList.add('motion-ready');
}
