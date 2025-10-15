import Link from "next/link";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-6xl mx-auto w-full px-6">{children}</div>;
}

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <Container>
        <div className="flex items-center justify-between py-4 text-sm text-muted-foreground">
          <div>&copy; {new Date().getFullYear()} ByteLabs Studio</div>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
};

