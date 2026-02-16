export type Link = {
  label: string;
  href: string;
};

type FooterLinkProps = {
  title: string;
  links: Link[];
};

export default function FooterLinks({ title, links }: FooterLinkProps) {
  return (
    <div>
      <h4 className="text-muted-foreground mb-4 text-[10px] font-medium tracking-[0.2em] uppercase">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="group/link text-muted-foreground hover:text-foreground relative text-sm transition-colors"
            >
              {link.label}
              <span className="bg-foreground absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover/link:w-full" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
