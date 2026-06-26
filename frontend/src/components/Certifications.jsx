import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  const certsRef = useRef(null);
  const achievementsRef = useRef(null);

  const certifications = [
    {
      title: 'Claude 101',
      issuer: 'Anthropic',
      year: 'May 2026'
    },
    {
      title: 'Claude Code 101',
      issuer: 'Anthropic',
      year: 'June 2026'
    },
    {
      title: 'AWS Cloud Essentials',
      issuer: 'Amazon Web Services',
      year: 'June 2026'
    }
  ];

  const achievements = [
    'Nexus AI Hackathon third prize winner',
    "CEFR C2 level on Cambridge LinguaSkill Business examination",
    "GirlScript Summer of Code (GSSoC) '26 contributor under Open Source Track",
    "Social Summer of Code (SSoC) '26 contributor"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.cert-card').forEach((card, i) => {
        const xDir = i % 2 === 0 ? -40 : 40;
        gsap.fromTo(card,
          { opacity: 0, x: xDir },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'expo.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      gsap.utils.toArray('.achievement-item').forEach((li, i) => {
        gsap.fromTo(li,
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'expo.out',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: li,
              start: 'top 92%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section id="certifications" className="certifications-section" ref={certsRef}>
        <div className="section-header">
          <span className="section-cmd">cat ./certifications.md</span>
        </div>

        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <div key={index} className="cert-card">
              <div className="cert-card-title">{cert.title}</div>
              <div className="cert-card-meta">{cert.issuer} · {cert.year}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="achievements" className="certifications-section" ref={achievementsRef}>
        <div className="section-header">
          <span className="section-cmd">cat ./achievements.md</span>
        </div>

        <div className="achievements-block">
          <ul className="achievements-list">
            {achievements.map((item, index) => (
              <li key={index} className="achievement-item">{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
