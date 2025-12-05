# Madhur N Patel - Developer Portfolio

A modern, responsive developer portfolio showcasing full-stack development, AI/ML projects, and IoT solutions.

## 🚀 Live Demo

**Portfolio URL**: [www.madhur.dev](www.madhur.dev)

## 👨‍💻 About

I'm Madhur N Patel, a dedicated Computer Science Engineering student from Ahmedabad, India, specializing in:

- **Full-Stack Development** (MERN Stack)
- **AI/ML Solutions** (TensorFlow, Python)
- **Mobile Development** (Android)
- **IoT Systems** (ESP32, Arduino)

**Currently seeking**: SDE, Full-Stack, and ML/AI internships and projects.

## 🛠️ Tech Stack

This portfolio is built with:

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Build Tool**: Vite
- **Deployment**: Vercel
- **Icons**: Lucide React
- **Fonts**: Space Grotesk, Inter, JetBrains Mono

## 🏃‍♂️ Local Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd madhur-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:8080`

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation & theme toggle
│   ├── Hero.tsx        # Landing section
│   ├── About.tsx       # About me section
│   ├── Skills.tsx      # Technical skills
│   ├── Projects.tsx    # Project showcase
│   ├── ProjectModal.tsx # Project details modal
│   ├── Certifications.tsx # Professional certifications
│   ├── Education.tsx   # Academic background
│   ├── Contact.tsx     # Contact form & info
│   └── Footer.tsx      # Footer with links
├── data/               # Content data
│   ├── projects.ts     # Project information
│   └── certifications.ts # Certification data
├── assets/             # Images and static assets
├── pages/              # Route components
└── hooks/              # Custom React hooks
```

## 🎨 Design System

The portfolio uses a comprehensive design system with:

- **Colors**: Indigo primary (#4F46E5), Teal accent (#06B6D4)
- **Typography**: Space Grotesk (headings), Inter (body), JetBrains Mono (code)
- **Components**: Fully customized shadcn/ui components
- **Themes**: Light/dark mode with system preference detection
- **Animations**: Smooth transitions and micro-interactions

## 📝 Content Management

### Adding New Projects

Edit `src/data/projects.ts`:

```typescript
{
  id: 'your-project-id',
  title: 'Your Project Title',
  summary: 'Brief description...',
  description: 'Detailed description...',
  highlights: ['Feature 1', 'Feature 2'],
  tech: ['React', 'Node.js'],
  category: 'web', // web, mobile, ai-ml, iot, desktop
  status: 'public', // public, private, coming-soon
  links: {
    demo: 'https://demo-url.com',
    code: 'https://github.com/username/repo'
  },
  featured: true // Show in featured section
}
```

### Adding Certifications

Edit `src/data/certifications.ts`:

```typescript
{
  id: 'cert-id',
  title: 'Certification Name',
  issuer: 'Issuing Organization',
  date: 'Month Year',
  credentialId: 'optional-credential-id',
  description: 'Brief description...'
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect it's a Vite project
3. Deploy with default settings

### Manual Deployment

```bash
# Build the project
npm run build

# Upload the dist/ folder to your hosting provider
```

## 📧 Contact

- **Email**: pmadhurn@gmail.com
- **Phone**: +91 9016273812
- **GitHub**: [pmadhurn](https://github.com/pmadhurn)
- **LinkedIn**: [madhur-n](https://linkedin.com/in/madhur-n)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using [Lovable AI](https://lovable.dev)
