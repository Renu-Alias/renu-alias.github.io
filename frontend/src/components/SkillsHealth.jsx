import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsHealth({ skillsData }) {
  const sectionRef = useRef(null);

  const skills = skillsData || {
    languages: ["Python", "C", "C++", "JavaScript", "Java", "Dart"],
    frameworks: ["Flutter", "Node.js", "Express.js"],
    "tools_&_design": ["Linux", "Git", "GitHub", "Canva", "Figma"],
    infrastructure: ["AWS", "Claude"],
    databases: ["PostgreSQL", "SQL*Plus", "MySQL", "MongoDB"],
    soft_skills: ["leadership", "collaboration", "adaptability", "problem-solving"]
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.skill-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, scaleY: 0.92 },
          {
            opacity: 1,
            scaleY: 1,
            duration: 0.5,
            ease: 'expo.out',
            delay: i * 0.08,
            transformOrigin: 'top',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="section-header">
        <span className="section-cmd">cat ./skills.json</span>
      </div>

      <div className="skills-grid">
        <div className="skill-card">
          <div className="skill-title">.languages</div>
          <div className="skill-list">{JSON.stringify(skills.languages)}</div>
        </div>

        <div className="skill-card">
          <div className="skill-title">.frameworks</div>
          <div className="skill-list">{JSON.stringify(skills.frameworks)}</div>
        </div>

        <div className="skill-card">
          <div className="skill-title">.tools_&_design</div>
          <div className="skill-list">{JSON.stringify(skills["tools_&_design"])}</div>
        </div>

        <div className="skill-card">
          <div className="skill-title">.infrastructure</div>
          <div className="skill-list">{JSON.stringify(skills.infrastructure)}</div>
        </div>

        <div className="skill-card">
          <div className="skill-title">.databases</div>
          <div className="skill-list">{JSON.stringify(skills.databases)}</div>
        </div>

        <div className="skill-card skill-card-full">
          <div className="skill-title">.soft_skills</div>
          <div className="skill-list">{JSON.stringify(skills.soft_skills || [])}</div>
        </div>
      </div>
    </section>
  );
}
