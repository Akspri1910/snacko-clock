// Content stays visible if animation scripts fail or reduced motion is enabled.
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from('.hero-copy > *', {y:28, opacity:0, duration:0.8, stagger:0.11, ease:'power2.out', clearProps:'all'});
    gsap.from('.hero-art', {y:35, opacity:0, duration:1, delay:0.25, ease:'power2.out', clearProps:'all'});
    gsap.utils.toArray('.section-heading, .food-grid article, .story-photo, .story-copy, .social > *, .visit > *').forEach(element => {
      gsap.from(element, {y:30, opacity:0, duration:0.7, ease:'power2.out', clearProps:'all', scrollTrigger:{trigger:element,start:'top 94%',once:true}});
    });
    gsap.to('.sticker', {y:-8, rotation:6, duration:2, repeat:-1, yoyo:true, ease:'sine.inOut', scrollTrigger:{trigger:'.hero-art',start:'top bottom',end:'bottom top',toggleActions:'play pause resume pause'}});
  });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => ScrollTrigger.refresh()));
}
