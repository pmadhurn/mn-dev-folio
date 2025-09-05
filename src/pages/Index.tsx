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
  const siteTitle = "Madhur Patel | Madhur N Patel - Expert Full-Stack Developer & AI/ML Engineer";
  const siteDescription = "Madhur Patel (Madhur N Patel) - Expert Full-Stack Developer & AI/ML Engineer from Ahmedabad, India. 3+ years experience building enterprise-grade applications with 95% ML accuracy. Specializes in React, Node.js, Python, TensorFlow, AWS. Computer Science student at Indus University with proven track record in MERN stack, Android development, and IoT systems.";
  const siteUrl = "https://madhur.dev";
  const keywords = "Madhur Patel, Madhur N Patel, Madhur, Full Stack Developer, AI ML Engineer, React Developer, Node.js Developer, Python Developer, TensorFlow, Machine Learning, Software Engineer, Computer Science, Ahmedabad India, Indus University, MERN Stack, JavaScript, TypeScript, AWS, Android Developer, IoT, ESP32, Docker, MongoDB, PostgreSQL, Enterprise Applications, Web Development, Portfolio";

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

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={`${siteUrl}/madhur-patel-og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Madhur Patel - Expert Full-Stack Developer & AI/ML Engineer" />
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
        <meta property="twitter:image" content={`${siteUrl}/madhur-patel-twitter-image.jpg`} />
        <meta property="twitter:image:alt" content="Madhur Patel - Expert Full-Stack Developer & AI/ML Engineer" />
        <meta property="twitter:creator" content="@pmadhurn" />

        {/* Enhanced SEO Meta Tags */}
        <meta name="theme-color" content="#6366f1" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="3 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Ahmedabad" />
        <meta name="geo.position" content="23.0225;72.5714" />
        <meta name="ICBM" content="23.0225, 72.5714" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Madhur Patel" />
        <meta name="msapplication-TileColor" content="#6366f1" />
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
            "jobTitle": ["Full-Stack Developer", "AI/ML Engineer", "Software Engineer"],
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
              "Full-Stack Development", "React.js", "Node.js", "Python", "JavaScript", "TypeScript",
              "Machine Learning", "TensorFlow", "AI Engineering", "MongoDB", "PostgreSQL", "MySQL",
              "Docker", "AWS", "Google Cloud", "Android Development", "IoT", "ESP32", "Arduino",
              "MERN Stack", "FastAPI", "Express.js", "Microservices", "REST APIs", "Git", "Linux"
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
            "worksFor": {
              "@type": "Organization",
              "name": "Freelance"
            },
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
            "name": "Madhur Patel Portfolio - Full-Stack Developer & AI/ML Engineer",
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
            "name": "Madhur Patel - Full-Stack Development Services",
            "description": "Expert full-stack development and AI/ML engineering services by Madhur Patel. Specializing in React, Node.js, Python, and enterprise application development.",
            "provider": {
              "@type": "Person",
              "name": "Madhur N Patel",
              "alternateName": ["Madhur Patel", "Madhur"]
            },
            "areaServed": "Worldwide",
            "serviceType": ["Full-Stack Development", "AI/ML Engineering", "Web Development", "Mobile App Development", "IoT Solutions"],
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
