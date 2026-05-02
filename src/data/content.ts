export const CATEGORIES = [
  "Open Technology App",
  "Workflow Management",
  "Dev Tools",
  "Managed Cloud Apps",
  "Device & Data",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface TechTool {
  name: string;
  icon: string;
  logo?: string;
  category: Category;
  url?: string;
  description?: string;
  darkInvert?: boolean;
}

export const TECH_TOOLS: TechTool[] = [
  { name: "Penpot",      icon: "🎨", logo: "/logos/penpot.svg",      category: "Dev Tools",       url: "https://penpot.app",                description: "Open-source design & prototyping tool",              darkInvert: true },
  { name: "Claude",      icon: "🤖", logo: "/logos/claude.svg",      category: "Dev Tools",       url: "https://claude.ai",                 description: "Anthropic's AI assistant for coding & analysis",             darkInvert: true },
  { name: "Hugging Face", icon: "🤗", logo: "/logos/huggingface.svg", category: "Dev Tools",       url: "https://huggingface.co",            description: "Open-source AI models and self-hosted inference" },
  { name: "VS Code",     icon: "💻", logo: "/logos/vscode.svg",      category: "Dev Tools",       url: "https://code.visualstudio.com",     description: "Extensible code editor by Microsoft" },
  { name: "Codesandbox", icon: "📦", logo: "/logos/codesandbox.svg", category: "Dev Tools",       url: "https://codesandbox.io",            description: "Browser-based code sandbox & collaboration",         darkInvert: true },
  { name: "Gitlab",          icon: "🦊", logo: "/logos/gitlab.svg",      category: "Dev Tools",   url: "https://gitlab.com",                description: "Git repository hosting with CI/CD pipelines" },
  { name: "Supabase",        icon: "⚡", logo: "/logos/supabase.svg",    category: "Dev Tools",   url: "https://supabase.com",              description: "Open-source Firebase alternative with PostgreSQL" },
  { name: "Pika Pods",       icon: "🫛", logo: "/logos/pikapods.svg",     category: "Managed Cloud Apps",   url: "https://pikapods.com",              description: "Managed app hosting with one-click containers" },
  { name: "Digital Ocean",   icon: "🌊", logo: "/logos/digitalocean.svg", category: "Managed Cloud Apps",   url: "https://digitalocean.com",          description: "Simple cloud VPS hosting for apps, blogs & APIs" },
  { name: "GitHub",          icon: "🐙", logo: "/logos/github.svg",      category: "Dev Tools",     url: "https://github.com",                description: "Version control & open-source collaboration",        darkInvert: true },
  { name: "Vercel",          icon: "▲",  logo: "/logos/vercel.svg",      category: "Managed Cloud Apps",     url: "https://vercel.com",                description: "Frontend cloud platform for Next.js deployments",    darkInvert: true },
  { name: "Cloudflare",      icon: "🟠", logo: "/logos/cloudflare.svg",   category: "Managed Cloud Apps",     url: "https://cloudflare.com",            description: "CDN, edge hosting, and Pages for static sites" },
  { name: "Google",          icon: "🔵", logo: "/logos/google.svg",      category: "Managed Cloud Apps",     url: "https://cloud.google.com",          description: "Cloud infrastructure & developer services" },
  { name: "AWS",             icon: "☁️", logo: "/logos/aws.svg",         category: "Managed Cloud Apps",     url: "https://aws.amazon.com",            description: "Amazon Web Services cloud platform",                 darkInvert: true },
  { name: "Microsoft",       icon: "🪟", logo: "/logos/microsoft.svg",   category: "Managed Cloud Apps",     url: "https://azure.microsoft.com",       description: "Azure cloud & developer ecosystem" },
  { name: "Open Technology App", icon: "⚙️", logo: "/logos/opentechnologyapp.png", category: "Workflow Management", url: "https://www.opentechnologyapp.com", description: "Item, task, and workflow management platform" },
  { name: "Brave",       icon: "🦁", logo: "/logos/brave.svg",       category: "Workflow Management", url: "https://brave.com",             description: "Privacy-first browser with built-in ad blocking" },
  { name: "Bitwarden",   icon: "🔐", logo: "/logos/bitwarden.svg",   category: "Device & Data",       url: "https://bitwarden.com",         description: "Open-source password manager" },
  { name: "Plane",       icon: "✈️", logo: "/logos/plane.png",       category: "Workflow Management", url: "https://plane.so",              description: "Open-source project management & issue tracking" },
  { name: "Rocket Chat", icon: "🚀", logo: "/logos/rocketchat.svg",  category: "Workflow Management", url: "https://rocket.chat",           description: "Self-hosted team messaging platform" },
  { name: "Nextcloud",   icon: "☁️", logo: "/logos/nextcloud.svg",   category: "Device & Data",       url: "https://nextcloud.com",         description: "Self-hosted file sync & collaboration suite" },
  { name: "Fleet",       icon: "🖥️", logo: "/logos/fleet.png",       category: "Device & Data",       url: "https://fleetdm.com",           description: "Open-source device management & endpoint visibility" },
  { name: "Wazuh",       icon: "🛡️", logo: "/logos/wazuh.svg",       category: "Device & Data",       url: "https://wazuh.com",             description: "Open-source security monitoring & SIEM platform" },
  { name: "Keycloak",    icon: "🔑", logo: "/logos/keycloak.svg",    category: "Device & Data",       url: "https://keycloak.org",          description: "Open-source identity and access management" },
];

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  readTime: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "app-idea-development-nextjs-workflow",
    title: "App Idea Development: From Concept to Hosted Application",
    excerpt: "A structured workflow for developing an app idea using Next.js templates, AI tooling, VS Code, and Git-based hosting.",
    category: "Dev Tools",
    date: "2026-02-26",
    readTime: "8 min",
    content: `## Phase 1 — Idea Formation

Start with:

- Problem definition
- Target user identification
- Core value proposition
- Monetization hypothesis

Sketch UI ideas using:

- Wireframes
- Simple diagrams
- Feature lists

## Using AI to Refine the Idea

AI tools can help:

- Improve product descriptions
- Identify edge cases
- Suggest feature prioritization
- Generate UX flows
- Create initial documentation

AI can assist with:

- Naming
- Taglines
- Landing page copy
- Validation questions

## Phase 2 — Selecting a Next.js Template

Look for templates that include:

- Authentication
- Blog or CMS integration
- Dashboard layout
- Tailwind styling
- API route structure

Evaluate templates based on:

- Folder clarity
- Scalability
- Maintainability
- Deployment compatibility

## Phase 3 — Development Environment Setup

Using VS Code:

- Open project folder
- Install dependencies
- Run local development server
- Test page routing
- Modify components

Common workflow:

- Edit page
- Save file
- Browser auto-refresh
- Validate UI change

## Data Layer Planning

Define:

- Core entities
- Relationships
- Data validation logic
- Access control rules

Keep structure consistent between:

- UI forms
- Database schema
- Server-side logic

## Phase 4 — Hosting Strategy

Git-based workflow:

- Push to GitHub or GitLab
- Enable automatic deployments
- Configure environment variables
- Set production domain

Benefits:

- Version control
- Rollback capability
- Team collaboration
- Continuous deployment

## Ongoing Iteration

After launch:

- Track usage
- Refine features
- Improve performance
- Expand documentation
- Add automation

## Why This Workflow Works

- Idea clarity before coding
- Structured development phases
- Git-based content management
- Scalable hosting approach
- Repeatable product development system`,
  },
  {
    id: "2",
    slug: "brave-browser-workflow-management",
    title: "Brave Browser: Workflow Management for Technical Teams",
    excerpt: "How Brave can be structured into a secure, segmented, high-performance workflow environment for modern teams.",
    category: "Workflow Management",
    date: "2026-02-26",
    readTime: "6 min",
    content: `## Why Browser Workflow Matters

Your browser is:

- Your dashboard
- Your admin panel
- Your communication hub
- Your research environment

Optimizing it improves:

- Speed
- Focus
- Security
- Session organization

## Performance Benefits

Brave provides:

- Built-in ad and tracker blocking
- Faster page load times
- Reduced background scripts
- Lower memory usage

This leads to:

- Faster dashboards
- Smoother SaaS usage
- Reduced cognitive load

## Workspace Segmentation

Use Brave profiles to separate:

- Development work
- Infrastructure administration
- Personal browsing
- Client environments

Benefits:

- Cookie isolation
- Reduced cross-account conflicts
- Clear workspace boundaries
- Safer production access

## Extension-Based Workflow Control

Enhance workflow with:

- Password managers
- Session managers
- Note capture tools
- Markdown editors
- Task managers

Keep extensions segmented by profile to reduce risk.

## Security as Workflow Stability

Brave improves:

- Tracking protection
- Script blocking
- Phishing reduction
- Login session protection

This protects:

- Admin dashboards
- Internal tools
- Cloud consoles
- Production systems

## Workflow Strategy

Structure your browser intentionally:

- Define profiles by responsibility
- Limit unnecessary extensions
- Bookmark critical tools
- Use tab groups strategically
- Close stale sessions

## Final Thought

Workflow management begins at the environment level.

Brave supports:

- Speed
- Isolation
- Stability
- Reduced friction`,
  },
  {
    id: "3",
    slug: "digitalocean-rocket-chat-hosting",
    title: "DigitalOcean + Rocket.Chat: Practical Hosting Overview",
    excerpt: "A practical deployment guide for hosting Rocket.Chat on DigitalOcean with production-ready infrastructure considerations.",
    category: "Managed Cloud Apps",
    date: "2026-02-24",
    readTime: "7 min",
    content: `## What You're Hosting

- Node.js runtime
- MongoDB database
- Reverse proxy (Nginx or Caddy)
- SSL certificate
- Persistent file storage

## Infrastructure on DigitalOcean

- Droplets (Ubuntu 22.04 LTS recommended)
- Managed MongoDB (recommended for production)
- VPC networking
- Cloud Firewalls
- Snapshots & automated backups

## Recommended Production Architecture

- App Droplet running Rocket.Chat via Docker
- Managed MongoDB cluster
- Object storage (DigitalOcean Spaces) for uploads
- Nginx reverse proxy
- Let's Encrypt SSL

## Deployment Flow

- Create Droplet
- Install Docker & Docker Compose
- Configure docker-compose.yml
- Define environment variables
- Start containers
- Configure reverse proxy
- Enable SSL
- Configure firewall rules

## Scaling Strategy

- Increase Droplet size vertically first
- Move database to managed service early
- Offload uploads to object storage
- Introduce load balancer when needed

## Benefits

- Full infrastructure control
- Predictable pricing
- API extensibility
- Custom compliance configuration`,
  },
  {
    id: "4",
    slug: "fleet-wireguard-device-security-asset-management",
    title: "Fleet: WireGuard Device Security and Asset Management",
    excerpt: "How Fleet enables WireGuard-based device security, endpoint visibility, and structured asset management for modern teams.",
    category: "Device & Data",
    date: "2026-02-26",
    readTime: "9 min",
    content: `## Overview

Fleet provides:

- Device inventory visibility
- Endpoint query capabilities
- Policy enforcement
- Secure remote access
- Asset tracking across users and devices

When combined with WireGuard, it strengthens:

- Encrypted device connectivity
- Controlled access to internal resources
- Zero-trust style architecture

## WireGuard Integration Concept

WireGuard provides:

- Lightweight VPN tunnels
- Strong encryption
- Minimal attack surface
- High performance connectivity

Fleet complements this by:

- Tracking which device owns which key
- Mapping devices to users
- Monitoring device posture
- Logging access patterns

## Asset Management Structure

Core asset categories:

- Users
- Devices
- Vendors
- Access policies

Each device record can include:

- Owner
- Operating system
- Encryption status
- Installed software
- Last check-in
- Assigned access roles

## User Access Governance

Fleet enables:

- Role-based access
- Query-based compliance checks
- Device approval workflows
- Audit logging

This allows teams to:

- Remove stale devices
- Detect unauthorized software
- Enforce encryption policies
- Validate patch levels

## Security Benefits

- Centralized visibility
- Reduced shadow IT
- Enforced endpoint compliance
- Structured audit readiness

## Infrastructure Flow

- Device enrolls in Fleet
- WireGuard key assigned
- Policies applied
- Queries run on schedule
- Results logged for compliance
- Access granted or restricted

## Why This Matters

Modern asset management requires:

- Real-time device state
- Encrypted connectivity
- Clear ownership mapping
- Structured reporting

Fleet combined with WireGuard creates:

- Secure remote device control
- Continuous compliance visibility
- Scalable asset governance`,
  },
  {
    id: "5",
    slug: "ai-table-asset-management",
    title: "AI Table: Structured Asset Management and Analytics Integration",
    excerpt: "How AI Table enables structured asset management and integrates with analytics platforms like Metabase for visualization and governance.",
    category: "Workflow Management",
    date: "2026-02-26",
    readTime: "8 min",
    content: `## Overview

AI Table acts as:

- A structured data layer
- A validation engine
- A workflow automation layer
- A governance tracking system

It captures asset records across:

- Users
- Devices
- Vendors
- Access permissions

## Form-Based Data Capture

Structured forms collect:

- User information
- Device attributes
- Vendor relationships
- Access level definitions

AI assists with:

- Field validation
- Data normalization
- Duplicate detection
- Policy suggestion

## Core Asset Categories

### Users

- Role
- Department
- Access level
- Assigned devices

### Devices

- Owner
- Operating system
- Encryption status
- Last check-in
- Installed software

### Vendors

- Service category
- Data sensitivity level
- Contract renewal date
- Risk tier

## Data Normalization

AI Table ensures:

- Consistent naming conventions
- Relationship mapping
- Foreign key integrity
- Schema validation

This allows clean integration into analytics systems.

## Integration with Analytics (Metabase)

The integration flow:

- AI Table writes structured records to SQL
- Database enforces relationships
- Metabase connects with read-only credentials
- Dashboards update from live queries

Dashboards can display:

- Device compliance metrics
- Vendor exposure tracking
- User access patterns
- Audit history trends

## Governance and Reporting

AI Table supports:

- Audit logs
- Change tracking
- Access reviews
- Compliance reporting

## Why This Matters

Modern asset management requires:

- Real-time structure
- Clear ownership mapping
- Analytics visibility
- Governance enforcement

AI Table bridges operational data with business intelligence.`,
  },
  {
    id: "6",
    slug: "pikapods-nextcloud-hosting",
    title: "PikaPods + Nextcloud: Practical Hosting Overview",
    excerpt: "A streamlined guide to deploying and managing Nextcloud on PikaPods with minimal DevOps overhead.",
    category: "Managed Cloud Apps",
    date: "2026-02-24",
    readTime: "5 min",
    content: `## What You're Hosting

- PHP runtime
- Database (MariaDB or PostgreSQL)
- File storage
- Background job processor
- SSL

## What PikaPods Manages

- Containerized deployment
- Database provisioning
- Automated updates
- Backups
- SSL certificates

## Deployment Flow

- Create PikaPods account
- Select Nextcloud
- Choose storage and region
- Configure admin credentials
- Deploy container
- Configure domain (optional)
- Enable additional apps

## Storage & Performance

- Storage tier impacts cost
- Higher allocation for heavy file usage
- Background jobs handled automatically
- Built-in backup management

## Benefits

- No server maintenance
- Automatic updates
- Minimal infrastructure management
- Predictable scaling`,
  },
];

