import SectionLabel from "@/components/landing/SectionLabel";

type SectionHeaderProps = {
  subTitle: string;
  description: string;
  title: {
    text: string;
    highlight: string;
  };
};

export default function SectionHeader({
  title,
  subTitle,
  description,
}: SectionHeaderProps) {
  return (
    <div data-reveal className="mb-14 text-center md:mb-16">
      <SectionLabel>{subTitle}</SectionLabel>
      <h2 className="font-poppins text-3xl font-bold tracking-tight md:text-4xl">
        {title.highlight}{" "}
        <span className="text-muted-foreground font-light">{title.text}</span>
      </h2>
      <p className="text-muted-foreground mx-auto mt-4 max-w-2xl md:text-lg">
        {description}
      </p>
    </div>
  );
}
