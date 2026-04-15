import { HomePage } from "@/components/HomePage";

type Props = {
  searchParams?: {
    project?: string;
  };
};

export default function Home({ searchParams }: Props) {
  const projectSlug = searchParams?.project;
  return <HomePage initialProjectSlug={projectSlug} />;
}