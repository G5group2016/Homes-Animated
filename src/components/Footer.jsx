import React from 'react';

const Instagram = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Linkedin = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const Youtube = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
    <polygon points="10 15 15 12 10 9"/>
  </svg>
);

const Bookmark = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
  </svg>
);


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      style={{
        backgroundColor: '#030303',
        padding: '80px 8% 40px 8%',
        borderTop: '1px solid var(--border-color)',
        color: '#ffffff',
        fontFamily: 'var(--font-sans)'
      }}
    >
      <div 
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '60px'
        }}
      >
        {/* Top Section: Logo & Links Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '40px',
          }}
          className="footer-grid"
        >
          {/* Col 1: Brand Info */}
          <div style={{ gridColumn: 'span 2' }} className="footer-brand-col">
            <h3 
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 800,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#ffffff',
                marginBottom: '20px'
              }}
            >
              G5 HOMES
            </h3>
            <p 
              style={{
                fontSize: '0.92rem',
                lineHeight: '1.6',
                color: 'var(--text-secondary)',
                maxWidth: '320px',
                marginBottom: '30px'
              }}
            >
              G5 Homes creates exceptional residential spaces through architectural innovation, engineering expertise, and premium construction standards.
            </p>
          </div>

          {/* Col 2: Sitemap Links */}
          <div>
            <h4 
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.82rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#ffffff',
                marginBottom: '22px',
                fontWeight: 600
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="#about" className="footer-link">About G5 Homes</a></li>
              <li><a href="#services" className="footer-link">Our Services</a></li>
              <li><a href="#materials" className="footer-link">Premium Materials</a></li>
              <li><a href="#projects" className="footer-link">Project Showcase</a></li>
              <li><a href="#process" className="footer-link">Construction Process</a></li>
              <li><a href="#testimonials" className="footer-link">Testimonials</a></li>
              <li><a href="#faq" className="footer-link">FAQ</a></li>
              <li><a href="#contact" className="footer-link">Contact</a></li>
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div>
            <h4 
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.82rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#ffffff',
                marginBottom: '22px',
                fontWeight: 600
              }}
            >
              Inquiries
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                info@g5homes.com
              </li>
              <li style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                +91 98000 00000
              </li>
              <li style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Trivandrum, Kerala, India
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Socials, Legal, and Copyright */}
        <div 
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '35px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          {/* Copyright */}
          <div 
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-tertiary)',
              fontWeight: 400
            }}
          >
            © {currentYear} G5 Homes. All Rights Reserved.
          </div>

          {/* Legal Links */}
          <div 
            style={{
              display: 'flex',
              gap: '25px',
              fontSize: '0.82rem'
            }}
          >
            <a href="#" className="footer-link-secondary">Privacy Policy</a>
            <a href="#" className="footer-link-secondary">Terms & Conditions</a>
          </div>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <a href="#" className="social-icon" title="Instagram">
              <Instagram size={18} />
            </a>
            <a href="#" className="social-icon" title="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="#" className="social-icon" title="Youtube">
              <Youtube size={18} />
            </a>
            <a href="#" className="social-icon" title="Pinterest">
              <Bookmark size={18} />
            </a>
          </div>

        </div>
      </div>

      <style>{`
        .footer-link {
          font-size: 0.9rem;
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }
        .footer-link:hover {
          color: var(--accent);
          padding-left: 3px;
        }
        .footer-link-secondary {
          color: var(--text-tertiary);
          transition: var(--transition-fast);
        }
        .footer-link-secondary:hover {
          color: var(--text-secondary);
        }
        .social-icon {
          color: var(--text-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: var(--transition-fast);
        }
        .social-icon:hover {
          color: var(--accent);
          border-color: rgba(212, 175, 55, 0.25);
          background-color: rgba(212, 175, 55, 0.02);
        }
        
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 30px;
          }
          .footer-brand-col {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </footer>
  );
}