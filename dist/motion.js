// Content stays visible if animation scripts fail or reduced motion is enabled.
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  const animate = () => media.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.timeline({defaults:{ease:'power3.out'}})
      .from('.hero h1 > span', {yPercent:60,opacity:0,stagger:0.12,duration:1.1,ease:'expo.out'})
      .from('.hero-dish', {scale:0.88,rotation:-7,y:45,opacity:0,duration:1.5,ease:'power3.out'},0.15)
      .from('.hero-side', {x:35,y:45,rotation:4,opacity:0,duration:1.2},0.6)
      .from('.hero .intro, .hero .actions, .food-scribble, .sticker', {y:25,opacity:0,stagger:0.1,duration:0.7},0.7);
    gsap.to('.food-orbit', {rotation:360,duration:100,repeat:-1,ease:'none',scrollTrigger:{trigger:'.hero',start:'top bottom',end:'bottom top',toggleActions:'play pause resume pause'}});
    gsap.fromTo('.showcase-plate', {rotation:-8,scale:0.88,y:70}, {rotation:4,scale:1,y:-25,ease:'none',scrollTrigger:{trigger:'.craving-showcase',start:'top bottom',end:'bottom top',scrub:1.4}});
    gsap.from('.craving-showcase h2', {x:-70,opacity:0,duration:1,scrollTrigger:{trigger:'.craving-showcase',start:'top 75%',once:true}});
    gsap.utils.toArray('.food-grid article').forEach((card,index) => {
      gsap.from(card.querySelector('.food-image'), {clipPath:'inset(100% 0% 0% 0%)',y:35,duration:1,delay:(index%3)*0.12,ease:'power3.out',scrollTrigger:{trigger:card,start:'top 92%',once:true},clearProps:'clipPath,transform'});
    });
    gsap.utils.toArray('.section-heading, .chapter-copy, .reveal-card, .story-photo, .story-copy, .showcase-caption, .instagram-live > *, .visit > *').forEach(element => {
      gsap.from(element,{y:45,opacity:0,duration:0.85,scrollTrigger:{trigger:element,start:'top 92%',once:true},clearProps:'all'});
    });
  });
  animate();
  document.querySelector('.motion-toggle').addEventListener('click', event => {
    const paused=event.currentTarget.getAttribute('aria-pressed')!=='true';
    event.currentTarget.setAttribute('aria-pressed',String(paused));
    event.currentTarget.setAttribute('aria-label',paused?'Play animations':'Pause animations');
    event.currentTarget.textContent=paused?'▶':'Ⅱ';
    document.body.classList.toggle('motion-paused',paused);
    media.revert();
    if (!paused) animate();
  });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => ScrollTrigger.refresh()));
}
