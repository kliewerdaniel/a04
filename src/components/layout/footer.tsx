import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE_NAME, SOCIAL } from "@/lib/constants";

const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "AI Knowledge Systems", href: "/services#knowledge-systems" },
      { label: "Workflow Automation", href: "/services#automation" },
      { label: "Local AI Deployment", href: "/services#local-ai" },
      { label: "AI-Powered Websites", href: "/services#ai-websites" },
    ],
  },
  {
    title: "Content",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Resources", href: "/resources" },
      { label: "Lab", href: "/lab" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", href: SOCIAL.github, external: true },
      { label: "X / Twitter", href: SOCIAL.twitter, external: true },
      { label: "LinkedIn", href: SOCIAL.linkedin, external: true },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border-subtle" role="contentinfo">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight hover:opacity-70 transition-opacity"
            >
              {SITE_NAME}
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Local AI infrastructure consulting and systems engineering. Production systems for organizations that own their stack.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">{group.title}</h3>
              <ul className="space-y-3" role="list">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Book a Consultation
            </Link>
            <Link
              href="/feed.xml"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              RSS Feed
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
