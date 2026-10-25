// Never hide content: a missed trigger or failed animation must leave it readable.
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  const animate = () => media.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.timeline({defaults:{ease:'power3.out'}})
      .from('.hero h1 > span', {y:18,stagger:0.1,duration:0.8,ease:'power2.out',clearProps:'transform'})
      .from('.hero-dish', {scale:0.96,rotation:-3,y:16,duration:1,clearProps:'transform'},0.1)
      .from('.hero-side', {x:12,y:16,duration:0.9,clearProps:'transform'},0.3)
      .from('.hero .intro, .hero .actions, .food-scribble, .sticker', {y:12,stagger:0.08,duration:0.6,clearProps:'transform'},0.3);
    gsap.to('.food-orbit', {rotation:360,duration:100,repeat:-1,ease:'none',scrollTrigger:{trigger:'.hero',start:'top bottom',end:'bottom top',toggleActions:'play pause resume pause'}});
    gsap.utils.toArray('.food-grid article').forEach((card,index) => {
      gsap.from(card.querySelector('.food-image'), {y:16,scale:0.98,duration:0.65,delay:(index%3)*0.06,immediateRender:false,ease:'power2.out',scrollTrigger:{trigger:card,start:'top 98%',once:true},clearProps:'transform'});
    });
    gsap.utils.toArray('.section-heading, .chapter-copy, .reveal-card, .story-gallery, .story-copy, .showcase-caption, .instagram-live > *, .visit > *').forEach(element => {
      gsap.from(element,{y:18,duration:0.65,immediateRender:false,scrollTrigger:{trigger:element,start:'top 98%',once:true},clearProps:'transform'});
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
  document.body.classList.add('motion-ready');
}
