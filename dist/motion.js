// Content stays visible if animation scripts fail or reduced motion is enabled.
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  const animate = () => media.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.timeline({defaults:{ease:'power3.out'}})
      .from('.hero h1 > span', {yPercent:75,rotation:5,opacity:0,stagger:0.13,duration:1})
      .from('.hero-dish', {scale:0.3,rotation:-45,opacity:0,duration:1.3,ease:'back.out(1.3)'},0.15)
      .from('.hero-side', {x:100,y:100,rotation:25,opacity:0,duration:1},0.6)
      .from('.hero .intro, .hero .actions, .food-scribble, .sticker', {y:25,opacity:0,stagger:0.1,duration:0.7},0.7);
    gsap.to('.hero-dish', {y:-16,rotation:3,duration:2.5,repeat:-1,yoyo:true,ease:'sine.inOut',scrollTrigger:{trigger:'.hero',start:'top bottom',end:'bottom top',toggleActions:'play pause resume pause'}});
    gsap.to('.hero-side', {y:12,rotation:-4,duration:3,repeat:-1,yoyo:true,ease:'sine.inOut',scrollTrigger:{trigger:'.hero',start:'top bottom',end:'bottom top',toggleActions:'play pause resume pause'}});
    gsap.fromTo('.showcase-plate', {rotation:-22,scale:0.65,y:100}, {rotation:10,scale:1.05,y:-30,ease:'none',scrollTrigger:{trigger:'.craving-showcase',start:'top bottom',end:'bottom top',scrub:1}});
    gsap.from('.craving-showcase h2', {x:-70,opacity:0,duration:1,scrollTrigger:{trigger:'.craving-showcase',start:'top 75%',once:true}});
    gsap.utils.toArray('.food-grid article').forEach((card,index) => {
      gsap.from(card.querySelector('.food-image'), {clipPath:'inset(100% 0% 0% 0%)',y:35,duration:1,delay:(index%3)*0.12,ease:'power3.out',scrollTrigger:{trigger:card,start:'top 92%',once:true},clearProps:'clipPath,transform'});
    });
    gsap.utils.toArray('.section-heading, .story-photo, .story-copy, .showcase-caption, .social > *, .visit > *').forEach(element => {
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
