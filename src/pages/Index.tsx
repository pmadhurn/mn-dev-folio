import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Certifications from '@/components/Certifications';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';

const Index = () => {
  const siteTitle = "Madhur N Patel | Infrastructure & Embedded Systems Engineer";
  const siteDescription = "Madhur N Patel — Infrastructure and embedded systems engineer in Ahmedabad, India. Builds and operates self-managed Linux infrastructure, containerized services, and sensor-fusion systems on Raspberry Pi and ESP32.";
  const siteUrl = "https://madhur.dev";
  const keywords = "Madhur Patel, Madhur N Patel, Madhur, Infrastructure Engineer, Embedded Systems, Linux, Docker, Docker Compose, Cloudflare Tunnel, Nginx, Raspberry Pi, ESP32, Sensor Fusion, Computer Vision, Python, FastAPI, PostgreSQL, Oracle Cloud, IoT, Software Engineer, Ahmedabad India, Indus University, Portfolio";

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{siteTitle}</title>
        <meta name="title" content={siteTitle} />
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Madhur N Patel" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph / Facebook — "profile" matches the profile:* tags below
            and the static tags in index.html that non-JS crawlers read. */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={`${siteUrl}/madhur-patel-og-infra.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Madhur N Patel - Infrastructure & Embedded Systems Engineer" />
        <meta property="og:site_name" content="Madhur Patel Portfolio" />
        <meta property="og:locale" content="en_US" />
        <meta property="profile:first_name" content="Madhur" />
        <meta property="profile:last_name" content="Patel" />

        {/* Enhanced Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@pmadhurn" />
        <meta property="twitter:url" content={siteUrl} />
        <meta property="twitter:title" content={siteTitle} />
        <meta property="twitter:description" content={siteDescription} />
        <meta property="twitter:image" content={`${siteUrl}/madhur-patel-og-infra.jpg`} />
        <meta property="twitter:image:alt" content="Madhur N Patel - Infrastructure & Embedded Systems Engineer" />
        <meta property="twitter:creator" content="@pmadhurn" />

        {/* Enhanced SEO Meta Tags */}
        <meta name="theme-color" content="#f9a91f" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="3 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Ahmedabad" />
        <meta name="geo.position" content="23.0225;72.5714" />
        <meta name="ICBM" content="23.0225, 72.5714" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Madhur Patel" />
        <meta name="msapplication-TileColor" content="#f9a91f" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Enhanced Structured Data for Person */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Madhur N Patel",
            "alternateName": ["Madhur Patel", "Madhur"],
            "givenName": "Madhur",
            "familyName": "Patel",
            "jobTitle": ["Infrastructure Engineer", "Embedded Systems Engineer", "Software Engineer"],
            "url": siteUrl,
            "email": "pmadhurn@gmail.com",
            "telephone": "+91-9016273812",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ahmedabad",
              "addressRegion": "Gujarat", 
              "addressCountry": "India",
              "postalCode": "380015"
            },
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "Indus University",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ahmedabad",
                "addressCountry": "India"
              }
            },
            "sameAs": [
              "https://linkedin.com/in/madhur-n",
              "https://github.com/pmadhurn",
              "https://x.com/pmadhurn",
              "https://twitter.com/pmadhurn",
              "https://madhur.dev"
            ],
            "knowsAbout": [
              "Infrastructure Engineering", "Embedded Systems", "Linux", "Docker", "Docker Compose",
              "Cloudflare Tunnel", "Nginx", "Oracle Cloud", "Raspberry Pi", "ESP32", "Arduino",
              "Sensor Fusion", "Computer Vision", "Python", "FastAPI", "PostgreSQL", "Redis",
              "IoT", "REST APIs", "Git", "CI/CD", "Self-Hosting"
            ],
            "description": siteDescription,
            "hasCredential": [
              {
                "@type": "EducationalOccupationalCredential",
                "name": "AWS Academy Graduate - Machine Learning Foundations",
                "credentialCategory": "certification",
                "recognizedBy": {
                  "@type": "Organization",
                  "name": "Amazon Web Services"
                }
              },
              {
                "@type": "EducationalOccupationalCredential",
                "name": "AWS Academy Graduate - Cloud Foundations", 
                "credentialCategory": "certification",
                "recognizedBy": {
                  "@type": "Organization",
                  "name": "Amazon Web Services"
                }
              },
              {
                "@type": "EducationalOccupationalCredential",
                "name": "MERN Stack Developer",
                "credentialCategory": "certification"
              }
            ],
            "nationality": "Indian",
            "birthPlace": "India",
            "gender": "Male"
          })}
        </script>

        {/* Enhanced Structured Data for Website */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Madhur N Patel Portfolio - Infrastructure & Embedded Systems Engineer",
            "alternateName": ["Madhur N Patel Portfolio", "Madhur Portfolio"],
            "url": siteUrl,
            "description": siteDescription,
            "author": {
              "@type": "Person",
              "name": "Madhur N Patel",
              "alternateName": ["Madhur Patel", "Madhur"]
            },
            "inLanguage": "en-US",
            "copyrightYear": "2025",
            "copyrightHolder": {
              "@type": "Person", 
              "name": "Madhur N Patel"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${siteUrl}?q={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            }
          })}
        </script>

        {/* Professional Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Madhur N Patel - Infrastructure & Embedded Systems Engineering",
            "description": "Infrastructure and embedded systems engineering by Madhur N Patel. Self-managed Linux infrastructure, containerized services, and sensor-fusion systems on Raspberry Pi and ESP32.",
            "provider": {
              "@type": "Person",
              "name": "Madhur N Patel",
              "alternateName": ["Madhur Patel", "Madhur"]
            },
            "areaServed": "Worldwide",
            "serviceType": ["Infrastructure Engineering", "Embedded Systems", "Platform Engineering", "IoT Solutions", "Backend Development"],
            "url": siteUrl,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ahmedabad",
              "addressRegion": "Gujarat",
              "addressCountry": "India"
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certifications />
          <Education />
          <Contact />
        </main>
        <Footer />
        <Analytics />
      </div>
    </>
  );
};

export default Index;
